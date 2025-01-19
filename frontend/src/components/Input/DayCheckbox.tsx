import React from "react";
import { Checkbox, Typography } from "@material-tailwind/react";
import { Weekday } from "@/types/schedule";

interface DayCheckboxProps {
  day: Weekday;
  selectedDays: Set<string>;
  handleDaySelection: (day: Weekday) => void;
}

export const DayCheckbox: React.FC<DayCheckboxProps> = ({
  day,
  selectedDays,
  handleDaySelection,
}) => {
  return (
    <div className="flex items-center">
      <Checkbox
        id={`checkbox-${day}`} // Unique ID for each checkbox
        checked={selectedDays.has(day)} // Pass checked status
        onChange={() => handleDaySelection(day)} // Handle changes
        ripple={false}
        className="hover:before:opacity-0"
        containerProps={{
          className: "p-0",
        }}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />
      <Typography
        color="blue-gray"
        className="font-medium ml-2"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {day} 
      </Typography>
    </div>
  );
};
