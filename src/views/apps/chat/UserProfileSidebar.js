// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  X
} from "react-feather";

const UserProfileSidebar = () => {

  return (
    <div className="user-profile-sidebar">
      <header className="user-profile-header">
        <span className="close-icon">
          <X size={14} />
        </span>
        <div className="header-profile-sidebar">
          <Avatar
            className="box-shadow-1 avatar-border"
            size="xl"
            img={null}
            imgHeight="70"
            imgWidth="70"
          />
          <h4 className="chat-user-name">Navidreza Abbaszadeh</h4>
          <span className="user-post">Seller</span>
        </div>
      </header>
    </div>
  );
};

export default UserProfileSidebar;
