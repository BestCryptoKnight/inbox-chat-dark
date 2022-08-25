import React, { useContext } from "react";
import clsx from "clsx";
import { useHistory } from 'react-router-dom';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import EmailIcon from '@material-ui/icons/Email';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CategoryIcon from '@material-ui/icons/Category';
import NoteIcon from '@material-ui/icons/Note';
import EventIcon from '@material-ui/icons/Event';
import Badge from "@material-ui/core/Badge";
import avatar1 from "../assets/imgs/avatars/avatar1.jpg";
import avatar2 from "../assets/imgs/avatars/avatar2.jpg";
import avatar3 from "../assets/imgs/avatars/avatar3.jpg";
import Link from "@material-ui/core/Link";
import Button from '@material-ui/core/Button';
import { EmailContext } from "../context/EmailContextContainer";


export default function SideBar(props) {
  const { open, current } = props;
  const { theme, commonTheme } = useContext(EmailContext);
  const mainListItems = [
    {
      name: 'Dashboard',
      url: '/',
      icon: <DashboardIcon className={theme.icon} />
    },
    {
      name: 'Inbox',
      url: '/inbox',
      icon: <EmailIcon className={theme.icon} />
    },
    {
      name: 'Pinned',
      url: '/pinned',
      icon: <BookmarkIcon className={theme.icon} />
    },
    {
      name: 'Draft',
      url: '/draft',
      icon: <DraftsIcon className={theme.icon} />
    },
    {
      name: 'Categories',
      url: '/categories',
      icon: <CategoryIcon className={theme.icon} />
    },
    {
      name: 'Notes',
      url: '/notes',
      icon: <NoteIcon className={theme.icon} />
    },
    {
      name: 'Reminders',
      url: '/reminders',
      icon: <EventIcon className={theme.icon} />
    },
  ];
  const friends = [ avatar1, avatar2, avatar3 ];
  const history = useHistory();

  const itemClicked = (url) => {
    history.push(url);
  }

  const showAllFriends = () => {

  }

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(theme.drawerPaper, !open && commonTheme.drawerPaperClose)
      }}
      open={open}
    >
      <div className={commonTheme.toolbarIcon}>
        <Button variant="contained" size="large" color="primary" className={theme.createBtn}>
          Create New
        </Button>
      </div>
      <List>
        <ListSubheader inset>Messages</ListSubheader>
        {mainListItems.map(item => (
          <ListItem button key={`main-${item.name}`} onClick={() => itemClicked(item.url)} className={clsx(current === item.name && commonTheme.listItem)}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
            {item.name === "Inbox" && <Badge badgeContent={2} color="primary" className={commonTheme.badge}></Badge>}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader inset>Friends</ListSubheader>
        <div className={commonTheme.friends}>
          {friends.map((friend, index) => (
            <img src={friend} className={commonTheme.friendAvatar} key={`friend-${index}`} alt={`friend-${index}`} />
          ))}
        </div>
        <Link className={theme.seeAll} color="primary" href="#" onClick={showAllFriends}>
          See all
        </Link>
      </List>
    </Drawer>
  );
}
