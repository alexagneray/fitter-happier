import { Modal, Button, Form } from "react-bootstrap";
// import { DatePicker } from "react-bootstrap-date-picker";
import { useState } from "react";
function NewTaskForm({ dispatcher }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    const [name, desc, estimated, planned, real] = Object.entries(e.target).map(
      ([k, t]) => t.value
    );
    dispatcher({
      type: "add",
      payload: { name, desc, estimated, planned, real },
    });

    handleClose();
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        New Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTaskName">
              <Form.Label>Task name</Form.Label>
              <Form.Control type="text" placeholder="Task name" />
              <Form.Text className="text-muted">
                Choose an concise and explicit name ;-)
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskDesc">
              <Form.Label>Task description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Task desc" />
              <Form.Text className="text-muted">
                Describe more precisely your task !
              </Form.Text>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formTaskDesc">
              <Form.Label>Begin date</Form.Label>
              <DatePicker
                disabled={true}
                onChange={this.handleChange}
                placeholder="Placeholder"
                value={this.state.date}
                id="disabled_example"
              />
            </Form.Group> */}
            {/* <Form.Group className="mb-3" controlId="formTaskDesc">
              <Form.Label>End date</Form.Label>
              <Form.Control as="date" rows={3} placeholder="End date" />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="formEstimated">
              <Form.Label>Estimated</Form.Label>
              <Form.Control type="number" placeholder="estimated" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPlanned">
              <Form.Label>Planned</Form.Label>
              <Form.Control type="number" placeholder="planned" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formReal">
              <Form.Label>Real</Form.Label>
              <Form.Control type="number" placeholder="real" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="info" type="button" onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NewTaskForm;
