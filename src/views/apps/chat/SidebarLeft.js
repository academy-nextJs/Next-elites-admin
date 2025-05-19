// ** Custom Components
import Avatar from "@components/avatar";
import classNames from "classnames";

// ** Third Party Components
import { Search, X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Reactstrap Imports
import { CardText, Input, InputGroup, InputGroupText } from "reactstrap";

const SidebarLeft = ({
  conversations,
  activeConversationId,
  setActiveConversationId,
}) => {
  // ** Renders Chat
  const renderChats = () => {
    return conversations?.map((conversation) => {
      const user = conversation.participants.find((p) => !p.isAdmin);
      return (
        <li
          className={classNames({
            active: activeConversationId === conversation.id,
          })}
          key={conversation.id}
          onClick={() => setActiveConversationId(conversation.id)}
        >
          <Avatar img={user.profilePicture} imgHeight="42" imgWidth="42" />
          <div className="chat-info flex-grow-1">
            <h5 className="mb-0">{user?.name}</h5>
            <CardText className="text-truncate">
              {conversation.messages[0]?.content || "No messages yet"}
            </CardText>
          </div>
        </li>
      );
    });
  };

  return (
    <div className="sidebar-left">
      <div className="sidebar">
        <div className="chat-profile-sidebar">
          <header className="chat-profile-header">
            <div className="close-icon">
              <X size={14} />
            </div>
            <div className="header-profile-sidebar">
              <Avatar
                className="box-shadow-1 avatar-border"
                img={null}
                size="xl"
              />
              <h4 className="chat-user-name">Navodreza Abbasazadeh</h4>
              <span className="user-post">Admin</span>
            </div>
          </header>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-close-icon">
            <X size={14} />
          </div>
          <div className="chat-fixed-search">
            <div className="d-flex align-items-center w-100">
              <div className="sidebar-profile-toggle">
                <Avatar
                  className="avatar-border"
                  img={null}
                  imgHeight="42"
                  imgWidth="42"
                />
              </div>
              <InputGroup className="input-group-merge ms-1 w-100">
                <InputGroupText className="round">
                  <Search className="text-muted" size={14} />
                </InputGroupText>
                <Input
                  className="round"
                  placeholder="Search or start a new chat"
                />
              </InputGroup>
            </div>
          </div>
          <PerfectScrollbar
            className="chat-user-list-wrapper list-group"
            options={{ wheelPropagation: false }}
          >
            <h4 className="chat-list-title">Chats</h4>
            <ul className="chat-users-list chat-list media-list">
              {renderChats()}
            </ul>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
