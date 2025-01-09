import { useContext } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { TasksContext } from "./Contexts.jsx";

function Board({ dispatcher, status }) {
  const { tasks } = useContext(TasksContext);
  return (
    <Row>
      {Object.entries(status).map(([k, s]) => (
        <Col key={k}>
          <BoardColumn
            label={s.label}
            colTasks={tasks.filter((t) => !t.status.name.localeCompare(s.name))}
          />
        </Col>
      ))}
    </Row>
  );
}

function BoardColumn({ label, colTasks }) {
  return (
    <Card>
      <Card.Header>{label}</Card.Header>
      <Card.Body>
        {colTasks.map((t) => (
          <Card key={t.id}>
            <Card.Header>
              #{t.id} {t.name}
            </Card.Header>
          </Card>
        ))}
      </Card.Body>
    </Card>
  );
}

export default Board;
