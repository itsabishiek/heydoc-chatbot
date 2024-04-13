import axios from "axios";

export async function getLocationDetails(latitude, longitude) {
  const accessToken =
    "pk.eyJ1IjoiYWJpc2hpZWsiLCJhIjoiY2tweml1ZnBmMHZhMzJ3bnc2YTBhbmt5YSJ9.hFCqP1KlgAysQmtrL7JFzg"; // Replace with your Mapbox access token
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;

  try {
    const response = await axios.get(url);
    const result = response.data.features[0];
    const locality = result.context.find((c) => c.id.startsWith("locality"));

    return locality.text;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}
