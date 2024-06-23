import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Event, {loader as eventsLoader} from "./pages/Event";
import EventDetail, { loader as eventDetailLoader, action as deleteEventAction} from "./pages/EventDetail";
import NewEvent from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";
import RootLayout from "./pages/RootLayout";
import EventRootLayout from "./pages/EventRootLayout";
import ErrorPage from "./pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";
import Newsletter, { action as newsletterAction } from "./pages/Newsletter";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'events',
        element: <EventRootLayout />,
        children: [
          { 
            index: true ,
            element: <Event />,
            loader: eventsLoader
          },
          { 
            path: ':eventID',
            id: 'event-detail',
            loader: eventDetailLoader,
            children:[
              { index:true, element: <EventDetail />, action: deleteEventAction},
              { path: 'edit', element: <EditEvent />, action: manipulateEventAction },
            ]
          },
          { path: 'new', element: <NewEvent />, action: manipulateEventAction },
        ]
      },
      {path: "newsletter", element: <Newsletter/>, action: newsletterAction}
    ]
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
