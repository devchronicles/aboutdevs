import * as React from "react";
import * as commonTypes from "../typings/commonTypes";
import { socialLinks } from "../data/socialLinks";
import { getDataFromFormattedAddress } from "../helpers/googlePlacesFormatHelper";
import { buildStyledComponents } from "./ProfileViewStyledComponents";
import { Markdown } from "./Markdown";
import { ListsViewer } from "./ListsViewer";

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

        const {
            // Header
            HeaderWrapper,
            HeaderA,
            HeaderSpan,
            HeaderASocialLink,
            HeaderH1,
            // Body
            BodyWrapper,
            BodyTag,
        } = buildStyledComponents(profile.colors);

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
            <div className="profile-view" style={{backgroundColor: profile.colors.bodyBackground}}>
                <HeaderWrapper className="header-wrapper">
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
                        {
                            profile.cv && profile.cv.url && (
                                <div className="cv-wrapper">
                                    <HeaderA href={profile.cv.url} download={true}>
                                        <i className="fa fa-arrow-down" aria-hidden="true"/><span>Download my CV</span>
                                    </HeaderA>
                                </div>
                            )
                        }
                    </header>
                </HeaderWrapper>
                <BodyWrapper className="body-wrapper">
                    <div className="body">
                        <div className="tag-wrapper">
                            {
                                profile.tags && profile.tags.map((tag, index) => {
                                    return (
                                        <BodyTag key={`tag-${index}`} className="tag">
                                            {tag}
                                        </BodyTag>
                                    );
                                })
                            }
                        </div>
                        <div className="bio-wrapper">
                            <Markdown markdown={profile.bio ? profile.bio.text : ""}/>
                        </div>
                        <ListsViewer lists={profile.infoGroups} colors={profile.colors}/>
                    </div>
                </BodyWrapper>
            </div>
        );
    }
}
