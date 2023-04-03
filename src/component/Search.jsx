import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Search = ({setWeather}) => {

    const[go, setGo] = useState();
    const [error, setError] = useState(false)

    useEffect(()=>{

        if(!go) return;

        const keys = "cdda79c8ccd85b98a148d57830757d71";

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${go}&appid=${keys}`)
        .then(res => {
          setWeather(res.data);
          setError(false)
        })
        .catch(err =>{ 
          setError(true);
          
        })

    }, [go])

const handleSearch = (e) => {
  e.preventDefault();
  setGo(e.target.search.value);
}


  return (
    <div className='form__content'>

        <form  className='form' onSubmit={handleSearch}>
            <input type="search" name="" placeholder='Search City name' id="search"  required/>

            <input type="submit" value="Search City" />
        </form>

        
        {
          error ?
          <p  className='error__city'>
            Sorry, the city does exist
          </p>
          
          :
          ""
        }
     

    </div>
  )
}
