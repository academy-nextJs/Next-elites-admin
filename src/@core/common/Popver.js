import { MoreVertical } from "react-feather";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";

export default function Popover({ items }) {
  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle
        tag="button"
        className="btn p-0 border-0 bg-transparent shadow-none"
        style={{ boxShadow: "none" }}
      >
        <MoreVertical size={18} />
      </DropdownToggle>
      <DropdownMenu>
        {items.map(({ label, icon: Icon, onClick, className }, i) => (
          <DropdownItem
            key={i}
            className={`w-100 ${className || ""}`}
            onClick={onClick}
          >
            <Icon size={15} />
            <span className="align-middle ms-50">{label}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
}
