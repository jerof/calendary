import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";

function ScheduledEventList({ scheduledEvents }) {
  return (
    <div className="my-2">
      {scheduledEvents?.map((event, index) => (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              {format(event?.selectedDate, "PPP").toString()}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-y-2">
              <p className="text-lg font-semibold">{event?.eventName}</p>
              <p>{event?.locationType}</p>
              <p>{event?.duration} min</p>
              <p>{event?.locationUrl}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}

export default ScheduledEventList;
