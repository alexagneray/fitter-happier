import { ListGroup, Button, Table } from "react-bootstrap";

import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

import { useEffect, useRef, useState } from "react";

export function Task({ task, dispatcher }) {
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
          dispatcher({
            type: "edit",
            payload: { id: task.id, value: inputEl.current.value },
          });
          setEdited((edited) => !edited);
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [edited, dispatcher, task.id]
  );

  return (
    <Table>
      <tbody>
        <tr>
          <td width="5%">
            <FormCheckInput
              onClick={() =>
                dispatcher({ type: "check", payload: { id: task.id } })
              }
              defaultChecked={task.checked}
            />
          </td>
          <td width="5%">
            <Button
              variant="btn bg-info"
              onClick={() =>
                dispatcher({ type: "previousStatus", payload: { id: task.id } })
              }
            >
              Previous
            </Button>
          </td>
          <td width="20%">
            <span>{task.status.label}</span>
          </td>
          <td width="5%">
            <Button
              variant="btn bg-info"
              onClick={() =>
                dispatcher({ type: "nextStatus", payload: { id: task.id } })
              }
            >
              Next
            </Button>
          </td>
          <td width="30%">
            {edited ? (
              <input defaultValue={task.name} ref={inputEl} />
            ) : (
              <span onDoubleClick={handleDoubleClick}>{task.name}</span>
            )}
          </td>
          <td width="5%">
            <Button variant="link outline-danger">
              <img
                src="cross.jpg"
                width={32}
                onClick={() => {
                  confirm("Delete this task ?"),
                    dispatcher({ type: "remove", payload: { id: task.id } });
                }}
              ></img>
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export function TaskList({ children }) {
  return <ListGroup as="ol">{children}</ListGroup>;
}
