import React, { useState, useEffect } from "react";

import { useAppContext } from "../context";
import GroupingOptions from "./GroupingOptions";
import SortingOptions from "./SortingOptions";
import TicketCard from "./TicketCard";
import "./KanbanBoard.css";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { RiMenuAddFill } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
function KanbanBoard() {
  const { state, dispatch } = useAppContext();
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  // Load user's view state from local storage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("kanbanAppState");
  
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      dispatch({ type: "SET_STATE", payload: parsedState });
    }
  }, [dispatch]);

  // Save user's view state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("kanbanAppState", JSON.stringify(state));
  }, [state]);

  const sortFunction = (a, b) => {
    if (state.sortingOption === "priority") {
      return a.priority - b.priority;
    } else if (state.sortingOption === "title") {
      return a.title.localeCompare(b.title);
    }
  };

  if (!state.tickets || state.tickets.length === 0) {
    return <div>Loading...</div>;
  }
  // State for dialog visibility

  // ...

  // Function to toggle the dialog visibility
  const toggleDialog = () => {
    setIsDialogVisible(!isDialogVisible);
  };

  const groupedTickets = groupTicketsByOption(
    state.tickets,
    state.groupingOption,
    state.users
  );
  console.log(groupedTickets);
  return (
    <div className="kanban-board-1">
      <div className="header">
        <div className="inside-header">
          <div className="display" onClick={toggleDialog}>
            <div>
              <RiMenuAddFill />
              <p>Display</p>
            </div>
            <div>
              <RiArrowDropDownLine />
            </div>
          </div>
          {/* Render dialog if isDialogVisible is true */}
          {isDialogVisible && (
            <div className="dialog-box">
              {/* Add your dialog content here */}
              <GroupingOptions />
          <SortingOptions />
            </div>
          )}
          {/* <GroupingOptions />
          <SortingOptions /> */}
        </div>
      </div>
      <div className="kanban-board">
        <div className="board">
          {groupedTickets.map((group) => (
            <div key={group.key} className="column">
              <div className="group-header">
                <div className="inside-group-header-1">
                  <div className="group-header-key">{group.key}</div>
                  <span>{group.tickets.length}</span>
                </div>
                <div className="inside-group-header-2">
                  <div>
                    <AiOutlinePlus />
                  </div>
                  <div>
                    <BsThreeDots />
                  </div>
                </div>
              </div>
              {group.tickets.sort(sortFunction).map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function groupTicketsByOption(tickets, groupingOption, users) {
  if (groupingOption === "status") {
    const statuses = ["Todo", "In progress", "Backlog", "Cancelled", "Done"];

    const grouped = {};

    statuses.forEach((status) => {
      grouped[status] = [];
    });

    tickets.forEach((ticket) => {
      if (statuses.includes(ticket.status)) {
        grouped[ticket.status].push(ticket);
      }
    });

    return statuses.map((status) => ({
      key: status,
      tickets: grouped[status] || [],
    }));
  } else if (groupingOption === "user") {
    const grouped = {};
    tickets.forEach((ticket) => {
      const assignedUser = users.find((user) => user.id === ticket.userId);
      const userName = assignedUser ? assignedUser.name : "Unassigned";
      if (!grouped[userName]) {
        grouped[userName] = [];
      }
      grouped[userName].push(ticket);
    });
    return Object.entries(grouped).map(([key, value]) => ({
      key,
      tickets: value,
    }));
  } else if (groupingOption === "priority") {
    const grouped = {};
    tickets.forEach((ticket) => {
      const priority = getPriorityLabel(ticket.priority);
      if (!grouped[priority]) {
        grouped[priority] = [];
      }
      grouped[priority].push(ticket);
    });
    return Object.entries(grouped).map(([key, value]) => ({
      key,
      tickets: value,
    }));
  }
  return [];
}

function getPriorityLabel(priorityValue) {
  switch (priorityValue) {
    case 4:
      return "Urgent";
    case 3:
      return "High";
    case 2:
      return "Medium";
    case 1:
      return "Low";
    default:
      return "No priority";
  }
}

export default KanbanBoard;
