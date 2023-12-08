"use client";
import Title from "@/app/components/title/title";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { ItemSidebar } from "./components/itemSidebar";
import { ModalSidebar } from "./components/modalSidebar/modalSidebar";
import "./sidebar.css";

export function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="containerSidebar">
      <Title />
      <ul className="listItemsSidebar">
        <ItemSidebar name="Cabine Elétron 01" />
        <ItemSidebar name="Cabine Elétron 02" />
        <ItemSidebar name="Cabine Elétron 03" />
        <ItemSidebar name="Cabine Volt 01" />
        <ItemSidebar name="Cabine Volt 02" />
        <ItemSidebar name="Cabine Volt 03" />
        <ItemSidebar name="Sala Circuito 01" />
        <ItemSidebar name="Sala Circuito 02" />
        <ItemSidebar name="Sala Circuito 03" />
        <ItemSidebar name="Cabine Volt 02" />
        <ItemSidebar name="Cabine Volt 03" />
        <ItemSidebar name="Sala Circuito 01" />
        <ItemSidebar name="Sala Circuito 02" />
        <ItemSidebar name="Sala Circuito 03" />
        <ItemSidebar name="Cabine Volt 03" />
        <ItemSidebar name="Sala Circuito 01" />
        <ItemSidebar name="Sala Circuito 02" />
        <ItemSidebar name="Sala Circuito 03" />
      </ul>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        ghost
        icon={<PlusOutlined />}
      >
        NOVO AMBIENTE
      </Button>
      <ModalSidebar
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}
