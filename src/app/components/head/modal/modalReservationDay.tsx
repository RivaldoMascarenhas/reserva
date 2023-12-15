"use client";
import { FieldType, Schedules } from "@/@types/types";
import { api } from "@/_lib/axios";
import { useStore } from "@/zustandStore";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  TimePicker,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

interface ModalReservationDayProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalReservationDay({
  open,
  setOpen,
}: Readonly<ModalReservationDayProps>) {
  const { currentDate, currentAmbient, setNewSchedule } = useStore();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const titleNewScheduleModal = `Nova reserva - ${currentAmbient?.title?.toUpperCase()}`;
  const thereIsCurrentDate = Object.keys(currentAmbient).length;

  const disableCalendar = (date: Dayjs): boolean => {
    if (!thereIsCurrentDate) {
      return true;
    } else {
      return dayjs().isAfter(date) && !date.isToday();
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values: FieldType) => {
    setLoading(true);
    try {
      const newSchedule = await api.post<Schedules>("api/schedules", {
        title: values.title,
        equipment: values.equipment,
        description: values.description,
        dateEvent: values.dateEvent,
        dateMinutesStart: values.time[0],
        dateMinutesEnd: values.time[1],
        ambientsId: currentAmbient?.id,
      });
      setNewSchedule(newSchedule.data);
      message.success("Evento criado com sucesso!", 1);
    } catch (error: any) {
      console.error(error);
      message.error(
        error.error.message(
          "Falha ao criar Ambiente, por favor tentar novamente!"
        )
      );
    }
    setLoading(false);
    setOpen(false);
    onReset();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo.message);
  };

  return (
    <Modal
      destroyOnClose
      open={open}
      title={titleNewScheduleModal}
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
          name="title"
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
          rules={[
            {
              required: true,
              message: "Escreva uma breve descrição do evento!",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Descrição do evento!" />
        </Form.Item>
        <Form.Item<FieldType>
          initialValue={dayjs()}
          name="dateEvent"
          rules={[{ required: true, message: "Coloque uma data!" }]}
        >
          <DatePicker format={"DD/MM/YYYY"} disabledDate={disableCalendar} />
        </Form.Item>
        <Form.Item<FieldType>
          initialValue={[currentDate, currentDate.add(1, "hour")]}
          name="time"
          rules={[{ required: true, message: "Coloque um Horário" }]}
        >
          <TimePicker.RangePicker minuteStep={5} format={"HH:mm"} />
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
          >
            Submit
          </Button>
        </Space>
      </Form>
    </Modal>
  );
}
