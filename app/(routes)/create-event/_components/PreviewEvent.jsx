import { Clock, Link2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { formatDate } from "date-fns";
import { getFirestore } from "firebase/firestore";
import { app } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

function PreviewEvent({ formValues }) {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState();
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [businessInfo, setBusinessInfo] = useState();

  useEffect(() => {
    formValues?.duration && createTimeSlot(formValues?.duration);
  }, [formValues]);

  useEffect(() => {
    user && getBusinessInfo();
  }, [user]);

  const createTimeSlot = (interval) => {
    const startTime = 8 * 60; // 8 AM in minutes
    const endTime = 22 * 60; // 10 PM in minutes
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    });
    setTimeSlots(slots);
  };

  const getBusinessInfo = async () => {
    const docRef = doc(db, "Business", user?.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setBusinessInfo(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <div className="flex p-10 bg-slate-300 h-screen mx-auto justify-center items-center">
      <div
        className="flex flex-col w-[820px] bg-white rounded-md drop-shadow-md p-10 border-t-8 h-full"
        style={{ borderTopColor: `${formValues?.themeColor}` }}
      >
        <div>
          <Image src="/logo.svg" width={50} height={150} alt="logo" />
        </div>
        {/* Meeting Preview */}
        <div className="grid grid-cols-3">
          <div className="flex mt-10 flex-col gap-y-4">
            <div>
              <p>{businessInfo?.businessName}</p>
              <h1 className="text-2xl font-bold">{formValues?.eventName}</h1>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-2">
                {formValues?.duration && (
                  <>
                    <Clock /> {formValues?.duration} min
                  </>
                )}
              </div>
              <div className="flex gap-x-2">
                {formValues?.locationType && (
                  <>
                    <MapPin /> {formValues?.locationType}
                  </>
                )}
              </div>
              <div className="flex gap-x-2">
                {formValues?.locationUrl && (
                  <Link
                    href={formValues?.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-x-2 underline text-blue-600"
                  >
                    <Link2 />
                    Event Link
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-2 border-l pl-6">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">Select Date and Time</h2>
              <div className="flex mt-4 justify-start items-start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => date <= new Date()}
                />
                <div
                  className="flex flex-col overflow-auto gap-y-2 px-4 w-full"
                  style={{ maxHeight: "350px" }}
                >
                  {timeSlots?.map((time, index) => (
                    <Button key={index} variant="outline">
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewEvent;
