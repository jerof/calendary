import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

function DateAndTimeSelection({ selectedDate, setSelectedDate }) {
  return (
    <div className="flex flex-row w-2/3">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border"
        disabled={(date) => date <= new Date()}
      />
      <div
        className="flex flex-col overflow-auto gap-y-2 px-4 w-full"
        style={{ maxHeight: "350px" }}
      >
        <Button variant="outline">3:30 PM</Button>
        <Button variant="outline">3:30 PM</Button>
        <Button variant="outline">3:30 PM</Button>
        <Button variant="outline">3:30 PM</Button>
        <Button variant="outline">3:30 PM</Button>
        <Button variant="outline">3:30 PM</Button>
        <Button variant="outline">3:30 PM</Button>
      </div>
    </div>
  );
}

export default DateAndTimeSelection;
