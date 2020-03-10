import React, { useEffect, useState } from "react";
import ModalForm from "./Components/Modal";
import BlogItem from "./Components/BlogItem";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App(props) {
  const [blogItems, setBlogItems] = useState([]);

  const getItems = () => {
    fetch("/cards")
      .then(response => response.json())
      .then(items => setBlogItems(items.data))
      .catch(err => console.log(err));
  };

  const addItemToState = item => {
    setBlogItems([...blogItems, item]);
  };

  const updateState = item => {
    const itemIndex = blogItems.findIndex(data => data.id === item.data.id);
    const newArray = [
      ...blogItems.slice(0, itemIndex),
      item,
      ...blogItems.slice(itemIndex + 1)
    ];
    setBlogItems(newArray);
  };

  const deleteItemFromState = id => {
    const updatedItems = blogItems.filter(item => item.id !== id);
    setBlogItems(updatedItems);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="container-fluid">
      <div className="add-container">
      <ModalForm buttonLabel="Add Blog" addItemToState={addItemToState}  />
      </div>

      <div className="blog-container">
        <BlogItem
          blogItems={blogItems}
          deleteItemFromState={deleteItemFromState}
          updateState={updateState}
        />
      </div>
    </div>
  
  );
}

export default App;
