import Title from "@/app/components/title/title";
import { Card } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Image from "next/image";
import imgRegister from "public/imgRegister.svg";
import { FormRegister } from "./components/formRegister";
import "./style.css";

export default function Register() {
  return (
    <div className="ContainerRegister">
      <div>
        <Title />
        <Paragraph strong>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
          provident iusto reprehenderit a consequuntur ut. Qui consectetur
          delectus nam enim magni officiis accusantium a dolore atque? Eos
          dolore doloribus nesciunt.
        </Paragraph>
        <Paragraph color="#616161">
          Sagittis, elementum pharetra, pharetra posuere pellentesque aliquet.
          Ipsum vitae at non, tempor feugiat.
        </Paragraph>
        <Image src={imgRegister} width={720} height={430} alt="" />
      </div>
      <Card style={{ width: "30rem", border: "none", marginTop: "5rem" }}>
        <FormRegister />
      </Card>
    </div>
  );
}
