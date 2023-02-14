import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import WarningIcon from "@mui/icons-material/Warning";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

const Widget = ({ type, data, newdata }) => {
  const [diff, setDiff] = useState(null);
  const dt = data.slice(-1);
  const [loading, setLoading] = useState(true);
  let dulieu;
  useEffect(() => {
    newdata ? setLoading(false) : setLoading(true);
  });

  switch (type) {
    case "nhietdo":
      dulieu = {
        title: "Nhiệt độ",
        isMoney: data[0] ? true : false,
        query: "users",
        amount: newdata.dhtsensor ? (
          newdata.dhtsensor ? (
            newdata.dhtsensor.nhietdo
          ) : 0 ? (
            <PulseLoader color="#36d7b7" />
          ) : (
            <PulseLoader color="#36d7b7" />
          )
        ) : (
          <PulseLoader color="#36d7b7" />
        ),
        icon: (
          <ThermostatIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "doam":
      dulieu = {
        title: "Độ ẩm",
        isMoney: data[0] ? true : false,
        amount: newdata.dhtsensor ? (
          newdata.dhtsensor ? (
            newdata.dhtsensor.doam
          ) : data[0] ? (
            <PulseLoader color="#36d7b7" />
          ) : (
            <PulseLoader color="#36d7b7" />
          )
        ) : (
          <PulseLoader color="#36d7b7" />
        ),
        icon: (
          <ThermostatIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "canhbao":
      dulieu = {
        title: "Cảnh báo nhiệt đọ",
        isMoney: false,
        amount: newdata ? (
          newdata.Flame === 0 ? (
            "Bình thường"
          ) : newdata.Flame === 1 ? (
            "Cảnh báo"
          ) : (
            <PulseLoader color="#36d7b7" />
          )
        ) : (
          <PulseLoader color="#36d7b7" />
        ),
        icon: (
          <WarningIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "dieukhien":
      dulieu = {
        title: "Cảnh báo chuyển động",
        query: "products",
        amount: newdata ? (
          newdata.chuyendong === 0 ? (
            "Bình thường"
          ) : newdata.chuyendong === 0 ? (
            "Cảnh báo"
          ) : (
            <PulseLoader color="#36d7b7" />
          )
        ) : (
          <PulseLoader color="#36d7b7" />
        ),
        isMoney: false,
        icon: (
          <DirectionsWalkIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{dulieu.title}</span>
        <span className="counter">
          {dulieu.amount} {dulieu.isMoney && dulieu.title === "Độ ẩm" ? "%" : dulieu.isMoney && dulieu.title === "Nhiệt độ" ? "°C" : " "}
        </span>
        <span className="link">{dulieu.link}</span>
      </div>
      <div className="right">
        <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {diff < 0 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          {diff}
        </div>
        {dulieu.icon}
      </div>
    </div>
  );
};

export default Widget;
