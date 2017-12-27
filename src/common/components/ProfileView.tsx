import * as React from "react";
import * as commonTypes from "../typings/commonTypes";
import { SocialLinkValue } from "../typings";
import { socialLinks } from "../data/socialLinks";
import { getDataFromFormattedAddress } from "../helpers/googlePlacesFormatHelper";
import styled from "react-emotion";


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

        const HeaderSpan = styled("span")`
            color: ${profile.colors.headerText}
        `;

        const HeaderA = styled("a")`
            color: ${profile.colors.headerText}
        `;

        const HeaderASocialLink = styled(HeaderA)`
            border: 2px solid ${profile.colors.headerText};
            &:hover {
                color: ${profile.colors.headerBackground};
                background-color: ${profile.colors.headerText};
            }
        `;

        const HeaderH1 = styled("h1")`
            color: ${profile.colors.headerText}
        `;

        let companyElement: React.ReactNode = null;
        let atElement: React.ReactNode = null;
        let inElement: React.ReactNode = null;

        if (profile.companyName) {
            atElement = <HeaderSpan> at </HeaderSpan>;
            companyElement = <HeaderSpan>{profile.companyName}</HeaderSpan>;
            if (profile.companyUrl) {
                companyElement = (
                    <HeaderA
                        href={profile.companyUrl}
                    >
                        {companyElement}
                    </HeaderA>);
            }
        }

        if (profile.formattedAddress) {
            const {address} = getDataFromFormattedAddress(profile.formattedAddress);
            inElement = <HeaderSpan> in {address} </HeaderSpan>;
        }

        return (
            <div className="profile-view">
                <div className="header-wrapper" style={{backgroundColor: profile.colors.headerBackground}}>
                    <header>
                        <div className="profile-image" style={{backgroundImage: `url(${profile.photoUrl})`}}/>
                        <HeaderH1 className="username">{profile.displayName}</HeaderH1>
                        <p className="current-position">
                            <HeaderSpan>{profile.title}</HeaderSpan>
                            {profile.companyName && atElement}
                            {companyElement}
                            {profile.formattedAddress && inElement}
                        </p>
                        <div className="social-button-wrapper">
                            {
                                profile.socialLinks && profile.socialLinks.map((socialLinkValue, index) => {
                                    if (!socialLinkValue || !socialLinkValue.url || !socialLinkValue.website) return null;
                                    const socialLink = socialLinks.find((sl) => sl.value === socialLinkValue.website);

                                    const innerComponent = socialLink.iconClass
                                        ? <i className={socialLink.iconClass} aria-hidden="true"/>
                                        : null;

                                    return (
                                        <HeaderASocialLink
                                            key={`socialLink-${index}`}
                                            href={socialLinkValue.url}
                                            target="_blank"
                                            className="item"
                                        >
                                            {innerComponent}
                                        </HeaderASocialLink>
                                    );
                                })
                            }
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}
