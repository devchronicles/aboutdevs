import * as React from 'react';
import * as commonTypes from '../../common/typings';

import { ProfileCard } from './ProfileCard';

interface SearchResultProps {
    profiles: commonTypes.ReduxUserProfile[];
}

const SearchResult: React.SFC<SearchResultProps> = ({ profiles }) => (
    <ul className="search-result">
        {profiles.map((p, i) => <ProfileCard key={i} profile={p} />)}
    </ul>
);

export { SearchResult };
