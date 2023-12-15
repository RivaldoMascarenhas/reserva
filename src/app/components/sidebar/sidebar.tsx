"use client";
import { Ambient } from "@/@types/types";
import { api } from "@/_lib/axios";
import { useStore } from "@/zustandStore";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Typography, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import Title from "../title/title";
import { ItemSidebar } from "./components/itemSidebar";
import { ModalSidebar } from "./components/modalSidebar/modalSidebar";
import "./sidebar.css";

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { ambients, setAmbients, setCurrentAmbient } = useStore();
  const T = Typography;

  const loadingAmbients = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get<Ambient[]>("api/ambients");
      setAmbients(data);
      data.length === 0
        ? message.warning("Crie novos Ambients!!", 2)
        : message.success("Ambientes carregados com sucesso!", 1);
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
      {loading === true && (
        <T.Text strong color="#ccc">
          ...carregando
        </T.Text>
      )}
      {ambients.length === 0 && loading === false && (
        <T.Text strong color="#ccc">
          Crie um novo Ambiente
        </T.Text>
      )}
      {ambients.length > 0 && (
        <nav>
          <ul className="listItemsSidebar">
            {ambients.map((item) => (
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
