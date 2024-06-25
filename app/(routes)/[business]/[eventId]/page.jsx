"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { app } from "@/config/firebase";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { format } from "date-fns";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { CalendarCheck, Clock, MapPin, Timer } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EventWithDateAndTime from "./_components/EventWithDateAndTime";
import DateAndTimeSelection from "./_components/DateAndTimeSelection";

function EventPage({ params }) {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [eventInfo, setEventInfo] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    user && getEventInfoFromDb();
  }, [user]);

  const getEventInfoFromDb = async () => {
    const id = params.eventId;
    const docRef = doc(db, "Event", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setEventInfo(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <div className="flex p-10 bg-slate-300 h-screen mx-auto justify-center items-center">
      <div className="flex flex-col w-[820px] bg-white rounded-md drop-shadow-md p-10 border-t-8 h-full">
        <div className="flex flex-col">
          <div>
            <Image src="/logo.svg" width={50} height={50} alt="logo" />
          </div>
          <div className="flex flex-row mt-10">
            <EventWithDateAndTime
              params={params}
              eventInfo={eventInfo}
              selectedDate={selectedDate}
            />
            <DateAndTimeSelection
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
