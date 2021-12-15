import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  CardActionArea,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import React, { Fragment } from "react";
import Item from "../entities/item.entity";
import ItemList from "./listItem/itemList.component";

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
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState({} as Item);

  const handleOpen = (item: Item) => {
    setOpen(true);
    setItem(item);
  };
  const handleClose = () => {
    setOpen(false);
    setItem({} as Item);
  };

  return (
    <Fragment>
      <List
        sx={{ maxWidth: "100%" }}
        style={{ display: open ? "none" : "block" }}
      >
        {items.map((item) => (
          <Fragment key={`frag-${item.id}-${itemListName}`}>
            <ListItem
              alignItems="flex-start"
              key={`${item.id}-${itemListName}`}
            >
              <CardActionArea onClick={() => handleOpen(item)}>
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
              </CardActionArea>
              <IconButton onClick={(e) => handleClick(e, item.id)}>
                {item.favourite ? <StarIcon /> : <StarOutlineIcon />}
              </IconButton>
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        ))}
      </List>
      <ItemList
        display={{ display: open ? "block" : "none" }}
        item={item}
        onClose={handleClose}
      ></ItemList>
    </Fragment>
  );
};

export default ListItems;
