import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import {getAllparksThunk} from "../../store/park"
import Loader from '../loader/Loader';


function ParkList() {
    const dispatch = useDispatch();
    const parks = useSelector(state => state.park);
    // const session = useSelector(state => state.session.user);
    const [parksIsLoaded, setParksIsLoaded] = useState(false);
    const parksList = Object.values(parks);

    useEffect(() => {
        dispatch(getAllparksThunk()).then(() => setParksIsLoaded(true));
    }, [dispatch]);


    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false);
        },2000)
    },[]);

  return (parksIsLoaded &&
    <div className='parkList-container'>
        {parksList.map(park => (
            <div className="card-container" key={park.id}>

                <NavLink to={`/parks/${park.id}`} style={{textDecoration:'none',textAlign:'center',color:'#333'}}>
                    <div className='img-box'>
                        <img className="park-img" alt="" src={park.preview_img}></img>
                    <h4 >{park.name}</h4>
                    </div>
                </NavLink>
                <div className='park-list-content'>
                <p>Avg raing:{park.avgRating}</p>
                <p>total ratings:{park.totalReviews}</p>
                <p>{park.state}</p>
                <p>{park.acreage} acres</p>
                </div>
            </div>)
            )
        }
    </div>
  );
}

export default ParkList;
