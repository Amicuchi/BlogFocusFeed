import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import About from '../pages/About/About';
import Terms from '../components/Footer/Terms/Terms';
import Privacy from '../components/Footer/Privacy/Privacy';
import ContactForm from '../pages/ContactForm/ContactForm';

import FilteredPosts from '../pages/FilteredPosts/FilteredPosts';
import OpenedPost from '../pages/OpenedPost/OpenedPost';

import Profile from '../pages/UserAuthenticated/Profile/Profile';
import Settings from '../pages/UserAuthenticated/Settings/Settings';
import MyPosts from '../pages/UserAuthenticated/MyPosts/MyPosts';
import NewPost from '../pages/UserAuthenticated/NewPost/NewPost';

function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* Dynamic Category and Post Routes */}
            <Route path="/post/:id" element={<OpenedPost />} />
            <Route path="/:category" element={<FilteredPosts />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard/perfil" element={<Profile />} />
                <Route path="/dashboard/configuracoes" element={<Settings />} />
                <Route path="/dashboard/meus-posts" element={<MyPosts />} />
                <Route path="/dashboard/novo-post" element={<NewPost />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<div>Nenhuma página encontrada.</div>} />
        </Routes>
    )
}

export default AppRoutes;