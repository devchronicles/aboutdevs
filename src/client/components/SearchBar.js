import React, { Component, PropTypes } from 'react';
import FormGroup from './FormGroup';
import SelectCity from './SelectCity';

class SearchBar extends Component {

    constructor() {
        super();
        this.handleProfessionalChange = this.handleProfessionalChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleNeighborhoodChanged = this.handleNeighborhoodChanged.bind(this);
    }

    handleProfessionalChange(event) {
        console.log(event.target.value);
    }

    handleCityChange() {

    }

    handleNeighborhoodChanged() {

    }

    render() {
        return <div className="search-criteria">
            <div className="advanced-search form">
                <div className="form-row stretch">
                    <div className="form-column eq">
                        <FormGroup label="Profissional" labelFor="text">
                            <input type="text" name="text" onChange={this.handleProfessionalChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="form-row stretch">
                    <div className="form-column" style={{ width: '60%' }}>
                        <FormGroup label="Cidade" labelFor="text">
                            <SelectCity />
                        </FormGroup>
                    </div>
                    <div className="form-column" style={{ width: '40%' }}>
                        <FormGroup label="Bairro" labelFor="text">
                            <input type="text" name="text" />
                        </FormGroup>
                    </div>
                </div>
                <button className="vibrant">Pesquisar</button>
            </div>
        </div>;
    }
}

SearchBar.propTypes = {
    searchActions: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired
};

export default SearchBar;
