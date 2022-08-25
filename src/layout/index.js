import React, { useState, useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./header";
import SideBar from "./sidebar";
import { EmailContext } from "../context/EmailContextContainer";

export default function Layout(props) {
  const { children, current } = props;
  const [open, setOpen] = useState(true);
  const { darkState, setDarkState, theme, commonTheme } = useContext(EmailContext);
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const handleDrawerToogle = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(true);
  };

  return (
    <div className={theme.layout}>
      <CssBaseline />
      <Header
        handleDrawerToogle={handleDrawerToogle}
        handleThemeChange={handleThemeChange}
        darkState={darkState}
        open={open}
      />
      <SideBar
        handleDrawerClose={handleDrawerClose} 
        open={open}
        current={current}
      />
      <main className={commonTheme.content}>
        <div className={commonTheme.appBarSpacer} />
        {children}
      </main>
    </div>
  );
}
