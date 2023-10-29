// TicketCard.js
import React from 'react';
import './TicketCard.css'
function TicketCard({ ticket }) {
  // Check if the 'user' property is defined and not null before accessing 'name'
//   const assignedTo = ticket.user ? ticket.user.name : 'Unassigned';

  return (
    <div className="ticket-card">
      <p>{ticket.id}</p>
      <h4>{ticket.title}</h4>
      <div>
        <div>

        </div>
        <div>

          <p>{ticket.tag[0]}</p>
        </div>
      </div>
      {/* <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
      <p>Assigned to: {assignedTo}</p> */}
    </div>
  );
}

export default TicketCard;
