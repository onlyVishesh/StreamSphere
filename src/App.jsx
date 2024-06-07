import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainContainer from "./components/MainContainer";
import Channel from "./pages/Channel/Channel";
import Comedy from "./pages/Explore/Comedy/Comedy";
import Entertainment from "./pages/Explore/Entertainment/Entertainment";
import Films from "./pages/Explore/Films/Films";
import Gaming from "./pages/Explore/Gaming/Gaming";
import Music from "./pages/Explore/Music/Music";
import News from "./pages/Explore/News/News";
import Sports from "./pages/Explore/Sports/Sports";
import Trending from "./pages/Explore/Trending/Trending";
import Home from "./pages/Home/Home";
import Liked from "./pages/Liked/Liked";
import Search from "./pages/Search/Search";
import Subscriber from "./pages/Subscriber/Subscriber";
import Watch from "./pages/Watch/Watch";
import WatchLater from "./pages/WatchLater/WatchLater";
import store from "./utils/store";
import History from "./pages/History/History";

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
      { path: "subscriber", element: <Subscriber /> },
      { path: "history", element: <History /> },
      { path: "watchLater", element: <WatchLater /> },
      { path: "liked", element: <Liked /> },
      { path: "search", element: <Search /> },
      { path: "trending", element: <Trending /> },
      { path: "entertainment", element: <Entertainment /> },
      { path: "music", element: <Music /> },
      { path: "films", element: <Films /> },
      { path: "gaming", element: <Gaming /> },
      { path: "news", element: <News /> },
      { path: "sports", element: <Sports /> },
      { path: "comedy", element: <Comedy /> },
      { path: "channel", element: <Channel /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
