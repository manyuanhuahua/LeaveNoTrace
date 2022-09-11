import React, {Fragment} from "react";
import Loading from "../../assets/loading.gif"
import "../style/loader.css"

const Loader = () =>{
    return (
        <Fragment >
            <img className='loader-img' src={Loading} style={{display:'block', margin:'auto'}} />
        </Fragment>
    )
}

export default Loader
