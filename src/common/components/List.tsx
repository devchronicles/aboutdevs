import * as React from "react";
import { UserProfileColors, UserProfileInfoGroup } from "../typings";
import { ListItem } from "./ListItem";
import { buildStyledComponents } from "./ProfileViewStyledComponents";

interface ListProps {
    list: UserProfileInfoGroup;
    colors?: UserProfileColors;
}

interface ListState {
}

export class List extends React.Component<ListProps, ListState> {
    render() {
        const {list: {title, items}, colors} = this.props;

        const {
            BodyHr,
        } = buildStyledComponents(colors || {} as any);

        return (
            <div className="list">
                <BodyHr/>
                <h2 className="list-title">{title}</h2>
                <div className={"items-wrapper"}>
                    {items && items.map((item, index) => <ListItem key={`list-item-${index}`} item={item}/>)}
                </div>
            </div>
        );
    }
}
