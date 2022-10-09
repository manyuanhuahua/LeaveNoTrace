import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import videoHome from "../assets/homeVideo.mp4"
import "./style/homepage.css"
import Footer from './Footer';
import { Modal } from '../context/Modal';
import SwitchForm from './auth/switchForm';
import Search from './park/Search';
import { getAllparksThunk } from '../store/park';


const Main = () =>{
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false)
    const [showSignup, setShowSignup] = useState(false);

    const user = useSelector(state => state.session.user);
    const parks = useSelector(state => state.park);
    const parksList = Object.values(parks);
    const [parksIsLoaded, setParksIsLoaded] = useState(false);


    const [searchTerm,setSearchTerm] = useState('')
    const [searchResult,setSearchResult] = useState([])

    useEffect(() => {
        dispatch(getAllparksThunk()).then(() => setParksIsLoaded(true));
    }, [dispatch]);



    const searchHandler = (searchTerm)=>{
        setSearchTerm(searchTerm)
        if(searchTerm !== ''){
            const newParks = parksList.filter((park)=>{
                return park.name.toLowerCase()
                            .includes(searchTerm.toLowerCase())
            })

                setSearchResult(newParks)

        }else{
            setSearchResult(parksList)
        }
    }
    return (
        <div className='home-main-container'>

            <div className='overlay'></div>

                <video src={videoHome} autoPlay loop muted playsInline className='bgvideo'/>
                <div className='content'>
                    <h1>Leave The Road</h1>
                    <h1 className='slogan2'>Take The Trails</h1>
                    <div className='explore-container'>



                    {(!user) && (<div className='explore' onClick={() => setShowModal(true)}  style={{cursor:'pointer'}}><p>Exploring</p></div>)}
                        {showModal && (!user) && (!showSignup) &&
                            (
                                <Modal className='forms-modal' onClose={() => setShowModal(false)}>
                                <SwitchForm />

                            </Modal>
                            )

                    }
                    {(user) && parksIsLoaded && (
                    <>
                    <Search
                        parks={searchTerm.length < 1 ? parksList : searchResult}
                        term={searchTerm}
                        searchKeyWord={searchHandler}
                        />
                    <Link to={'/explore'} className='explore'><p>Exploring</p></Link>
                    </>)}
                    <Footer />
                    </div>
                </div>


        </div>

    )
}

export default Main
