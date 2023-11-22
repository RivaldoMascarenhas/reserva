import {
  FacebookFilled,
  GoogleOutlined,
  WindowsFilled,
} from "@ant-design/icons";
import { signIn } from "next-auth/react";
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
        <GoogleOutlined
          onClick={() =>
            signIn("google", { callbackUrl: "/", redirect: false })
          }
          className="icon"
        />
        <WindowsFilled className="icon" />
      </div>
    </div>
  );
}
