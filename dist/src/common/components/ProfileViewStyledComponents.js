"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_emotion_1 = require("react-emotion");
function buildStyledComponents(colors) {
    return {
        // WRAPPER
        ProfileWrapper: react_emotion_1.default("div") `
            background-color: ${colors.bodyBackground}
        `,
        // HEADER
        HeaderWrapper: react_emotion_1.default("div") `
            background-color: ${colors.headerBackground}
        `,
        HeaderSpan: react_emotion_1.default("span") `
            color: ${colors.headerText}
        `,
        HeaderA: react_emotion_1.default("a") `
            color: ${colors.headerText}
        `,
        HeaderASocialLink: react_emotion_1.default("a") `
            color: ${colors.headerText};
            border: 2px solid ${colors.headerText};
            &:hover {
                color: ${colors.headerBackground};
                background-color: ${colors.headerText};
            }
        `,
        HeaderH1: react_emotion_1.default("h1") `
            color: ${colors.headerText}
        `,
        // BODY
        BodyWrapper: react_emotion_1.default("div") `
            color: ${colors.bodyText};
        `,
        BodyTag: react_emotion_1.default("div") `
            border-color: ${colors.bodyText};
            color: ${colors.bodyText};
        `,
    };
}
exports.buildStyledComponents = buildStyledComponents;
//# sourceMappingURL=ProfileViewStyledComponents.js.map