// ** Custom Components
import Avatar from "@components/avatar";

// ** API & Services
import { sendMessage } from "../../../utility/services/api/messages";

// ** Third Party Components
import classnames from "classnames";
import {
  Image,
  Menu,
  MessageSquare,
  Mic,
  PhoneCall,
  Search,
  Send,
  Video,
} from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Reactstrap Imports
import { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";

const ChatLog = ({ setConversations, conversations, activeConversationId }) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const handleSendMessage = async () => {
    if (!message.trim() || !activeConversationId) return;

    setIsSending(true);
    try {
      const adminId = "5";

      await sendMessage(message, adminId, activeConversationId);

      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const renderChats = () => {
    return activeConversation.messages?.map((msg) => {
      return (
        <div
          key={msg.id}
          className={classnames("chat", {
            "chat-left": msg.sender.isAdmin == false,
          })}
        >
          <div className="chat-avatar">
            <Avatar
              imgWidth={36}
              imgHeight={36}
              className="box-shadow-1 cursor-pointer"
              img={msg.sender.profilePicture}
            />
          </div>

          <div className="chat-body">
            <div key={1} className="chat-content">
              <p>{msg.content}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="chat-app-window">
      {!activeConversationId ? (
        <div className="start-chat-area">
          <div className="start-chat-icon mb-1">
            <MessageSquare />
          </div>
          <h4 className="sidebar-toggle start-chat-text">Start Conversation</h4>
        </div>
      ) : (
        <div className="active-chat">
          <div className="chat-navbar">
            <header className="chat-header">
              <div className="d-flex align-items-center">
                <div className="sidebar-toggle d-block d-lg-none me-1">
                  <Menu size={21} />
                </div>
                <Avatar
                  imgHeight="36"
                  imgWidth="36"
                  img={activeConversation.participants.find((p) => !p.isAdmin).profilePicture}
                  className="avatar-border user-profile-toggle m-0 me-1"
                />
                <h6 className="mb-0">{activeConversation.participants.find((p) => !p.isAdmin).name}</h6>
              </div>
              <div className="d-flex align-items-center">
                <PhoneCall
                  size={18}
                  className="cursor-pointer d-sm-block d-none me-1"
                />
                <Video
                  size={18}
                  className="cursor-pointer d-sm-block d-none me-1"
                />
                <Search
                  size={18}
                  className="cursor-pointer d-sm-block d-none"
                />
              </div>
            </header>
          </div>

          <PerfectScrollbar
            className="user-chats"
            options={{ wheelPropagation: false }}
          >
            <div className="chats">{renderChats()}</div>
          </PerfectScrollbar>

          <Form className="chat-app-form">
            <InputGroup className="input-group-merge me-1 form-send-message">
              <InputGroupText>
                <Mic className="cursor-pointer" size={14} />
              </InputGroupText>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message or use speech to text"
              />
              <InputGroupText>
                <Label className="attachment-icon mb-0" for="attach-doc">
                  <Image className="cursor-pointer text-secondary" size={14} />
                  <input type="file" id="attach-doc" hidden />
                </Label>
              </InputGroupText>
            </InputGroup>
            <Button
              onClick={(e) => {
                handleSendMessage();
                e.preventDefault;
              }}
              className="send"
              color="primary"
            >
              <Send size={14} className="d-lg-none" />
              <span className="d-none d-lg-block">
                {isSending ? "Sending..." : "Send"}
              </span>
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ChatLog;
