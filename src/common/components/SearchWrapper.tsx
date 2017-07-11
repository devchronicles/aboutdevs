import * as React from 'react';

interface SearchWrapper {
    children: React.ReactNode;
}

const SearchWrapper: React.SFC<SearchWrapper> = ({ children }) => (
    <div className="search-wrapper">
        {children}
    </div>
);

export { SearchWrapper };
