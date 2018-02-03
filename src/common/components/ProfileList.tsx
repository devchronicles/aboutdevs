import * as React from "react";
import { SearchState } from "../typings/commonTypes";
import { SearchProfileCard } from "./SearchProfileCard";
import { SearchBlankSlate } from "./SearchBlankSlate";
import { SearchLoading } from "./SearchLoading";

interface ProfileListProps {
    searchState: SearchState;
}

export const ProfileList: React.SFC<ProfileListProps> = ({searchState}) => {
    if (!searchState) return null;
    const {loading, profiles} = searchState;
    let content: React.ReactNode;
    if (loading) {
        content = <SearchLoading/>;
    } else if (profiles && profiles.length) {
        content = profiles.map((p, i) => <SearchProfileCard key={i} profile={p}/>);
    } else {
        content = <SearchBlankSlate/>;
    }

    return (
        <div className="profile-list">
            {content}
        </div>
    );
};
