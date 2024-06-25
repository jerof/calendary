"use client";
import React, { useEffect, useState } from "react";
import EventForm from "./_components/EventForm";
import PreviewEvent from "./_components/PreviewEvent";

function CreateEvent() {
  const [formValues, setFormValues] = useState();

  /* useEffect(() => {
    console.log("Form Values: ", formValues);
  }, [formValues]); */

  return (
    <div className="flex">
      <div className="h-screen w-1/3 border-r p-6">
        <EventForm setFormValues={setFormValues} className="w-1/3" />
      </div>
      <div className="w-2/3">
        <PreviewEvent formValues={formValues} />
      </div>
    </div>
  );
}

export default CreateEvent;
