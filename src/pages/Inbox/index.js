import React, { useState, useContext } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import RefreshIcon from '@material-ui/icons/Refresh';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PersonIcon from '@material-ui/icons/Person';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';
import Layout from "../../layout";
import { Button, IconButton } from "@material-ui/core";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import avatar from "../../assets/imgs/avatars/avatar1.jpg";
import { EmailContext } from "../../context/EmailContextContainer";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const { commonTheme } = useContext(EmailContext);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      className={commonTheme.emailContainer}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export default function Inbox() {
  const [value, setValue] = useState(0);
  const [currentEmail, setCurrentEmail] = useState(-1);
  const [rowPerPage, setRowPerPage] = useState(0);
  const { emails, setOld, removeEmail, setPin, setImportant, setStar, values, theme, commonTheme } = useContext(EmailContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const emailChanged = (id) => {
    const email = emails.filter(email => email.id === id)[0];
    if (email.new) {
      setOld(id);
    }
    setCurrentEmail(id);
  }

  const next = () => {
    const count = Math.floor(filteredEmails.length/10);
    if (count !== rowPerPage) {
      setRowPerPage(rowPerPage + 1);
    }
  }

  const prev = () => {
    if (rowPerPage !== 0) {
      setRowPerPage(rowPerPage - 1);
    }
  }

  const filteredEmails = emails.filter(email => email.email.indexOf(values) >= 0);

  const currentEmailData = filteredEmails.filter(email => email.id === currentEmail)[0];
  const count = Math.floor(filteredEmails.length/10) + 1;

  return (
    <Layout current="Inbox">
      <Grid className={commonTheme.grid}>
        <Grid item xs={12} md={6} lg={5}>
          <div className={commonTheme.leftHeader}>
            <div>
              <Button variant="contained" color="primary" className={theme.refreshButton}>
                <RefreshIcon className={commonTheme.refreshIcon}/>
              </Button>
              <Badge badgeContent={1} className={commonTheme.badge}></Badge>
            </div>
            <div>
              {rowPerPage + 1} of {count}
              <IconButton color="inherit" className={commonTheme.prev} onClick={() => prev()}>
                <Badge badgeContent={<ChevronLeftIcon />} color="default"></Badge>
              </IconButton>
              <IconButton color="inherit" onClick={() => next()}>
                <Badge badgeContent={<ChevronRightIcon />} color="default"></Badge>
              </IconButton>
            </div>
          </div>
          <div className={theme.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Main" icon={<EmailIcon className={theme.MuiSvgIconRoot} />} {...a11yProps(0)} />
                <Tab label="Offers" icon={<LocalOfferIcon className={theme.MuiSvgIconRoot} />} {...a11yProps(1)} />
                <Tab label="Community" icon={<PersonIcon className={theme.MuiSvgIconRoot} />} {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} theme={commonTheme}>
              {filteredEmails.slice(rowPerPage*10, rowPerPage*10+10).map((email, index) => (
                <div className={clsx(theme.emailSection, currentEmail === email.id && theme.emailSelected)} key={`${email.time}-${index}`} onClick={() => emailChanged(email.id)}>
                  <div className={commonTheme.emailHeader}>
                    <div className={commonTheme.emailHeaderLeft}>
                      <img src={email.avatar} alt={`avatar-${index}`} className={commonTheme.emailAvatar} />
                      <div className="titles">
                        <Typography color="textSecondary">
                          {`${email.name} ${email.email}`}
                        </Typography>
                        <Typography component="p" variant="h6">
                          {email.subTitle}
                          {email.new && <FiberManualRecordIcon color="primary" className={theme.newCircle} />}
                        </Typography>
                      </div>
                    </div>
                    <div className="right">
                      <Typography color="textSecondary">
                        {email.time}
                      </Typography>
                    </div>
                  </div>
                  <Typography color="textSecondary">
                    {email.content}
                  </Typography>
                </div>
              ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
            </TabPanel>
            <TabPanel value={value} index={2}>
            </TabPanel>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={7} className={commonTheme.rightSection}>
          {currentEmailData && <div className={commonTheme.emailBodyHeader}>
            <div className={commonTheme.emailBodyHeaderLeft}>
              <img src={currentEmailData.avatar} alt={`avatar-${currentEmail}`} className={commonTheme.emailBodyHeaderAvatar} />
              <Typography component="p" variant="h6" className={commonTheme.subTitle}>
                {currentEmailData.subTitle}
              </Typography>
              <Typography color="textSecondary">
                {`${currentEmailData.name} ${currentEmailData.email}`}
              </Typography>
            </div>
            <div className={commonTheme.emailBodyHeaderRight}>
              <IconButton onClick={() => setPin(currentEmailData.id, !currentEmailData.pin)}>
                <BookmarkIcon color={currentEmailData.pin ? "secondary" : "inherit"} />
              </IconButton>
              <IconButton color="inherit" onClick={() => removeEmail(currentEmailData.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>}
          {currentEmailData && <div className={commonTheme.emailBody}>
            <div className={clsx(commonTheme.emailBodyHeader, commonTheme.noBorder)}>
              <div className={commonTheme.emailBodyHeaderLeft}>
                <Typography component="p" variant="h5" className="subTitle">
                  {currentEmailData.title}
                </Typography>
              </div>
              <div className={commonTheme.emailBodyHeaderRight}>
                <IconButton color="inherit" onClick={() => setImportant(currentEmailData.id, !currentEmailData.important)}>
                  {currentEmailData.important ? <BookmarkIcon className={commonTheme.selected} /> : <BookmarkBorderIcon />}
                </IconButton>
                <IconButton color="inherit" onClick={() => setStar(currentEmailData.id, !currentEmailData.star)}>
                  {currentEmailData.star ? <StarOutlinedIcon className={commonTheme.selected} /> : <StarBorderIcon />}
                </IconButton>
                <Typography color="textSecondary" className={commonTheme.emailBodyHeaderTime}>
                  {currentEmailData.time}
                </Typography>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: currentEmailData.fullContent }} />
            {currentEmailData.images?.map((image, index) => (
              <div className={commonTheme.imageContainer} key={`img-container-${index}`}>
                <img src={image.url} alt={`img-${index}`} />
                <div className={commonTheme.hoverContainer}>
                  <Typography color="textSecondary" className="time">
                    <CloudDownloadOutlinedIcon className={commonTheme.download}/>
                    <span>{image.name}</span>
                  </Typography>
                </div>
              </div>
            ))}
          </div>}
          {currentEmailData && <div className={commonTheme.emailReply}>
            <div className={commonTheme.emailReplyLeft}>
              <img src={avatar} alt={`avatar-${currentEmail}`} className={commonTheme.emailBodyHeaderAvatar} />
              <Typography color="primary" className={commonTheme.reply}>Reply</Typography>
            </div>
            <div className={commonTheme.emailReplyRight}>
              <IconButton color="inherit">
                <ReplyOutlinedIcon />
              </IconButton>
            </div>
          </div>}
        </Grid>
      </Grid>
    </Layout>
  );
}
