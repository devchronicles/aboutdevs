import * as React from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, DropdownDivider, DropdownHeader, DropdownItem, DropdownMenuSize} from "./Dropdown";
import * as commonTypes from '../typings/commonTypes';
import * as textHelper from '../helpers/textHelper';
import * as stringHelper from '../helpers/stringHelper';

interface SearchDisplayDropdownProps {
    currentOption: commonTypes.SearchDisplay;
}

export class SearchDisplayDropdown extends React.Component<SearchDisplayDropdownProps> {


    public render() {
        const {currentOption} = this.props;

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
                    Exibindo: <strong className="css-truncate-target">{textHelper.getSearchDisplayText(currentOption)}</strong>
                </DropdownHeader>
                <DropdownDivider/>
                {currentOption !== commonTypes.SearchDisplay.ORDER_BY_DISTANCE && <DropdownItem>
                    <Link to="/config/edituserprofile">
                        {textHelper.getSearchDisplayText(commonTypes.SearchDisplay.ORDER_BY_DISTANCE)}
                    </Link>
                </DropdownItem>}
                {currentOption !== commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_2_KM && <DropdownItem>
                    <Link to="/config/edituserprofile">
                        {textHelper.getSearchDisplayText(commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_2_KM)}
                    </Link>
                </DropdownItem>}
                {currentOption !== commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_5_KM && <DropdownItem>
                    <Link to="/config/edituserprofile">
                        {textHelper.getSearchDisplayText(commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_5_KM)}
                    </Link>
                </DropdownItem>}
                {currentOption !== commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_10_KM && <DropdownItem>
                    <Link to="/config/edituserprofile">
                        {textHelper.getSearchDisplayText(commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_10_KM)}
                    </Link>
                </DropdownItem>}
            </Dropdown>
        );
    }
}

