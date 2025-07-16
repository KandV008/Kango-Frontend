import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";

interface componentProps {
  currentDate: Date | null;
}

export function InputCalendar({ currentDate }: componentProps) {
  const [date, setDate] = useState<Date | null>(currentDate);

  return (
    <>
      <Input type="hidden" name="dead-line" value={date?.toISOString()} />
      <Calendar
        mode="single"
        selected={date ? date : new Date()}
        onSelect={setDate}
        className="border rounded-md shadow-sm"
        captionLayout="dropdown"
        required
      />
    </>
  );
}
