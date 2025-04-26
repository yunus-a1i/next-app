"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Ticket = {
    title: string;
    body: string;
    priority: string;
    user_email: string;
  };
  

function CreateForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true)

    const ticket: Ticket = {
        title, body, priority, user_email: 'yunus@gmail.com'
    }

    const res = await fetch('http://localhost:4000/tickets', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(ticket)
    })

    if(res.status === 201){
        router.refresh()
        router.push('/tickets')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Title:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select onChange={(e) => setPriority(e.target.value)} value={priority}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  );
}

export default CreateForm;
