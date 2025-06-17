// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { Book, Map, MessageSquare } from "react-feather";
import MapComponent from "../components/map/map";
import PropertReserves from "./PropertReserves";
import PropertyComments from "./PropertyComments";

const PropertyTab = ({ active, toggleTab, houseData }) => {
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
            <MessageSquare className="font-medium-3 me-50" />
            <span className="fw-bold">کامنت ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <Map className="font-medium-3 me-50" />
            <span className="fw-bold">آدرس روی نقشه</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <PropertReserves id={houseData.id} />
        </TabPane>
        <TabPane tabId="2">
          <PropertyComments id={houseData.id} />
        </TabPane>
        <TabPane tabId="3">
          <div className="w-100 h-50">
            {houseData.location && (
              <MapComponent
                initialLocation={[
                  houseData.location.lat,
                  houseData.location.lng,
                ]}
                initialZoom={5}
              ></MapComponent>
            )}
          </div>
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default PropertyTab;
