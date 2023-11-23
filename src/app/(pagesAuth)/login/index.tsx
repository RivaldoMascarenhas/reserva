"use client";
import Title from "@/app/components/title/title";
import { Card, Typography } from "antd";
import Image from "next/image";
import imgLogin from "public/imgLogin.svg";
import FormLogin from "./components/formLogin";
import "./style.css";

export default function Login() {
  const { Text, Paragraph } = Typography;

  return (
    <div className="ContainerLogin">
      <div>
        <Title />
        <Paragraph strong>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
          provident iusto reprehenderit a consequuntur ut. Qui consectetur
          delectus nam enim magni officiis accusantium a dolore atque? Eos
          dolore doloribus nesciunt.
        </Paragraph>
        <Text color="#616161">
          Sagittis, elementum pharetra, pharetra posuere pellentesque aliquet.
          Ipsum vitae at non, tempor feugiat.
        </Text>
        <Image
          src={imgLogin}
          width={720}
          height={430}
          alt=""
          style={{ marginTop: "1rem" }}
        />
      </div>
      <Card style={{ width: "30rem", border: "none", marginTop: "5rem" }}>
        <FormLogin />
      </Card>
    </div>
  );
}
