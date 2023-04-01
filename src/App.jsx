import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./Pages/cart";
const App = () => {
  return (
    <>
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
        </Routes>
      </Router>
    </>
    );
  
};

export default App;
