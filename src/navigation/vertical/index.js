import { Home, Mail, MessageSquare } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <MessageSquare size={20} />,
    navLink: "/apps/chat",
  },
];
