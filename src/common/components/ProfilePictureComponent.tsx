import * as React from "react";

interface ProfilePictureComponentProps {
}

export const ProfilePictureComponent: React.SFC<ProfilePictureComponentProps> = (props) => {
    return (
        <a className="profile-picture-button button gray" href="https://en.gravatar.com/" target="_blank">
            Set your profile picture on Gravatar
        </a>
    );
};