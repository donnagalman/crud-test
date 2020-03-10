import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

function AddEditBlog(props) {
  const [form, setForm] = useState({
    id: null,
    title: "",
    message: "",
    like_count: null,
    comment_count: null,
    author: {
      first_name: "",
      last_name: ""
    }
  });

  const onChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitFormAdd = e => {
    e.preventDefault();
    fetch("/cards", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: "uuid",
        title: form.title,
        message: form.message,
        author: {
          first_name: form.first_name,
          last_name: form.last_name
        }
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          props.addItemToState(item[0]);
          props.toggle();
        } else {
          console.log("FAILEDDDDD");
        }
      })
      .catch(err => console.log(err));
  };

  const submitFormEdit = e => {
    e.preventDefault();
    fetch("/cards", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: "uuid",
        title: form.title,
        message: form.message,
        author: {
          first_name: form.first_name,
          last_name: form.last_name
        }
      })
    })
      .then(response => response.json())
      .then(item => {
        console.log("ITEM", item);
        if (Array.isArray(item)) {
          props.updateState(item[0]);
          props.toggle();
        } else {
          console.log("failed submitFormEdit");
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (props.item) {
      const {
        id,
        title,
        message,
        author: { first_name, last_name }
      } = props.item;
      setForm({
        id,
        title,
        message,
        author: {
          first_name,
          last_name
        }
      });
    }
  }, [props.item]);

  console.log("FORM", form);
  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          onChange={onChange}
          value={form.title || ""}
        />
      </FormGroup>
      <FormGroup>
        <Label for="message">Message</Label>
        <Input
          type="text"
          name="message"
          id="message"
          onChange={onChange}
          value={form.message || ""}
        />
      </FormGroup>

      <FormGroup>
        <Label for="first_name">Author's First Name</Label>
        <Input
          type="text"
          name="first_name"
          id="form.first_name"
          onChange={onChange}
          value={form.author.first_name || ""}
        />
      </FormGroup>

      <FormGroup>
        <Label for="last_name">Author's Last Name</Label>
        <Input
          type="text"
          name="last_name"
          id="form.last_name"
          onChange={onChange}
          value={form.author.last_name || ""}
        />
      </FormGroup>

      <Button>Submit</Button>
    </Form>
  );
}
export default AddEditBlog;
