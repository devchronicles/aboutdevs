import * as React from "react";
import { BaseFieldProps, Field as RfField } from "redux-form";
import * as fieldValidationHelper from "../../../common/helpers/fieldValidationHelper";

interface FieldProps extends BaseFieldProps {

}

declare type FinalFieldProps = FieldProps & any;

const Field: React.SFC<FinalFieldProps> = (props) => (
    <RfField {...props} validate={props.validate || fieldValidationHelper.getValidatorsForField(props.name)} />
);

export { Field };
