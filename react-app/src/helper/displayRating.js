import react, { useState } from 'react'
import {FaStar,FaStarHalf} from 'react-icons/fa'

const DisplayRating = ({rating}) =>{

    return (
        <div className='box'>
             {[...Array(5)].map((star,i)=>{
                        const ratingValue = i + 1
                        if(ratingValue <= rating){
                            return <FaStar className='star'
                            size={20}
                            color={'#688E4E'}
                            />
                        }else if((ratingValue < rating)&(ratingValue +0.5 > rating)){
                            <FaStar className='star'
                                size={20}
                                color={'#e4e5e9'}
                                />
                        // }else if(ratingValue + 0.5 == trail.avgRating){
                        //     return <FaStarHalf className='half-star' size={20} color={'#688E4E'}/>
                        }else if((ratingValue - 0.5 <= rating)&(ratingValue > rating)){
                            return <FaStarHalf className='half-star' size={20} color={'#688E4E'}/>
                        }else{
                            return (
                                    <FaStar className='star'
                                        size={20}
                                        color={'#e4e5e9'}
                            />)
                        }

                        })}
                </div>
                )
            }




export default DisplayRating
