import React from 'react'

const DarkModeToggle = ({ onToggle }) => {
    return (
      <div className="dark-mode-toggle-container">
        <span className="dark-mode-label">Dark Mode:</span>
        <label className="toggle-container">
          <input type="checkbox" onChange={onToggle} />
          <span className="toggle-slider"></span>
        </label>
      </div>
    );
  };

export default DarkModeToggle;