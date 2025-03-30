"use client";
import * as React from "react";
import { format, addDays, eachDayOfInterval } from "date-fns";
import { Calendar as ShadCalendar } from "@/components/ui/calendar";

interface CycleCalendarProps {
  onDateSelect: (date: Date) => void;
  initialDate?: Date | null;
}

export default function CycleCalendar({
  onDateSelect,
  initialDate,
}: CycleCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    initialDate ?? undefined
  );

  React.useEffect(() => {
    // Whenever the initialDate prop changes (from the parent), sync it locally
    if (initialDate) {
      setSelectedDate(initialDate);
    }
  }, [initialDate]);

  // When the user clicks on a date in the calendar
  const handleDateChange = (date?: Date) => {
    if (date) {
      setSelectedDate(date);
      onDateSelect(date); // Notifies the parent component
    }
  };

  // Simple example of phases
  const getCyclePhases = (startDate: Date) => {
    const phases: { menstruation: Date[]; fertile: Date[]; pms: Date[] } = {
      menstruation: [],
      fertile: [],
      pms: [],
    };
    const menstruationStart = startDate;
    const menstruationEnd = addDays(menstruationStart, 4);
    const fertileStart = addDays(menstruationEnd, 3);
    const fertileEnd = addDays(fertileStart, 5);
    const nextMenstruation = addDays(menstruationStart, 28);
    const pmsStart = addDays(nextMenstruation, -10);

    phases.menstruation.push(
      ...eachDayOfInterval({ start: menstruationStart, end: menstruationEnd })
    );
    phases.fertile.push(
      ...eachDayOfInterval({ start: fertileStart, end: fertileEnd })
    );
    phases.pms.push(
      ...eachDayOfInterval({ start: pmsStart, end: nextMenstruation })
    );

    return phases;
  };

  const phases = selectedDate
    ? getCyclePhases(selectedDate)
    : { menstruation: [], fertile: [], pms: [] };

  return (
    <div className="p-4 border rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold text-center">
        Select the first day of your period
      </h2>
      <ShadCalendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateChange}
        className="border rounded-lg"
        classNames={{
          day_selected: "bg-primary text-white",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-gray-400",
        }}
        modifiers={{
          menstruation: phases.menstruation,
          fertile: phases.fertile,
          pms: phases.pms,
        }}
        modifiersClassNames={{
          menstruation: "bg-red-500 text-white",
          fertile: "bg-green-500 text-white",
          pms: "bg-gray-400 text-white",
        }}
      />
      {selectedDate && (
        <p className="mt-2 text-center text-sm">
          First cycle day: <strong>{format(selectedDate, "dd/MM/yyyy")}</strong>
        </p>
      )}
    </div>
  );
}
