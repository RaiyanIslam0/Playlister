import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
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
    store.showRemoveSongModal(index, song);
  }
  /*function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2) {
            console.log("double clicked");
            store.showEditSongModal(index, song);
        }
    }*/
  function handleEditSong(event) {
    store.showEditSongModal(index, song);
  }

  let style = { height: "10px", width: "35px", visibility: "visible" };
  if (store.currentList.published) {
    style = { height: "10px", width: "35px", visibility: "hidden" };
  }

  let cardClass = "list-card unselected-list-card";
  //return (
  /*<div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleClick}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <Button
                sx={{transform:"translate(-5%, -5%)", width:"5px", height:"30px"}}
                variant="contained"
                id={"remove-song-" + index}
                className="list-card-button"
                onClick={handleRemoveSong}>{"\u2715"}</Button>
        </div>*/
  /*
        <div
        key={index}
        id={"song-" + index + "-card"}
        className={cardClass}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        draggable="true"
        //onClick={handleClick}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          {index + 1}.
          <a
            id={"song-" + index + "-link"}
            className="song-link"
            target="_blank"
            href={"https://www.youtube.com/watch?v=" + song.youTubeId}
          >
            {song.title} by {song.artist}
          </a>
        </div>
        <div style={{display: 'flex', width: '11%', justifyContent: 'space-between'}}>
          <Fab
            color="primary"
            aria-label="edit"
            id={"edit-song-" + index}
            onClick={handleEditSong}
            style={{ height: "10px", width: "35px" }}
          >
            <EditIcon />
          </Fab>
          <Fab
            color="primary"
            aria-label="remove"
            id={"remove-song-" + index}
            onClick={handleRemoveSong}
            style={{ height: "10px", width: "35px" }}
          >
            <CloseIcon />
          </Fab>
        </div>
      </div>
    );
}

export default SongCard;
*/

  /*
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
      //onClick={handleClick}
      style={{ display: "flex", justifyContent: "space-between" }}
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
          }}
        >
          <Fab
            color="purple"
            aria-label="edit"
            id={"edit-song-" + index}
            onClick={handleEditSong}
            style={style}
          >
            <EditIcon />
          </Fab>
          <Fab
            color="purple"
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
*/

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
      //onClick={handleClick}
      style={{ display: "flex", justifyContent: "space-between" }}
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
          }}
        >
          <Fab
            color="purple"
            aria-label="edit"
            id={"edit-song-" + index}
            onClick={handleEditSong}
            style={style}
          >
            <EditIcon />
          </Fab>
          <Fab
            color="purple"
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

