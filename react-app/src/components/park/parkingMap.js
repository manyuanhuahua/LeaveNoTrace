/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap,Marker,DirectionsRenderer, LoadScript, MarkerClusterer } from "@react-google-maps/api"

import { useHistory, useParams } from 'react-router-dom';

import {addApiThunk} from "../../store/session"
import LoaderSecond from '../loader/Loader2';








function ParkingMap({park}){
    const history = useHistory()
    const {parkId} = useParams()
    const apiKey = useSelector(state => state.session.api)
    const [dataLoad, setDataLoad] = useState(false)
    const dispatch = useDispatch();
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [ markers, setMarkers ] = useState([]);



    useEffect(() => {
        dispatch(addApiThunk())
        .then(async ()=>{
        const response = await fetch('/api/auth/npskeys')
        if (response.ok) {
              const coors = await response.json();

              setMarkers(coors.parkingLots)
            }
        })
        .then(() => setDataLoad(true));
    }, [dispatch,parkId]);


    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false);
        },2000)
    },[]);

    // if(!isLoaded){
    //   return <MapLoading />
    // }

    console.log('markers-----',markers)

  return dataLoad && (
    <>
        {loading? (
            <div className='loader-container'>
                <LoaderSecond />
            </div>
            ) : (
            <>
    <div className='parking-map-main-box'>

      <div className='right-map-box'>
        {/* initMap */}
        <LoadScript
        googleMapsApiKey={apiKey}
        >
        <GoogleMap
          center={{lat:park.lat,lng:park.log}}
          zoom={9}
          mapContainerStyle={{width:'auto', height:'300px'}}
          options={{
            streetViewControl:false
          }}
          onLoad={map=>setMap(map)}
        >

          <MarkerClusterer>
            {(clusterer)=>

                    markers.map((marker) => {
                      return (
                        <Marker
                          key={marker.id}
                          position={{lat:marker.lat,lng:marker.lng}}
                          icon={{
                            path:
                              "M13,7H10A1,1,0,0,0,9,8v8a1,1,0,0,0,2,0V14h2a3,3,0,0,0,3-3V10A3,3,0,0,0,13,7Zm1,4a1,1,0,0,1-1,1H11V9h2a1,1,0,0,1,1,1ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z",
                            fillColor: "#2775b6",
                            fillOpacity: 0.9,
                            scale: 1.3,
                            strokeColor: "#2775b6",
                            strokeWeight: 0.5,
                          }}
                          clusterer={clusterer}
                          
                        />
                      )
                    })}



          </MarkerClusterer>

        </GoogleMap>
        </LoadScript>


      </div>

    </div>
    </>)
  }
  </>
  )

}



export default ParkingMap;
