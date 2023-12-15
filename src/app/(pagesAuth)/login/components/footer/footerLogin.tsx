import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import "./footer.css";

export function Footer() {
  return (
    <div className="footerLogin">
      <div className="rowContainer">
        <div className="row" />
        <div>ou</div>
        <div className="row" />
      </div>
      <div className=" iconsFooter">
        <FcGoogle
          onClick={() =>
            signIn("google", { callbackUrl: "/", redirect: false })
          }
          size={20}
        />
      </div>
    </div>
  );
}
