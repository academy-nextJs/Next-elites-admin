import {
  Book,
  Box,
  Home,
  Image,
  Layers,
  List,
  Map,
  MessageCircle,
  MessageSquare,
  Percent,
  PlusCircle,
  Users,
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
    id: "houses",
    title: "املاک",
    icon: <Home />,
    children: [
      {
        id: "housesList",
        title: "لیست",
        icon: <List size={50} />,
        navLink: "/houses-management/list",
      },
    ],
  },
  {
    id: "bookings",
    title: "رزرو ها",
    icon: <Book />,
    children: [
      {
        id: "bookingsList",
        title: "لیست",
        icon: <List size={50} />,
        navLink: "/bookings-management/list",
      },
    ],
  },
  {
    id: "users",
    title: "کاربران",
    icon: <Users />,
    children: [
      {
        id: "usersList",
        title: "لیست",
        icon: <List size={50} />,
        navLink: "/users-management/list",
      },
    ],
  },
  {
    id: "contactUsMessage",
    title: "پیام کاربران",
    icon: <MessageSquare />,
    children: [
      {
        id: "contactUsList",
        title: "لیست",
        icon: <List size={50} />,
        navLink: "/contactUs-management/list",
      },
    ],
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
    ],
  },
  {
    id: "categories",
    title: "دسته بندی ها",
    icon: <Layers />,
    children: [
      {
        id: "categoriesList",
        title: "لیست",
        icon: <List size={50} />,
        navLink: "/categories-management/list",
      },
    ],
  },
  {
    id: "comments",
    title: "نظرات",
    icon: <MessageCircle />,
    children: [
      {
        id: "commentsList",
        title: "لیست",
        icon: <List size={50} />,
        navLink: "/comments-management/list",
      },
    ],
  },
  {
    id: "discounts",
    title: "کد تخفیف",
    icon: <Percent />,
    children: [
      {
        id: "discountsList",
        title: "لیست",
        icon: <List size={50} />,
        navLink: "/discounts-management/list",
      },
    ],
  },
];
