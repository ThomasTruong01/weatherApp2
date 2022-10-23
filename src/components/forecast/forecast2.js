import "./forecast2.css";
import Accordion from 'react-bootstrap/Accordion';

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

  const getDayOfWeek = (dt) => {
    const date = new Date(dt);
    return DAY_OF_WEEK[date.getDay()];
  };

  const getTime = (dt) => {
    let localHour = new Date(dt).getHours();

    if (localHour >= 12) {
      if (localHour > 12) {
        localHour = localHour - 12;
      }
      localHour = localHour + " pm";
    } else {
      if (localHour === 0) {
        localHour = 12;
      }
      localHour = localHour + " am";
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

    if (time === "12 am" || idx === 0) {
      return (
        <div className="daily-header">
          <p>{date}</p>
        </div>
      );
    }
    return;
  };

  const formatDate = dt => {
    const t = dt.split(/[- :]/);
    const d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5])
    return d;
  }

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
      <Accordion defaultActiveKey="0">
        {data.list.map((item, idx) => {
          const dt = formatDate(dt);
          const time = getTime(dt);
          return (
            <div key={idx}>
                  {getDate(dt, idx)}
            <Accordion.Item eventKey={idx}>
                <Accordion.Header>

                  <div className="daily-item">
                    <div className="daily-item-detail time"><label>{time}</label></div>

                    <div className="daily-item-detail temperature">
                      <label className="weather-item-title">Temperature</label>
                      <div>
                        <p>{parseInt(item.main.temp)}°F</p>
                      </div>
                    </div>

                    <div className="daily-item-detail weather-description">
                      <label className="weather-item-title">Conditions</label>
                      <div>
                        <img alt="weather" className="icon-small" src={`icons/${item.weather[0].icon}.png`} />{" "}
                        <p>{item.weather[0].main}</p>
                      </div>
                    </div>
                    <div className="daily-item-detail preciptation">
                      <label className="weather-item-title">Preciptation</label>
                      <div>
                        <svg className="icon-small" set="heads-up" name="precip-rain-single" theme="action" data-testid="Icon" aria-hidden="false" aria-label="Chance of Rain" role="img" viewBox="0 -2 5 10" ><title>Rain</title><path d="M4.7329.0217c-.1848-.059-.3855.0064-.4803.148L.2731 5.1191c-.0814.0922-.1501.1961-.196.3108-.2469.6009.1185 1.2697.8156 1.4943.6914.226 1.447-.0712 1.7-.6585L4.9662.4987l.0111-.0282c.073-.1807-.036-.379-.2444-.4488z"></path></svg>
                        <p>{Math.round(item.pop*100)}%</p>
                      </div>
                    </div>
                    <div className="daily-item-detail winds">
                      <label className="weather-item-title">Wind Speed</label>
                      <div>
                        <svg className="icon-small" set="current-conditions" name="wind" theme="action" data-testid="Icon" aria-hidden="false" aria-label="Wind" role="img" viewBox="0 0 24 24" ><title>Wind</title><path d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742" strokeWidth="2" stroke="currentColor" strokeLinecap="round" fill="none" ></path></svg>
                        <p>{getWindDirection(item.wind.deg)} {item.wind.speed} <span>mph</span></p>
                      </div>
                    </div>
                  </div>
                </Accordion.Header>
              <Accordion.Body>
                <div className="hourly-item-grid">
                  <div className="weather-item">
                    <svg className="icon" theme="action" set="current-conditions" name="feels-like" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Feels-Like Temperature</title><path d="M9.94 15.406v.323c.974.358 1.671 1.325 1.671 2.461 0 1.441-1.122 2.61-2.505 2.61-1.384 0-2.506-1.169-2.506-2.61 0-1.136.697-2.103 1.67-2.461v-.323a2.088 2.088 0 0 1-1.252-1.914V5.488a2.088 2.088 0 1 1 4.176 0v8.004c0 .856-.516 1.592-1.253 1.914zM9.15 4.9a.75.75 0 0 0-.75.75v5.33h1.5V5.65a.75.75 0 0 0-.75-.75zM15.4 8a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.8a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>
                    <div>
                      <p className="weather-item-title">Feels like</p>
                      <p className="weather-item-data">{parseInt(item.main.feels_like)}°F</p>
                    </div>
                  </div>
                  <div className="weather-item">
                  <svg className="icon" theme="action" set="heads-up" name="cloud" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Cloud</title><path d="M21.786 11.898a3.322 3.322 0 0 0-4.04-2.357l-.356.095a4.911 4.911 0 0 0-9.599.546l-.129-.034a2.804 2.804 0 0 0-3.486 3.032l-1.203.323a1.312 1.312 0 0 0 .42 2.576h15.103s.626-.029.94-.113a3.322 3.322 0 0 0 2.35-4.068"></path></svg>
                    <div>
                      <p className="weather-item-title">Cloud Coverage</p>
                      <p className="weather-item-data">{parseInt(item.clouds.all)}%</p>
                    </div>
                  </div>
                  <div className="weather-item winds">
                      <svg className="Icon--icon--3wCKh Icon--actionTheme--sZu_q DetailsSummary--conditionsIcon--1P-Au" set="current-conditions" name="wind" theme="action" data-testid="Icon" aria-hidden="false" aria-label="Wind" role="img" viewBox="0 0 24 24"><title>Wind</title><path d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742" strokeWidth="2" stroke="currentColor" strokeLinecap="round" fill="none"></path></svg>
                      <div>
                      <p className="weather-item-title">Wind Speed</p>
                      <p className="weather-item-data">{getWindDirection(item.wind.deg)} {item.wind.speed} mph</p>
                      </div>
                    </div>
                  <div className="weather-item">
                    <svg className="icon" theme="action" set="current-conditions" name="humidity" data-testid="Icon" aria-hidden="true" role="img" viewBox="0 0 24 24"><title>Humidity</title><path fillRule="evenodd" d="M11.743 17.912a4.182 4.182 0 0 1-2.928-1.182 3.972 3.972 0 0 1-.614-4.962.743.743 0 0 1 .646-.349c.234 0 .476.095.66.275l4.467 4.355c.385.376.39.998-.076 1.275a4.216 4.216 0 0 1-2.155.588M11.855 4c.316 0 .61.14.828.395.171.2.36.416.562.647 1.857 2.126 4.965 5.684 4.965 8.73 0 3.416-2.85 6.195-6.353 6.195-3.505 0-6.357-2.78-6.357-6.195 0-3.082 2.921-6.406 4.854-8.605.242-.275.47-.535.673-.772A1.08 1.08 0 0 1 11.855 4"></path></svg>
                    <div>
                      <p className="weather-item-title">Humidity</p>
                      <p className="weather-item-data">{parseInt(item.main.humidity)}%</p>
                    </div>
                  </div>
                  <div className="weather-item">
                  <svg className="icon" theme="action" set="heads-up" name="precip-rain" data-testid="Icon" aria-hidden="true" role="img" width="1024" height="1024" viewBox="0 0 1024 1024"><title>Rain</title><path d="M424.755 39.731c3.891-12.902-4.71-26.214-19.251-29.696-12.902-3.072-26.01 2.662-31.744 13.107L134.758 392.396c-4.915 6.963-8.806 14.541-11.469 22.938-13.107 43.418 15.77 88.064 64.512 99.533 48.128 11.469 97.485-13.722 111.206-56.32L424.754 39.731zm463.667-29.696c-14.336-3.482-29.082 3.072-35.226 14.541h-.205l-497.254 767.59c-8.806 12.288-15.77 26.01-20.275 40.96-23.347 77.414 28.262 156.877 115.098 177.766 86.221 20.48 174.899-24.576 198.861-101.171h.205l119.603-397.926c.205-.41.41-1.024.614-1.434L909.517 45.67l.614-2.253c3.891-14.541-5.53-29.491-21.709-33.382z"></path></svg>
                    <div>
                      <p className="weather-item-title">Rain Amount</p>
                      <p className="weather-item-data">{item.rain ? item.rain["3h"] : 0}in</p>
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            </div>
          );
        })}
      </Accordion>
    </>
  );
};

export default Forecast;
