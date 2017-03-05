import React, { PropTypes } from 'react';

const ProfileCard = ({ profile }) => (
    <li className="profile-card">
        <a className="card-body" href="#">
            <div className="image" style={{ backgroundImage: `url(${profile.profilePicture})` }} />
            <p className="display-name"> {profile.displayName} </p>
            <p className="profession"> {profile.profession} </p>
            <p className="bio"> {profile.bio} </p>
            <p className="professional-area">
                <i className="fa fa-briefcase" aria-hidden="true" />
                <span>{profile.category}</span>
            </p>
        </a>
        <div className="card-footer">
            <span className="recomendations">
                <span className="recomendation-count">
                    <span className="number">{profile.thumbsUp}</span>
                    <i className="fa fa-thumbs-up" aria-hidden="true" />
                </span>
                <span className="recomendation-count">
                    <span className="number">{profile.thumbsDown}</span>
                    <i className="fa fa-thumbs-down" aria-hidden="true" />
                </span>
            </span>
            <button>
                Conectar
                </button>
        </div>
    </li>
);

ProfileCard.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileCard;
