"use client";
import { useStore } from "@/zustandStore";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useState } from "react";
import { AvatarHead } from "./avatar/avatar";
import "./headCalendar.css";
import { ModalReservationDay } from "./modal/modalReservationDay";

export default function HeadCalendar() {
  const { currentAmbient } = useStore();
  const [open, setOpen] = useState(false);
  const thereIsCurrentDate = !Object.keys(currentAmbient).length;
  const titleUpperCase = currentAmbient.title?.toLocaleUpperCase();
  const { Title, Text } = Typography;

  return (
    <div className="containerHead">
      <div>
        <Title level={4} disabled={!currentAmbient.title}>
          AGENDA DO AMBIENTE{" "}
          {!thereIsCurrentDate && (
            <Text className="titleAmbient"> {"- " + titleUpperCase}</Text>
          )}
        </Title>
        <Button
          disabled={thereIsCurrentDate}
          onClick={() => setOpen(true)}
          type="primary"
          ghost
          icon={<PlusOutlined />}
          className="buttonNewSchedules"
        >
          Novo Evento
        </Button>
        <ModalReservationDay open={open} setOpen={setOpen} />
      </div>
      <div className="containerAvatar">
        <AvatarHead />
      </div>
    </div>
  );
}
