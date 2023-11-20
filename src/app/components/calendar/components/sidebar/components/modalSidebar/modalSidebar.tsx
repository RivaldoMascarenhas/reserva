import { FieldType } from "@/@types/types";
import { useModal } from "@/_hooks/useModal";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  TimePicker,
} from "antd";

export function ModalSidebar() {
  const {
    handleCancel,
    handleOk,
    open,
    showModal,
    onFinish,
    onFinishFailed,
    loading,
    form,
  } = useModal();

  return (
    <>
      <Button type="primary" onClick={showModal} ghost icon={<PlusOutlined />}>
        NOVO AMBIENTE
      </Button>
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
            <DatePicker placeholder="Escolha uma data" />
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
