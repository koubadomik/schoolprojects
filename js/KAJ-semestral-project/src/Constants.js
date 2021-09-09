'use strict';

export default {
    URL: 'http://localhost:8080/api',
    MEDIA_PATH: './resource/media/',
    LOCATION_SOURCE: 'https://maps.googleapis.com/maps/api/geocode/json?sensor=true',
    MAX_FILE_SIZE: 0.5 //because of local storage limit (better to use indexed DB)
};