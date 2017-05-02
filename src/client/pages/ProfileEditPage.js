import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileEditForm from '../components/ProfileEditForm';

class ProfileEditPage extends Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {

    }

    onFormSubmit(values) {
        console.log(values);
    }

    render() {

        const { loggedUser } = this.props;

        return (<div className="page-wrapper">
            <div className="document-wrapper">
                <div className="document">
                    <div className="document-header">
                        <div className="image" style={{ backgroundImage: `url(${loggedUser.photoUrl})` }} />
                    </div>
                    <ProfileEditForm onSubmit={this.onFormSubmit} />
                </div>
            </div>
        </div>);
    }
}



const mapStateToProps = state => ({
    loggedUser: state.loggedUser
});

// CONNECT

export default connect(
    mapStateToProps
)(ProfileEditPage);
