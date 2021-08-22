import {
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  Home,
  People,
  Person,
  SportsEsports,
  PersonAdd,
  AddBox,
} from "@material-ui/icons";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useStylesMenu from "./MaterialMenuStyles";

interface MaterialMenuProps {
  children: React.ReactNode;
}

const MaterialMenu = ({ children }: MaterialMenuProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStylesMenu();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const generateDrawerContent = () => {
    return (
      <>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem key={1} button component={Link} to="/">
            <ListItemIcon>
              <Home className={classes.whiteText} fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary={"Home"}
              className={clsx(classes.whiteText)}
            ></ListItemText>
          </ListItem>
          <ListItem key={2} button component={Link} to="/players">
            <ListItemIcon>
              <Person className={classes.whiteText} fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary={"Players"}
              className={clsx(classes.whiteText)}
            ></ListItemText>
          </ListItem>
          <ListItem key={3} button component={Link} to="/games">
            <ListItemIcon>
              <SportsEsports className={classes.whiteText} fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary={"Games"}
              className={clsx(classes.whiteText)}
            ></ListItemText>
          </ListItem>
          <ListItem key={4} button component={Link} to="/teams">
            <ListItemIcon>
              <People className={classes.whiteText} fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary={"Teams"}
              className={clsx(classes.whiteText)}
            ></ListItemText>
          </ListItem>
          <ListItem key={5} button component={Link} to="/player_entry">
            <ListItemIcon>
              <PersonAdd className={classes.whiteText} fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary={"Add New Player"}
              className={clsx(classes.whiteText)}
            ></ListItemText>
          </ListItem>
          <ListItem key={6} button component={Link} to="/game_entry">
            <ListItemIcon>
              <AddBox className={classes.whiteText} fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary={"Add New Game"}
              className={clsx(classes.whiteText)}
            ></ListItemText>
          </ListItem>
          <ListItem key={7} button component={Link} to="/playerSpecific">
            <ListItemIcon>
              <Person className={classes.whiteText} fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary={"Player Specific"}
              className={clsx(classes.whiteText)}
            ></ListItemText>
          </ListItem>
        </List>
      </>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(
          classes.appBar,
          open && !isMobile && classes.appBarShift
        )}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon className={classes.blackText} />
          </IconButton>
          <Typography
            component="h1"
            variant="h5"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Rocket League Stats
          </Typography>
        </Toolbar>
      </AppBar>
      <Hidden smDown>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open && !isMobile}
        >
          {generateDrawerContent()}
        </Drawer>
      </Hidden>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          onClose={() => {
            setOpen(!open);
          }}
          open={open && isMobile}
        >
          {generateDrawerContent()}
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </div>
  );
};
export default MaterialMenu;
