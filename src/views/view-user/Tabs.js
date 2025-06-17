// ** React Imports
import { Fragment, useCallback } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { Users } from "react-feather";
import ReusableTable from "../../@core/common/Table";
import formatToPersianDate from "../../utility/helper/format-date";

// ** User Components

const Tab = ({ active, toggleTab, data }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <Users className="font-medium-3 me-50" />
            <span className="fw-bold">رزرو ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Users className="font-medium-3 me-50" />
            <span className="fw-bold">پرداختی ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <Users className="font-medium-3 me-50" />
            <span className="fw-bold">ذخیره ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <Users className="font-medium-3 me-50" />
            <span className="fw-bold">ملک ها</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <div>رزرو ها</div>
        </TabPane>
        <TabPane tabId="2">
          <div>پرداختی ها</div>
        </TabPane>
        <TabPane tabId="3">
          <div>ذخیره ها</div>
        </TabPane>
        <TabPane tabId="4">
          <div>ملک ها</div>
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default Tab;
