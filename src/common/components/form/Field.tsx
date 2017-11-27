import * as React from "react";
import { BaseFieldProps, Field as RfField } from "redux-form";
import * as fieldValidationHelper from "../../../common/helpers/fieldValidationHelper";

interface FieldProps extends BaseFieldProps {

}

declare type IFinalFieldProps = FieldProps & any;

const Field: React.SFC<IFinalFieldProps> = (props) => (
    <RfField {...props} validate={props.validate || fieldValidationHelper.getValidatorsForField(props.name)} />
);

export { Field };
