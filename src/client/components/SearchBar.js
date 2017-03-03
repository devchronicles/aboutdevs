import React from 'react';
import Select from 'react-select';

const SearchBar = () => {
    const options = [
        { value: 'one', label: 'Juiz de Fora · MG' },
        { value: 'two', label: 'Two' }
    ];

    function logChange(val) {
        console.log(`Selected: ${val}`);
    }

    return (
        <div className="search-bar">
            <Select
                className="city-select"
                name="form-field-name"
                value="one"
                options={options}
                onChange={logChange}
            />
            <input id="search-text" name="search-text" type="text" placeholder="Ex: Diarista" />
            <button>Pesquisar</button>
        </div>);
};

export default SearchBar;
