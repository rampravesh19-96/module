import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./DataTable.css";

const Table = ({ data, columnsToSkip }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const maxPageNumbers = 5; // Maximum number of page numbers to display
  const ellipsis = "..."; // Ellipsis character

  // Handle search input
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    filterData(searchTerm, sortedColumn, sortDirection);
  };

  // Handle column sorting
  const handleSort = (columnName) => {
    if (sortedColumn === columnName) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(columnName);
      setSortDirection("asc");
    }
    filterData(
      searchTerm,
      columnName,
      sortDirection === "asc" ? "asc" : "desc"
    );
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


    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    const fileName = "table_data.xlsx";
    saveAs(data, fileName);
  };

  return (
    <>
    <div className="table-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />
      <button onClick={exportToExcel}>Export to Excel</button>
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
                  <div>
                    <button onClick={() => handleSort(key)}>↑</button>
                    <button onClick={() => handleSort(key)}>↓</button>
                  </div>
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
            {"<<"}
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
            {">>"}
          </button>
        </div>
    </>
  );
};

export default Table;

