import React, { Component, PropTypes } from 'react';

class SocialButton extends Component {

    constructor(props) {
        super(props);
        this.handleLinkClick = this.handleLinkClick.bind(this);
        this.state = {
            loading: false
        };
    }

    handleLinkClick(e) {
        if (this.state.loading) {
            e.preventDefault();
        } else {
            this.setState({ loading: true });
        }
    }

    render() {
        const { url, faClass, text } = this.props;

        const finalText = this.state.loading ? '...' : text;


        return (<a className="social-button" href={url} onClick={this.handleLinkClick} >
            <i className={`fa fa-${faClass}`} aria-hidden="true" />
            <span className="text">
                {finalText}
            </span>
        </a>);
    }
}

SocialButton.propTypes = {
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    faClass: PropTypes.string.isRequired
};

export default SocialButton;
