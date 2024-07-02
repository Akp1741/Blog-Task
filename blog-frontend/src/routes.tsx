import { lazy } from "react";
import { Home, BusinessCenter, CategoryOutlined, ProductionQuantityLimitsRounded, Face } from "@mui/icons-material";

const Dashboard = lazy(() => import("pages/DashBoard/Home"));
const BlogList= lazy(()=> import("pages/Blog/BlogList"))
const BlogForm= lazy(()=> import("pages/Blog/BlogForm"))


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Home />,
    route: "/dashboard",
    component: <Dashboard />,
  },
 
  {
    type: "collapse",
    name: "Blog",
    key: "Blog",
    icon: <ProductionQuantityLimitsRounded />,
    route: "/blog/list",
    component: <BlogList />,
    collapse: [
      {
        type: "route",
        name: "Add Blog",
        key: "add-blog",
        route: "add", 
        component: <BlogForm method="POST" />,
      },
      {
        type: "route",
        name: "List Blog",
        key: "list-blog",
        route: "/blog/list",
        component: <BlogList />,
      },
      {
        type: "route",
        name: "Update Blog",
        key: "update-Blog",
        route: "update/:id",
        component: <BlogForm method="PUT" />,
      },
    ],
  },
];

export default routes;
