import * as React from "react";
import * as ReactRedux from "react-redux";
import Dropzone, { ImageFile } from "react-dropzone";
import * as ReduxForm from "redux-form";
import * as ReactNotificationSystem from "react-notification-system";
import * as notificationActions from "../../redux/notifications/notificationsActions";
import { UserCv } from "../../typings";

interface DropzoneInputStateProps {
}

interface DropzoneInputDispatchProps {
    enqueueNotification: (notification: ReactNotificationSystem.Notification) => void;
}

interface DropzoneInputOwnProps extends ReduxForm.WrappedFieldProps {

}

declare type DropzoneInputProps = DropzoneInputStateProps & DropzoneInputDispatchProps & DropzoneInputOwnProps;

class DropzoneInput extends React.Component<DropzoneInputProps> {

    handleOnDrop = (accepted: ImageFile[], rejected: ImageFile[], event: React.DragEvent<HTMLDivElement>) => {
        const {input: {onChange}, enqueueNotification} = this.props;
        if (rejected && rejected.length) {
            enqueueNotification({
                message: "The selected CV file is not valid. The format must be PDF and the max size is 500KB",
                level: "error",
            });
            const value: UserCv = {
                file: null,
                fileName: null,
            };
            onChange(value);
            return;
        }
        if (accepted && accepted.length) {
            const file = accepted[0];
            const value: UserCv = {
                file,
                fileName: file.name,
            };
            onChange(value);
        }
    }

    handleRemove = () => {
        const {input: {onChange}} = this.props;
        const value: UserCv = {
            file: null,
            fileName: null,
        };
        onChange(value);
    }

    render() {
        const {input: {name, value}} = this.props;
        const valueAsUserCv = value as UserCv;

        const emptyContent = <div>Drop a PDF file here, or click to select it.</div>;
        const selectedFileContent = valueAsUserCv && valueAsUserCv.fileName && (
            <span>{valueAsUserCv.fileName}</span>
        );

        return (
            <div className="dropzone-input-wrapper">
                <Dropzone
                    name={name}
                    onDrop={this.handleOnDrop}
                    disablePreview={true}
                    maxSize={500000}
                    multiple={false}
                    accept="application/pdf"
                    className="dropzone-input"
                    activeClassName="dropzone-active"
                >
                    <div>{selectedFileContent || emptyContent}</div>
                </Dropzone>
                {(valueAsUserCv && valueAsUserCv.fileName) && <p className="remove-wrapper" onClick={this.handleRemove}>
                    <i className="fa fa-trash-o" aria-hidden="true"/>Remove
                </p>}
            </div>

        );
    }
}

// CONNECT

const mapStateToProps = (state: any): DropzoneInputStateProps => ({});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<any>): DropzoneInputDispatchProps => ({
    enqueueNotification: (notification: ReactNotificationSystem.Notification) => dispatch(notificationActions.enqueueNotification(notification)),
});

const mergeProps = (stateProps: DropzoneInputProps, dispatchProps: DropzoneInputDispatchProps, ownProps: DropzoneInputOwnProps): DropzoneInputProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
});

const ConnectedDropzoneInput = ReactRedux.connect<DropzoneInputStateProps, DropzoneInputDispatchProps, DropzoneInputOwnProps, DropzoneInputProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(DropzoneInput);

export { ConnectedDropzoneInput as DropzoneInput };
