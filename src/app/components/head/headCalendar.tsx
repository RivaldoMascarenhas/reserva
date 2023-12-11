"use client";
import { useStore } from "@/zustandStore";
import { Typography } from "antd";
import { AvatarHead } from "./avatar/avatar";
import "./headCalendar.css";

export default function HeadCalendar() {
  const { currentAmbient } = useStore();
  const { Title, Text } = Typography;
  return (
    <div className="ContainerHead">
      <div>
        <Title level={4} disabled={!currentAmbient}>
          AGENDA DO AMBIENTE{" "}
          {currentAmbient && (
            <Text style={{ color: "blue", fontSize: "1.25rem" }}>
              {"- " + currentAmbient.title.toLocaleUpperCase()}
            </Text>
          )}
        </Title>
      </div>
      <div className="ContainerAvatar">
        <AvatarHead />
      </div>
    </div>
  );
}
