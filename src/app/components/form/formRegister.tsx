import { Button, Checkbox, Form, Input } from "antd";

export function FormRegister() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Form name="register-form" onFinish={onFinish}>
      <Form.Item
        name={"company"}
        rules={[{ required: true, message: "Insira de sua Empresa" }]}
      >
        <Input placeholder="Insira de sua Empresa" />
      </Form.Item>
      <Form.Item
        name={"UserName"}
        rules={[{ required: true, message: "Insira seu nome" }]}
      >
        <Input placeholder="Insira seu nome" />
      </Form.Item>
      <Form.Item
        name={"email"}
        rules={[{ required: true, message: "Insira seu e-mail" }]}
      >
        <Input type="email" placeholder="Insira seu e-mail" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "Insira sua senha" }]}
      >
        <Input type="password" placeholder="Insira sua senha" />
      </Form.Item>
      <Form.Item
        name={"confirmPassword"}
        rules={[{ required: true, message: "Confirme sua senha" }]}
      >
        <Input type="password" placeholder="Confirme sua senha" />
      </Form.Item>
    </Form>
  );
}
