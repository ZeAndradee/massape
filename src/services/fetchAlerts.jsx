import axios from "axios";

export const fetchAlerts = async () => {
  try {
    const response = await axios.get("https://massape-api.onrender.com/alerts");
    const alerts = response.data;
    const newAlert = alerts[alerts.length - 1];
    console.log("Alerts", newAlert);
    return newAlert;
  } catch (e) {
    console.error(e);
  }
};
