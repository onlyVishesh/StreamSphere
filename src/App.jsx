import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import Channel from "./pages/Channel/Channel";
import Home from "./pages/Home/Home";
import Liked from "./pages/Liked/Liked";
import Subscriber from "./pages/Subscriber/Subscriber";
import Watch from "./pages/Watch/Watch";
import WatchLater from "./pages/WatchLater/WatchLater";
import store from "./utils/store";
import Trending from "./pages/Trending/Trending";

{
  /**

Components 

1. Header 
  i) Hamburger menu
  ii) Name/Logo
  iii) Search bar
  iv) Notification 
  v) Profile
2. Sidebar
  i) Navigation links

Pages 

1. Home Page
  i) Header
  ii) video card section

2. Watch page
  i) header 
  ii) Video component - video, channel icon, video title, sub button. like, dislike, add to watch later etc
  iii) comments
  iv) recommended videos
3. Watch later page
4. login/signIn
5. subscribe page
6. channel page
7. liked page


**/
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainContainer />,
    children: [
      { path: "/", element: <Home /> },
      { path: "watch", element: <Watch /> },
      { path: "watchLater", element: <WatchLater /> },
      { path: "subscriber", element: <Subscriber /> },
      { path: "trending", element: <Trending /> },
      { path: "channel", element: <Channel /> },
      { path: "liked", element: <Liked /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <Header />
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
