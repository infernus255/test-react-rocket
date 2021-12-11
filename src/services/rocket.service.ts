import http from './http';
import Rocket from '../entities/rocket.entity';

const endpoint = "/v3/rockets";

const RocketService = {
  get,
};

async function get(): Promise<Rocket[]> {
  return await http
    .get<Rocket[]>(endpoint)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export default RocketService;