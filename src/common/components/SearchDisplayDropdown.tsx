import * as React from "react";
import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem, DropdownMenuSize } from "./Dropdown";
import * as commonTypes from "../typings/commonTypes";
import * as textHelper from "../helpers/textHelper";
import * as urlHelper from "../helpers/urlHelper";

interface SearchDisplayDropdownProps {
    search: string;
    location: string;
    value: commonTypes.SearchDisplay;
}

export class SearchDisplayDropdown extends React.Component<SearchDisplayDropdownProps> {

    private renderLink = (targetDisplay: commonTypes.SearchDisplay) => {
        const {value, search, location} = this.props;
        return (
            <DropdownItem
                visible={value !== targetDisplay}
                linkTo={urlHelper.getProfessionalsSearchUrl(search, location, targetDisplay)}
                text={textHelper.getSearchDisplayText(targetDisplay)}
            />
        );
    };

    public render() {
        const {value} = this.props;

        return (
            <Dropdown
                className="search-display-dropdown-button"
                size={DropdownMenuSize.MEDIUM}
                button={
                    <span>
                            <i className="sort-icon fa fa-sort-amount-desc"/>
                            <span>Exibir</span>
                        </span>
                }
            >
                <DropdownHeader>
                    Exibindo: <strong className="css-truncate-target">{textHelper.getSearchDisplayText(value)}</strong>
                </DropdownHeader>
                <DropdownDivider/>
                {this.renderLink(commonTypes.SearchDisplay.ORDER_BY_DISTANCE)}
                {this.renderLink(commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_2_KM)}
                {this.renderLink(commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_5_KM)}
                {this.renderLink(commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_10_KM)}
            </Dropdown>
        );
    }
}

