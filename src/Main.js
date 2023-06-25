import React, { useState } from 'react';
import Form from './Form';
import Popup from './Popup';
import "./styles.css"

const Main = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmitForm = (data) => {
    console.log(data);
    handleClosePopup();
  };

  return (
    <div className="main-container">
      <button className="open-popup-btn" onClick={handleButtonClick}>
        Open Popup
      </button>
      {isPopupOpen && (
        <Popup content={() => <Form onSubmit={handleSubmitForm} />} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Main;
