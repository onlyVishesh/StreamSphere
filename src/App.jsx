import { Provider } from "react-redux";
import "./App.css";
import Head from "./components/Header";
import MainContainer from "./components/MainContainer";
import store from "./utils/store";

{
  /**

Components 

1. Header 
  i) Hamburger menu
  ii) Name/Logo
  iii) Search bar
  iv) Notification 
  v) Profile
2. Footer
  i) Name/logo
  ii) Social Links
  iii) Navigation links
  iv) Download button


Pages 

1. Home Page
  i) Header
  ii) video card section
  iii) footer
2. Watch page
  i) header 
  ii) Video component - video, channel icon, video title, sub button. like, dislike, add to watch later etc
  iii) comments
3. Watch later page
4. Profile
5. login/signIn



**/
}

function App() {
  return (
    <Provider store={store}>
      <Head />
      <MainContainer />
    </Provider>
  );
}

export default App;
