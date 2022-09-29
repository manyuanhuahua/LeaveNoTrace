import React, { useEffect, useState,useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory} from "react-router-dom";
import "../style/search.css"
import icon from "../../assets/searchbar.png"

const Search = ({parks,term,searchKeyWord})=>{
    const [select,setSelect] = useState(0)
    const [selectValue,setSelectValue] = useState('')
    const history = useHistory()
    const inputEl = useRef('')
    const [disable,setDisable] = useState(false)


    const getSearchTerm = () =>{

        searchKeyWord(inputEl.current.value)
        setSelectValue(inputEl.current.value)
    }

    const noResult = ['']




    return (
        <div className={(term).length <1? 'search-container':'search-container active'}>
            <div className='search-inner'>
                <input ref={inputEl} type='text' value={selectValue} onChange={getSearchTerm} placeholder='Search Parks' />
                <div className='search-button'
                    onClick={()=>{
                        if(parks.length !== 0) history.push(`/parks/${select}`)}}
                    >
                    <img src={icon} style={{width:'20px',height:'20px'}}/>
                </div>
            </div>
            <div className='dropdown'>
                <div className='list-group'>
                    {parks.length < 1? (<li
                                className='list-option'
                                disable={true}>
                                No result found, please try Explore to find more info!
                            </li>)
                    :parks.map((option)=>{
                        return (
                            <li
                                className='list-option'
                                disable={disable ? 'true' : 'false'}
                                onClick={()=> {
                                    if(!disable){
                                        setSelectValue('')
                                        setSelectValue(option.name);
                                        setSelect(option.id)}}
                                    }>
                                {option.name}
                            </li>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default Search
