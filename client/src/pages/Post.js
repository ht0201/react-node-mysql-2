import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:7000/posts/${id}`).then((res) => {
      setPost(res.data);
    });

    axios.get(`http://localhost:7000/comments/${id}`).then((res) => {
      setComments(res.data);
    });
  }, [id]);

  const addComment = () => {
    const dataComment = { commentBody: newComment, postId: id };
    axios.post(`http://localhost:7000/comments`, dataComment, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then((res) =>
    {
      if (res.data.error)
      {
        console.log(res.data.error);
        alert(res.data.error)
      } else
      {
        console.log(res.data);
        dataComment.username = res.data.username;
        setComments([...comments, dataComment]);
        setNewComment("");
      }
    
    });
  };

  if (!post) return;
  if (!comments) return;

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {post.title} </div>
          <div className="body">{post.postText}</div>
          <div className="footer">{post.username}</div>
        </div>
      </div>

      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            autoComplete="off"
            placeholder="Comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment}>Add comment</button>
        </div>

        <div className="listOfComments">
          {comments.map((comment, index) => {
            return (
              <div key={index} className="comment">
                {comment.commentBody} {`Username: ${comment.username}`}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
