import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, useNavigate, useLocation, Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import { useMaterialUIController, setMiniSidenav } from "context";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Loading from "common/Loading";
import 'App.css';
import { getCookie } from "utils/common";
import routes from "./routes"; 
import BlogList from "pages/Blog/BlogList";
import BlogForm from "pages/Blog/BlogForm";

const Dashboards = React.lazy(() => import("pages/DashBoard/Home"));

interface Route {
  type?: string;
  name?: string;
  key: string;
  icon?: JSX.Element;
  route?: string;
  component?: JSX.Element;
  collapse?: Route[];
}

export default function App() {
    const [controller, dispatch] = useMaterialUIController();
    const location = useLocation();
    const token = getCookie('token');
    const navigate = useNavigate();
    const {
        miniSidenav,
        direction,
        layout,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        darkMode,
    } = controller;

    const [onMouseEnter, setOnMouseEnter] = useState(false);

    const handleOnMouseEnter = () => {
        if (miniSidenav && !onMouseEnter) {
            setMiniSidenav(dispatch, false);
            setOnMouseEnter(true);
        }
    };




    useEffect(() => {
        if (!token) {
            navigate('/dashboard');
        } else {
            // handleGenerateRoutes();
        }
    }, [token]);

    const handleOnMouseLeave = () => {
        if (onMouseEnter) {
            setMiniSidenav(dispatch, true);
            setOnMouseEnter(false);
        }
    };

    useEffect(() => {
        document.body.setAttribute("dir", direction);
    }, [direction]);

    const getRoutes = (allRoutes: Route[]): JSX.Element[] => {
        return allRoutes.map((route: Route) => {
            if (route.collapse) {
                return (
                    <Route path={route.route} key={route.key} element={<Outlet />}>
                        {getRoutes(route.collapse)}
                    </Route>
                );
            }

            if (route.route) {
                return <Route path={route.route} element={route.component} key={route.key} />;
            }

            return null;
        }).filter((element): element is JSX.Element => element !== null); 
    };

    return (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
            <>
                <CssBaseline />
                {layout === "dashboard" && (
                    <>
                        <Sidenav
                            color={sidenavColor}
                            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                            brandName="Blog Project"
                            routes={routes}
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                        />
                        <Configurator />
                    </>
                )}
                {layout === "vr" && <Configurator />}
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {getRoutes(routes)}
                        <Route path="/dashboard" element={<Dashboards />} />
                        <Route path="/blog/add" element={<BlogForm method={"POST"} />} />
                        <Route path="/blog/update/:id" element={<BlogForm method={"PUT"}/>} />
                        <Route path="/blog/list" element={< BlogList/>} />
                   
                    </Routes>
                </Suspense>
            </>
        </ThemeProvider>
    );
}
