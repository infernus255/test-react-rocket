import React, { Fragment, useEffect } from "react";
import { styled, alpha, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LaunchService from "../services/launch.service";
import Launch from "../entities/launch.entity";
import Item from "../entities/item.entity";
import RocketService from "../services/rocket.service";
import Rocket from "../entities/rocket.entity";
import ListItems from "./listItems.component";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

interface ILaunchesProps {
  favourites: Item[];
  setfavourites: (arg: Item[]) => void;
  items: Item[];
  setItems: (arg: Item[]) => void;
}

const Launches: React.FC<ILaunchesProps> = ({
  favourites,
  setfavourites,
  items,
  setItems,
}): JSX.Element => {
  const [launches, setLaunches] = React.useState<Launch[]>([]);
  const [rockets, setRockets] = React.useState<Rocket[]>([]);
  const [fetched, setFetched] = React.useState(false);
  // const [items, setItems] = React.useState<Item[]>([]);
  const [idCount, setIdCount] = React.useState(1);
  const [itemsFiltered, setItemsFilted] = React.useState<Item[]>([]);
  const [search, setSearch] = React.useState(false);

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
    if (fetched) return;
  }, [fetched]);

  const handleFavouriteClick = (e: any, id: number) => {
    const itemIndex = items.findIndex((i) => i.id === id);
    const item = items[itemIndex];
    if (item) {
      const itemsUpdated: Item[] = items;
      itemsUpdated[itemIndex].favourite = !item.favourite;
      //modifico el item
      setItems(itemsUpdated);
      if (favourites.find((i) => i.id === id)) {
        //si esta en favoritos lo elimino
        const favouritesFiltered: Item[] = favourites.filter(
          (i) => i.id !== item?.id
        );
        setfavourites(favouritesFiltered);
      } else {
        //si no incluye el favorito lo agrego
        setfavourites([...favourites, item]);
      }
    }
  };

  const onChangeSearch = (e: any) => {
    setItemsFilted(
      items.filter((i) =>
        i.mission_name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    if (e.target.value.length === 0) {
      setSearch(false);
    } else {
      setSearch(true);
    }
  };

  // function handleFavourite(value: boolean) {
  //   const data: string | undefined = value === false ? "Mui-disabled" : "";
  //   return data;
  // }

  return (
    <Fragment>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={onChangeSearch}
        />
      </Search>
      {search ? (
        <ListItems
          items={itemsFiltered}
          handleClick={handleFavouriteClick}
          itemListName={Object.keys({ itemsFiltered })[0]}
        ></ListItems>
      ) : (
        <ListItems
          items={items}
          handleClick={handleFavouriteClick}
          itemListName={Object.keys({ items })[0]}
        ></ListItems>
      )}
    </Fragment>
  );
};
export default Launches;
