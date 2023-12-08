"use client";
import { FieldType } from "@/@types/types";
import { useModal } from "@/_hooks/useModal";
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
import dayjs from "dayjs";
import { useMemo } from "react";

export function ModalReservationDay() {
  const { currentDate, openModal, setCloseModal } = useStore();
  const { onFinish, onFinishFailed, loading, form, onReset } = useModal();
  const now = useMemo(() => dayjs(currentDate), [currentDate]);

  const handleOk = () => {
    setCloseModal();
  };

  const handleCancel = () => {
    setCloseModal();

    onReset();
  };
  console.log(currentDate);
  return (
    <>
      <Modal
        destroyOnClose
        open={openModal}
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
            <DatePicker
              defaultValue={now}
              disabledDate={(date) => date.isBefore() && !date.isToday()}
              format="DD/MM/YYYY"
            />
          </Form.Item>
          <Form.Item<FieldType>
            name="time"
            rules={[{ required: true, message: "Coloque um Horário" }]}
          >
            <TimePicker.RangePicker
              minuteStep={5}
              format={"HH:mm"}
              defaultValue={[now, now.hour(+1)]}
            />
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
