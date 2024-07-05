import axios from "axios";

export const handleSensorStatus = async () => {
  try {
    const response = await axios.get("https://ki6.com.br/massape/");
    const sensor = response.data;
    console.log(sensor);
  } catch (e) {
    console.error(e);
  }
};
