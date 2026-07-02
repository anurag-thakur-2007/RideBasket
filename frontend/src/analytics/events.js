import ReactGA from "react-ga4";

export const trackEvent = (eventName, params = {}) => {
  ReactGA.event(eventName, params);
};