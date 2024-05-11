/*=======================================================*/
/*                                                       */
/*  Olisa Nweze (2024)                                   */
/*  github.com/olisanweze                                */
/*                                                       */
/*=======================================================*/

'use strict';
import { select, listen } from './utils.js';

/*=======================================================*/
/*  Organizer                                            */
/*=======================================================*/

const message = select('.map p')

//  The 'success' callback function
function getLocation(position) {
  const { latitude, longitude } = position.coords;

  mapBuild(longitude, latitude);
}

//  The 'error/failure' callback function
function errorHandler() {
  message.innerText = 'Unable to retrieve user location';
}

const options = {
  enableHighAccuracy: true, // Request high accuracy location
  maximumAge: 30000, // Accept a cached position whose age is no greater than 
                     // the specified time (milliseconds)
  timeout: 5000 // Maximum length of time (milliseconds) the device is 
                // allowed to take in order to return a position
}

mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpc2Fud2V6ZSIsImEiOiJjbHV1aWhmcWQwYWsxMnFvdjE2aHFsa3ZjIn0.gyU5LVBd-DSepVIOzD1LTA';

function mapBuild(longitude, latitude) {
  const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [longitude, latitude], // starting position [lng, lat]
  zoom: 15, // starting zoom
  pitch: 45
  });

  map.dragPan.disable();
  map.keyboard.disable();
  map.scrollZoom.disable();
  map.doubleClickZoom.disable();
  map.touchZoomRotate.disable();

  const marker1 = new mapboxgl.Marker({color: '#1e90ff'})
  .setLngLat([longitude, latitude])
  .addTo(map);
}

function genMap() {
  if ('geolocation' in navigator) {
    message.innerText = 'Please wait while location loads';
    navigator.geolocation.watchPosition(
      getLocation, errorHandler, options
    );
  } else {
    message.innerText = 'Geolocation is not supported by your browser';
  }
}

listen('load', window, genMap);