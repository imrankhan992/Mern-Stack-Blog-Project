import "./App.css";
import Header from "./components/Header";
import Post from "./components/Post";
import { Form, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./components/IndexPage";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import { UserContextProvider } from "./components/userContext"
import CreatePage from "./components/CreatePage";
import DetailsPage from "./components/DetailsPage";
import EditPost from "./components/EditPost";
import Myprofile from "./components/Myprofile";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" exact element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createpost" element={<CreatePage />} />
          <Route path="/post/:id" element={<DetailsPage />} /> 
          <Route path="/post/edit/:id" element={<EditPost />} />
          <Route path="/myprofile" element={<Myprofile />} /> 
        </Route>
      </Routes>
    </UserContextProvider>

  );
}

export default App;
