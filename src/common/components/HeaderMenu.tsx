import * as React from "react";
import { Dropdown, DropdownDivider, DropdownItem } from "./Dropdown";

interface HeaderMenuProps {
}

class HeaderMenu extends React.Component<HeaderMenuProps> {

    public render() {
        return (
            <Dropdown
                button={"Menu"}
                outerButtonClasses={"outline"}
            >
                <DropdownItem
                    href="/s"
                    content={<span>
                        <i className="fa fa-search"/>
                        <span>Discover developers</span>
                    </span>}
                />
                <DropdownItem
                    href="/d/docs"
                    content={<span>
                        <i className="fa fa-book"/>
                        <span>About us</span>
                    </span>}
                />
                <DropdownDivider/>
                <DropdownItem
                    href="https://www.reddit.com/r/AboutDevs/"
                    content={<span>
                        <i className="fa fa-reddit"/>
                        <span>Reddit</span>
                    </span>}
                    target={"_blank"}
                />
                <DropdownItem
                    href="https://twitter.com/aboutdevs"
                    content={<span>
                        <i className="fa fa-twitter"/>
                        <span>Twitter</span>
                    </span>}
                    target={"_blank"}
                />
                <DropdownItem
                    href="https://www.facebook.com/aboutdevs/"
                    content={<span>
                        <i className="fa fa-facebook"/>
                        <span>Facebook</span>
                    </span>}
                    target={"_blank"}
                />
            </Dropdown>
        );
    }
}

export { HeaderMenu };
