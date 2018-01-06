import * as React from "react";
import { Field, FormField, FormGroup, FormRow, SelectLocation } from "./form";
import * as ReduxForm from "redux-form";
import { SelectTags } from "./form/SelectTags";

interface IndexSearchFormProps extends ReduxForm.InjectedFormProps {
    onSubmit: (formValues: any) => void;
}

const IndexSearchForm: React.SFC<IndexSearchFormProps> = (props) => {
    const {
        handleSubmit,
        onSubmit,
    } = props;
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex-column flex-align-items-center ">
            <FormRow>
                <FormGroup>
                    <Field
                        name="tags"
                        component={FormField}
                        innerComponent={SelectTags}
                        innerComponentProps={{
                            placeholder: "Technologies",
                        }}
                    />
                </FormGroup>
            </FormRow>
            <FormRow>
                <FormGroup>
                    <Field
                        name="formattedAddress"
                        placeholder="Located at"
                        component={FormField}
                        innerComponent={SelectLocation}
                        innerComponentProps={{
                            placeholder: "Located at or near...",
                        }}
                    />
                </FormGroup>
            </FormRow>
            <button type="submit" className="search vibrant">
                <i className="fa fa-search" aria-hidden="true"/>
                <span>Discover Developers</span>
            </button>
        </form>
    );
};

// Decorate with redux-form
const FormDecoratedSearchForm = ReduxForm.reduxForm({
    form: "search", // a unique identifier for this form,
})(IndexSearchForm);

export { FormDecoratedSearchForm as SearchForm };
