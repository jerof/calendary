"use client";
import React, { useEffect, useState } from "react";
import EventForm from "./_components/EventForm";

function CreateEvent() {
  const [formValues, setFormValues] = useState();

  /* useEffect(() => {
    console.log("Form Values: ", formValues);
  }, [formValues]); */

  return (
    <div className="flex">
      <EventForm setFormValues={setFormValues} />
    </div>
  );
}

export default CreateEvent;
