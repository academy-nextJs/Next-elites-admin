// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";

const Chat = lazy(() => import("../../views/apps/chat"));

// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import LocationsList from "../../pages/LocationsList";
import { getItem } from "../../utility/services/local storage/storage.services";

import { jwtDecode } from "jwt-decode";
import CategoriesList from "../../pages/CategoriesList";
import DiscountList from "../../pages/DiscountList";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/home";

const Home = lazy(() => import("../../pages/Home"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const Error = lazy(() => import("../../pages/Error"));
const TourManagement = lazy(() => import("../../pages/ToursList"));
const HousesList = lazy(() => import("../../pages/HousesList"));
const HouseDetail = lazy(() => import("../../pages/HouseDetail"));
const BookingsList = lazy(() => import("../../pages/BookingsList"));
const BookingDetail = lazy(() => import("../../pages/BookingDetail"));
const UsersList = lazy(() => import("../../pages/UsersList"));
const UserDetail = lazy(() => import("../../pages/UserDetail"));
const ContactUsMessages = lazy(() =>
  import("../../pages/ContactUsMessagesList")
);
const CommentDetail = lazy(() => import("../../pages/CommentDetail"));
const CommentsList = lazy(() => import("../../pages/CommentsList"));

const getHomeRoute = () => {
  const token = getItem("accessToken");
  const user = typeof token == "string" && jwtDecode(token);
  if (user) {
    return "/home";
  } else {
    return "/login";
  }
};

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={getHomeRoute()} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/apps/chat",
    element: <Chat />,
    meta: {
      appLayout: true,
      className: "chat-application",
    },
  },
  {
    path: "/houses-management/list",
    element: <HousesList />,
  },
  {
    path: "/houses-management/:id",
    element: <HouseDetail />,
  },
  {
    path: "/bookings-management/list",
    element: <BookingsList />,
  },
  {
    path: "/bookings-management/:id",
    element: <BookingDetail />,
  },
  {
    path: "/users-management/list",
    element: <UsersList />,
  },
  {
    path: "/users-management/:id",
    element: <UserDetail />,
  },
  {
    path: "/contactUs-management/list",
    element: <ContactUsMessages />,
  },
  {
    path: "/comments-management/list",
    element: <CommentsList />,
  },
  {
    path: "/comments-management/:id",
    element: <CommentDetail />,
  },
  {
    path: "/tours-management/list",
    element: <TourManagement />,
  },
  {
    path: "/locations-management/list",
    element: <LocationsList />,
  },
  {
    path: "/categories-management/list",
    element: <CategoriesList />,
  },
  {
    path: "/discounts-management/list",
    element: <DiscountList />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, getRoutes, Routes, TemplateTitle };
