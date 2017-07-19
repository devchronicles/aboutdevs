import * as React from 'react';
import { SocialButton } from '../components/SocialButton';
import { Logo } from '../components/Logo';


const LoginPage = () => (
    <div className="login-page-wrapper">
        <div className="login-card">
            <div className="title">
                <Logo />
            </div>
            <div className="body">
                <SocialButton text="Entrar com o Google" url="/auth/google" faClass="google" />
                <SocialButton text="Entrar com o Facebook" url="#" faClass="facebook" />
                <SocialButton text="Entrar com o LinkedIn" url="#" faClass="linkedin" />
            </div>
        </div>
    </div>
);

export { LoginPage };
