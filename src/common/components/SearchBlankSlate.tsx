import * as React from "react";

const {ShareButtons, generateShareIcon} = require("react-share");

const {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    RedditShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon("facebook");
const LinkedInIcon = generateShareIcon("linkedin");
const TwitterIcon = generateShareIcon("twitter");
const RedditIcon = generateShareIcon("reddit");

interface SearchBlankSlateProps {

}

interface SearchBlankSlateState {

}


export class SearchBlankSlate extends React.Component<SearchBlankSlateProps, SearchBlankSlateState> {
    render() {

        const url = "https://aboutdevs.com";
        const title = "Check out AboutDevs!";

        return (
            <div className="search-blank-slate">
                <i className="icon fa fa-meh-o" aria-hidden="true"/>
                <p className="ask-help">
                    <strong>Dude, where are my developers?</strong><br/>
                    Oops! But that doesn't mean they don't exist.
                    They just don't know about AboutDevs yet. We're just starting.
                    Want to help? Spread word!
                </p>
                <div className="share-button-row">
                    <TwitterShareButton url={title} title={title}>
                        <TwitterIcon
                            size={32}
                            round={true}
                        />
                    </TwitterShareButton>
                    <LinkedinShareButton url={title} title={title}>
                        <LinkedInIcon
                            size={32}
                            round={true}
                        />
                    </LinkedinShareButton>
                    <RedditShareButton url={title} title={title}>
                        <RedditIcon
                            size={32}
                            round={true}
                        />
                    </RedditShareButton>
                    <FacebookShareButton url={title} title={title}>
                        <FacebookIcon
                            size={32}
                            round={true}
                        />
                    </FacebookShareButton>
                </div>
            </div>
        );
    }
}
