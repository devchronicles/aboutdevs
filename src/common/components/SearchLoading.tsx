import * as React from "react";
import { Spinner } from "react-activity";

interface SearchLoadingProps {
}

export const SearchLoading: React.SFC<SearchLoadingProps> = (props) => {
    return (
        <div className="search-loading">
            <div className="activity">
                <Spinner size={30}/>
            </div>
            <div className="text">
                Loading
            </div>
        </div>
    );
};
