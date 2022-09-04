import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";


function ShowMap() {
  const dispatch = useDispatch();
  const activity = useSelector(state => state.review);
  const session = useSelector(state => state.session.user);
  const [reviewsIsLoaded, setReviewsIsLoaded] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);


  const reviewsList = Object.values(reviews);

    useEffect(() => {
        dispatch(getReviewsThunk(trailId)).then(() => setReviewsIsLoaded(true));
    }, [dispatch,trailId,editModal]);


  const initMap =()=> {
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


}
export default ShowMap;
