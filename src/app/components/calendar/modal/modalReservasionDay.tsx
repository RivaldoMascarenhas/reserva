"use client";
import { FieldType } from "@/@types/types";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  TimePicker,
} from "antd";
import { useState } from "react";

export function ModalReservationDay() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    onReset();
  };

  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values: FieldType) => {
    if (values.Guests === undefined) {
    } else {
      console.log("Success:", values);
      setLoading(true);
      setTimeout(() => {
        handleOk();
        onReset();
      }, 500);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo.message);
  };

  return (
    <>
      <Modal
        open={open}
        title="Nova reserva - Sala Circuito 01"
        onOk={handleOk}
        onCancel={handleCancel}
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
            rules={[{ required: true, message: "Coloque um título!" }]}
          >
            <Input placeholder="Título da Reserva" />
          </Form.Item>
          <Form.Item<FieldType>
            name="Guests"
            rules={[{ required: true, message: "Escolha um número!" }]}
          >
            <Input
              type="number"
              placeholder="Quantos convidados?"
              min={1}
              max={25}
            />
          </Form.Item>
          <Form.Item<FieldType>
            name="data"
            rules={[{ required: true, message: "Coloque uma Data" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item<FieldType>
            name="time"
            rules={[{ required: true, message: "Coloque um Horário" }]}
          >
            <TimePicker />
          </Form.Item>
          <Space>
            <Button key="back" onClick={handleCancel}>
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
    </>
  );
}
