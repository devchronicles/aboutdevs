import React from 'react';
import Hero from '../components/Hero';
import SearchResult from '../components/SearchResult';

import { profiles } from '../lib/stubs';

const IndexPage = () => (
    <div className="page-wrapper">
        <Hero />
        <SearchResult profiles={profiles} />
    </div>
);

export default IndexPage;
