"use client";
import Image from "next/image";
import { Card, Typography } from "antd";
import imgLogin from "public/imgLogin.svg";
import "./style.css";
import { Title } from "../title/title";
import { FormLogin } from "../form/formLogin";
import { Footer } from "../footer/footerLogin";
import { useState } from "react";
import { FormRegister } from "../form/formRegister";

export default function Login() {
  const { Text, Paragraph } = Typography;
  const [register, setRegister] = useState(false);

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
        <FormLogin setRegister={setRegister} />
      </Card>
      <FormRegister />
    </div>
  );
}
