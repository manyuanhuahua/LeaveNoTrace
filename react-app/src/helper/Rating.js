import react, { useState } from 'react'
import {FaStar} from 'react-icons/fa'

const StarRating = ({rating, setRating}) =>{
    const [hover, setHover] = useState(null)

    return (
        <div className='box'>
            {[...Array(5)].map((star,i)=>{
                const ratingValue = i + 1
                return (
                    <label>
                        <input
                        type='radio'
                        name='rating'
                        value={ratingValue}
                        onClick={()=>(setRating(ratingValue))}
                        style={{display:'none'}}
                        key={i}

                        />
                        <FaStar className='star'
                        size={25}
                        color={ratingValue <= (hover || rating) ? '#688E4E' : '#e4e5e9'}
                        onMouseEnter={()=>setHover(ratingValue)}
                        onMouseLeave={()=>setHover(null)}
                        style={{cursor:'pointer',transition:'color 20ms'}}

                        />
                    </label>
                )
            })}


        </div>
    )
}

export default StarRating
