import React from 'react';
import SocialButton from '../components/SocialButton';


const Login = () => (
    <div className="login-page-wrapper">
        <div className="login-card">
            <div className="title">
                Entrar no IndieJobs
            </div>
            <div className="body">
                <SocialButton text="Entrar com o Google" url="/auth/google" faClass="google" />
                <SocialButton text="Entrar com o Facebook" url="#" faClass="facebook" />
                <SocialButton text="Entrar com o LinkedIn" url="#" faClass="linkedin" />
            </div>
        </div>
    </div>
);

export default Login;
