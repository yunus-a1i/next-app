'use server'

import Link from 'next/link';
import React from 'react'

// Define the Ticket type
type Ticket = {
  id: number;
  title: string;
  body: string;
  priority: string;
};

async function getTickets(): Promise<Ticket[]> {

  await new Promise(resolve => setTimeout(resolve, 1500))

  const res = await fetch('http://localhost:4000/tickets', {
    next: {
        revalidate: 0
    }
  });
  return res.json(); 
}

const TicketList = async () => {
  const tickets: Ticket[] = await getTickets(); 

  return (
    <>
      {tickets.length > 0 ? (
        tickets.map((ticket) => (
          <div key={ticket.id} className='card my-5'>
            <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
            </Link>
          </div>
        ))
      ) : (
        <p className='text-center'>There are no open tickets, yay!</p>
      )}
    </>
  )
}

export default TicketList;
