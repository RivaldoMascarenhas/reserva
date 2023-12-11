"use client";
import { FieldType } from "@/@types/types";
import { useStore } from "@/zustandStore";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  TimePicker,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

interface ModalReservationDayProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalReservationDay({
  open,
  setOpen,
}: Readonly<ModalReservationDayProps>) {
  const { currentDate } = useStore();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values: FieldType) => {
    setLoading(true);

    console.log("Success:", values);

    setOpen(false);
    setLoading(false);
    onReset();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo.message);
  };

  return (
    <Modal
      destroyOnClose
      open={open}
      title="Nova reserva - Sala Circuito 01"
      onOk={() => setOpen(false)}
      onCancel={() => {
        setOpen(false);
        onReset();
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
          rules={[{ required: true, message: "Coloque um título!" }]}
        >
          <Input placeholder="Título da Reserva" />
        </Form.Item>
        <Form.Item<FieldType>
          name="equipment"
          rules={[
            { required: true, message: "Digite os equipamentos de multimídia" },
          ]}
        >
          <Input
            type="text"
            placeholder="Digite os equipamentos de multimídia"
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="description"
          rules={[{ required: true, message: "Escolha um número!" }]}
        >
          <TextArea rows={4} placeholder="Descrição do evento!" />
        </Form.Item>
        <Form.Item<FieldType>
          name="data"
          rules={[{ required: true, message: "Coloque uma Data" }]}
        >
          <DatePicker
            defaultValue={currentDate}
            disabledDate={(date) => date.isBefore() && !date.isToday()}
            format="DD/MM/YYYY"
          />
        </Form.Item>
        <Form.Item<FieldType>
          initialValue={[currentDate, currentDate.add(1, "hour")]}
          name="time"
          rules={[{ required: true, message: "Coloque um Horário" }]}
        >
          <TimePicker.RangePicker
            minuteStep={5}
            format={"HH:mm"}
            defaultValue={[currentDate, currentDate.add(1, "hour")]}
          />
        </Form.Item>
        <Space>
          <Button key="back" onClick={() => setOpen(false)}>
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
