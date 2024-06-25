"use client";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import DaysList from "@/app/_utils/DaysList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doc, getFirestore, updateDoc, getDoc } from "firebase/firestore";
import { app } from "@/config/firebase";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

function Availability() {
  const [daysAvailable, setDaysAvailable] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    user && getBusinessInfoWithAvailability();
    console.log(daysAvailable, startTime, endTime);
  }, [user]);

  const handleCheckboxChange = (day) => {
    setDaysAvailable((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const handleSave = async () => {
    await updateDoc(doc(db, "Business", user?.email), {
      daysAvailable: daysAvailable,
      startTime: startTime,
      endTime: endTime,
    }).then((response) => {
      console.log("Availability updated");
      toast({
        description: "Availability updated!",
      });
      router.replace("/dashboard");
    });
  };

  const getBusinessInfoWithAvailability = async () => {
    const docRef = doc(db, "Business", user?.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const result = docSnap.data();
      setDaysAvailable(result.daysAvailable);
      setStartTime(result.startTime);
      setEndTime(result.endTime);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <div className="p-6 px-10 flex flex-col h-screen">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Availability</h1>
        <p className="text-muted-foreground">
          Set your business's availability below.
        </p>
      </div>
      <Separator />
      <div className="mt-4">
        <h2>Days of the week available</h2>
        <div className="grid grid-cols-5 gap-2 mt-4">
          {DaysList?.map((item, index) => (
            <div className="flex items-center gap-x-1" key={index}>
              <Checkbox
                checked={daysAvailable[item.day]}
                onCheckedChange={() => handleCheckboxChange(item.day)}
              />
              <label key={index} className="text-sm font-medium">
                {item.day}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2>Times of the day available</h2>
        <div className="flex gap-x-8 mt-4">
          <div className="flex items-center">
            <label>Start Time: </label>
            <Input
              value={startTime}
              type="time"
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label>End Time: </label>
            <Input
              value={endTime}
              type="time"
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-start">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}

export default Availability;
