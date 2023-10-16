"use client";
import { Card, Typography } from "antd";
import { FormLogin } from "./components/login/formLogin";
import "./page.css";
import {
  FacebookFilled,
  GithubOutlined,
  WindowsFilled,
} from "@ant-design/icons";

export default function Home() {
  const { Text, Paragraph, Title } = Typography;

  return (
    <div className="container">
      <div>
        <Title>RESERVA.ME</Title>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
          provident iusto reprehenderit a consequuntur ut. Qui consectetur
          delectus nam enim magni officiis accusantium a dolore atque? Eos
          dolore doloribus nesciunt.
        </Paragraph>
        <Text>
          Sagittis, elementum pharetra, pharetra posuere pellentesque aliquet.
          Ipsum vitae at non, tempor feugiat.
        </Text>
      </div>
      <Card style={{ width: "30rem" }}>
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
    </div>
  );
}
