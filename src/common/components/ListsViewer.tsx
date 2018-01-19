import * as React from "react";
import { UserProfileInfoGroup } from "../typings";
import { List } from "./List";
import { UserProfileColors } from "../typings/commonTypes";

interface ListsViewerProps {
    lists?: UserProfileInfoGroup[];
    colors?: UserProfileColors;
}

interface ListsViewerState {

}

export class ListsViewer extends React.Component<ListsViewerProps, ListsViewerState> {
    render() {
        const {lists, colors} = this.props;
        if (!lists || !lists.length)
            return null;
        return (
            <div className="lists-viewer">
                {lists && lists.map((list, index) => <List key={`list-${index}`} list={list} colors={colors}/>)}
            </div>
        );
    }
}
