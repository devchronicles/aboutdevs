import * as React from "react";
import { DeveloperSearchProfile } from "../typings/commonTypes";
import { SearchProfileCard } from "./SearchProfileCard";

interface ProfileListProps {
    profiles: DeveloperSearchProfile[];
}

export const ProfileList: React.SFC<ProfileListProps> = ({profiles}) => (
    <div className="profile-list">
        {profiles && profiles.map((p, i) => <SearchProfileCard key={i} profile={p}/>)}
    </div>
);
