import "./forecast.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

const DAY_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Forecast = ({ data }) => {
  console.log("forecast data", data.list);

  const getDayOfWeek = (dt) => {
    const date = new Date(dt);
    return DAY_OF_WEEK[date.getDay()];
  };

  const getTime = (dt) => {
    let localHour = new Date(dt).getHours();
    let localMins = new Date(dt).getMinutes();
    if (localMins < 10) {
      localMins = "0" + localMins;
    }

    if (localHour >= 12) {
      if (localHour > 12) {
        localHour = localHour - 12;
      }
      localHour = localHour + ":" + localMins + " pm";
    } else {
      if (localHour === 0) {
        localHour = 12;
      }
      localHour = localHour + ":" + localMins + " am";
    }
    return localHour;
  };

  const getDayFromTimestamp = (dt) => {
    const date = new Date(dt);
    const newDate =
      getDayOfWeek(date) +
      ", " +
      MONTH[date.getMonth()] +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear();
    return newDate;
  };
  const getDate = (dt, idx) => {
    const time = getTime(dt);
    const date = getDayFromTimestamp(dt);

    if (time === "12:00 am" || idx === 0) {
      console.log(true, time);

      return (
        <div className="daily-header">
          <p>{date}</p>
        </div>
      );
    }
    return;
  };

  const getWindDirection = (deg) => {
    if (deg >= 338 || deg < 23) {
      return "S";
    } else if (deg >= 23 && deg < 68) {
      return "SW";
    } else if (deg >= 68 && deg < 113) {
      return "W";
    } else if (deg >= 113 && deg < 158) {
      return "NW";
    } else if (deg >= 158 && deg < 203) {
      return "N";
    } else if (deg >= 203 && deg < 248) {
      return "NE";
    } else if (deg >= 248 && deg < 293) {
      return "E";
    } else if (deg >= 293 && deg < 338) {
      return "SE";
    } else {
      return deg;
    }
  };
  return (
    <>
      <label className="title">Hourly Forecast </label>
      <Accordion allowZeroExpanded>
        {data.list.map((item, idx) => {
          const time = getTime(item.dt_txt);

          return (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  {getDate(item.dt_txt, idx)}

                  <div className="daily-item">
                    <p className="time">{time}</p>
                    <p className="temperature">{parseInt(item.main.temp)}°F</p>

                    <p className="weather-description">
                      <img
                        alt="weather"
                        className="icon-small"
                        src={`icons/${item.weather[0].icon}.png`}
                      />{" "}
                      {item.weather[0].main}
                    </p>
                    <p className="preciptation">
                      <svg
                        class="Icon--icon--3wCKh Icon--actionTheme--sZu_q DetailsSummary--precipIcon--3mKHx"
                        set="heads-up"
                        name="precip-rain-single"
                        theme="action"
                        data-testid="Icon"
                        aria-hidden="false"
                        aria-label="Chance of Rain"
                        role="img"
                        viewBox="0 -2 5 10"
                      >
                        <title>Rain</title>
                        <path d="M4.7329.0217c-.1848-.059-.3855.0064-.4803.148L.2731 5.1191c-.0814.0922-.1501.1961-.196.3108-.2469.6009.1185 1.2697.8156 1.4943.6914.226 1.447-.0712 1.7-.6585L4.9662.4987l.0111-.0282c.073-.1807-.036-.379-.2444-.4488z"></path>
                      </svg>
                      <span>{item.pop * 100}%</span>
                    </p>
                    <p className="winds">
                      <svg
                        class="Icon--icon--3wCKh Icon--actionTheme--sZu_q DetailsSummary--conditionsIcon--1P-Au"
                        set="current-conditions"
                        name="wind"
                        theme="action"
                        data-testid="Icon"
                        aria-hidden="false"
                        aria-label="Wind"
                        role="img"
                        viewBox="0 0 24 24"
                      >
                        <title>Wind</title>
                        <path
                          d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742"
                          stroke-width="2"
                          stroke="currentColor"
                          stroke-linecap="round"
                          fill="none"
                        ></path>
                      </svg>
                      {getWindDirection(item.wind.deg)} {item.wind.speed} mph
                    </p>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-item-grid">
                  <div className="feels-like">
                    <svg class="Icon--icon--3wCKh Icon--actionTheme--sZu_q DetailsTable--icon--1FR4N" theme="action" set="current-conditions" name="feels-like" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Feels-Like Temperature</title><path d="M9.94 15.406v.323c.974.358 1.671 1.325 1.671 2.461 0 1.441-1.122 2.61-2.505 2.61-1.384 0-2.506-1.169-2.506-2.61 0-1.136.697-2.103 1.67-2.461v-.323a2.088 2.088 0 0 1-1.252-1.914V5.488a2.088 2.088 0 1 1 4.176 0v8.004c0 .856-.516 1.592-1.253 1.914zM9.15 4.9a.75.75 0 0 0-.75.75v5.33h1.5V5.65a.75.75 0 0 0-.75-.75zM15.4 8a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.8a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>
                    <div>
                      <p>Feels like</p>
                      <p>{parseInt(item.main.feels_like)}°F</p>
                    </div>
                  </div>
                  <div className="humidity">
                    <svg class="Icon--icon--3wCKh Icon--actionTheme--sZu_q DetailsTable--icon--1FR4N" theme="action" set="current-conditions" name="humidity" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Humidity</title><path fill-rule="evenodd" d="M11.743 17.912a4.182 4.182 0 0 1-2.928-1.182 3.972 3.972 0 0 1-.614-4.962.743.743 0 0 1 .646-.349c.234 0 .476.095.66.275l4.467 4.355c.385.376.39.998-.076 1.275a4.216 4.216 0 0 1-2.155.588M11.855 4c.316 0 .61.14.828.395.171.2.36.416.562.647 1.857 2.126 4.965 5.684 4.965 8.73 0 3.416-2.85 6.195-6.353 6.195-3.505 0-6.357-2.78-6.357-6.195 0-3.082 2.921-6.406 4.854-8.605.242-.275.47-.535.673-.772A1.08 1.08 0 0 1 11.855 4"></path></svg>
                    <div>
                      <p>Humidity</p>
                      <p>{parseInt(item.main.humidity)}%</p>
                    </div>
                  </div>
                  }
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default Forecast;
