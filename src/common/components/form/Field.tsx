import * as React from "react";
import * as ReduxForm from "redux-form";
import { Field as RfField } from "redux-form";
import * as fieldValidationHelper from "../../../common/helpers/fieldValidationHelper";

interface IFieldProps extends ReduxForm.BaseFieldProps {

}

declare type IFinalFieldProps = IFieldProps & any;

const Field: React.SFC<IFinalFieldProps> = (props) => (
    <RfField {...props} validate={props.validate || fieldValidationHelper.getValidatorsForField(props.name)} />
);

export { Field };
