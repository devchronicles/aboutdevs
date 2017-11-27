import * as React from "react";
import * as commonTypes from "../../common/typings";

interface SearchProfileCardProps {
    profile: commonTypes.UserSearchProfile;
}

const ProfileCard: React.SFC<SearchProfileCardProps> = ({ profile }) => (
    <li className="profile-card">
        <div className="star-wrapper">
            <i className="fa fa-star-o" />
        </div>
        <div className="distance-wrapper">
            {Math.floor(profile.distance)} km
        </div>
        <a className="card-body" href="#">
            <div className="image" style={{ backgroundImage: `url(${profile.photoUrl})` }} />
            <p className="display-name"> {profile.displayName} </p>
            <p className="profession"> {profile.profession} </p>
            <p className="bio"> {profile.services.map((s) => s.service).join("; ")} </p>
        </a>
        <div className="card-footer">
            <span className="recomendations">
                <span className="recomendation-count">
                    <span className="number">4</span>
                    <i className="fa fa-star" aria-hidden="true" />
                </span>
                <span className="recomendation-count">
                    <span className="number">3</span>
                    <i className="fa fa-comment" aria-hidden="true" />
                </span>
            </span>
            <button>
                Conectar
            </button>
        </div>
    </li>
);

export { ProfileCard };
