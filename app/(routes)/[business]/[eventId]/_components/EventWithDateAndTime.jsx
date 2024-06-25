import { format } from "date-fns";
import { CalendarCheck, Clock, MapPin, Timer } from "lucide-react";
import React from "react";

function EventWithDateAndTime({
  params,
  eventInfo,
  selectedDate,
  selectedTime,
}) {
  return (
    <div className="flex flex-col w-1/3 gap-y-3">
      <p>{params?.business}</p>
      <h1 className="font-bold text-2xl">{eventInfo?.eventName}</h1>
      <div className="flex gap-x-2">
        <Clock /> {eventInfo?.duration} min
      </div>
      <div className="flex gap-x-2">
        <MapPin /> {eventInfo?.locationType}
      </div>
      <div className="flex gap-x-2">
        <CalendarCheck /> {format(selectedDate, "PPP").toString()}
      </div>
      <div className="flex gap-x-2">
        <Timer /> {selectedTime}
      </div>
    </div>
  );
}

export default EventWithDateAndTime;
