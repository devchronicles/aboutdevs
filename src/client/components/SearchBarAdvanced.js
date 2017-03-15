import React, { PropTypes } from 'react';
import FormGroup from './FormGroup';
import ButtonGroup from './ButtonGroup';
import SelectCity from './SelectCity';

const SearchBarAdvanced = advancedSearch => (
    <div className="advanced-search form">
        <div className="form-row stretch">
            <div className="form-column grow">
                <FormGroup label="Profissional" labelFor="text">
                    <input type="text" placeholder="Ex:Diarista" name="text" />
                </FormGroup>
            </div>
        </div>
        <div className="form-row">
            <ButtonGroup>
                <button className="pushed">Escolher local</button>
                <button>Perto de mim</button>
            </ButtonGroup>
        </div>
        <div className="form-row stretch">
            <div className="form-column grow">
                <FormGroup label="Cidade" labelFor="text">
                    <SelectCity />
                </FormGroup>
            </div>
            <div className="form-column grow">
                <FormGroup label="Bairro" labelFor="text">
                    <input type="text" placeholder="Ex:Diarista" name="text" />
                </FormGroup>
            </div>
        </div>
        <button className="vibrant">Pesquisar</button>
    </div>
);

SearchBarAdvanced.propTypes = {
    advancedSearch: PropTypes.shape({
        terms: PropTypes.string.isRequired
    }).isRequired
};


export default SearchBarAdvanced;

