import { Home, Mail, MessageSquare } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "secondPage",
    title: "Second Page",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <MessageSquare size={20} />,
    navLink: "/apps/chat",
  },
];
