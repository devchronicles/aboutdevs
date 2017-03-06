import axios from 'axios';

axios.get('http://www.geonames.org/childrenJSON?geonameId=3469034')
.then(res => {
    console.log(res.data);
});