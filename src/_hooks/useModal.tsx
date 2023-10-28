import { Form } from "antd";
import { useState } from "react";
import { FieldType } from "../@types/types";

export function useModal() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

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

  return {
    handleCancel,
    handleOk,
    showModal,
    onFinishFailed,
    onFinish,
    loading,
    open,
    form,
  };
}
