import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
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
        <FaGithub size={20} />
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
