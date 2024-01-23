import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import AlertNotification from "./components/ui/AlertNotification";
import Register from "./components/Register";
import Login from "./components/Login";
import AddSkill from "./components/AddSkill";
import HomePage from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: (
      <RequireAuth redirectTo="/login">
        <HomePage />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/add-skill",
    element: (
      <RequireAuth redirectTo="/login">
        <AddSkill />
      </RequireAuth>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <AlertNotification />
    </>
  );
}

function RequireAuth(props) {
  const token = useSelector((state) => state.auth.token);
  return token !== undefined && token !== null ? (
    props.children
  ) : (
    <Navigate to={props.redirectTo} />
  );
}

export default App;
