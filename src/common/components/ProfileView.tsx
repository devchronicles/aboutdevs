import * as React from "react";
import * as commonTypes from "../typings/commonTypes";
import { SocialLinkValue } from "../typings";
import { socialLinks } from "../data/socialLinks";


interface ProfileViewProps {
    profile: commonTypes.UserProfile;
}

interface ProfileViewState {

}

export class ProfileView extends React.Component<ProfileViewProps, ProfileViewState> {

    buildSocialLink = (socialLinkValue: SocialLinkValue, index: number) => {

        if (!socialLinkValue || !socialLinkValue.url || !socialLinkValue.website) return null;
        const socialLink = socialLinks.find((sl) => sl.value === socialLinkValue.website);

        const innerComponent = socialLink.iconClass
            ? <i className={socialLink.iconClass} aria-hidden="true"/>
            : null;

        return (
            <a
                key={`socialLink-${index}`}
                href={socialLinkValue.url}
                target="_blank"
                className="item"
            >
                {innerComponent}
            </a>
        );
    }

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
                    <a href={profile.companyUrl} style={{color: profile.colors.headerText}}>{companyElement}</a>);
            }
        }

        return (
            <div className="profile-view">
                <div className="header-wrapper" style={{backgroundColor: profile.colors.headerBackground}}>
                    <header>
                        <div className="profile-image" style={{backgroundImage: `url(${profile.photoUrl})`}}/>
                        <h1 className="title">{profile.displayName}</h1>
                        <p className="current-position">
                            {profile.title}
                            {profile.companyName && atElement}
                            {companyElement}
                        </p>
                        <div className="social-button-wrapper">
                            {
                                profile.socialLinks && profile.socialLinks.map((sl, i) => this.buildSocialLink(sl, i))
                            }
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}
