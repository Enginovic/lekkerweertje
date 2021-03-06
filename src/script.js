import axios from 'axios';
import _ from "lodash";

export default {
  name: 'App',
  data () {
    return {
      api_key: 'ceb9c8b643af2ebe2c6539747086ade0',
      url_base: 'https://api.openweathermap.org/data/2.5/weather/',
      
      location: '',
      
      weather: null,
      cities: [],

      isInvalidCity: false,
      isLoading: false,
    };
  },
  methods: {
    getCities(value) {
      this.isLoading = true;
      
      fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=NL&namePrefix=${value}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          "x-rapidapi-key": "22b936eb1dmshace1924db8f69e5p1d8d85jsnda80c2481b30"
        }
      })
      .then(response => {
        return response.json();
      })
      .then(cities => {
        this.cities = [...new Set(cities.data.map((city) => {
          return city.name;
        }))];
        this.isLoading = false;
      })
      .catch(err => {
        console.log('getCities error: ', err);
        this.isLoading = false;
      });
    },
    fetchWeather(location) {
      axios.get(`${this.url_base}?q=${location}&units=metric&APPID=${this.api_key}`)
      .then(results => {
        this.weather = results.data;
        
        this.isInvalidCity = false;
        
        this.location = location;
        this.cities = [];
      })
      .catch(err => {
        console.log('fetchWeatcher error: ', err);
        this.isInvalidCity = true;
      });
    },
    dateBuilder() {
       const d = new Date();
       const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
       const days = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];

       const day = days[d.getDay()];
       const date = d.getDate();
       const month = months[d.getMonth()];
       const year = d.getFullYear();

       return `${day} ${date} ${month} ${year}`;
    },
    setLocation(city) {
      this.fetchWeather(city);
    },
    deleteLocation() {
      this.location = '';
    },
    debounceInput: _.debounce(function(e) {
      if (!e.target.value) {
        return;
      }
      
      this.getCities(e.target.value);
    }, 1000),
  },
  watch: {
    location(value) {
      if (!value.length) {
        this.cities = [];
      }
    }
  }
};
