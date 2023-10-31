// SortingOptions.js
import React from 'react';
import { useAppContext } from '../context';
import "./SortingOptions.css"
function SortingOptions() {
  const { state, dispatch } = useAppContext();

  const handleSortingChange = (event) => {
    const newSortingOption = event.target.value;
    dispatch({ type: 'SET_SORTING_OPTION', payload: newSortingOption });
    localStorage.setItem('sortingOption', newSortingOption);
  }

  return (
    <div className="sorting-options">
      <div className='heading'>ORDERING</div>
      <select value={state.sortingOption} onChange={handleSortingChange}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
}

export default SortingOptions;
