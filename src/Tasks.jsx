import { ListGroup, ListGroupItem, Button } from "react-bootstrap";

import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

import { useEffect, useRef, useState } from "react";

export function Task({
  task,
  handleCheckTask,
  handleEditTask,
  handleRemoveTask,
}) {
  const [edited, setEdited] = useState(false);
  const inputEl = useRef(null);

  function handleDoubleClick(e) {
    setEdited((edited) => !edited);
  }

  useEffect(
    function () {
      if (!edited) return;

      function callback(e) {
        if (e.code === "Enter" && document.activeElement === inputEl.current) {
          console.log(inputEl.current);
          handleEditTask(task.id, inputEl.current.value);
          setEdited((edited) => !edited);
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [edited, handleEditTask]
  );

  return (
    <ListGroupItem
      key={task.id}
      as="li"
      className={
        task.checked
          ? "d-flex justify-content-between align-items-start bg-warning"
          : "d-flex justify-content-between align-items-start bg-light"
      }
      // onMouseEnter={() => handleCheckAction(action)}
    >
      <FormCheckInput onClick={handleCheckTask} defaultChecked={task.checked} />
      {edited ? (
        <input defaultValue={task.name} ref={inputEl} />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{task.name}</span>
      )}

      <Button variant="link outline-danger">
        <img
          src="cross.jpg"
          width={32}
          onClick={() => {
            confirm("Delete this task ?"), handleRemoveTask(task.id);
          }}
        ></img>
      </Button>
    </ListGroupItem>
  );
}
export function TaskList({ children }) {
  return <ListGroup as="ol">{children}</ListGroup>;
}
