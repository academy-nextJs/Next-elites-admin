// ** Reactstrap Imports
import { Card, CardBody, CardText, Button } from "reactstrap";

// ** Images
import medal from "../../assets/images/badge.svg";
import { getItem } from "../../utility/services/local storage/storage.services";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const CardMedal = () => {
  const token = getItem("accessToken");
  const decoded = typeof token == "string" && jwtDecode(token);
  return (
    <Card className="card-congratulations-medal">
      <CardBody>
        <h5>خوش آمدید {decoded.name} 🎉!</h5>
        <CardText className="font-small-3">به داشبورد پیزا خوش آمدید.</CardText>

        <Link to={`/houses-management/list`}>
          {" "}
          <Button color="primary">مدیریت املاک</Button>
        </Link>

        <img className="congratulation-medal" src={medal} alt="Medal Pic" />
      </CardBody>
    </Card>
  );
};

export default CardMedal;
