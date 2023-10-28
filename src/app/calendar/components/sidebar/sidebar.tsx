"use client";
import Title from "@/app/(auth)/components/title/title";
import { ItemSidebar } from "./components/itemSidebar";
import { ModalSidebar } from "./components/modalSidebar/modalSidebar";
import "./sidebar.css";

export function Sidebar() {
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
      </ul>
      <ModalSidebar />
    </div>
  );
}
