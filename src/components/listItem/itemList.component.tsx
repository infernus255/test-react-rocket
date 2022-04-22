import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  MobileStepper,
  useTheme,
  Fab,
  Grid,
} from "@mui/material";
import React from "react";
import Item from "../../entities/item.entity";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DividerStack from "../DividerStack.component";
import ItemStack from "../itemStack.component";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "Rocket 1",
    imgPath: "/img/rocket-1.png",
  },
  {
    label: "Rocket 2",
    imgPath: "/img/rocket-2.png",
  },
  {
    label: "Rocket 3",
    imgPath: "/img/rocket-3.png",
  },
];

interface IItemListProps {
  item: Item;
  display: any;
  onClose: (e: any) => void;
}

const ItemList: React.FC<IItemListProps> = ({
  item,
  display: style,
  onClose,
}) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Card sx={{ display: style }}>
      <Paper
        style={{
          backgroundImage: `url(${item.rocket?.flickr_images[0]})`,
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
        sx={{ p: 2, margin: "auto", flexGrow: 1 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={2} sm={2} md={2}>
            <Fab
              color="secondary"
              aria-label="add"
              onClick={onClose}
              sx={{ maxHeight: 15, maxWidth: 30 }}
            >
              <ArrowBackIosNewIcon />
            </Fab>
          </Grid>

          <Grid item xs={2} sm={2} md={2}>
            <Typography variant="body2" gutterBottom component="div">
              {item.launch_date_unix}
            </Typography>
            <Typography variant="h4" component="div">
              {item.mission_name}
            </Typography>
            <Typography variant="body2" component="div">
              First orbital class rocket capable of reflight
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Box display="flex" justifyContent="center">
        <DividerStack>
          <ItemStack>Item 1</ItemStack>
          <ItemStack>Item 2</ItemStack>
          <ItemStack>Item 3</ItemStack>{" "}
        </DividerStack>
      </Box>
      <CardContent>
        <Box
          sx={{
            maxWidth: "100%",
            flexGrow: 1,
            paddingLeft: "5%",
            paddingRight: "5%",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            About Launched
          </Typography>
          <Typography variant="body2">{item.rocket?.description}</Typography>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: 255,
                      display: "block",
                      maxWidth: 400,
                      overflow: "hidden",
                    }}
                    src={step.imgPath}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      </CardContent>
      <CardActions>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={12} md={12}>
            For information about our launch services, contact sales@spacex.com
          </Grid>
          <Grid item xs={2} sm={2} md={2}>
            <Button variant="outlined" size="small">
              download user’s guide
            </Button>
          </Grid>
          <Grid item xs={2} sm={2} md={2}>
            <Button variant="outlined" size="small">
              capabilities and services
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
export default ItemList;
