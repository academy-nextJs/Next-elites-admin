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
  const headers = ["نام", "نام خانوادگی", "کد ملی", "جنسیت", "تاریخ تولد"];
  const renderRow = useCallback((user) => {
    return (
      <>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.nationalId}</td>
        <td>{user.gender}</td>
        <td>{formatToPersianDate(user.birthDate)}</td>
      </>
    );
  }, []);
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <Users className="font-medium-3 me-50" />
            <span className="fw-bold">مسافران</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <ReusableTable
            headerStyle={{ fontSize: "14px", whiteSpace: "nowrap" }}
            pageTitle={
              <div className="d-inline-flex gap-1 align-items-center">
                <Users size={35} />
                <h1>تعداد: {data.traveler_details.length} نفر</h1>
              </div>
            }
            headers={headers}
            data={data.traveler_details || []}
            renderRow={renderRow}
          />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default Tab;
