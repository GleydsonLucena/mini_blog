import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreatePost from "./pages/CreatePost/CreatePost";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";

import Container from "./layout/Container/Container";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import { UserContextProvider } from "./context/UserContext";

import { AuthContextProvider } from "./context/AuthContext";

import { useAutentication } from "./hooks/useAutentication";
import { onAuthStateChanged } from "firebase/auth";
import Search from "./pages/Search/Search";
import Post from "./pages/Post/Post";
import EditPost from "./pages/EditPost/EditPost";

function App() {
  const [user, setUser] = useState();
  const { auth } = useAutentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <AuthContextProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <Container customClass="min-height center">
            <UserContextProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/posts/:id" element={<Post />} />
                <Route
                  path="/posts/edit/:id"
                  element={user ? <EditPost /> : <Navigate to="/login" />}
                />
                <Route path="/about" element={<About />} />
                <Route
                  path="/login"
                  element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                  path="/register"
                  element={!user ? <Register /> : <Navigate to="/" />}
                />
                <Route
                  path="/posts/create"
                  element={user ? <CreatePost /> : <Navigate to="/login" />}
                />
                <Route
                  path="/Dashboard"
                  element={user ? <Dashboard /> : <Navigate to="/login" />}
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </UserContextProvider>
          </Container>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
