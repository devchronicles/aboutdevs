import * as React from "react";
import { SocialButton } from "../components/SocialButton";
import { Logo } from "../components/Logo";

const LoginPage = () => (
    <div className="login-page-wrapper">
        <div className="login-card">
            <div className="title">
                <Logo />
            </div>
            <div className="body">
                <SocialButton text="Sign in with LinkedIn" url="/auth/linkedin" faClass="linkedin"/>
            </div>
        </div>
    </div>
);

export { LoginPage };
