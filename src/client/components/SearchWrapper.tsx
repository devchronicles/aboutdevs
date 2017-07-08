import * as React from 'react';

interface ISearchWrapper {
    children: React.ReactNode;
}

const SearchWrapper: React.SFC<ISearchWrapper> = ({ children }) => (
    <div className="search-wrapper">
        {children}
    </div>
);

export { SearchWrapper };
