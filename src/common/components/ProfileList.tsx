import * as React from 'react';
import { UserSearchProfile } from "../typings/commonTypes";
import { ProfileCard } from "./SearchProfileCard";

interface ProfileListProps {
    profiles: UserSearchProfile[];
}

export const ProfileList: React.SFC<ProfileListProps> = ({profiles}) => (
    <div className="profile-list">
        {profiles && profiles.map((p, i) => <ProfileCard key={i} profile={p}/>)}
    </div>
)