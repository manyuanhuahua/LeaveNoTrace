import React, {Fragment} from "react";
import Loading2 from '../../assets/loading2.gif'
import "../style/loader.css"

const LoaderSecond = () =>{
    return (
        <Fragment >
            <img className='loader-img' src={Loading2} style={{display:'block', margin:'auto'}} />
        </Fragment>
    )
}

export default LoaderSecond
