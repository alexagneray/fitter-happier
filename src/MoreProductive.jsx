import {
  Container,
  Row,
  Col,
  Navbar,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import MenuNavBar from "./MenuNavBar";
import { Task, TaskList } from "./Tasks.jsx";
import { useEffect, useState } from "react";

function MenuBar({ onAddTask }) {
  return (
    <Navbar className="bg-light justify-content-between">
      <Form
        className="d-flex d-sm-flex-column mt-2 mt-sm-0"
        onSubmit={(e) => {
          e.preventDefault();
          onAddTask(e.target[0].value);
          e.target[0].value = "";
        }}
      >
        <Row className="g-2">
          <Col xs="auto" className="mb-2 mb-sm-0">
            <FormControl
              type="text"
              placeholder="Add Task"
              className="me-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Add</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

export function MoreProductive() {
  //   const [count, setCount] = useState(0);

  const [tasks, setTasks] = useState(function () {
    const taskList = localStorage.getItem("taskList");
    return taskList ? JSON.parse(taskList) : [];
  });

  useEffect(
    function () {
      console.log("effect");
      localStorage.setItem("taskList", JSON.stringify(tasks));
    },
    [tasks]
  );

  function handleAddTask(taskName) {
    const taskAdded = {
      id: tasks.length,
      name: taskName,
      checked: false,
    };
    setTasks((tasks) => [...tasks, taskAdded]);
  }

  function handleRemoveTask(id) {
    setTasks(() => tasks.filter((t) => t.id !== id));
  }
  function handleCheckTask(action) {
    setTasks(() =>
      tasks.map((a) => (a.id === action.id ? { ...a, checked: !a.checked } : a))
    );
  }

  function handleEditTask(id, newName) {
    console.log(`${id} and ${newName}`);
    setTasks(() =>
      tasks.map((a) => (a.id === id ? { ...a, name: newName } : a))
    );
  }
  return (
    <Container>
      <Row>
        <Col>
          <MenuNavBar />
        </Col>
      </Row>
      <Row>
        <Col>
          <MenuBar onAddTask={handleAddTask} />
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
          <Navbar expand="lg" className="bg-light">
            <h1>More Productive</h1>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col>
          <TaskList>
            {tasks.map((a) => (
              <Task
                key={a.id}
                task={a}
                handleCheckTask={() => handleCheckTask(a)}
                handleEditTask={handleEditTask}
                handleRemoveTask={handleRemoveTask}
              />
            ))}
          </TaskList>
        </Col>
      </Row>
    </Container>
  );
}
