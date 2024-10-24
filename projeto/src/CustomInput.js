import React from 'react';
import { FaCalendar } from 'react-icons/fa';

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <div className="custom-input" onClick={onClick} ref={ref}>
    <input value={value} readOnly />
    <FaCalendar className="calendar-icon clickable" />
  </div>
));

export default CustomInput;