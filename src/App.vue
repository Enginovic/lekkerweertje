<template>
  <div id="app" :class="weather && weather.main.temp > 16 ? 'warm' : 'cold'">
    <main>
      <div class="search-box">
        <input 
          type="text" 
          class="search-bar" 
          placeholder="Zoek op plaats"
          v-model="location"
          @keyup.enter="fetchWeather"
        />

        <template v-if="cities.length">
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

        <div 
          v-if="location.length"
          class="icon close"
          @click="deleteLocation()">
          X
        </div>
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

<script src="./script.js"></script>
<style src="./style.scss" lang="scss"></style>
