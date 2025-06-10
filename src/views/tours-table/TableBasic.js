// ** Icons Imports
import { Edit, MoreVertical, Trash } from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import { formatNumber } from "../../utility/helper/format-number";
import formatToPersianDate from "../../utility/helper/format-date";

const TableBasic = ({ data }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th style={{ fontSize: "18px" }}>نام</th>
          <th style={{ fontSize: "18px" }}>مقصد</th>
          <th style={{ fontSize: "18px" }}>تگ</th>
          <th style={{ fontSize: "18px" }}>قیمت</th>
          <th style={{ fontSize: "18px" }}>تاریخ</th>
          <th style={{ fontSize: "18px" }}>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((tour, index) => {
          return (
            <tr key={index}>
              <td
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <img
                  height="60"
                  width="100"
                  src={tour.tourImage}
                  style={{ borderRadius: "12px", border: "2px solid #586cff" }}
                />
                <div style={{ fontSize: "18px" }}>{tour.tourName}</div>
              </td>
              <td style={{ fontSize: "18px" }}>{tour.tourLocation}</td>
              <td>
                <Badge style={{ fontSize: "18px" }} pill color="light-primary">
                  {tour.tags}
                </Badge>
              </td>
              <td style={{ fontSize: "18px" }}>
                {formatNumber(Number(tour.price.price))} ت
              </td>
              <td style={{ fontSize: "18px" }}>
                {formatToPersianDate(tour.startDate)}
              </td>
              <td>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="icon-btn hide-arrow"
                    color="transparent"
                    size="sm"
                    caret
                  >
                    <MoreVertical size={15} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      <Edit className="me-50" size={15} />{" "}
                      <span className="align-middle">Edit</span>
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      <Trash className="me-50" size={15} />{" "}
                      <span className="align-middle">Delete</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableBasic;
