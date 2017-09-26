import React, { Component } from 'react';

const getRange = (number) => {
  return Array(number).fill().map((_, i) => i + 1);
 }

export default class PageDropdown extends Component {
   setPage = (e) => {
     this.props.setPage(parseInt(e.target.value, 10));
   }
 
   render() {
     const { currentPage, maxPages } = this.props;
 
     return (
       <div className="select">
        <select
          onChange={this.setPage}
          value={currentPage}
          style={this.props.style}
          className={this.props.className}
        >
          {getRange(maxPages)
            .map(num => (
              <option key={num} value={num}>{num}</option>
          ))}
        </select>
       </div>
     );
   }
 }