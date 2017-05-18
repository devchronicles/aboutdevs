import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';
import SelectAddress from './SelectAddress';
import FormRow from './FormRow';
import FormColumn from './FormColumn';

class SearchBar extends Component {

    constructor() {
        super();
        this.handleProfessionalChange = this.handleProfessionalChange.bind(this);
        this.handleCityChange = this.handleLocationChange.bind(this);
    }

    handleProfessionalChange(event) {
        const { searchActions: { changeCriteria } } = this.props;
        changeCriteria({ professional: event.target.value });
    }

    handleLocationChange(location) {
        const { searchActions: { changeCriteria } } = this.props;
        changeCriteria({ location });
    }

    render() {
        const { search: { professional, location } } = this.props;

        return (<div className="search-criteria">
            <div className="advanced-search form">
                <FormRow>
                    <FormColumn eq>
                        <FormGroup label="Profissional ou serviço" labelFor="text">
                            <input type="text" name="text" value={professional} onChange={this.handleProfessionalChange} />
                        </FormGroup>
                    </FormColumn>
                </FormRow>
                <FormRow>
                    <FormColumn eq>
                        <FormGroup label="Localizado próximo a" labelFor="text">
                            <SelectAddress value={location} onChange={this.handleLocationChange} />
                        </FormGroup>
                    </FormColumn>
                </FormRow>
                <button className="vibrant">
                    <i className="fa fa-search" aria-hidden="true" />
                    <span>Pesquisar</span>
                </button>
            </div>
        </div>);
    }
}

SearchBar.propTypes = {
    searchActions: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired
};

export default SearchBar;
