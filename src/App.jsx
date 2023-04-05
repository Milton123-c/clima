import { useEffect, useState } from "react";
import axios from "axios";
import fondo from './util/fondo.json';
import { random } from "./util/randomImg";
import { WeatherView } from "./component/WeatherView";
import Loading from "./component/Loading";
import { Search } from "./component/Search";

function App() {
  const [weather, setWeather] = useState();
  const [Location, setLocation] = useState();
  const [loading, setLoading] = useState(false);
  const [permisos, setPermisos] = useState(false);
  const [errorsl, setErrorsl] = useState(true);
  const [messgae, setMessage] = useState(`Debe permitir el acceso a su ubicación para utilizar esta función. Por favor,
  active los permisos de geolocalización en la configuración de su navegador o dispositivo.`);
  const [image, setImage] = useState(fondo[random(fondo)]);
  const [background, setBackground] = useState({
    backgroundImage: `url(${image})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    transition: 'background-image 0.5s ease-in-out'
  });


  useEffect(() => {
    const succes = ({ coords }) => {
      const lon = coords.longitude;
      const lat = coords.latitude;

      setLocation({ lon, lat });
    };

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const errors = (error) => {
      setErrorsl(false);
      if(permisos) return;

      if(error.code === error.PERMISSION_DENIED){

        navigator.geolocation.getCurrentPosition(succes);

        const ms = `Debe permitir el acceso a su ubicación para utilizar esta función. Por favor,
         active los permisos de geolocalización en la configuración de su navegador o dispositivo.`;

        setMessage(ms)

      }
     

    }

    navigator.geolocation.getCurrentPosition(succes, errors,options);

  }, [permisos]);

  useEffect(() => {
    if (!Location) return;

    const keys = "cdda79c8ccd85b98a148d57830757d71";

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${Location.lat}&lon=${Location.lon}&appid=${keys}`;

    axios
      .get(url)
      .then((res) => {
        setWeather(res.data);
        setTimeout(() => {
          setLoading(true);
        }, 5000);

        setErrorsl(true);
      })
      .catch((err) => {
        setErrorsl(false);
      });
  }, [Location]);

  useEffect(()=>{
     setBackground(
      {
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        transition: 'background-image 0.5s ease-in-out'
      }
     )

  }, [image])

 

  return (
    <div className="App" style={background}>
      {errorsl ? (
        <>
          {loading ? <><WeatherView data={weather}  /> <Search setImage={setImage} setWeather={setWeather} /></> : <Loading />}

          
        </>
      ) : (
        <div className="conect__error">
          <div className="animate__animated animate__flipInX">
           
            <img src="/img/sad.gif" alt="triste" />

            <p>{messgae}</p>
          
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
