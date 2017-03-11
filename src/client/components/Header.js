import React from 'react';
import { Link } from 'react-router';

const IndexPage = () => (
    <header className="header">
        <a className="logo">
            INDIE JOBS
        </a>
        <Link to="/login" className="button vibrant" >Entrar</Link>
    </header>
);

export default IndexPage;
