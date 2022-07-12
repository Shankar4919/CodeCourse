import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/CSS/style.css";

import "../components/TopNav";
import TopNav from "../components/TopNav";

//toastify notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  
import { Provider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer position="top-center" />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
