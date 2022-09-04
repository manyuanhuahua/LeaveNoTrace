
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: { lat: 37.72620918325973, lng: -119.55160191563179 }, // Australia.
    });
   const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      draggable: true,
      map,
      panel: document.getElementById("panel"),
    });

    directionsRenderer.addListener("directions_changed", () => {
      const directions = directionsRenderer.getDirections();

      if (directions) {
        computeTotalDistance(directions);
      }
    });
    displayRoute(
        /* new google.maps.LatLng(),
            new google.maps.LatLng(), */

      new google.maps.LatLng({lat: 37.74213, lng: -119.60186}),
      new google.maps.LatLng({lat: 37.75714, lng: -119.59769}),

      directionsService,
      directionsRenderer
    );
  }

  function displayRoute(origin, destination, service, display) {
    service
      .route({
        origin: origin,
        destination: destination,
        /* waypoints: [
          { location: "Adelaide, SA" },
          { location: "Broken Hill, NSW" },
        ], */
        travelMode: google.maps.TravelMode.WALKING,
        avoidTolls: true,
      })
      .then((result) => {
        display.setDirections(result);
      })
      .catch((e) => {
        alert("Could not display directions due to: " + e);
      });
  }

  function computeTotalDistance(result) {
    let total = 0;
    const myroute = result.routes[0];

    if (!myroute) {
      return;
    }

    for (let i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }

    total = total / 1000;
    document.getElementById("total").innerHTML = total + " km";
  }

  window.initMap = initMap;
