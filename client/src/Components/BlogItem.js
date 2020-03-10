import React from "react";
import { Button } from "reactstrap";
import ModalForm from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faHeart } from "@fortawesome/free-solid-svg-icons";

import "../App.css";

function BlogItem(props) {
  const deleteItem = id => {
    let confirmDelete = window.confirm("Delete this blog?");
    if (confirmDelete) {
      fetch("/cards", {
        method: "delete",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => response.json())
        .then(item => {
          props.deleteItemFromState(id);
        })
        .catch(err => console.log(err));
    }
  };

  const blogItems = props.blogItems.map(item => {
    return (
      <div key={item.id} className="blog-item">
        <div className="blog-item__header">
          <h1>{item.title}</h1>
          <div className="div-left">
            
           
            <ModalForm
              buttonLabel="Edit"
              item={item}
              updateState={props.updateState}
            />

              <Button color="danger" onClick={() => deleteItem(item.id)}>
              Del
        </Button>
          </div>
        </div>

        <div className="blog-item__body">
          <p>{item.message}</p>
          <div className="blog-item__like-comment">
            <div>
              <FontAwesomeIcon icon={faHeart} />
              <span>{item.like_count}</span>
            </div>

            <div>
                {item.comment_count} <span>Comments</span>
             
            </div>
          </div>
        </div>

        <div className="blog-item__author">
          <div className="blog-item__author-image">
            <img src="https://i.pravatar.cc/150?img=47"/>
          </div>
          <p className="blog-item__author-name">
            {item.author.first_name} {item.author.last_name}
          </p>
        </div>

       
      </div>
    );
  });
  return <div>{blogItems}</div>;
}
export default BlogItem;
