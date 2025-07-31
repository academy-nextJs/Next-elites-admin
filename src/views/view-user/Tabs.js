// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { Book, DollarSign, Home } from "react-feather";
import UserHouses from "./UserHouses";
import UserPayments from "./UserPayments";
import UserReserves from "./UserReserves";

const Tab = ({ active, toggleTab, data }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <Book className="font-medium-3 me-50" />
            <span className="fw-bold">رزرو ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <DollarSign className="font-medium-3 me-50" />
            <span className="fw-bold">پرداختی ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <Home className="font-medium-3 me-50" />
            <span className="fw-bold">ملک ها</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <UserReserves id={data?.id} />
        </TabPane>
        <TabPane tabId="2">
          <UserPayments id={data?.id} />
        </TabPane>
        <TabPane tabId="4">
          <UserHouses id={data?.id} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default Tab;
