import axios from "axios";

export const handleSensorStatus = async () => {
  try {
    const response = await axios.get(
      "https://massape-api-production.up.railway.app/markers"
    );
    const marcador = response.data;
    console.warn(Array.isArray(marcador));
    return marcador;
  } catch (e) {
    console.error(e);
  }
};
