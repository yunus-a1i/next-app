import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav>
      <h1>Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
      <Link href="/tickets/create">Add new Ticket</Link>
    </nav>
  );
}

export default Navbar;
