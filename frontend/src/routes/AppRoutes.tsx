import { createBrowserRouter } from "react-router";
import App from "../App";
import Wanderer from "../pages/wanderer/Wanderer";

export const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/auth',
        element: <h1>Auth!</h1>
      },
      {
        path: '/app',
        element: <Wanderer />
      }
    ]
  }
])