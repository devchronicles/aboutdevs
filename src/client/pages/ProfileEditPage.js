import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProfileEditForm from '../components/ProfileEditForm';
import * as profileEditActionCreators from '../redux/profileEdit/profileEditActions';

class ProfileEditPage extends Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        const { actions } = this.props;
        actions.profileEditLoadData();
    }

    onFormSubmit(values) {
        console.log(values);
    }

    render() {
        const { loggedUser, formValues } = this.props;
        console.log(formValues);

        return (<div className="page-wrapper">
            <div className="document-wrapper">
                <div className="document">
                    <div className="document-header">
                        <div className="image" style={{ backgroundImage: `url(${loggedUser.photoUrl})` }} />
                    </div>
                    <ProfileEditForm onSubmit={this.onFormSubmit} initialValues={formValues} />
                </div>
            </div>
        </div>);
    }
}


const mapStateToProps = state => ({
    loggedUser: state.loggedUser,
    formValues: state.form.profileEdit
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(profileEditActionCreators, dispatch)
});

// CONNECT

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileEditPage);
