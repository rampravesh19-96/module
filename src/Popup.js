import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Popup = ({ content: Content, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-header">
          <button className="popup-close" onClick={onClose}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="popup-content">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Popup;
