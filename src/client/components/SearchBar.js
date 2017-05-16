import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';
import SelectCity from './SelectCity';
import FormRow from './FormRow';
import FormColumn from './FormColumn';

class SearchBar extends Component {

    constructor() {
        super();
        this.handleProfessionalChange = this.handleProfessionalChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleNeighborhoodChanged = this.handleNeighborhoodChanged.bind(this);
    }

    handleProfessionalChange(event) {
        const { searchActions: { changeCriteria } } = this.props;
        changeCriteria({
            professional: event.target.value
        });
    }

    handleCityChange(city) {
        const { searchActions: { changeCriteria } } = this.props;
        changeCriteria({
            cityId: city.id,
            cityName: city.name
        });
    }

    handleNeighborhoodChanged(event) {
        const { searchActions: { changeCriteria } } = this.props;
        changeCriteria({
            neighborhood: event.target.value
        });
    }

    render() {
        const { search: { professional, neighborhood, cityId, cityName } } = this.props;

        const city = {
            cityId,
            cityName
        };


        return (<div className="search-criteria">
            <div className="advanced-search form">
                <FormRow>
                    <FormColumn eq>
                        <FormGroup label="Profissional" labelFor="text">
                            <input type="text" name="text" value={professional} onChange={this.handleProfessionalChange} />
                        </FormGroup>
                    </FormColumn>
                </FormRow>
                <FormRow>
                    <FormColumn style={{ width: '60%' }}>
                        <FormGroup label="Cidade" labelFor="text">
                            <SelectCity value={city} onChange={this.handleCityChange} />
                        </FormGroup>
                    </FormColumn>
                    <FormColumn style={{ width: '40%' }}>
                        <FormGroup label="Bairro" labelFor="text">
                            <input type="text" name="text" value={neighborhood} onChange={this.handleNeighborhoodChanged} />
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
