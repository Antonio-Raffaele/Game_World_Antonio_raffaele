import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import Homepage from "../pages/homepage/Homepage";
import ErrorPage from "../pages/error/Error";
import GenrePage from "../pages/genrePage/GenrePage";
import GamePage from "../pages/gamePage/GamePage";
import SearchPage from "../pages/searchpage/SearchPage";
import RegisterPage from "../pages/register/RegisterPage";
import LoginPage from "../pages/login/LoginPage";
import AccountPage from "../pages/account/AccountPage";
import PlatformPage from "../pages/platformPage/PlatformPage";

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/" element={<Homepage />} />
                    <Route path="/games/:genre" element={<GenrePage />} />
                    <Route path="/platforms/:platformId" element={<PlatformPage />} /> 
                    <Route path="/games/:slug/:id" element={<GamePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/register" element={<RegisterPage />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/account" element={<AccountPage />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

