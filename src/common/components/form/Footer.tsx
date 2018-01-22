import * as React from "react";

interface FooterProps {
    position: "static" | "bottom";
}

export const Footer: React.SFC<FooterProps> = (props: FooterProps) => {
    const {position} = props;
    return (
        <div className={`footer ${position === "static" ? "footer-static" : ""}`}>
            <span className="mark">
                <span className="trademark">©</span>
                <a href="https://aboutdevs.com">aboutdevs.com</a>
            </span>
            <span className="social">
                <a href="https://www.reddit.com/r/AboutDevs/">
                    <i className="fa fa-reddit" aria-hidden="true"/>
                </a>
                <a href="https://twitter.com/aboutdevs">
                    <i className="fa fa-twitter" aria-hidden="true"/>
                </a>
                <a href="https://www.facebook.com/aboutdevs/">
                    <i className="fa fa-facebook" aria-hidden="true"/>
                </a>
            </span>
        </div>
    );
};
