"use client";
import { Card, Typography } from "antd";
import { Title } from "../components/title/title";
import FormLogin from "./components/form/formLogin";
import imgLogin from "public/imgLogin.svg";
import Image from "next/image";
import "../styles.css";

export function Login() {
  const { Text, Paragraph } = Typography;

  return (
    <div className="container">
      <div className="textContainerLogin">
        <Title />
        <Paragraph style={{ fontWeight: "bold" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
          provident iusto reprehenderit a consequuntur ut. Qui consectetur
          delectus nam enim magni officiis accusantium a dolore atque? Eos
          dolore doloribus nesciunt.
        </Paragraph>
        <Text style={{ color: "#616161", marginBottom: "3rem" }}>
          Sagittis, elementum pharetra, pharetra posuere pellentesque aliquet.
          Ipsum vitae at non, tempor feugiat.
        </Text>
        <Image src={imgLogin} width={720} height={430} alt="" />
      </div>
      <Card style={{ width: "30rem", border: "none", marginTop: "5rem" }}>
        <FormLogin />
      </Card>
    </div>
  );
}
