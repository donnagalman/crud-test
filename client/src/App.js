import React, { useEffect, useState } from "react";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faThumbsUp, faPencilAlt, faCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import styled from 'styled-components'

const BlogItemContainer = styled.div`
 padding: 20px
`;

function Blog() {
  const [blogItem, setBlogItem] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get("/cards");
      console.log("data", response);
      setBlogItem(response.data.data);
    };
    fetchItems();
  }, []);

  const onDeleteClick = () => {
    alert("Delete Btn");
  };

  return (
    <div className="container">
    <BlogItemContainer>
      {blogItem.map((item, index) => {
        return (
          <div key={index} className="blog-item">

            <div className="blog-item__header">
              <h1>{item.title}</h1>
              <div className="icon">
                <FontAwesomeIcon icon={faCircleNotch} />
                <button onClick={onDeleteClick}> <FontAwesomeIcon icon={faPencilAlt} /> </button>
              </div>
            </div>

            <div className="blog-item__body">
              <p>{item.message}</p>
            </div>

            <div className="blog-item__like-comment">
              <div>
                <FontAwesomeIcon icon={faHeart} />  
                <span>{item.like_count}</span>
              </div>

              <div>
                <span>{item.comment_count} Comments</span> 
              </div>
              
            </div>

            <div className="blog-item__author">
              <div className="blog-item__author-image">
                <img src="https://i.pravatar.cc/40?img=47"></img>

              </div>

              <div className="blog-item__author-name">
                 <p>{item.author.first_name} {item.author.last_name}</p>
              </div>
            </div>
           
            
          </div>
        );
      })}

      </BlogItemContainer>
    </div>
  );
}

export default Blog;
