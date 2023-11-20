"use client";
import { Button, Typography } from "antd";
import { useSession } from "next-auth/react";
import { AvatarHead } from "./components/avatar/avatar";
import { ModalReservationDay } from "./components/modal/modalReservasionDay";
import "./headCalendar.css";

export function HeadCalendar() {
  const { data } = useSession();
  console.log(data);

  const date = new Date().toLocaleDateString("pt-BR", { month: "long" });
  const month = date.charAt(0).toLocaleUpperCase() + date.slice(1);
  const { Title, Text } = Typography;
  return (
    <div className="ContainerHead">
      <div>
        <div>
          <Button type="link">Dashboard</Button> -{" "}
          <Button type="link">Sala Circuito 01</Button> -{" "}
          <Button type="link" className="ButtonMes">
            {month}
          </Button>
        </div>
        <Title level={4}>
          AGENDA DO{" "}
          <Text style={{ color: "blue", fontSize: "1.25rem" }}>PC4</Text>
        </Title>
      </div>
      <div className="ContainerAvatar">
        <AvatarHead />
        <ModalReservationDay />
      </div>
    </div>
  );
}
