import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<HomePage />} path="/" exact></Route>
        <Route element={<ProfilePage />} path="/me"></Route>
      </Route>

      <Route element={<RegistrationPage />} path="/register"></Route>
      <Route element={<LoginPage />} path="/login"></Route>

      <Route element={<NotFoundPage />} path="/*"></Route>
    </Routes>
  );
};

export default App;
