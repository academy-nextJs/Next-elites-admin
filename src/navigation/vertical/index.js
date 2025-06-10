import {
  Box,
  Home,
  Image,
  List,
  Map,
  MessageSquare,
  PlusCircle,
} from "react-feather";

export default [
  {
    id: "home",
    title: "خانه",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "chat",
    title: "چت",
    icon: <MessageSquare size={20} />,
    navLink: "/apps/chat",
  },
  {
    id: "tours",
    title: "تورها",
    icon: <Map />,
    children: [
      {
        id: "toursList",
        title: "لیست",
        icon: <List size={50} />,
        navLink: "/tours-management/list",
      },
      {
        id: "toursCreate",
        title: "ساخت",
        icon: <PlusCircle size={50} />,
        navLink: "/tours-management/create",
      },
    ],
  },
  {
    id: "realEstate",
    title: "دفاتر مشاور املاک",
    icon: <Image />,
    children: [
      {
        id: "realEstateList",
        title: "لیست",
        icon: <List size={50} />,
        navLink: "/real-estate-management/list",
      },
      {
        id: "realEstateCreate",
        title: "ساخت",
        icon: <PlusCircle size={50} />,
        navLink: "/tours-management/create",
      },
    ],
  },
  {
    id: "locations",
    title: "مقاصد",
    icon: <Box />,
    children: [
      {
        id: "locationList",
        title: "لیست",
        icon: <List size={50} />,
        navLink: "/locations-management/list",
      },
      {
        id: "locationCreate",
        title: "ساخت",
        icon: <PlusCircle size={50} />,
        navLink: "/locations/create",
      },
    ],
  },
];
