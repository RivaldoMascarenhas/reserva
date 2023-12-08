import { FieldType } from "@/@types/types";
import { Button, Form, Input, Modal, Space, TimePicker } from "antd";
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

  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values: FieldType) => {
    console.log("Success:", values);
    setLoading(true);
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

        <Form.Item<FieldType>
          name="time"
          label="Horário de Funcionamento"
          rules={[{ required: true, message: "Coloque um Horário" }]}
        >
          <TimePicker.RangePicker
            placeholder={["Horário inicial", "Horário final"]}
          />
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
