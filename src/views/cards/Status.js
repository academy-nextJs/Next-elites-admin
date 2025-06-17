import { CardText, Col } from "reactstrap";
import Avatar from "@components/avatar";

const Status = ({ icon, title, value, color }) => {
  return (
    <Col className="mb-2">
      <div className="d-flex align-items-center">
        <Avatar icon={icon} color={color} className="me-2" />
        <div className="my-auto">
          <h4 className="fw-bolder mb-0" style={{ whiteSpace: "nowrap" }}>
            {title}
          </h4>
          <CardText className="font-small-3 mb-0">{value}</CardText>
        </div>
      </div>
    </Col>
  );
};
export default Status;
