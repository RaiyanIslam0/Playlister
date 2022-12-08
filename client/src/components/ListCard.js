import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import AuthContext from "../auth";
import Box from "@mui/material/Box";
import SongCard from "./SongCard.js";
import MUIEditSongModal from "./MUIEditSongModal";
import MUIRemoveSongModal from "./MUIRemoveSongModal";
import EditToolbar from "./EditToolbar";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import TextField from "@mui/material/TextField";
import workspace from "./WorkspaceScreen";
import WorkspaceScreen from "./WorkspaceScreen";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Fab from "@mui/material/Fab";
import { useHistory } from "react-router-dom";

/*
    This is a card in our list of playlists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [editActive, setEditActive] = useState(false);
  const [text, setText] = useState("");
  const { idNamePair, selected, expanded } = props;
  let showList = false;
  const [isClicked, setIsClicked] = useState(false);

  const theme = createTheme({
    palette: {
      purple: {
        main: "#5F23A5",
        contrastText: "#f5f5f5",
      },
      buttons: {
        main: "#303030",
        contrastText: "#f5f5f5",
      },
    },
  });
  function handleLikedOrDisliked() {
    if (!isClicked) setIsClicked(true);
  }
  function handleLoadList(event, id) {
    console.log("handleLoadList for " + id);
    if (!event.target.disabled) {
      let _id = event.target.id;
      if (_id.indexOf("list-card-text-") >= 0)
        _id = ("" + _id).substring("list-card-text-".length);

      console.log("load " + event.target.id);

      // CHANGE THE CURRENT LIST
      store.setCurrentList(id);
    }
  }

  function handleToggleEdit(event) {
    event.stopPropagation();
    if (auth.visitor === "REGISTERED" && auth.view === "HOME") {
      toggleEdit();
    }
  }

  function toggleEdit() {
    let newActive = !editActive;
    if (newActive) {
      store.setIsListNameEditActive();
    }
    setEditActive(newActive);
  }

  async function handleDeleteList(event, id) {
    event.stopPropagation();
    let _id = event.target.id;
    _id = ("" + _id).substring("delete-list-".length);
    store.markListForDeletion(id);
  }

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      let id = event.target.id.substring("list-".length);
      store.changeListName(id, text);
      toggleEdit();
    }
  }
  function handleUpdateText(event) {
    setText(event.target.value);
  }

  let selectClass = "unselected-list-card";
  if (selected) {
    selectClass = "selected-list-card";
  }
  let cardStatus = false;
  if (store.isListNameEditActive) {
    cardStatus = true;
  }
  let modalJSX = "";
  if (store.isEditSongModalOpen()) {
    modalJSX = <MUIEditSongModal />;
  } else if (store.isRemoveSongModalOpen()) {
    modalJSX = <MUIRemoveSongModal />;
  }
  function handleOpenList(e) {
    let button = document.getElementById("expandButton-" + idNamePair._id);

    if (!store.currentList) {
      handleLoadList(e, idNamePair._id);
      button.style.transform = "rotate(180deg)";
    } else {
      store.closeCurrentList();
    }
  }
  function handleSetPlayerList(event, id) {
    console.log("setting playerlist");
    event.stopPropagation();
    store.setPlayerList(id);
  }

  function handleDuplicateList(event) {
    event.stopPropagation();
    store.duplicateList();
  }
  function handlePublish(event) {
    event.stopPropagation();
    store.publish();
  }

  let songList = "";
  let toolbar = <EditToolbar sx={{marginRight:"20px"}}></EditToolbar>;
  let publishButton = "";
  let buttonsStyle = {
    padding: "10px 15px 0px 10px",
    display: "flex",
    justifyContent: "space-between",
    width: "28%",
  };
  let flexStyle = {
    display: "flex",
    width: "100%",
    justifyContent: "end",
    padding: 5,
  };
  if (!idNamePair.published) {
    publishButton = (
      <Button
        sx={{ border: 1, marginLeft:"2px",marginRight:"2px", fontSize:"11px", fontWeight:"bold",paddingTop:"1px", paddingBottom:"1px" }}
        variant="contained"
        color="inherit"
        onClick={(event) => {
          handlePublish(event);
        }}
      >
        Publish
      </Button>
    );
    buttonsStyle = {
      padding: "10px 15px 0px 10px",
      display: "flex",
      justifyContent: "space-between",
      width: "39%",
    };
    flexStyle = {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      padding: 5,
    };
  }
  let deleteButton = (
    <Button
      variant="contained"
      color="inherit"
      sx={{ border: 1, marginLeft:"2px",marginRight:"2px", fontSize:"11px", fontWeight:"bold" }}
      onClick={(event) => {
        handleDeleteList(event, idNamePair._id);
      }}
    >
      Delete
    </Button>
  );
  if (auth.view === "ALL_LISTS" || auth.view === "USERS") {
    deleteButton = "";
  }
  if (store.currentList) {
    if (store.currentList._id == idNamePair._id) {
      if (store.currentList.published) {
        toolbar = "";
      }
      songList = (
        <div>
          <ThemeProvider theme={theme}>
            <List
              id="playlist-cards"
              sx={{ width: "100%", bgcolor: "#242180", borderRadius: "25px" }}
            >
              {store.currentList.songs.map((song, index) => (
                <SongCard
                  id={"playlist-song-" + index}
                  key={"playlist-song-" + index}
                  index={index}
                  song={song}
                />
              ))}
            </List>
            <div style={flexStyle}>
              {toolbar}
              <div style={buttonsStyle}>
                <Button
                  disabled={auth.visitor === "GUEST"}
                  variant="contained"
                  color="inherit"
                  sx={{ border: 1, marginLeft:"2px",marginRight:"2px", fontSize:"11px", fontWeight:"bold",paddingTop:"1px", paddingBottom:"1px" }}
                  onClick={(event) => {
                    handleDuplicateList(event);
                  }}
                >
                  Duplicate
                </Button>
                {deleteButton}
                {publishButton}
              </div>
            </div>
          </ThemeProvider>
        </div>
      );
    }
  }
  let cardStyle = {
    width: "100%",
    fontSize: "22pt",
    color: "black",
    backgroundColor: "#c5c5ea",
    borderRadius: 25,
    display: "flex",
    flexDirection: "column",
    cursor: "default",
    marginTop: "7px",
    border: "0.9px solid black",
    p: "10px",
    p: 1,

    // sx={{borderRadius:"25px", p: "10px", bgcolor: '#c5c5ea', marginTop: '7px', display: 'flex', p: 1 }}
    //          style={{transform:"translate(1%,0%)", width: '98%', fontSize: '22pt' }}
  };

   if (!idNamePair.published) {
       cardStyle = {
         width: "100%",
         fontSize: "22pt",
         color: "black",
         backgroundColor: "#fcf8e6",
         borderRadius: 25,
         display: "flex",
         flexDirection: "column",
         cursor: "default",
         marginTop: "7px",
         border:"0.9px solid black",
         p: "10px",
         p: 1,
       };
   }
  if (store.playerList) {
    if (idNamePair._id == store.playerList._id) {
      cardStyle = {
        width: "100%",
        fontSize: "22pt",
        color: "black",
        backgroundColor: "#e3c21b",
        borderRadius: 25,
        display: "flex",
        flexDirection: "column",
        cursor: "default",
        marginTop: "7px",
        border: "0.9px solid black",
        p: "10px",
        p: 1,
      };
    }
  }
  let publishDate = "";
  if (idNamePair.published) {
    publishDate = idNamePair.publishDate.toString().substring(0, 10);
  }
  
  let likeButton = (
    <Fab
      size="small"
      id={"like-button-" + idNamePair._id}
      color="inherit"
      src="https://cdn0.iconfinder.com/data/icons/glyphpack/26/double-arrow-down-1024.png"
      disabled={auth.visitor === "GUEST" || auth.view === "HOME" || isClicked}
      onClick={(event) => {
        event.stopPropagation();
        store.like();
        handleLikedOrDisliked();
      }}
    >
      <ThumbUpIcon />
    </Fab>
  );
  let dislikeButton = (
    <Fab
      size="small"
      id={"dislike-button-" + idNamePair._id}
      color="inherit"
      disabled={auth.visitor === "GUEST" || auth.view === "HOME" || isClicked}
      onClick={(event) => {
        event.stopPropagation();
        store.dislike();
        handleLikedOrDisliked();
      }}
    >
      <ThumbDownIcon />
    </Fab>
  );

  let cardElement = (
    <ListItem
      id={idNamePair._id}
      key={idNamePair._id}
      sx={{ marginTop: "15px", display: "flex", p: 1 }}
      style={cardStyle}
      button
      onDoubleClick={handleToggleEdit}
    >
      <div
        style={{ display: "flex", width: "100%" }}
        onClick={(event) => {
          handleSetPlayerList(event, idNamePair._id);
        }}
      >
        <Box sx={{ p: 1, flexGrow: 1, overflowX: "auto" }}>
          {idNamePair.name}
          <br></br>
          <div style={{ display:"flex",fontSize: "12pt", paddingLeft: "3px" , color:"black", fontWeight:"bold"}}>
            By:<div style={{display:"flex", fontSize: "12pt", paddingLeft: "3px" , color:"blue", textDecoration: "underline"}}> {idNamePair.ownerUserName}</div>
          </div>
        </Box>
        <div style={{ padding: 5, display: "flex", flexDirection: "row" }}>
          <ThemeProvider theme={theme}>
            {likeButton}
            <div id={"like-counter-" + idNamePair._id}>{idNamePair.likes}</div>
            {dislikeButton}
            <div
              id={"dislike-counter-" + idNamePair._id}
              style={{ padding: "0px 5px 0px 5px" }}
            >
              {idNamePair.dislikes}
            </div>
          </ThemeProvider>
        </div>
      </div>

      <div style={{ width: "100%", padding: 10 }}>{songList}</div>
      <div
        style={{
          display: "flex",
          width: "100%",
          fontSize: "16px",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <div style={{display:"flex", padding: "0px 20px 0px 10px",fontWeight:"bold" }}>
          Published: <div style={{display:"flex", fontSize: "12pt", paddingLeft: "3px" , color:"green"}}>{publishDate}</div>
        </div>
        <div style={{display:"flex", padding: "0px 20px 0px 10px", fontWeight:"bold" }}>
          Listens:{" "}
          <div id={"listens-counter-" + idNamePair._id}
          style={{display:"flex", fontSize: "12pt", paddingLeft: "3px" , color:"red"}}>
            {idNamePair.listens}
          </div>
        </div>
        <div>
          <img
            id={"expandButton-" + idNamePair._id}
            onClick={handleOpenList}
            src={"https://cdn0.iconfinder.com/data/icons/glyphpack/26/double-arrow-down-1024.png"}
            style={{
              width: "24px",
              padding: "0px 20px 0px 20px",
              cursor: "pointer",
            }}
          ></img>
        </div>
      </div>
    </ListItem>
  );

  if (editActive) {
    cardElement = (
      <TextField
        margin="normal"
        required
        fullWidth
        id={"list-" + idNamePair._id}
        label="Playlist Name"
        name="name"
        autoComplete="Playlist Name"
        className="list-card"
        onKeyPress={handleKeyPress}
        onChange={handleUpdateText}
        defaultValue={idNamePair.name}
        inputProps={{ style: { fontSize: 28 } }}
        InputLabelProps={{ style: { fontSize: 24 } }}
        autoFocus
      />
    );
  }
  return (
    <Box>
      {cardElement}
      {modalJSX}
    </Box>
  );
}

export default ListCard;







// "https://cdn0.iconfinder.com/data/icons/glyphpack/26/double-arrow-down-1024.png"