import * as React from "react";
import { SearchForm } from "./IndexSearchForm";
import { Logo } from "./Logo";

interface IndexSearchFormWrapperProps {
    handleSearchSubmit: (formValues: any) => void;
}

interface IndexSearchFormState {
}

export class IndexSearchFormWrapper extends React.Component<IndexSearchFormWrapperProps, IndexSearchFormState> {

    render() {
        const {handleSearchSubmit} = this.props;
        return (
            <div className="index-search-form">
                <div className="logo-wrapper">
                            <span className="index-hero">
                                <div className="hero-text">
                                    <Logo/>
                                </div>
                            </span>
                </div>
                <SearchForm onSubmit={handleSearchSubmit}/>
                <div className="register-wrapper">
                    <p className="title">Are you a Software Developer?</p>
                    <ul>
                        <ul>
                            <li>
                                Create a professional profile;
                                Link all your relevant social media;
                                Upload your CV and showcase your skills and portfolio.
                            </li>
                        </ul>
                    </ul>
                    <button className="faded">
                        Create your free profile
                    </button>
                </div>
            </div>
        );
    }
}
