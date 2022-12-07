import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/HighlightOff";

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
  const { store } = useContext(GlobalStoreContext);

  function handleAddNewSong() {
    store.addNewSong();
  }
  function handleUndo() {
    store.undo();
  }
  function handleRedo() {
    store.redo();
  }
  function handleClose() {
    store.closeCurrentList();
  }

 
  return (
    <div id="edit-toolbar">
      <Button
        variant="contained"
        color="inherit"
        sx={{
          border: 1,
          marginLeft: "2px",
          marginRight: "2px",
          fontSize: "8px",
          fontWeight: "bold",
          marginTop: "10px",
          marginRight: "10p",
        }}
        disabled={!store.canAddNewSong()}
        id="add-song-button"
        onClick={handleAddNewSong}
      >
        <AddIcon sx={{fontSize:"20px", fontWeight:"bold"}}> </AddIcon>
      </Button>
      {/* <Button
        disabled={!store.canUndo()}
        id="undo-button"
        onClick={handleUndo}
        variant="contained"
      >
        <UndoIcon />
      </Button> */}

      <Button
        variant="contained"
        color="inherit"
        sx={{
          border: 1,
          marginLeft: "2px",
          marginRight: "2px",
          fontSize: "11px",
          fontWeight: "bold",
          marginTop: "10px",
          marginRight: "10p",
        }}
        onClick={handleUndo}
      >
        Undo
      </Button>
      {/* 
      <Button
        disabled={!store.canRedo()}
        id="redo-button"
        onClick={handleRedo}
        variant="contained"
      >
        <RedoIcon />
      </Button> */}

      <Button
        variant="contained"
        color="inherit"
        sx={{
          border: 1,
          marginLeft: "2px",
          marginRight: "2px",
          fontSize: "11px",
          fontWeight: "bold",
          marginTop: "10px",
          marginRight: "10px",
        }}
        onClick={handleRedo}
      >
        Redo
      </Button>
    </div>
  );
}

export default EditToolbar;
