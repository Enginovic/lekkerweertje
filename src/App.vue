<template>
  <div id="app" :class="!isInvalidCity && weather && weather.main.temp > 16 ? 'warm' : 'cold'">
    <main>
      <template v-if="isInvalidCity">
        <div class="error">
          Oepsie, plaatst bestaat niet. Probeer het opnieuw :)
        </div>
      </template>

      <div class="search-box" :class="cities.length ? 'results' : ''">
        <input 
          type="text" 
          class="search-bar" 
          placeholder="Plaats, stad of gemeente"
          v-model="location"
          @keyup.enter="fetchWeather(location)"
          @input="debounceInput"
        />

        <div class="icons" v-if="location.length">
          <div class="icon close" @click="deleteLocation()">
            <v-icon name="x"></v-icon>
          </div>
          <div class="icon search" @click="setLocation(location)">
            <v-icon name="search"></v-icon>
          </div>
        </div>
      </div>

      <div class="loader-wrapper" v-if="isLoading">
        <div class="loader"></div>
      </div>

      <template v-if="cities.length && location.length">
        <ul class="cities">
            <li
              class="city"
              v-for="city in cities"
              :key="city"
              @click="setLocation(city)"
            >
              {{ city }}
            </li>
        </ul>
      </template>
      
      <div class="weather-wrap">
        <div class="location-box">
          <div class="date">{{ dateBuilder() }}</div>
        </div>

        <div class="weather-box" v-if="weather">
          <div class="location">{{ weather.name }}</div>
          <div class="temp">{{ Math.round(weather.main.temp) }}º</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss"></style>
