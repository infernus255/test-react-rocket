import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const ItemStack = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default ItemStack;
