import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import { useEffect, useState } from "react";
import ExampleChart from "../../components/chart/ExampleChart";
import axios from "axios";
import { AppProvider } from "../../context/AppContext";

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [newWeatherData, seNewtWeatherData] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      await axios
        .get(
          "https://iotsmarthome-5d008-default-rtdb.firebaseio.com/iotdata/dht.json"
        )
        .then(async (result) => {
          await setWeatherData(result.data);
        })
        .catch((err) => { });
    };

    const fetchNewData = async () => {
      await axios
        .get(
          "https://iotsmarthome-5d008-default-rtdb.firebaseio.com/iotdata.json"
        )
        .then(async (result) => {
          seNewtWeatherData(result.data);
        })
        .catch((err) => { });
    };

    fetchData();
    fetchNewData();

    const timeOutFetchData = setTimeout(fetchData(), 5000);
    const timeOutFetchDataNew = setTimeout(fetchNewData(), 5000);
    clearTimeout(timeOutFetchData);
    clearTimeout(timeOutFetchDataNew);

  }, []);

  return (
    <div className="home">
      <AppProvider>
        <Sidebar />
      </AppProvider>
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget data={weatherData} newdata={newWeatherData} type="nhietdo" />
          <Widget data={weatherData} newdata={newWeatherData} type="doam" />
          <Widget data={weatherData} newdata={newWeatherData} type="canhbao" />
          <Widget
            data={weatherData}
            newdata={newWeatherData}
            type="dieukhien"
          />
        </div>
        <div className="charts">
          <Featured data={weatherData} />
          <ExampleChart title="" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Home;
