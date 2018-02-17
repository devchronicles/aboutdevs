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

    const tags = (profile.tags && profile.tags.length > 4) ? profile.tags.slice(0, 4) : profile.tags;
    const otherTags = (profile.tags && profile.tags.length > 4) ? profile.tags.length - 4 : 0;

    return (
        <li className="profile-card">
            <a className="card-body" href={getUserProfileUrl(profile.name)}>
                <div className="image" style={{backgroundImage: `url(${profile.photoUrl})`}}/>
                <p className="display-name"> {profile.displayName} </p>
                <p className="title"> {profile.title} {companyName}</p>
                <p className="location"><i className="fa fa-map-marker" aria-hidden="true"/>{address}</p>
                <div className="tags">
                    {tags.map((text: string, i: number) => <span className="tag" key={`tags-${i}`}>{text}</span>)}
                    {(otherTags > 0) && <span className="tag more" key={`tags-other`}>{`${otherTags} more...`}</span>}
                </div>
            </a>
        </li>
    );
};
