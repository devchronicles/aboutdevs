import * as React from "react";
import { Footer } from "../components/form/Footer";

interface NotFoundPageProps {

}

interface NotFoundPageState {

}

export class NotFoundPage extends React.Component<NotFoundPageProps, NotFoundPageState> {
    render() {
        return (
            <div className="page-wrapper">
                <div className="not-found-background-page-wrapper">
                    <p className="not-found">
                        404
                    </p>
                    <p className="not-found-quote">
                        "If you haven't found it yet, keep looking. Don't settle. As with all matters
                        of the heart, you'll know when you find it. And, like any great relationship,
                        it just gets better and better as the years roll on." <br/> - Steve Jobs
                    </p>
                    <Footer position={"static"}/>
                </div>
            </div>
        );
    }
}
