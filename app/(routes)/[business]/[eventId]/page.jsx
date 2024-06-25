"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { app } from "@/config/firebase";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { format } from "date-fns";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { CalendarCheck, Clock, MapPin, Timer } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EventWithDateAndTime from "./_components/EventWithDateAndTime";
import DateAndTimeSelection from "./_components/DateAndTimeSelection";
import UserInfoSelection from "./_components/UserInfoSelection";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function EventPage({ params }) {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [eventInfo, setEventInfo] = useState();
  const [businessInfo, setBusinessInfo] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [step, setStep] = useState(1);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestNote, setGuestNote] = useState("");
  const router = useRouter();
  const [enableTimeSlot, setEnableTimeSlot] = useState(false);
  const [prevEventBooking, setPrevEventBooking] = useState([]);

  useEffect(() => {
    user && getEventInfoFromDb();
    user && getBusinessInfoFromDb();
  }, [user, businessInfo]);

  useEffect(() => {
    if (
      eventInfo?.duration &&
      businessInfo?.startTime &&
      businessInfo?.endTime
    ) {
      createTimeSlot(
        eventInfo.duration,
        businessInfo.startTime,
        businessInfo.endTime
      );
    }
  }, [eventInfo, businessInfo]);

  useEffect(() => {
    console.log("Selected Time: ", selectedTime);
  }, [selectedTime]);

  const getEventInfoFromDb = async () => {
    const id = params.eventId;
    const docRef = doc(db, "Event", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setEventInfo(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const getBusinessInfoFromDb = async () => {
    const docRef = doc(db, "Business", user?.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("BusinessInfo: ", docSnap.data());
      setBusinessInfo(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const createTimeSlot = (interval, startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    const totalSlots = (endTotalMinutes - startTotalMinutes) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTotalMinutes + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    });
    console.log("Generated time slots:", slots); // Debug log
    setTimeSlots(slots);
  };

  const handleSchedule = async () => {
    const id = Date.now().toString();
    await setDoc(doc(db, "ScheduledEvents", id), {
      id: id,
      businessName: businessInfo?.businessName,
      businessEmail: businessInfo?.email,
      duration: eventInfo?.duration,
      eventId: eventInfo?.id,
      eventName: eventInfo?.eventName,
      locationType: eventInfo?.locationType,
      locationUrl: eventInfo?.locationUrl,
      selectedDate: format(selectedDate, "yyyy-MM-dd"), // Ensure correct format
      selectedTime: selectedTime,
      guestName: guestName,
      guestEmail: guestEmail,
      guestNote: guestNote,
    }).then((response) => {
      router.replace("/confirmation");
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const day = format(date, "EEEE");
    console.log("Checking availability for day:", day); // Debug log
    if (businessInfo?.daysAvailable?.[day]) {
      console.log(
        "Day available in businessInfo:",
        businessInfo.daysAvailable[day]
      ); // Debug log
      getPrevEventBooking(date);
      setEnableTimeSlot(true);
    } else {
      setEnableTimeSlot(false);
    }
  };

  const getPrevEventBooking = async (date_) => {
    const formattedDate = format(date_, "yyyy-MM-dd"); // Ensure correct format
    const q = query(
      collection(db, "ScheduledEvents"),
      where("selectedDate", "==", formattedDate),
      where("eventId", "==", eventInfo.id)
    );

    const querySnapshot = await getDocs(q);
    const bookings = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      bookings.push(doc.data());
    });
    setPrevEventBooking(bookings);
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
              selectedTime={selectedTime}
            />
            {step === 1 ? (
              <>
                <DateAndTimeSelection
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  timeSlots={timeSlots}
                  eventInfo={eventInfo}
                  setSelectedTime={setSelectedTime}
                  selectedTime={selectedTime}
                  handleDateChange={handleDateChange}
                  enableTimeSlot={enableTimeSlot}
                  prevEventBooking={prevEventBooking}
                />
              </>
            ) : (
              <>
                <UserInfoSelection
                  setGuestName={setGuestName}
                  setGuestEmail={setGuestEmail}
                  setGuestNote={setGuestNote}
                />
              </>
            )}
          </div>
          <div className="flex mt-16 justify-end">
            {step === 1 ? (
              <Button onClick={() => setStep(2)}>Next</Button>
            ) : (
              <div className="flex gap-x-4">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleSchedule}>Schedule</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;
