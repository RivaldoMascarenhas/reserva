"use client";
import Image from "next/image";
import { Card, Typography } from "antd";
import imgLogin from "public/imgLogin.svg";
import imgRegister from "public/imgRegister.svg";
import "./style.css";
import { FormLogin } from "./components/form/formLogin";
import { useState } from "react";
import { FormRegister } from "./components/form/formRegister";
import { Title } from "./components/title/title";

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
        {register === true && (
          <Image src={imgRegister} width={720} height={430} alt="" />
        )}
        {register === false && (
          <Image src={imgLogin} width={720} height={430} alt="" />
        )}
      </div>
      <Card style={{ width: "30rem", border: "none", marginTop: "5rem" }}>
        {register === false && <FormLogin setRegister={setRegister} />}
        {register === true && <FormRegister setRegister={setRegister} />}
      </Card>
    </div>
  );
}
