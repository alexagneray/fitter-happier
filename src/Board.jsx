import { Row, Col, Card } from "react-bootstrap";

function Board({ tasks, dispatcher, status }) {
  return (
    <Row>
      {Object.entries(status).map(([k, s]) => (
        <Col key={k}>
          <BoardColumn
            label={s.label}
            tasks={tasks.filter((t) => !t.status.name.localeCompare(s.name))}
          />
        </Col>
      ))}
    </Row>
  );
}

function BoardColumn({ label, tasks }) {
  return (
    <Card>
      <Card.Header>{label}</Card.Header>
      <Card.Body>
        {tasks.map((t) => (
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
