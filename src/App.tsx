import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Layout from "./components/Layout";
import AuthProvider from "./providers/AuthProvider";



export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/feeds/:id" element={<Detail />} />
            <Route path="/feeds/create" element={<CreatePage />} />
            <Route path="/feeds/update/:id" element={<UpdatePage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
} 