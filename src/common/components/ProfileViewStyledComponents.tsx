import { UserProfileColors } from "../typings/commonTypes";
import styled from "react-emotion";

export function buildStyledComponents(colors: UserProfileColors) {
    return {
        // HEADER
        HeaderWrapper: styled("div")`
            background-color: ${colors.headerBackground}
        `,
        HeaderSpan: styled("span")`
            color: ${colors.headerText}
        `,
        HeaderA: styled("a")`
            color: ${colors.headerText}
        `,
        HeaderASocialLink: styled("a")`
            color: ${colors.headerText};
            border: 2px solid ${colors.headerText};
            &:hover {
                color: ${colors.headerBackground};
                background-color: ${colors.headerText};
            }
        `,
        HeaderH1: styled("h1")`
            color: ${colors.headerText}
        `,
        // BODY
        BodyWrapper: styled("div")`
            color: ${colors.bodyText};
        `,
        BodyTag: styled("div")`
            border-color: ${colors.bodyText};
            color: ${colors.bodyText};
        `,
        BodyHr: styled("hr")`
            background: ${colors.bodyText};
        `,
        BioWrapper: styled("div")`
            blockquote {
                border-color: ${colors.bodyText};
            }
            a {
                color: ${colors.bodyText} !important;
            }
        `,
    };
}
