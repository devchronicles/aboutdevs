import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    }

    render() {
        const { loggedUser, formValues } = this.props;

        return (<div className="page-wrapper">
            <div className="document-wrapper">
                <ProfileEditForm onSubmit={this.onFormSubmit} initialValues={formValues} loggedUser={loggedUser} />
            </div>
        </div>);
    }
}

ProfileEditPage.propTypes = {
    loggedUser: PropTypes.object.isRequired,
    actions: PropTypes.object,
    formValues: PropTypes.object
};

ProfileEditPage.defaultProps = {
    actions: undefined,
    formValues: undefined
};

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
