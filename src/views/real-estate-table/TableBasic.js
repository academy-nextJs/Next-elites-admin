// ** Icons Imports
import { Edit, MoreVertical, Trash } from "react-feather";

// ** Reactstrap Imports
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  UncontrolledDropdown,
} from "reactstrap";

const TableBasic = ({ data }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th style={{ fontSize: "18px" }}>نام</th>
          <th style={{ fontSize: "18px" }}>وبسایت</th>{" "}
          <th style={{ fontSize: "18px" }}>سال تاسیس</th>{" "}
          <th style={{ fontSize: "18px" }}>شهر</th>{" "}
          <th style={{ fontSize: "18px" }}>موسس</th>
          <th style={{ fontSize: "18px" }}>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((realEstate, index) => {
          return (
            <tr key={index}>
              <td
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <img
                  height="60"
                  width="100"
                  src={realEstate.image}
                  style={{ borderRadius: "12px", border: "2px solid #586cff" }}
                />
                <div style={{ fontSize: "18px" }}>{realEstate.name}</div>
              </td>
              <td style={{ fontSize: "18px" }}>
                <a href={realEstate.website}>{realEstate.website}</a>
              </td>
              <td style={{ fontSize: "18px" }}>{realEstate.yearOfEstablish}</td>
              <td style={{ fontSize: "18px" }}>{realEstate.city}</td>
              <td
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  height="50"
                  width="50"
                  src={realEstate.founderImage}
                  style={{ borderRadius: "100%" }}
                />
                <div style={{ fontSize: "16px" }}>{realEstate.founder}</div>
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
