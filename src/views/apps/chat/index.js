// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Services
import { fetchConversations } from "../../../utility/services/api/conversations";

// ** Chat App Component Imports
import Sidebar from "./SidebarLeft";
import UserProfileSidebar from "./UserProfileSidebar";
import ChatLog from "./Chat";

import "@styles/base/pages/app-chat-list.scss";
import "@styles/base/pages/app-chat.scss";
import { useQuery } from "@tanstack/react-query";

const AppChat = () => {
  // ** Hooks;
  const [activeConversationId, setActiveConversationId] = useState();

  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchConversations,
    staleTime: 0,
    refetchInterval: 100,
  });

  return (
    <Fragment>
      <Sidebar
        conversations={data}
        activeConversationId={activeConversationId}
        setActiveConversationId={setActiveConversationId}
      />
      <div className="content-right">
        <div className="content-wrapper">
          <div className="content-body">
            <div className="body-content-overlay"></div>
            {data && (
              <ChatLog
                conversations={data}
                activeConversationId={activeConversationId}
              />
            )}
            <UserProfileSidebar />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AppChat;
