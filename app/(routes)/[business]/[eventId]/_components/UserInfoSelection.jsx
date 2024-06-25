"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

function UserInfoSelection({ setGuestName, setGuestEmail, setGuestNote }) {
  return (
    <div className="flex flex-col w-1/2">
      <h2 className="font-bold text-2xl my-4">Give us your details</h2>
      <div className="flex flex-col my-2">
        <label>Name *</label>
        <Input
          required
          placeholder="What's your name?"
          onChange={(e) => setGuestName(e.target.value)}
        />
      </div>
      <div className="flex flex-col my-2">
        <label>Email *</label>
        <Input
          required
          type="email"
          placeholder="What's your email?"
          onChange={(e) => setGuestEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col my-2">
        <label>Notes</label>
        <Textarea
          placeholder="Any notes for the meeting? Share them here."
          onChange={(e) => setGuestNote(e.target.value)}
        />
      </div>
    </div>
  );
}

export default UserInfoSelection;
