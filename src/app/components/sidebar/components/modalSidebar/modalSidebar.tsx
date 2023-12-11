import { FieldType } from "@/@types/types";
import { api } from "@/_lib/axios";
import { useStore } from "@/zustandStore";
import { Button, Form, Input, Modal, Space } from "antd";
import { useState } from "react";

interface ModalSidebarProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export function ModalSidebar({
  open,
  onCancel,
  onOk,
}: Readonly<ModalSidebarProps>) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { setUpdateAmbients } = useStore();

  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values: FieldType) => {
    setLoading(true);
    if (!values.nameReservation) {
      return;
    }
    api
      .post("/api/ambients", {
        title: values.nameReservation,
      })
      .then((res) => setUpdateAmbients(res.data))
      .catch((error) => console.error(error));

    setLoading(false);
    onOk();
    onReset();
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo.message);
  };

  return (
    <Modal
      open={open}
      title="Nova reserva - Sala Circuito 01"
      onOk={onOk}
      onCancel={() => {
        onReset();
        onCancel();
      }}
      footer
    >
      <Form
        form={form}
        name="modal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<FieldType>
          name="nameReservation"
          rules={[{ required: true, message: "Coloque o nome do ambiente." }]}
        >
          <Input placeholder="Nome do Ambiente" />
        </Form.Item>

        <Space>
          <Button key="back" onClick={onCancel}>
            Return
          </Button>

          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            loading={loading}
            onClick={() => onFinish}
          >
            Submit
          </Button>
        </Space>
      </Form>
    </Modal>
  );
}
