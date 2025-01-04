import { Row, Col, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { Task, TaskList } from "./Tasks.jsx";
import { useEffect, useState, useReducer } from "react";

function MenuBar({ dispatcher }) {
  return (
    <Navbar className="bg-light justify-content-between">
      <Form
        className="d-flex d-sm-flex-column mt-2 mt-sm-0"
        onSubmit={(e) => {
          e.preventDefault();
          dispatcher({ type: "add", payload: { name: e.target[0].value } });
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
  const [{ tasks }, dispatcher] = useReducer(
    reducer,
    { tasks: [] },
    function () {
      const taskList = localStorage.getItem("taskList");
      return taskList ? { tasks: JSON.parse(taskList) } : { tasks: [] };
    }
  );

  function reducer(state, action) {
    switch (action.type) {
      case "add":
        const taskAdded = {
          id: state.tasks.length,
          name: action.payload.name,
          checked: false,
        };
        return { ...state, tasks: [...state.tasks, taskAdded] };
      case "remove":
        return {
          ...state,
          tasks: state.tasks.filter((e) => e.id !== action.payload.id),
        };
      case "edit":
        return {
          ...state,
          tasks: state.tasks.map((e) =>
            e.id === action.payload.id ? { ...e, name: action.payload.name } : e
          ),
        };
      case "check":
        return {
          ...state,
          tasks: state.tasks.map((e) =>
            e.id === action.payload.id ? { ...e, checked: !e.checked } : e
          ),
        };
      default:
        throw new Error("Unknown type");
    }
  }

  useEffect(
    function () {
      console.log("effect");
      localStorage.setItem("taskList", JSON.stringify(tasks));
    },
    [tasks]
  );

  return (
    <>
      <Row>
        <Col>
          <MenuBar dispatcher={dispatcher} />
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
              <Task key={a.id} task={a} dispatcher={dispatcher} />
            ))}
          </TaskList>
        </Col>
      </Row>
    </>
  );
}
