"use client";
import { useStore } from "@/zustandStore";
import type { CalendarProps } from "antd";
import { Calendar } from "antd";
import { PickerLocale } from "antd/es/date-picker/generatePicker";
import locale from "antd/locale/pt_BR";
import dayjs, { Dayjs } from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { useState } from "react";
import { ModalReservationDay } from "./modal/modalReservationDay";

dayjs.extend(isToday);

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export function App() {
  const [open, setOpen] = useState(false);
  const { setCurrentDate, currentAmbient } = useStore();

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num} </section>
        <span>Backlog number </span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = currentAmbient.schedules?.filter(
      (i) => dayjs(i.dateEvent).date() === value.date()
    );
    return (
      <ul className="events">
        {listData?.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <Calendar
        cellRender={cellRender}
        locale={locale.Calendar as PickerLocale}
        onSelect={(date, { source }) => {
          if (source !== "date") {
            return;
          }
          setCurrentDate(date);
          setOpen(true);
        }}
        disabledDate={(date) => {
          if (!Object.keys(currentAmbient).length) {
            return true;
          } else {
            return dayjs().isAfter(date) && !date.isToday();
          }
        }}
      />
      <ModalReservationDay open={open} setOpen={setOpen} />
    </>
  );
}
