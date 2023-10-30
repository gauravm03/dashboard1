// TicketCard.js
import React from 'react';
import './TicketCard.css'
function TicketCard({ ticket }) {
  // Check if the 'user' property is defined and not null before accessing 'name'
//   const assignedTo = ticket.user ? ticket.user.name : 'Unassigned';

  return (
    <div className="ticket-card">
      <div className='first-portion '>
        <p>{ticket.id}</p>
        <div className='img-inside-first'>
          <img src='data:image/jpeg;base64,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' alt='img'></img>
        </div>
      </div>
   
      <h4>{ticket.title}</h4>
   
     
        <div className='third-portion'>
          {/* <div className='icon-inside-third'> */}
          <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><path d="m4 3c-.5540164 0-1 .4459836-1 1v14c0 .554016.4459836 1 1 1h14c.554016 0 1-.445984 1-1v-14c0-.5540164-.445984-1-1-1zm6.998047 3.2539062c.351569 0 .634765.3027272.634765.6777344v5.1152344c0 .375007-.283196.675781-.634765.675781s-.634766-.300774-.634766-.675781v-5.1152344c0-.3750072.283197-.6777344.634766-.6777344zm.001953 7.6699218c.252438 0 .466886.08798.644531.265625.177625.177645.267578.392093.267578.644531 0 .252439-.089933.46884-.267578.646485-.177645.177624-.392093.265625-.644531.265625s-.466886-.08798-.644531-.265625c-.177625-.177645-.267578-.394046-.267578-.646485 0-.252438.089933-.466886.267578-.644531.177645-.177625.392093-.265625.644531-.265625z" fill="#4d4d4d"/></svg>
          {/* </div> */}
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
