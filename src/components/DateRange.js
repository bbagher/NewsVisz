import React, { useState } from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(props.dates);

  const onSubmit = (e) => {
    e.preventDefault();

    value &&
      props.handleDates(value);
  };

  const onSelect = (value) => {
    setValue(value);
  };

  const onToggle = () => {
    setIsOpen(isOpen ? false : true);
  };

  const renderSelectionValue = () => {
    return (
      <div>
        <div>Selection:</div>
        {value && value.start.format("YYYY-MM-DD")}
        {" - "}
        {value && value.end.format("YYYY-MM-DD")}
      </div>
    );
  };

  return (
    <div>
      <div>{renderSelectionValue()}</div>
      <div className="small-container">
        <div>
          <input type="button" value="Toggle date picker" onClick={onToggle} />
        </div>

        {isOpen && (
          <DateRangePicker
            value={value}
            onSelect={onSelect}
            singleDateRange={true}
          />
        )}
        {!isOpen && (
          <button type="submit" onClick={onSubmit}>
            <i className="fa fa-search"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Example;
