import React from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);

    const today = moment();

    this.state = {
      isOpen: false,
      value: moment.range(today.clone().subtract(7, "days"), today.clone())
    };
  }
  onSubmit = () => {
      this.props.handleDates([new Date(this.state.value.start._d).toJSON(), new Date(this.state.value.end._d).toJSON()])
    //   this.props.handleDates([value.end._i.toDateString(), value.start._i.toDateString()])

  }

  onSelect = (value, states) => {
    this.setState({ value, states });
  };

  onToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  renderSelectionValue = () => {
    return (
      <div>
        <div>Selection:</div>
            {this.state.value.start.format("YYYY-MM-DD")}
        {" - "}
        {this.state.value.end.format("YYYY-MM-DD")}
      </div>
    );
  };

  render() {
    return (
      <div>
        <div>{this.renderSelectionValue()}</div>

        <div>
          <input
            type="button"
            value="Toggle date picker"
            onClick={this.onToggle}
          />
        </div>

        {this.state.isOpen && (
          <DateRangePicker
            value={this.state.value}
            onSelect={this.onSelect}
            singleDateRange={true}
          />
        )}
        <button onClick={this.onSubmit}>search</button>
      </div>
    );
  }
}

export default Example;
