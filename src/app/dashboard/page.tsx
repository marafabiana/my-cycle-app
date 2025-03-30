"use client";
import React, { useState, useEffect } from "react";
import CycleCalendar from "@/components/CycleCalendar";
import CycleStatus from "@/components/CycleStatus";

export default function Dashboard() {
  // State that holds the cycle date (last menstruation)
  const [lastPeriod, setLastPeriod] = useState<Date | null>(null);

  // On load, you could fetch from your /api/cycle endpoint,
  // get the date from the database, and do:
  // setLastPeriod(new Date(data.lastPeriod))
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/cycle");
      if (!res.ok) return;
      const data = await res.json();
      if (data.lastPeriod) {
        setLastPeriod(new Date(data.lastPeriod));
      }
    })();
  }, []);

  // Function called when the user selects a date on the calendar
  const handleDateSelect = async (date: Date) => {
    // Updates the state locally
    setLastPeriod(date);

    // Sends to the backend (if you want to save automatically)
    const response = await fetch("/api/cycle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lastPeriod: date }),
    });
    if (!response.ok) {
      console.error("Error saving cycle");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">My Cycle</h1>

      {/*
  We pass the date to the calendar as initialDate,
  and the function that updates the state when the user clicks on a new date
*/}

      <CycleCalendar initialDate={lastPeriod} onDateSelect={handleDateSelect} />

      {/*
  We pass the SAME date (lastPeriod) to CycleStatus.
  It recalculates the cycle phase on every change.
*/}
      <CycleStatus lastPeriod={lastPeriod} />
    </div>
  );
}
