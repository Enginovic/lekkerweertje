<template>
  <div id="app" :class="weather && weather.main.temp > 16? 'warm' : 'cold'">
    <main>
      <div class="search-box">
        <input 
          type="text" 
          class="search-bar" 
          placeholder="Zoeken..."
          v-model="location"
          @keyup.enter="fetchWeather"
        />
      </div>
      
      <div class="weather-wrap">
        <div class="location-box">
          <div class="date">{{ dateBuilder() }}</div>
        </div>

        <div class="weather-box" v-if="weather">
          <div class="temp">{{ Math.round(weather.main.temp) }}º</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      api_key: 'ceb9c8b643af2ebe2c6539747086ade0',
      url_base: 'https://api.openweathermap.org/data/2.5/weather/',
      location: '',
      weather: null,
    }
  },
  methods: {
    fetchWeather() {
      fetch(`${this.url_base}?q=${this.location}&units=metric&APPID=${this.api_key}`)
      .then((response) => {
        return response.json();
      }).then((results) => {
        this.weather = results;
      });
    },
    dateBuilder() {
       const d = new Date();
       const months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
       const days = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];

       const day = days[d.getDay()];
       const date = d.getDate();
       const month = months[d.getMonth()];
       const year = d.getFullYear();

       return `${day} ${date} ${month} ${year}`;
    }
  }
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'montserrat', sans-serif;
  }

  #app {
    background-image: url('./assets/cold-bg.jpg');
    background-size: cover;
    background-position: bottom;

    &.warm {
    background-image: url('./assets/warm-bg.jpg');
    }
    &.cold {
    background-image: url('./assets/cold-bg.jpg');
    }
  }

  main {
    min-height: 100vh;
    padding: 25px;
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.35));
  }

  .search-box {
    width: 100%;
    margin-bottom: 30px;
  }

  .search-bar {
    display: block;
    width: 100%;
    padding: 15px;

    color: #313131;
    font-size: 21px;

    appearance: none;
    border: none;
    outline: none;
    background: none;

    box-shadow: 0 0 16px rgba(0, 0, 0, .25);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0 16px;
    transition: .4s;

    &:focus {
      box-shadow: 0 0 16px rgba(0, 0, 0, .25);
      background-color: rgba(255, 255, 255, 0.75);
      border-radius: 16px 0;
    }
  }

  .date {
    color: #fff;
    font-size: 20px;
    font-weight: 300;
    font-style: italic;
    text-align: center;
  }
  
  .weather-box {
    text-align: center;
    
    .location {
      color: #fff;
      font-size: 21px;
      font-weight: 500;
      text-align: center;
      text-shadow: 1px 3px rgba(0, 0, 0, .25);
    }

    .temp {
      display: inline-block;
      padding: 10px 25px;
      color: #fff;
      font-size: 102px;
      font-weight: 900;

      text-shadow: 3px 6px rgba(0, 0, 0, .25);
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 16px;
      margin: 30px 0;

      box-shadow: 3px 6px rgba(0, 0, 0, .25);
    }

    .weather {
      color: #fff;
      font-size: 14px;
      font-weight: 700;
      font-style: italic;
      text-shadow: 3px 6px rgba(0, 0, 0, .25);
    }
  }
</style>
