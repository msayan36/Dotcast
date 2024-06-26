import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import Edit from '@material-ui/icons/Edit'
import Avatar from '@material-ui/core/Avatar'
import auth from './../auth/auth-helper'
import {Link} from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import DeleteMedia from './DeleteMedia'
import MediaPlayer from './MediaPlayer'

const useStyles = makeStyles(theme => ({
  card: {
    padding:'20px'
  },
  header: {
    padding:'0px 16px 16px 12px'
  },
  action: {
    margin: '24px 20px 0px 0px',
    display: 'inline-block',
    fontSize: '1.15em',
    color: theme.palette.secondary.dark
  },
  avatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.light
  }
}))


export default function Media(props) {
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles()
  const mediaUrl = props.media._id
        ? `/api/media/video/${props.media._id}`
        : null
  const nextUrl = props.nextUrl
  
  return (
    <Card className={classes.card}>
      <CardHeader className={classes.header}
            title={props.media.title}
            action={
              <span className={classes.action}>{props.media.views + ' views'}</span>
            }
            subheader={props.media.genre}
      />
      <MediaPlayer srcUrl={mediaUrl} nextUrl={nextUrl} handleAutoplay={props.handleAutoplay}/>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              {props.media.postedBy.name && props.media.postedBy.name[0]}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={props.media.postedBy.name}
                        secondary={"Published on " + (new Date(props.media.created)).toDateString()}/>
          { auth.isAuthenticated().user
              && auth.isAuthenticated().user._id == props.media.postedBy._id
              && (<ListItemSecondaryAction>
                    <Link to={"/media/edit/" + props.media._id}>
                      <IconButton aria-label="Edit" color="secondary">
                        <Edit/>
                      </IconButton>
                    </Link>
                    <DeleteMedia mediaId={props.media._id} mediaTitle={props.media.title}/>
                  </ListItemSecondaryAction>)
          }
        </ListItem>
        <ListItem>
          <Button variant="contained" color="primary" onClick={handleOpen}>Join</Button>
          
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  }}
>
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width:"500px",
    backgroundColor: "white"
  }}>
  <h2 id="simple-modal-title">Membership</h2>
      <p id="simple-modal-description">
        Are You Sure You want to Proceed?
      </p>
      <h2>Rs. 130</h2>
      <Button variant="contained" color="primary" style={{marginBottom: "20px"}}>Proceed</Button>
  </div>
</Modal>
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemText primary={props.media.description}/>
        </ListItem>
      </List>
    </Card>)
}


Media.propTypes = {
  media: PropTypes.object,
  nextUrl: PropTypes.string,
  handleAutoplay: PropTypes.func.isRequired
}

