"use client";

import React, { useEffect, useState } from "react";

import { getFirestore, orderBy } from "firebase/firestore";
import { app } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ScheduledEventList from "./_components/ScheduledEventList";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

function ScheduledEvents() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [scheduledEvents, setScheduledEvents] = useState([]);

  useEffect(() => {
    user && getScheduledEventsFromDb();
    console.log("Scheduled Events: ", scheduledEvents);
  }, [user]);

  const getScheduledEventsFromDb = async () => {
    const q = query(
      collection(db, "ScheduledEvents"),
      where("businessEmail", "==", user?.email),
      orderBy("id", "desc")
    );

    const querySnapshot = await getDocs(q);
    let events = [];
    querySnapshot.forEach((doc) => {
      events.push(doc.data());
    });
    setScheduledEvents(events);
  };

  return (
    <div>
      <div className="flex mt-4 p-6 flex-col">
        <h1 className="text-3xl font-bold mb-4">Scheduled Events</h1>
        <Separator />
        <div className="flex flex-col my-4">
          <Tabs defaultValue="upcoming" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <ScheduledEventList scheduledEvents={scheduledEvents} />
            </TabsContent>
            <TabsContent value="expired">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ScheduledEvents;
