import { useContext, useState } from "react";
import GlobalStoreContext from "../store";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 345,
  height: 250,
  backgroundSize: "contain",
  backgroundColor: "#c5c5ea",
  border: "3px solid #000",
  padding: "20px",
  boxShadow: 24,
};

export default function MUIEditSongModal() {
  const { store } = useContext(GlobalStoreContext);
  const [title, setTitle] = useState(store.currentSong.title);
  const [artist, setArtist] = useState(store.currentSong.artist);
  const [youTubeId, setYouTubeId] = useState(store.currentSong.youTubeId);

  function handleConfirmEditSong() {
    let newSongData = {
      title: title,
      artist: artist,
      youTubeId: youTubeId,
    };
    store.addUpdateSongTransaction(store.currentSongIndex, newSongData);
  }

  function handleCancelEditSong() {
    store.hideModals();
  }

  function handleUpdateTitle(event) {
    setTitle(event.target.value);
  }

  function handleUpdateArtist(event) {
    setArtist(event.target.value);
  }

  function handleUpdateYouTubeId(event) {
    setYouTubeId(event.target.value);
  }

  return (
    <Modal open={store.currentModal == "EDIT_SONG"}>
      <Box sx={style1}>
        <div id="edit-song-modal" data-animation="slideInOutLeft">
          <Typography
            sx={{ fontWeight: "bold", color: "white", fontSize: "28px", backgroundColor:"#19196e" }}
            id="modal-modal-title"
            variant="h4"
            component="h2"
          >
            Edit Song
          </Typography>
          <Divider
            sx={{
              borderBottomWidth: 5,
              p: "5px",
              transform: "translate(-5.5%, 0%)",
              width: 377,
            }}
          />
          <Typography
            sx={{
              mt: "10px",
              color: "#702963",
              fontWeight: "bold",
              fontSize: "30px",
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Title:{" "}
            <input
              id="edit-song-modal-title-textfield"
              className="modal-textfield"
              type="text"
              defaultValue={title}
              onChange={handleUpdateTitle}
            />
          </Typography>
          <Typography
            sx={{ color: "#702963", fontWeight: "bold", fontSize: "30px" }}
            id="modal-modal-artist"
            variant="h6"
            component="h2"
          >
            Artist:{" "}
            <input
              id="edit-artist-modal-title-textfield"
              className="modal-textfield"
              type="text"
              defaultValue={artist}
              onChange={handleUpdateArtist}
            />
          </Typography>
          <Typography
            sx={{ color: "#702963", fontWeight: "bold", fontSize: "25px" }}
            id="modal-modal-youTubeId"
            variant="h6"
            component="h2"
          >
            YouTubeId:{" "}
            <input
              id="edit-artist-modal-youTubeId-textfield"
              className="modal-textfield"
              type="text"
              defaultValue={youTubeId}
              onChange={handleUpdateYouTubeId}
            />
          </Typography>

          <Button
            variant="contained"
            color="inherit"
            sx={{
              border: 1,
              marginLeft: "2px",
              marginRight: "2px",
              fontSize: "11px",
              fontWeight: "bold",
              marginTop: "40px",
              marginLeft: "60px",
            }}
            onClick={handleConfirmEditSong}
          >
            Confirm
          </Button>

          <Button
            variant="contained"
            color="inherit"
            sx={{
              border: 1,
              marginLeft: "2px",
              marginRight: "2px",
              fontSize: "11px",
              fontWeight: "bold",
              marginTop: "40px",
              marginLeft: "60px",
            }}
            onClick={handleCancelEditSong}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
}