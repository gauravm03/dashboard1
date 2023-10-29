// Context.js
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  groupingOption: localStorage.getItem('groupingOption') || 'status', // Load from local storage
  sortingOption: localStorage.getItem('sortingOption') || 'priority', // Load from local storage
  tickets: [],
  users: [],
};

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GROUPING_OPTION':
      localStorage.setItem('groupingOption', action.payload); // Save to local storage
      return { ...state, groupingOption: action.payload };
    case 'SET_SORTING_OPTION':
      localStorage.setItem('sortingOption', action.payload); // Save to local storage
      return { ...state, sortingOption: action.payload };
    case 'SET_TICKETS':
      return { ...state, tickets: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Fetch data from the API and set it in the state
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => {
        const { tickets, users } = response.data;
        dispatch({ type: 'SET_TICKETS', payload: tickets });
        dispatch({ type: 'SET_USERS', payload: users });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
