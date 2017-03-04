import React, { PropTypes } from 'react';
import ProfileCard from './ProfileCard';

const SearchResult = ({ profiles }) => (
    <ul className="search-result">
        {profiles.map((p, i) => <ProfileCard key={i} profile={p} />)}
    </ul>
);

SearchResult.propTypes = {
    profiles: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SearchResult;
