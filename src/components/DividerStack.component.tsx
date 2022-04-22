import * as React from "react";
import Divider from "@mui/material/Divider";

import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

interface IDividerStackProps {
  children: any;
}

const DividerStack: React.FC<IDividerStackProps> = ({ children }) => {
  return (
    <div>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        padding="2%"
      >
        {children}
      </Stack>
    </div>
  );
};

export default DividerStack;
