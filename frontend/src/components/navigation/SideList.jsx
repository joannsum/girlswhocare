import {
  Box,
  Stack,
  Typography,
  Button,
  Link,
  Divider,
  ListItemButton,
} from "@mui/material";

const ctaStles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  p: 1,
};

import DropDownList from "@shared/DropDownList";
import BaseItem from "@shared/BaseItem";

const SideList = () => {
  return (
    <Stack
      sx={{height: "100%", width: "100%", py: 1}}
      justifyContent="space-between"
    >
      <Box sx={ctaStles}>
        <Typography
          variant="body2"
          color="text.disabled"
          align="center"
          gutterBottom
          mb={1}
        >
          Create an account to follow your favorite communities and start
          taking part in conversations.
        </Typography>
        <Button color="secondary" variant="outlined">
          Join Girls Who Care
        </Button>
        <Link href="#" color="text.secondary" variant="overline" mt="1rem">
          Girls Who Care, © Inc 2024.
        </Link>
      </Box>
    </Stack>
  );
};

export default SideList;
