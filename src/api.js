import axios from "axios";

// This should be in env 🙃
const API_URL =
  "https://us-central1-conferenceradar-9e1e2.cloudfunctions.net/addEvent";

export async function saveEvent(eventData) {
  return await axios.post(`${API_URL}/addEvent`, { ...eventData });
}
