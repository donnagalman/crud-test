import React, { useState } from "react";

const CreateNewBlog = () => {
  const initialFormState = {
    id: null,
    name: "",
    message: "",
    category: "",
    author: {
      first_name: "",
      last_name: ""
    }
  };

  const [newBlog, setNewBlog] = useState(initialFormState);

  return (
    <div>
      <form></form>
    </div>
  );
};

export default CreateNewBlog;

// input name, status, content, category, and author.
