import * as React from "react";
import * as commonTypes from "../typings/commonTypes";

interface ProfileViewProps {
    profile: commonTypes.UserProfile;
}

interface ProfileViewState {

}

export class ProfileView extends React.Component<ProfileViewProps, ProfileViewState> {
    render() {
        const {profile} = this.props;
        if (!profile) {
            return null;
        }

        let companyElement: React.ReactNode = null;
        let atElement: React.ReactNode = null;
        if (profile.companyName) {
            atElement = <span> at </span>;
            companyElement = <span>{profile.companyName}</span>;
            if (profile.companyUrl) {
                companyElement = (
                    <a href={profile.companyUrl} style={{color: profile.colorNegative}}>{companyElement}</a>);
            }
        }

        return (
            <div className="profile-view">
                <div className="header-wrapper" style={{backgroundColor: profile.colorPrimary}}>
                    <header>
                        <div className="profile-image" style={{backgroundImage: `url(${profile.photoUrl})`}}/>
                        <h1 className="title">{profile.displayName}</h1>
                        <p className="current-position">
                            {profile.title}
                            {profile.companyName && atElement}
                            {companyElement}
                        </p>
                    </header>
                </div>
            </div>
        );
    }
}
