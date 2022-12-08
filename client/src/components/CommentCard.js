import React, { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";

function CommentCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const { comment, index } = props;

  return (
    <div
      style={{
        fontSize: "15pt",
        margin: "10px",
        padding: "20px",
        borderRadius: "25px",
        backgroundColor: "#e3c21b",
        color:"black",
        border:"1px solid black"
      }}
    >
      <div
        style={{
          fontSize: 16,
          padding: "0px 5px 5px 0px",
          color:"blue",
          fontWeight:"bold",
          textDecoration:"underline",
        }}
      >
        {" "}
        {comment.user} <br />
      </div>
      {comment.comment}
    </div>
  );
}

export default CommentCard;
