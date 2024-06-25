"use client";

import React, { useEffect, useState } from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import EventDetailsCard from "./_components/EventDetailsCard";
import { getFirestore, orderBy } from "firebase/firestore";
import { app } from "@/config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "@/components/ui/use-toast";

function Dashboard() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    user && getEventsListFromDb();
  }, [user]);

  const getEventsListFromDb = async () => {
    try {
      const q = query(
        collection(db, "Event"),
        where("createdBy", "==", user?.email),
        orderBy("id", "desc")
      );

      const querySnapshot = await getDocs(q);
      const events = [];
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
      setEventsList(events);
      console.log("Events List => ", events); // Log events here
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  const deleteEventInDb = async (event) => {
    const idToDelete = event?.id;
    await deleteDoc(doc(db, "Event", idToDelete)).then((response) => {
      toast({
        description: "Event successfully deleted.",
      });
    });
    getEventsListFromDb();
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <EventDetailsCard
        eventsList={eventsList}
        deleteEventInDb={deleteEventInDb}
      />
    </div>
  );
}

export default Dashboard;
