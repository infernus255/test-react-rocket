import Rocket from "./rocket.entity";

type Launch = {
    flight_number : number,
    mission_name : string,
    launch_date_unix : Date,
    rocket: Rocket,
}
export default Launch;