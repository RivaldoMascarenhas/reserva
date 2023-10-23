"use client";
import { Button, Typography } from "antd";

export function HeadCalendar() {
  const date = new Date().toLocaleDateString("pt-BR", { month: "long" });
  const month = date.charAt(0).toLocaleUpperCase() + date.slice(1);
  const { Title, Text } = Typography;
  return (
    <div>
      <div>
        <p>
          <Button type="link">Dashboard</Button> -{" "}
          <Button type="link">Sala Circuito 01</Button> -{" "}
          <Button type="link" className="ButtonMes">
            {month}
          </Button>
        </p>
        <Title level={4}>
          AGENDA DO{" "}
          <Text style={{ color: "blue", fontSize: "1.25rem" }}>PC4</Text>
        </Title>
      </div>
      <div></div>
    </div>
  );
}
