import React, { useState } from "react";
import {
  Box,
  Menu,
  // Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  ListItemButton,
  List,
  ListItemText,
} from "@mui/material";
import { IconChevronDown } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../utils/supabase/client";
import { useSnackbar } from "notistack";

const Profile = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const logout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    window.sessionStorage.clear();
    router.push("/login");
    enqueueSnackbar("Logout successful", { variant: "success" });
  };

  let customerData;

  if (typeof window !== "undefined") {
    const data = window.sessionStorage.getItem("data");
    customerData = data ? JSON.parse(data) : {};
  } else {
    customerData = {};
  }

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="menu"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            borderRadius: "9px",
          }),
        }}
        onClick={handleClick2}
      >
        {/* <Avatar
          src={"/images/users/user2.jpg"}
          alt={"ProfileImg"}
          sx={{
            width: 30,
            height: 30,
          }}
        /> */}
        <Box
          sx={{
            display: {
              xs: "flex",
              sm: "flex",
            },
            alignItems: "center",
          }}
        >
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{ ml: 1 }}
          >
            Hi,
          </Typography>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              ml: 1,
            }}
          >
            {customerData.firstName}
          </Typography>
          <IconChevronDown width="20" height="20" />
        </Box>
      </IconButton>
      {/* Message Dropdown */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 2,
            pb: 2,
            pt: 0,
          },
        }}
      >
        <Box pt={0}>
          <List>
            <ListItemButton
              component="a"
              onClick={() => router.push("/account")}
            >
              <ListItemText primary="My Account" />
            </ListItemButton>
            <ListItemButton
              component="a"
              onClick={() => router.push("/changePassword")}
            >
              <ListItemText primary="Change Password" />
            </ListItemButton>
          </List>
        </Box>
        <Divider />
        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
