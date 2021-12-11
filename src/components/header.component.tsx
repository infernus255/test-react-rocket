import { Tab, Tabs, Typography } from "@mui/material";
// import '../App.css';
import logo from "../logo.svg";
import React from "react";
import Launches from "./launches.component";
import Item from "../entities/item.entity";
import Favourites from "./favourites.component";

const Header = () => {
  const [value, setValue] = React.useState("one");
  const [favourites, setfavourites] = React.useState<Item[]>([]);
  const [items, setItems] = React.useState<Item[]>([]);

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <header className="App-header">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <Typography sx={{ display: "inline" }} variant="h3" color="text.primary">
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
      {value === "one" && (
        <Launches
          favourites={favourites}
          setfavourites={setfavourites}
          items={items}
          setItems={setItems}
        />
      )}
      {value === "two" && <Favourites favourites={favourites} />}
    </header>
  );
};

export default Header;
