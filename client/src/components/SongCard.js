import React, { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function SongCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const [draggedTo, setDraggedTo] = useState(0);
  const { song, index } = props;

  const theme = createTheme({
    palette: {
      purple: {
        main: "#5F23A5",
        contrastText: "#f5f5f5",
      },
    },
  });

  function handleDragStart(event) {
    event.dataTransfer.setData("song", index);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDragEnter(event) {
    event.preventDefault();
    setDraggedTo(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    setDraggedTo(false);
  }

  function handleDrop(event) {
    event.preventDefault();
    let targetIndex = index;
    let sourceIndex = Number(event.dataTransfer.getData("song"));
    setDraggedTo(false);

    // UPDATE THE LIST
    store.addMoveSongTransaction(sourceIndex, targetIndex);
  }
  function handleRemoveSong(event) {
    console.log("removing song");
    store.showRemoveSongModal(index, song);
    console.log(store.currentModal);
  }
  
  function handleEditSong(event) {
    console.log("Editing song");
    store.showEditSongModal(index, song);
  }
  let style = { height: "10px", width: "35px", visibility: "visible" };
  if (store.currentList.published) {
    style = { height: "10px", width: "35px", visibility: "hidden" };
  }

  let cardClass = "list-card unselected-list-card";
  return (
    <div
      key={index}
      id={"song-" + index + "-card"}
      className={cardClass}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      draggable={!store.currentList.published}
      style={{ display: "flex", justifyContent: "space-between" , color:"white", fontWeight:"bold"}}
    >
      <ThemeProvider theme={theme}>
        <div>
          {index + 1}.{song.title} by {song.artist}
        </div>
        <div
          style={{
            display: "flex",
            width: "11%",
            justifyContent: "space-between",
            marginRight:"4px",
            color:"black"
          }}
        >
          <Fab
            color="inherit"
            aria-label="edit"
            id={"edit-song-" + index}
            onClick={handleEditSong}
            style={style}
          >
            <EditIcon />
          </Fab>
          <Fab
            color="inherit"
            aria-label="remove"
            id={"remove-song-" + index}
            onClick={handleRemoveSong}
            style={style}
          >
            <CloseIcon />
          </Fab>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default SongCard;
