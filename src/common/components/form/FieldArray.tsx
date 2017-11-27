import * as React from "react";
import { BaseFieldsProps, FieldArray as RfFieldArray } from "redux-form";

interface FieldProps extends BaseFieldsProps {
}

declare type IFinalFieldProps = FieldProps & any;

const FieldArray: React.SFC<IFinalFieldProps> = (props) => (
    <RfFieldArray {...props} />
);

export { FieldArray };
