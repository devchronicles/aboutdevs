import * as React from "react";

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
                        How can I go forward when I don't know which way I'm facing? - John Lennon
                    </p>
                </div>
            </div>
        );
    }
}
