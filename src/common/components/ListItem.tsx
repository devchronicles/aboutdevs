import * as React from "react";
import { UserProfileInfoGroupItem } from "../typings";

interface ListItemProps {
    item: UserProfileInfoGroupItem;
}

interface ListItemState {

}

export class ListItem extends React.Component<ListItemProps, ListItemState> {
    render() {
        const {item: {title, url, description, tags}} = this.props;
        const titleComponent = url ? <a href={url}>{title}</a> : <span>{title}</span>;
        return (
            <div className="list-item">
                <h3 className="list-item-title">{titleComponent}</h3>
                <p className="list-item-description">{description}</p>
                {tags && tags.length && <div className="list-items-tag-wrapper">
                    {tags.map((tag, index) => <span key={`list-item-${index}`} className="list-item-tag">{tag}</span>)}
                </div>}
            </div>
        );
    }
}
