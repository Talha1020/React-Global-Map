import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pricing from "./Pages/Pricing";
import Product from "./Pages/Product";
import Homepage from "./Pages/Homepage";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./Pages/AppLayout";
import Login from "./Pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";

import City from "./components/City";
import { Navigate } from "react-router-dom";
import Form from "./components/Form";
import { Provider } from "./contexts/ContextProvider";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to="cities" replace />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
