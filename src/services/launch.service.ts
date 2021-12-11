import http from "./http";
import Launch from "../entities/launch.entity";

const endpoint = "/v3/launches";

const LaunchService = {
  get,
};

async function get(): Promise<Launch[]> {
  return await http
    .get<Launch[]>(endpoint)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export default LaunchService;
