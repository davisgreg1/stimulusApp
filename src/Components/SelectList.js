import React from 'react';
import '../App.css';

class SelectList extends React.Component {
    render() {
      const { values, selectedValue, handleSelect } = this.props
      const displayValues = ['', ...values]
  
      return (
        <select
          value={selectedValue}
          onChange={handleSelect}
        >
          {displayValues.map((val, idx) =>
            <option key={idx} value={val}> {val} </option>)}
        </select>
      )
    }
  }
export default SelectList
/**the drop down list consists of all the agencies with projects pertaining to the funding category e.g. Infrastructure should have options: DOT, NYCHA, OPS, DEP, DPR */