import * as React from "react";
import * as ReduxForm from "redux-form";
import { Field, FormField, FormGroup, TextBox } from "./index";
import { FaIcon } from "../FaIcon";
import { FormRow } from "./FormRow";
import { SelectSocialLink } from "./SelectSocialLink";
import { LINKED_IN_SOCIAL_KEY } from "../../data/socialLinks";
import { SocialLinkValue } from "../../typings";

interface SocialLinksProps extends ReduxForm.WrappedFieldArrayProps<{}> {
    socialLinks: SocialLinkValue[];
}

export class SocialLinks extends React.Component<SocialLinksProps> {

    isLinkedIn = (index: number) => {
        const {fields} = this.props;
        return (fields.get(index) as any).website === LINKED_IN_SOCIAL_KEY;
    }

    public render() {
        const {fields, socialLinks} = this.props;
        return (
            <FormGroup>
                <div className="field-array">
                    <ul>
                        {
                            fields.map((socialLink, index) => (
                                <li className="multi-line" key={`social-link-${index}`}>
                                    <div className="item">
                                        <FormRow>
                                            <Field
                                                name={`${socialLink}.website`}
                                                label={"Website"}
                                                component={FormField}
                                                innerComponent={SelectSocialLink}
                                                innerComponentProps={{
                                                    disabled: this.isLinkedIn(index),
                                                    selectedSocialLinks: socialLinks,
                                                    index,
                                                }}
                                                addOnBefore={<FaIcon icon="circle-o"/>}
                                            />
                                        </FormRow>
                                        <FormRow>
                                            <Field
                                                name={`${socialLink}.url`}
                                                label={"URL"}
                                                component={FormField}
                                                innerComponent={TextBox}
                                                innerComponentProps={{
                                                    disabled: this.isLinkedIn(index),
                                                }}
                                                addOnBefore={<FaIcon icon="link"/>}
                                            />
                                        </FormRow>
                                    </div>
                                    <div className="controls">
                                        <button
                                            disabled={index === 0}
                                            onClick={(e) => {
                                                fields.swap(index, index - 1);
                                                e.stopPropagation();
                                            }}
                                        >
                                            <i className="fa fa-caret-up"/>
                                        </button>
                                        <button
                                            disabled={fields.length === (index + 1)}
                                            onClick={(e) => {
                                                fields.swap(index, index + 1);
                                                e.stopPropagation();
                                            }}
                                        >
                                            <i className="fa fa-caret-down"/>
                                        </button>
                                        <button
                                            disabled={fields.length === 1 || this.isLinkedIn(index)}
                                            onClick={(e) => {
                                                fields.remove(index);
                                                e.stopPropagation();
                                            }}
                                        >
                                            <i className="fa fa-trash"/>
                                        </button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="field-array-button-bar">
                        <button type="button" onClick={() => fields.push({})}>
                            + Social link
                        </button>
                    </div>
                </div>
            </FormGroup>
        );
    }
}
