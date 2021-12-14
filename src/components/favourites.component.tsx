import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React, { Fragment } from "react";
import Item from "../entities/item.entity";

interface IFavouritesProps {
  favourites: Item[];
}

const Favourites: React.FC<IFavouritesProps> = ({
  favourites,
}): JSX.Element => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {favourites.map((item) => (
        <Fragment key={`frag-${item.id}-${Object.keys({ favourites })[0]}`}>
          <ListItem
            alignItems="flex-start"
            key={`${item.id}-${Object.keys({ favourites })[0]}`}
          >
            <ListItemAvatar>
              <Avatar
                alt={item.rocket?.rocket_name}
                src={item.rocket?.flickr_images[0]}
              />
            </ListItemAvatar>
            <ListItemText
              primary={item.mission_name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    First orbital class rocket capable of reflight
                  </Typography>
                  <br />
                  {item.launch_date_unix}
                </React.Fragment>
              }
            />
            <IconButton>
              <StarIcon />
            </IconButton>
          </ListItem>
          <Divider variant="inset" component="li" />
        </Fragment>
      ))}
    </List>
  );
};
export default Favourites;
