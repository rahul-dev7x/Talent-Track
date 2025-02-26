import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/user/Home";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Jobs from "./components/user/Jobs";
import JobDescription from "./components/user/JobDescription";
import Profile from "./components/user/Profile";
import Browse from "./components/user/Browse";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
