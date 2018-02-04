import * as React from "react";
import * as ReduxForm from "redux-form";
import { Field, FormField, FormGroup, TextBox } from "./index";
import { FaIcon } from "../FaIcon";
import { FormRow } from "./FormRow";
import { FieldArray } from "./FieldArray";
import { TextArea } from "./TextArea";
import { SelectTags } from "./SelectTags";
import * as fieldValidationMessageHelper from "../../helpers/fieldValidationMessageHelper";

interface InfoGroupsProps extends ReduxForm.WrappedFieldArrayProps<{}> {
}

export class InfoGroups extends React.Component<InfoGroupsProps> {

    renderControls = (fields: ReduxForm.FieldsProps<any>, index: number, disableDeleteLast: boolean) => {
        return (
            <div className="controls">
                <button
                    type="button"
                    disabled={index === 0}
                    onClick={(e) => {
                        fields.swap(index, index - 1);
                        e.stopPropagation();
                    }}
                >
                    <i className="fa fa-caret-up"/>
                </button>
                <button
                    type="button"
                    disabled={fields.length === (index + 1)}
                    onClick={(e) => {
                        fields.swap(index, index + 1);
                        e.stopPropagation();
                    }}
                >
                    <i className="fa fa-caret-down"/>
                </button>
                <button
                    type="button"
                    disabled={disableDeleteLast ? fields.length === 1 : false}
                    onClick={(e) => {
                        fields.remove(index);
                        e.stopPropagation();
                    }}
                >
                    <i className="fa fa-trash"/>
                </button>
            </div>
        );
    }

    renderGroup = ({fields, meta}: { fields: ReduxForm.FieldsProps<any>, meta: any }) => {
        return (
            <div className="field-array">
                <ul>
                    {
                        fields.map((groupItem, index) => (
                            <li className="multi-line child" key={`social-link-${index}`}>
                                <div className="item">
                                    <FormRow>
                                        <Field
                                            name={`${groupItem}.title`}
                                            label={"Item title"}
                                            component={FormField}
                                            innerComponent={TextBox}
                                        />
                                    </FormRow>
                                    <FormRow>
                                        <Field
                                            name={`${groupItem}.url`}
                                            label={"URL"}
                                            component={FormField}
                                            innerComponent={TextBox}
                                            addOnBefore={<FaIcon icon="link"/>}
                                        />
                                    </FormRow>
                                    <FormRow>
                                        <Field
                                            name={`${groupItem}.description`}
                                            label={"Description"}
                                            component={FormField}
                                            innerComponent={TextArea}
                                            help={"Markdown supported. Don't forget to use absolute URLs in links. Example: like https://foo.com"}
                                        />
                                    </FormRow>
                                    <FormRow>
                                        <Field
                                            name={`${groupItem}.tags`}
                                            label="Tags"
                                            component={FormField}
                                            innerComponent={SelectTags}
                                            help="Data by Stackoverflow"
                                            addOnBefore={<FaIcon icon="tags"/>}
                                        />
                                    </FormRow>
                                </div>
                                {this.renderControls(fields, index, true)}
                            </li>
                        ))
                    }
                </ul>
                <div className="field-array-button-bar">
                    <button type="button" onClick={() => fields.push({})}>
                        + Item
                    </button>
                </div>
            </div>
        );
    }

    renderGroups = (fields: ReduxForm.FieldsProps<any>) => {
        return (
            <div className="field-array">
                <ul>
                    {
                        fields.map((group, index) => (
                            <li className="multi-line" key={`social-link-${index}`}>
                                <div className="item">
                                    <FormRow>
                                        <Field
                                            name={`${group}.title`}
                                            label={"List title"}
                                            component={FormField}
                                            innerComponent={TextBox}
                                        />
                                    </FormRow>
                                    <FieldArray name={`${group}.items`} component={this.renderGroup}/>
                                </div>
                                {this.renderControls(fields, index, false)}
                            </li>
                        ))
                    }
                </ul>
                <div className="field-array-button-bar">
                    <button type="button" onClick={() => fields.push({items: []})}>
                        + List
                    </button>
                </div>
            </div>
        );
    }

    public render() {
        const {fields, meta: {error}} = this.props;
        return (
            <FormGroup>
                {this.renderGroups(fields)}
                {error &&
                <small className="form-help error">{fieldValidationMessageHelper.getErrorMessage(error)}</small>}
            </FormGroup>
        );
    }
}
