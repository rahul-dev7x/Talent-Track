import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./components/user/Home"
import SignUp from "./components/auth/SignUp"
import Login from "./components/auth/Login"




const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/register",
    element:<SignUp/>
  },
  {
    path:"/login",
    element:<Login/>
  }
])


const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
