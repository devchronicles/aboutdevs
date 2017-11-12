import * as React from 'react';
import { Logo } from './Logo';

interface IndexIntroProps {

}

interface IndexIntroState {

}

export class IndexIntro extends React.Component<IndexIntroProps, IndexIntroState> {
    render() {
        return (
            <div className="index-intro">
                <div className="index-intro-header">
                    <Logo/>
                    <div className="index-intro-motto">
                        The internet developers database
                    </div>
                </div>
                <div className="index-intro-content">
                    <div className="index-intro-content-box">
                        <h1 className="index-intro-title">
                            For software developers
                        </h1>
                        <ul>
                            <li>Create a free personal website</li>
                            <li>Link all your relevant social media</li>
                            <li>Showcase your skills and portfolio</li>
                            <li>Optionally, get searchable by companies and recruiters</li>
                        </ul>
                    </div>
                    <div className="index-intro-content-box">
                        <h1 className="index-intro-title">
                            For companies and recruiters
                        </h1>
                        <ul>
                            <li>Search for talents with the skill set you need, anywhere in the world</li>
                            <li>Keep track of your favorite developers</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
