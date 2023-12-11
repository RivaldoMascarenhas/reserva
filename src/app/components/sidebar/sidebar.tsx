"use client";
import { api } from "@/_lib/axios";
import Title from "@/app/components/title/title";
import { useStore } from "@/zustandStore";
import { PlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { ItemSidebar } from "./components/itemSidebar";
import { ModalSidebar } from "./components/modalSidebar/modalSidebar";
import "./sidebar.css";

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { ambients, setAmbients, setCurrentAmbient } = useStore();

  const loadingAmbients = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("api/ambients");
      setAmbients(data);
    } catch (error) {
      message.error("Erro ao buscar os ambientes");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setAmbients]);

  useEffect(() => {
    loadingAmbients();
  }, [loadingAmbients]);

  return (
    <div className="containerSidebar">
      <Title />
      {loading === true && <p>...carregando</p>}
      {loading === false && (
        <nav>
          <ul className="listItemsSidebar">
            {ambients?.map((item) => (
              <ItemSidebar
                key={item.id}
                name={item.title}
                onClick={() => setCurrentAmbient(item)}
              />
            ))}
          </ul>
        </nav>
      )}

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
