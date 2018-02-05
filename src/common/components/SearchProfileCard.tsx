import * as React from "react";
import * as commonTypes from "../../common/typings";
import { getDataFromFormattedAddress } from "../helpers/locationFormatHelper";
import { getUserProfileUrl } from "../../server/helpers/routeHelper";

interface SearchProfileCardProps {
    profile: commonTypes.DeveloperSearchProfile;
}

export const SearchProfileCard: React.SFC<SearchProfileCardProps> = ({profile}) => {
    const {address} = getDataFromFormattedAddress(profile.formattedAddress);

    const companyName = profile.companyName ? `at ${profile.companyName}` : "";
    return (
        <li className="profile-card">
            <a className="card-body" href={getUserProfileUrl(profile.name)}>
                <div className="image" style={{backgroundImage: `url(${profile.photoUrl})`}}/>
                <p className="display-name"> {profile.displayName} </p>
                <p className="title"> {profile.title} {companyName}</p>
                <p className="location"><i className="fa fa-map-marker" aria-hidden="true"/>{address}</p>
            </a>
        </li>
    );
};
