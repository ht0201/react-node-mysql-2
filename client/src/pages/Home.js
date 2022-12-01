import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Home()
{
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() =>
  {
    axios.get('http://localhost:7000/posts').then((response) =>
    {
      setListOfPosts(response.data);
    });
  }, []);

  const onLike = (postId) =>
  {
    axios.post(`http://localhost:7000/likes`, { PostId: postId }, {
      headers: { accessToken: localStorage.getItem('accessToken') }
    }).then((res) =>
    {
      setListOfPosts(
        listOfPosts.map(post =>
        {
          if (post.id === postId)
          {
            if (res.data.liked)
            {
              return { ...post, Likes: [...post.Likes, res.data.itemLike] }
            } else
            {
              return { ...post, Likes: post.Likes.filter(like => like.userId !== res.data.itemLike.userId) };
            }
          } else
          {
            return post;
          }
        })
      ) 
    })
  }

  return (
    <div>
      {listOfPosts.map((post, key) =>
      {
        return (
          <div
            className='post'
            key={post.id}
          >
            <div className='title'> {post.title} </div>
            <div className='body'
              onClick={() =>
              {
                navigate(`/post/${ post.id }`);
              }}
            >
              {post.postText}
            </div>
            <div className='footer'>
              {post.username}
              <button onClick={() => onLike(post.id)}>
                  Like
                  {post.Likes.length} 
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
