import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import AddEditBlog from "../Components/AddEditBlog";

function ModalForm(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );
  const label = props.buttonLabel;

  let button = "";
  let title = "";

  if (label === "Edit") {
    button = (
      <Button
        color="warning"
        onClick={toggle}
        style={{ float: "left", marginRight: "10px" }}
      >
        {label}
      </Button>
    );
    title = "Edit Blog";
  } else {
    button = (
      <Button
        color="success"
        onClick={toggle}
        style={{ float: "left", marginRight: "10px" }}
      >
        {label}
      </Button>
    );
    title = "Add New Blog";
  }

  return (
    <div>
      {button}
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          {title}
        </ModalHeader>
        <ModalBody>
          <AddEditBlog
            addItemToState={props.addItemToState}
            updateState={props.updateState}
            toggle={toggle}
            item={props.item}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalForm;
