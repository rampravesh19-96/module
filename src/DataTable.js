import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./DataTable.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const DataTable = ({ data, columnsToSkip=[],itemsPerPage=10 }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedColumn, setSortedColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const [currentPage, setCurrentPage] = useState(1);
  const maxPageNumbers = 5; // Maximum number of page numbers to display
  const ellipsis = "..."; // Ellipsis character

  // Handle search input
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    filterData(searchTerm, sortedColumn, sortDirection);
  };

  // Handle column sorting
  const handleSort = (e) => {
    const columnName = e.target.value;
    setSortedColumn(columnName);
    setSortDirection(""); // Reset sort direction
    filterData(searchTerm, columnName, "");
  };

  // Handle sort order change
  const handleSortOrderChange = (e) => {
    const sortOrder = e.target.value;
    setSortDirection(sortOrder);
    filterData(searchTerm, sortedColumn, sortOrder);
  };

  // Filter data based on search term, sort column, and sort direction
  const filterData = (searchTerm, columnName, sortDirection) => {
    let filteredData = data.filter((item) => {
      const itemValues = Object.values(item).join("|").toLowerCase();
      return itemValues.includes(searchTerm);
    });

    if (columnName) {
      filteredData.sort((a, b) => {
        const aValue = a[columnName];
        const bValue = b[columnName];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      });
    }

    setFilteredData(filteredData);
  };

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const getPageNumbers = () => {
    if (totalPages <= maxPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const middlePage = Math.floor(maxPageNumbers / 2);
    let startPage = currentPage - middlePage;
    let endPage = currentPage + middlePage;

    if (startPage <= 0) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    } else if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const exportToExcel = () => {
    if (!Array.isArray(filteredData)) {
      console.error("Invalid data format");
      return;
    }

    // Remove skipped columns from the data
    const filteredColumns = Object.keys(data[0]).filter(
      (column) => !columnsToSkip.includes(column)
    );
    const filteredItems = currentItems.map((item) => {
      const newItem = {};
      filteredColumns.forEach((column) => {
        newItem[column] = item[column];
      });
      return newItem;
    });

    const worksheet = XLSX.utils.json_to_sheet(filteredItems);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    const fileName = "table_data.xlsx";
    saveAs(excelData, fileName);
  };

  return (
    <>
      <div className="table-main">
        <div className="tbl-header">
          <div className="searchbar">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
            />
          </div>
          <button onClick={exportToExcel}>Export</button>
          <div className="sorting">
            <select onChange={handleSort} value={sortedColumn}>
              <option value="">Sort</option>
              {Object.keys(data[0]).map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
            <select onChange={handleSortOrderChange} value={sortDirection}>
              <option value="">Order</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => {
                  if (columnsToSkip.includes(key)) {
                    return null;
                  }
                  return (
                    <th key={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  {Object.entries(item).map(([key, value]) => {
                    if (columnsToSkip.includes(key)) {
                      return null;
                    }
                    return <td key={key}>{value}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <GrFormPrevious />
          </button>
          {getPageNumbers().map((pageNumber, index) => {
            if (pageNumber === ellipsis) {
              return <span key={index}>{ellipsis}</span>;
            }
            return (
              <button
                key={index}
                onClick={() => handlePageChange(pageNumber)}
                className={currentPage === pageNumber ? "active" : ""}
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </>
  );
};

export default DataTable;
