import { useContext } from "react";
import { GlobalStoreContext } from "../store/index.js";
import CommentCard from "./CommentCard";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { TextField } from "@mui/material";
import AuthContext from "../auth";

function Comments() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  let commentList = "";
  if (store.playerList) {
    console.log(store.playerList.comment);
    commentList = (
      <List
        id="comments"
        sx={{ width: "100%", height: "100%", backgroundColor: "#c5c5ea" }}
      >
        {store.playerList.comments.map((comment, index) => (
          <CommentCard
            id={"comment-" + index}
            key={"comment-" + index}
            comment={comment}
            index={index}
          />
        ))}
      </List>
    );
  }
  let commentTextField = "";
  if (store.playerList) {
    commentTextField = (
      <div style={{ width: "40%", paddingTop: "5px" }}>
      <TextField
        InputProps={{
          sx: {
            width: 420,
            color: "black",
            backgroundColor: "white",
          },
        }}
        id="comment-text-field"
        className="text"
        //label="Comment"
        variant="standard"
        placeholder="Add Comment"
        size="small"
        disabled={!store.playerList.published || auth.visitor === "GUEST"}
        style={{ paddingTop: 20 }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            store.comment();
          }
        }}
      />
      </div>
    );
  }
  return (
    <div
      style={{
        width: "95%",
        height: "82.5%",
        backgroundColor: "#c5c5ea",
        paddingLeft: 10,
        color:"black"

      }}
    >
      {commentList}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {commentTextField}
      </form>
    </div>
  );
}
export default Comments;
