"use client";
import { useRouter } from "next/navigation";
import "./style.css";

export default function Title() {
  const { push } = useRouter();
  return (
    <>
      <p className="title" onClick={() => push("/")}>
        reserva<span>.me</span>
      </p>
    </>
  );
}
