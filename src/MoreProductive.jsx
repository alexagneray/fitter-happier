import { Row, Col, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { Task, TaskList } from "./Tasks.jsx";
import { useEffect, useState, useReducer } from "react";
import Board from "./Board.jsx";
import NewTaskForm from "./NewTaskForm.jsx";

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
  const status = {
    todo: { name: "todo", label: "To Do", previous: null, next: "running" },
    running: {
      name: "running",
      label: "Running",
      previous: "todo",
      next: "done",
    },
    done: { name: "done", label: "Done", previous: "running", next: null },
  };
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
        if (!action.payload || !action.payload.name) return state;
        const taskAdded = {
          id: state.tasks.length,
          name: action.payload.name,
          desc: action.payload.desc,
          estimated: action.payload.estimated,
          planned: action.payload.planned,
          real: action.payload.real,
          checked: false,
          status: { ...status.todo },
        };
        console.log(taskAdded);
        return { ...state, tasks: [...state.tasks, taskAdded] };
      case "remove":
        return {
          ...state,
          tasks: state.tasks.filter((e) => e.id !== action.payload.id),
        };
      case "edit":
        return {
          ...state,
          tasks: state.tasks.map((t) =>
            t.id === action.payload.id
              ? { ...t, name: action.payload.value }
              : t
          ),
        };
      // case "check":
      //   const tmp = {
      //     ...state,
      //     tasks: state.tasks.map((e) =>
      //       e.id === action.payload.id
      //         ? {
      //             ...e,
      //             checked: !e.checked,
      //             status: { ...status.running },
      //             // status: `${
      //             //   !e.status.name.localeCompare("todo")
      //             //     ? { ...status.running }
      //             //     : { ...status.todo }
      //             // }`,
      //           }
      //         : e
      //     ),
      //   };
      //   console.log(tmp);
      //   return tmp;
      case "nextStatus":
        return {
          ...state,
          tasks: state.tasks.map((t) =>
            t.id === action.payload.id
              ? t.status.next
                ? { ...t, status: { ...status[t.status.next] } }
                : t
              : t
          ),
        };
      case "previousStatus":
        return {
          ...state,
          tasks: state.tasks.map((t) =>
            t.id === action.payload.id
              ? t.status.previous
                ? { ...t, status: { ...status[t.status.previous] } }
                : t
              : t
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

  console.log(tasks);
  return (
    <>
      <Row>
        <Col>
          {/* <MenuBar dispatcher={dispatcher} /> */}
          <NewTaskForm dispatcher={dispatcher} />
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
      <Row>
        <Col>
          <Board tasks={tasks} dispatcher={dispatcher} status={status} />
        </Col>
      </Row>
    </>
  );
}
