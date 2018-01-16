import * as React from "react";
import { Dropdown, DropdownItem } from "./Dropdown";

interface CommunityDropdownProps {
}

class CommunityDropdown extends React.Component<CommunityDropdownProps> {

    handleOnClick = (e: any) => {
        e.preventDefault();
    }

    public render() {
        return (
            <Dropdown
                button={"Community"}
                outerButtonClasses={"non-uppercase"}
            >
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

export { CommunityDropdown };
