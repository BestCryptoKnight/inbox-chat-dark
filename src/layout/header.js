import React, { useContext } from "react";
import Switch from "@material-ui/core/Switch";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from "@material-ui/icons/Notifications";
import avatar from "../assets/imgs/avatars/avatar1.jpg";
import { EmailContext } from "../context/EmailContextContainer";
import clsx from "clsx";


export default function Header(props) {
  const { handleDrawerToogle, open } = props;
  const { values, setValues, darkState, setDarkState, theme, commonTheme } = useContext(EmailContext);

  const handleChange = (event) => {
    setValues(event.target.value);
  };

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <AppBar
      color="inherit"
      position="absolute"
      className={open ? clsx(commonTheme.appBarShift, commonTheme.appBar) : commonTheme.appBar}
    >
      <Toolbar className={theme.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToogle}
          className={open ? commonTheme.menuButton : clsx(commonTheme.menuButton, commonTheme.menuButtonSelected)}
        >
          <MenuIcon />
        </IconButton>
        <FormControl className={theme.textField} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-search"
            className={theme.input}
            value={values}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start"><SearchIcon className={theme.icon}/></InputAdornment>}
            labelWidth={0}
            placeholder="Search for emails..."
            size="small"
          />
        </FormControl>
        <div className={commonTheme.headerIcons}>
          <Switch checked={darkState} onChange={handleThemeChange} />
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <img className={commonTheme.avatar} src={avatar} alt="avatar-img" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
