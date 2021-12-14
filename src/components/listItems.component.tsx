import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React, { Fragment } from "react";
import Item from "../entities/item.entity";

interface IListItemsProps {
  items: Item[];
  handleClick: (e: any, id: number) => void;
  itemListName: string;
}

const ListItems: React.FC<IListItemsProps> = ({
  items,
  handleClick,
  itemListName,
}): JSX.Element => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {items.map((item) => (
        <Fragment key={`frag-${item.id}-${itemListName}`}>
          <ListItem alignItems="flex-start" key={`${item.id}-${itemListName}`}>
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
            <IconButton onClick={(e) => handleClick(e, item.id)}>
              <StarIcon />
            </IconButton>
          </ListItem>
          <Divider variant="inset" component="li" />
        </Fragment>
      ))}
    </List>
  );
};

export default ListItems;
