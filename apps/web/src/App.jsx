import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./components/AuthProvider.jsx";
import Header from "./components/Header.jsx";
import Detail from "./pages/Detail.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Rating from "./pages/Rating.jsx";
import Register from "./pages/Register.jsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/film/:id" element={<Detail />} />
                        <Route path="/film/:id/rating" element={<Rating />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
