"use client";
import React, { useEffect, useState } from "react";
import {
  Clock,
  Copy,
  CopyCheck,
  MapPin,
  Pen,
  Settings,
  Trash2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/firebase";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

function EventDetailsCard({ eventsList, deleteEventInDb }) {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [businessInfo, setBusinessInfo] = useState();

  useEffect(() => {
    user && getBusinessInfoFromDb();
  }, [user]);

  const getBusinessInfoFromDb = async () => {
    const docRef = doc(db, "Business", user?.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setBusinessInfo(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const copyToClipboard = (event) => {
    const link = `${process.env.NEXT_PUBLIC_BASE_URL}/${businessInfo.businessName}/${event?.id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast({
          description: "Event Link copied!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      {eventsList.length > 0
        ? eventsList.map((event, index) => (
            <div
              className="rounded-md border-t-8 border-blue-300 shadow-md p-4"
              style={{ borderTopColor: `${event?.themeColor}` }}
            >
              <div className="flex flex-col">
                <div className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Settings className="text-muted-foreground" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Pen className="w-4 h-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteEventInDb(event)}
                        className="hover:cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h2 className="text-lg font-semibold">{event?.eventName}</h2>
                <div className="flex justify-between my-4">
                  <p className="flex gap-x-1 text-sm items-center text-muted-foreground">
                    <Clock /> {event?.duration} min
                  </p>
                  <p className="flex gap-x-1 text-sm items-center text-muted-foreground">
                    <MapPin /> {event?.locationType}
                  </p>
                </div>
                <Separator />
                <div className="flex justify-between mt-4 items-center">
                  <p
                    className="flex gap-x-1 text-sm items-center text-blue-600 hover:cursor-pointer"
                    onClick={() => copyToClipboard(event)}
                  >
                    <Copy /> Copy link
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full text-blue-600 border-blue-600 hover:text-blue-600/80"
                  >
                    Share
                  </Button>
                </div>
              </div>
            </div>
          ))
        : "Loading..."}
    </>
  );
}

export default EventDetailsCard;
