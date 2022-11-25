import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:7000/posts/${id}`).then((res) => {
      setPost(res.data);
    });
  }, [id]);

  if (!post) return;

  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='post' id='individual'>
          <div className='title'> {post.title} </div>
          <div className='body'>{post.postText}</div>
          <div className='footer'>{post.username}</div>
        </div>
      </div>
      <div className='rightSide'>Comment Section</div>
    </div>
  );
};

export default Post;
