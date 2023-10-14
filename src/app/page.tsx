"use client";
import { Card, Row, Typography } from "antd";
import { FormLogin } from "./components/login/formLogin";
import "./page.css";
import {
  FacebookFilled,
  GithubOutlined,
  WindowsFilled,
} from "@ant-design/icons";

export default function Home() {
  const { Text } = Typography;

  return (
    <Row className="container">
      <div>
        <Text></Text>
      </div>
      <Card className="card">
        <Text className="title"> Faça login na plataforma </Text>
        <FormLogin />
        <div className="footerLogin">
          <div className="rowContainer">
            <div className="row"></div>
            <div>ou</div>
            <div className="row"></div>
          </div>
          <div className=" iconsFooter">
            <FacebookFilled className="icon" />
            <GithubOutlined className="icon" />
            <WindowsFilled className="icon" />
          </div>
        </div>
      </Card>
    </Row>
  );
}
