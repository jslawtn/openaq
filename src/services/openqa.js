import Axios from 'axios';

export default {
    getCities(){
        return Axios.get('https://api.openaq.org/v1/cities?country=GB&limit=200');
    },
    getCity(city){
        return Axios.get(`https://api.openaq.org/v1/latest?country=GB&city=${city}`);
    }
}