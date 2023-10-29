// KanbanBoard.js
import React, { useEffect } from 'react';
import { useAppContext } from '../context';
import GroupingOptions from './GroupingOptions';
import SortingOptions from './SortingOptions';
import TicketCard from './TicketCard';
import "./KanbanBoard.css"
function KanbanBoard() {
  const { state, dispatch } = useAppContext();

  // Load user's view state from local storage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('kanbanAppState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      dispatch({ type: 'SET_STATE', payload: parsedState });
    }
  }, [dispatch]);

  // Save user's view state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('kanbanAppState', JSON.stringify(state));
  }, [state]);

  const sortFunction = (a, b) => {
    if (state.sortingOption === 'priority') {
      return a.priority - b.priority;
    } else if (state.sortingOption === 'title') {
      return a.title.localeCompare(b.title);
    }
  };

  if (!state.tickets || state.tickets.length === 0) {
    return <div>Loading...</div>;
  }

  const groupedTickets = groupTicketsByOption(state.tickets, state.groupingOption, state.users);

  return (
    <div className="kanban-board">
      <GroupingOptions />
      <SortingOptions />
      <div className="board">
        {groupedTickets.map((group) => (
          <div key={group.key} className="column">
            <h2>{group.key}</h2>
            {group.tickets
              .sort(sortFunction)
              .map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function groupTicketsByOption(tickets, groupingOption, users) {
  if (groupingOption === 'status') {
    const grouped = {};
    tickets.forEach((ticket) => {
      if (!grouped[ticket.status]) {
        grouped[ticket.status] = [];
      }
      grouped[ticket.status].push(ticket);
    });
    return Object.entries(grouped).map(([key, value]) => ({ key, tickets: value }));
  } else if (groupingOption === 'user') {
    const grouped = {};
    tickets.forEach((ticket) => {
      const assignedUser = users.find((user) => user.id === ticket.userId);
      const userName = assignedUser ? assignedUser.name : 'Unassigned';
      if (!grouped[userName]) {
        grouped[userName] = [];
      }
      grouped[userName].push(ticket);
    });
    return Object.entries(grouped).map(([key, value]) => ({ key, tickets: value }));
  } else if (groupingOption === 'priority') {
    const grouped = {};
    tickets.forEach((ticket) => {
      const priority = getPriorityLabel(ticket.priority);
      if (!grouped[priority]) {
        grouped[priority] = [];
      }
      grouped[priority].push(ticket);
    });
    return Object.entries(grouped).map(([key, value]) => ({ key, tickets: value }));
  }
  return [];
}

function getPriorityLabel(priorityValue) {
  switch (priorityValue) {
    case 4:
      return 'Urgent';
    case 3:
      return 'High';
    case 2:
      return 'Medium';
    case 1:
      return 'Low';
    default:
      return 'No priority';
  }
}

export default KanbanBoard;
