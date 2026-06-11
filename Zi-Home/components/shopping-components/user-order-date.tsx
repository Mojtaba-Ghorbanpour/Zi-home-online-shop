"use client";

import { useState } from "react";
import moment from "jalali-moment";
import CartTotalPrice from "./cart-total-price";
import { Divider } from "@heroui/react";

const PersianCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(moment());

  const today = moment();
  const endOfMonth = selectedDate.clone().endOf("jMonth");
  const daysInMonth = endOfMonth.jDate();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleSelectDay = (day: number) => {
    const newDate = selectedDate.clone().jDate(day);

    if (newDate.isBefore(today, "day")) return;

    setSelectedDate(newDate);

    localStorage.setItem("selectedDate", newDate.format("jYYYY/jM/jD"));
  };

  return (
    <div className="p-4 shadow-lg shadow-danger-300 rounded-lg w-1/4 space-y-1">
      <div className="flex justify-end items-center mb-2">
        <p className="font-bold">{selectedDate.format("jYYYY/jM/jD")}</p>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysArray.map((day) => {
          const dayDate = selectedDate.clone().jDate(day);
          const isPast = dayDate.isBefore(today, "day");

          return (
            <div
              key={day}
              onClick={() => !isPast && handleSelectDay(day)}
              className={`cursor-pointer p-2 text-center rounded-md ${
                isPast
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : selectedDate.jDate() === day
                  ? "bg-danger-500 text-white"
                  : "hover:bg-blue-100"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
      <Divider orientation="horizontal" />
      <div>
        <CartTotalPrice />
      </div>
    </div>
  );
};

export default PersianCalendar;
