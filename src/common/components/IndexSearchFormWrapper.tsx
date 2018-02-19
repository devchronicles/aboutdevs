import * as React from "react";
import { SearchForm } from "./SearchForm";
import { Logo } from "./Logo";

interface IndexSearchFormWrapperProps {
    handleSearchSubmit: (formValues: any) => void;
    displayRegisterWrapper: boolean;
}

interface IndexSearchFormState {
}

export class IndexSearchFormWrapper extends React.Component<IndexSearchFormWrapperProps, IndexSearchFormState> {

    render() {
        const {handleSearchSubmit, displayRegisterWrapper} = this.props;
        return (
            <div className="index-search-form">
                <div className="logo-wrapper">
                            <span className="index-hero">
                                <div className="hero-text">
                                    <Logo/>
                                </div>
                            </span>
                </div>
                <div className="search-criteria">
                    <SearchForm onSubmit={handleSearchSubmit}/>
                </div>
                {displayRegisterWrapper && <div className="register-wrapper">
                    <p className="title">Are you a Software Developer?</p>
                    <ul>
                        <ul>
                            <li>
                                Create a developer profile; Link your social media; Showcase
                                your skills and grow your audience. <a href="/d/docs">Learn more</a>.
                            </li>
                        </ul>
                    </ul>
                    <a href="/a/linkedin" className="button sign-in faded">Create your free developer profile</a>
                </div>}
            </div>
        );
    }
}
