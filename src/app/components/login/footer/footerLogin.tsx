"use client";
import {
  FacebookFilled,
  GithubOutlined,
  WindowsFilled,
} from "@ant-design/icons";
import "./footer.css";

export function Footer() {
  return (
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
  );
}
