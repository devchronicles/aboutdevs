import * as React from "react";
import { DeveloperSearchProfile } from "../typings/commonTypes";
import { SearchProfileCard } from "./SearchProfileCard";
import { SearchBlankSlate } from "./SearchBlankSlate";

interface ProfileListProps {
    profiles: DeveloperSearchProfile[];
}

export const ProfileList: React.SFC<ProfileListProps> = ({profiles}) => {

    let content: React.ReactNode;
    if (profiles && profiles.length) {
        content = profiles.map((p, i) => <SearchProfileCard key={i} profile={p}/>);
    } else {
        content = <SearchBlankSlate/>;
    }

    return (
        <div className="profile-list">
            {content}
        </div>
    );
}

