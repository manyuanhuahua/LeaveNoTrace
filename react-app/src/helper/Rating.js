import react, { useState } from 'react'
import {FaStar} from 'react-icons/fa'

// function Star(){

//     return (
//         <svg class="w-6 h-6" fill="#688E4E" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//             d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976
//             2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1
//             1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
//             </path>
//         </svg>
//     )
// }





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
                        // onMouseEnter={()=>setHover(ratingValue)}
                        // onMouseleave={()=>setHover(null)}
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
