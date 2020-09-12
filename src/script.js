// import _ from "lodash";

export default {
  name: 'App',
  data () {
    return {
      api_key: 'ceb9c8b643af2ebe2c6539747086ade0',
      url_base: 'https://api.openweathermap.org/data/2.5/weather/',
      location: '',
      selectedCity: '',
      weather: null,
      cities: [],
    };
  },
  watch: {
    location: (val) => {
      this.getCities(val);
    },
  },
  methods: {
    getCities(val) {
      console.log('get cities');
      fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=NL&namePrefix=${val}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          "x-rapidapi-key": "22b936eb1dmshace1924db8f69e5p1d8d85jsnda80c2481b30"
        }
      })
      .then((response) => {
        return response.json();
      })
      .then(cities => {
        this.cities = [...new Set(cities.data.map((city) => {
          return city.name;
        }))];
      })
      .catch(err => {
        console.log(err);
      });
    },
    fetchWeather() {
      fetch(`${this.url_base}?q=Netherlands&${this.location}&units=metric&APPID=${this.api_key}`)
      .then((response) => {
        return response.json();
      }).then((results) => {
        this.weather = results;
      })
      .catch(err => {
        console.log(err);
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
      this.location = city;
      this.selectedCity = city;
      this.cities = [];
      this.fetchWeather();
    },
    deleteLocation() {
      this.location = '';
    },
  },
};
