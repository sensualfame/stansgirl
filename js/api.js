import { API_KEYS } from './keys.js';

// Randomize API keys sorting order to evenly distribute the usage of all keys
const API_KEYS_RANDSORT = [...API_KEYS].sort(() => 0.5 - Math.random());

// Fetch client's IP using httpbin
$.get("https://httpbin.org/ip", function(data) {
    (async function() {
        for (let key of API_KEYS_RANDSORT) {
            if (await updateLocation(data.origin, key)) {
                break; // Exit loop if location update is successful
            }
        }
    })();
}, "json");

function updateLocationDetails(response) {
    // Update country and city
    $(".country").html(response.country_name);
    $(".city").html(response.city);

    // Determine the location display string
    const locationDisplay = response.city ? `${response.city}, ${response.country_name}` : response.country_name;

    // Update location information in HTML
    $(".location").html(locationDisplay);

    // Create coordinates string
    const coords = `${response.latitude},${response.longitude}`;

    // Generate the image URL for the map
    const imgUrl = `<img src="https://maps.googleapis.com/maps/api/staticmap?center=${coords}&zoom=14&size=400x300&sensor=false&key=YOUR_GOOGLE_MAPS_API_KEY&markers=color:red%7C${coords}">`;

    // Update the map holder with the new map image
    $("#mapholder").html(imgUrl);
}

function generateGeoApiProxyUrl(ip, token) {
    // Construct the CORS Proxy URL for the geolocation API
    const geoApiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${token}&ip=${ip}`;
    return `https://corsproxy.io/?${encodeURIComponent(geoApiUrl)}`;
}

function updateLocation(ip, token) {
    return new Promise((resolve, reject) => {
        let proxyUrl = generateGeoApiProxyUrl(ip, token);

        $.get(proxyUrl, function(response) {
            updateLocationDetails(response);
            resolve(true);
        }, "json").fail(function(jqXHR) {
            resolve(false);
        });
    });
}
