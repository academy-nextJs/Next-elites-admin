// ** Third Party Components
import { Book, Home, Star, Users } from "react-feather";

// ** Custom Components

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Row,
} from "reactstrap";
import formatToPersianDate from "../../utility/helper/format-date";
import Status from "./Status";

const StatsCard = ({ data }) => {
  const renderData = () => {
    return (
      <>
        <Status
          icon={<Home />}
          title={"تعداد آکهی"}
          value={data?.totalHouses}
          color={"light-success"}
        />
        <Status
          icon={<Users />}
          title={" کاربران"}
          value={data?.totalUsers}
          color={"light-primary"}
        />
        <Status
          icon={<Book />}
          title={" رزروها"}
          value={data?.totalBookings}
          color={"light-info"}
        />
        <Status
          icon={<Star />}
          title={"میانگین امتیازات"}
          value={data?.averageRating}
          color={"light-warning"}
        />
      </>
    );
  };

  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">آمار و اطلاعات</CardTitle>
        <CardText className="card-text font-small-2 me-25 mb-0">
          آخرین بروزرسانی: {formatToPersianDate()}
        </CardText>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
