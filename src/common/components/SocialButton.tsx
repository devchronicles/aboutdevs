import * as ReactActivity from 'react-activity';
import * as React from 'react';

const Dots = ReactActivity.Dots;

interface SocialButtonProps {
    text: string,
    url: string,
    faClass: string
};

interface SocialButtonState {
    loading: boolean;
}

class SocialButton extends React.Component<SocialButtonProps, SocialButtonState> {

    constructor(props: SocialButtonProps) {
        super(props);
        this.state = {
            loading: false
        };
    }

    handleLinkClick = (e: React.SyntheticEvent<any>) => {
        if (this.state.loading) {
            e.preventDefault();
        } else {
            this.setState({ loading: true });
        }
    }

    render() {
        const { url, faClass, text } = this.props;

        const finalText = this.state.loading ? <Dots size={20} /> : text;


        return (<a className="social-button" href={url} onClick={this.handleLinkClick} >
            <i className={`fa fa-${faClass}`} aria-hidden="true" />
            <span className="text">
                {finalText}
            </span>
        </a>);
    }
}

export { SocialButton };
