import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

function DateAndTimeSelection({
  selectedDate,
  timeSlots,
  setSelectedTime,
  selectedTime,
  handleDateChange,
  enableTimeSlot,
  prevEventBooking = [],
}) {
  const checkTimeSlot = (time) => {
    return (
      prevEventBooking.filter((item) => item.selectedTime === time).length > 0
    );
  };

  return (
    <div className="flex flex-row w-2/3">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => handleDateChange(date)}
        className="rounded-md border"
        disabled={(date) => date <= new Date()}
      />
      <div
        className="flex flex-col overflow-auto gap-y-2 px-4 w-full"
        style={{ maxHeight: "350px" }}
      >
        {timeSlots?.map((time, index) => (
          <Button
            key={index}
            variant="outline"
            disabled={!enableTimeSlot || checkTimeSlot(time)}
            onClick={() => setSelectedTime(time)}
            className={`${selectedTime === time && "bg-slate-100"}`}
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default DateAndTimeSelection;
