import * as React from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, DropdownDivider, DropdownHeader, DropdownItem, DropdownMenuSize} from "./Dropdown";
import * as commonTypes from '../typings/commonTypes';
import * as textHelper from '../helpers/textHelper';
import * as stringHelper from '../helpers/stringHelper';
import * as urlHelper from '../helpers/urlHelper';

interface SearchDisplayDropdownProps {
    search: string;
    location: string;
    value: commonTypes.SearchDisplay;
}

export class SearchDisplayDropdown extends React.Component<SearchDisplayDropdownProps> {

    public render() {
        const {value, search, location} = this.props;

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
                {value !== commonTypes.SearchDisplay.ORDER_BY_DISTANCE && <DropdownItem>
                    <Link to={urlHelper.getProfessionalsSearchUrl(search, location, commonTypes.SearchDisplay.ORDER_BY_DISTANCE)}>
                        {textHelper.getSearchDisplayText(commonTypes.SearchDisplay.ORDER_BY_DISTANCE)}
                    </Link>
                </DropdownItem>}
                {value !== commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_2_KM && <DropdownItem>
                    <Link to={urlHelper.getProfessionalsSearchUrl(search, location, commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_2_KM)}>
                        {textHelper.getSearchDisplayText(commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_2_KM)}
                    </Link>
                </DropdownItem>}
                {value !== commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_5_KM && <DropdownItem>
                    <Link to={urlHelper.getProfessionalsSearchUrl(search, location, commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_5_KM)}>
                        {textHelper.getSearchDisplayText(commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_5_KM)}
                    </Link>
                </DropdownItem>}
                {value !== commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_10_KM && <DropdownItem>
                    <Link to={urlHelper.getProfessionalsSearchUrl(search, location, commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_10_KM)}>
                        {textHelper.getSearchDisplayText(commonTypes.SearchDisplay.BEST_PROFESSIONAIS_IN_10_KM)}
                    </Link>
                </DropdownItem>}
            </Dropdown>
        );
    }
}

