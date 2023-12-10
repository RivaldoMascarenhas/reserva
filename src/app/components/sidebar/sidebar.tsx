"use client";
import { api } from "@/_lib/axios";
import Title from "@/app/components/title/title";
import { useStore } from "@/zustandStore";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { ItemSidebar } from "./components/itemSidebar";
import { ModalSidebar } from "./components/modalSidebar/modalSidebar";
import "./sidebar.css";

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const { ambients, setAmbients } = useStore();

  useEffect(() => {
    api.get("api/ambients").then((res) => setAmbients(res.data));
  }, [setAmbients]);

  return (
    <div className="containerSidebar">
      <Title />
      <nav>
        <ul className="listItemsSidebar">
          {ambients.map((item) => (
            <ItemSidebar key={item.id} name={item.title} />
          ))}
        </ul>
      </nav>
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
