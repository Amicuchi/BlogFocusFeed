import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import PropTypes from 'prop-types';

import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import About from '../pages/About/About';
import Terms from '../components/Footer/Terms/Terms';
import Privacy from '../components/Footer/Privacy/Privacy';
import ContactForm from '../pages/ContactForm/ContactForm';

import FilteredPosts from '../pages/FilteredPosts/FilteredPosts';
import TableFilteredPosts from '../pages/TableFilteredPosts/TableFilteredPosts.jsx';
import OpenedPost from '../pages/OpenedPost/OpenedPost';

import Profile from '../pages/UserAuthenticated/Profile/Profile';
import Settings from '../pages/UserAuthenticated/Settings/Settings';
import MyPosts from '../pages/UserAuthenticated/MyPosts/MyPosts';
import PostForm from '../pages/UserAuthenticated/PostForm/PostForm';
import Register from '../pages/Register/Register.jsx';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword.jsx';
import ResetPasswordWithToken from '../pages/ForgotPassword/ResetPasswordWithToken/ResetPasswordWithToken.jsx';
import Unsubscribe from '../pages/Unsubscribe/Unsubscribe.jsx';
import Dashboard from '../pages/UserAuthenticated/Dashboard/Dashboard.jsx';

const Private = ({ Component }) => {
    const { signed } = useAuth();
    return signed ? <Component /> : <Login />;
};

function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password-with-token/:token" element={<ResetPasswordWithToken />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/unsubscribe/:token" element={<Unsubscribe />} />

            {/* Dynamic Category and Post Routes */}
            <Route path="/post/:id" element={<OpenedPost />} />
            <Route path="/posts" element={<TableFilteredPosts />} />
            <Route path="/category/:categoryId" element={<FilteredPosts />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<Private Component={Dashboard} />} />
            <Route path="/dashboard/perfil" element={<Private Component={Profile} />} />
            <Route path="/dashboard/configuracoes" element={<Private Component={Settings} />} />
            <Route path="/dashboard/meus-posts" element={<Private Component={MyPosts} />} />
            <Route path="/dashboard/novo-post" element={<Private Component={PostForm} />} />
            <Route path="/dashboard/posts/edit/:postId" element={<Private Component={PostForm} />} />

            {/* 404 Route */}
            <Route path="*" element={<div>Nenhuma página encontrada.</div>} />
        </Routes>
    );
}

Private.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default AppRoutes;