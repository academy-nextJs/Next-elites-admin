import { Table, Card, CardHeader, Row, Col, CardTitle } from "reactstrap";
import { useSkin } from "../../utility/hooks/useSkin";

const ReusableTable = ({
  headers,
  data,
  renderRow,
  headerContent,
  pageTitle,
  headerStyle,
}) => {
  const { skin } = useSkin();
  return (
    <Card>
      <CardHeader className="border-bottom">
        <CardTitle tag="h4">{pageTitle}</CardTitle>
      </CardHeader>
      <Row className="mx-0 mt-1">
        <Col>
          <div className="d-flex align-items-center">{headerContent}</div>
        </Col>
      </Row>
      <Table dark={skin == "light" ? false : true} responsive>
        <thead>
          <tr className="text-center">
            {headers.map((header, index) => (
              <th
                key={index}
                style={headerStyle ? headerStyle : { fontSize: "18px" }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr className="text-center" key={index}>
              {renderRow(item)}
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default ReusableTable;
