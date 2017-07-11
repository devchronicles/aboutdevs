import * as React from 'react';
import * as commonTypes from '../../common/typings';

interface ProfileCardProps {
    profile: commonTypes.UserProfile;
}

const ProfileCard: React.SFC<ProfileCardProps> = ({ profile }) => (
    <li className="profile-card">
        <a className="card-body" href="#">
            <div className="image" style={{ backgroundImage: `url(${profile.photoUrl})` }} />
            <p className="display-name"> {profile.displayName} </p>
            <p className="profession"> {profile.profession} </p>
            <p className="bio"> {profile.bio} </p>
            <p className="professional-area">
                <i className="fa fa-briefcase" aria-hidden="true" />
                <span>{profile.profession}</span>
            </p>
        </a>
        <div className="card-footer">
            <span className="recomendations">
                <span className="recomendation-count">
                    <span className="number">97</span>
                    <i className="fa fa-thumbs-up" aria-hidden="true" />
                </span>
            </span>
            <button>
                Conectar
                </button>
        </div>
    </li>
);

export { ProfileCard };
