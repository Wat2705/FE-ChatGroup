import Auth from "@/Components/Auth/index.jsx";
import Chat from "@/Components/Chat/index.jsx";
import { createBrowserRouter } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRouter><Chat /></PrivateRouter>,
    },
    {
        path: '/login',
        element: <Auth isLogIn={true} />
    },
    {
        path: '/register',
        element: <Auth isLogIn={false} />
    },
]);