import Rocket from "./rocket.entity";

type Item = {
    id: number;
    flight_number : number,
    mission_name : string,
    launch_date_unix : Date,
    rocket : Rocket | undefined,
    favourite : boolean
}

export default Item;