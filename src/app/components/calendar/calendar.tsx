"use client";
import { useStore } from "@/zustandStore";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import dayjs, { Dayjs } from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { useState } from "react";
import { ModalReservationDay } from "./modal/modalReservationDay";

dayjs.extend(isToday);

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
          day: value.date(),
        },
        { type: "success", content: "This is usual event.", day: value.date() },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event......" },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};

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
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
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
        onSelect={(date, { source }) => {
          if (source !== "date") {
            return;
          }
          setCurrentDate(date);
          setOpen(true);
        }}
        disabledDate={(date) => {
          if (!currentAmbient) {
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
