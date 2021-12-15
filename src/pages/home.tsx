import { Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Launches from "../components/launches.component";
import Item from "../entities/item.entity";
import Favourites from "../components/favourites.component";
import Launch from "../entities/launch.entity";
import Rocket from "../entities/rocket.entity";
import RocketService from "../services/rocket.service";
import LaunchService from "../services/launch.service";

const Home = () => {
  const [value, setValue] = React.useState("one");
  const [favourites, setfavourites] = React.useState<Item[]>([]);
  const [items, setItems] = React.useState<Item[]>([]);
  const [launches, setLaunches] = React.useState<Launch[]>([]);
  const [rockets, setRockets] = React.useState<Rocket[]>([]);
  const [fetched, setFetched] = React.useState(false);
  const [idCount, setIdCount] = React.useState(1);

  async function init() {
    const responseLaunches: Launch[] = await LaunchService.get();
    setLaunches(responseLaunches);
    const responseRockets: Rocket[] = await RocketService.get();
    setRockets(responseRockets);
    setFetched(true);
  }

  const populateItems = async () => {
    if (launches && rockets) {
      let index = idCount;
      let data: Item[] = [];
      launches.forEach((l) => {
        const rocket = rockets.find((r) => r.rocket_id === l.rocket.rocket_id);
        let item: Item = {
          id: index,
          flight_number: l.flight_number,
          mission_name: l.mission_name,
          launch_date_unix: l.launch_date_unix,
          rocket: rocket,
          favourite: false,
        };
        data.push(item);
        index = index + 1;
      });
      setItems(data);
      setIdCount(index);
    }
  };

  //for initialize
  useEffect(() => {
    init();
    populateItems();
    // if (fetched) return;
  }, [fetched]);

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
      <header className="App-header">
        <Typography
          sx={{ display: "inline" }}
          variant="h3"
          color="text.primary"
        >
          Launches
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value="one" label="All" wrapped />
          <Tab value="two" label="Favourites" />
        </Tabs>
      </header>
      <body>
        {value === "one" && (
          <Launches
            favourites={favourites}
            setfavourites={setfavourites}
            items={items}
            setItems={setItems}
          />
        )}
        {value === "two" && <Favourites favourites={favourites} />}
      </body>
    </div>
  );
};

export default Home;
