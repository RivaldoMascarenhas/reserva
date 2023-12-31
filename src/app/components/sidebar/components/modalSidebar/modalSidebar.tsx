import { FieldType } from "@/@types/types";
import { api } from "@/_lib/axios";
import { useStore } from "@/zustandStore";
import { Button, Form, Input, Modal, Space, message } from "antd";
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
  const onFinish = async (values: FieldType) => {
    setLoading(true);
    if (!values) {
      return;
    }
    try {
      const { data } = await api.post("/api/ambients", {
        title: values.title,
      });
      setUpdateAmbients(data);
      message.success("Ambiente criado com sucesso!", 1);
    } catch (error: any) {
      console.error(error);
      message.error(error.response.data);
    }

    setLoading(false);
    onOk();
    onReset();
  };
  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo);
  };

  return (
    <Modal
      open={open}
      title="Novo Ambiente"
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
          name="title"
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
