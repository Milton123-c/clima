import { useEffect, useState } from "react";
import axios from "axios";
import { createClient } from "pexels";
import { random } from "./util/randomImg";
import { WeatherView } from "./component/WeatherView";
import Loading from "./component/Loading";
import { Search } from "./component/Search";

function App() {
  const [weather, setWeather] = useState();
  const [Location, setLocation] = useState();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [img, setImg] = useState();
  const [permisos, setPermisos] = useState(false);
  const [errors, setErrors] = useState(true);
  const [messgae, setMessage] = useState(`Debe permitir el acceso a su ubicación para utilizar esta función. Por favor,
  active los permisos de geolocalización en la configuración de su navegador o dispositivo.`);

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
      setErrors(false);
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

        setErrors(true);
      })
      .catch((err) => {
        setErrors(false);
      });
  }, [Location]);

  useEffect(() => {
    const client = createClient(
      "563492ad6f917000010000014863f4965ca747b9ae69b25d59d6a8f3"
    );
    const query = "paisaje";
    client.photos.search({ query }).then((photo) => setImage(photo.photos));
  }, []);

  useEffect(() => {
    if (!image) return;

    const photo = image[random(image)];

    setImg(photo);
  }, [image]);

  const background = {
    backgroundImage: `url(${img?.src.original})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

 

  return (
    <div className="App" style={background}>
      {errors ? (
        <>
          {loading ? <WeatherView data={weather} /> : <Loading />}

          <Search setWeather={setWeather} />
        </>
      ) : (
        <div className="conect__error">
          <div>
           
            <img src="/img/sad.gif" alt="triste" />

            <p>{messgae}</p>
          
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
