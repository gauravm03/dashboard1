
import React from 'react';
import { useAppContext } from '../context';
import "./GroupingOptions.css"
function GroupingOptions() {
  const { state, dispatch } = useAppContext();

  const handleGroupingChange = (event) => {
    const newGroupingOption = event.target.value;
    dispatch({ type: 'SET_GROUPING_OPTION', payload: newGroupingOption });
    localStorage.setItem('groupingOption', newGroupingOption);
  }

  return (
    <div className="grouping-options">
      <div className='heading'>GROUPING</div>
      <select value={state.groupingOption} onChange={handleGroupingChange}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}

export default GroupingOptions;

