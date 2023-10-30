// App.js
import React from 'react';
import { AppProvider } from './context';
import KanbanBoard from './components/KanbanBoard';
import "./App.css"
function App() {
  return (
    <AppProvider>
      <div className="app">
        <KanbanBoard />
      </div>
    </AppProvider>
  );
}

export default App;
