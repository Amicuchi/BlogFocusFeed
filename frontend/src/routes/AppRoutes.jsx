import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '../components/guards/PrivateRoute';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import UserSettings from '../pages/UserSettings';
import UserPosts from '../pages/UserPosts';
import NewPost from '../pages/NewPost';
import PostDetail from '../components/posts/PostDetail';
import CategoryPosts from '../components/posts/CategoryPosts';
import LoginForm from '../components/user/LoginForm';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/categoria/:category" element={<CategoryPosts />} />

      {/* Rotas Protegidas */}
      <Route
        path="/perfil"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/configuracoes"
        element={
          <PrivateRoute>
            <UserSettings />
          </PrivateRoute>
        }
      />
      <Route
        path="/meus-posts"
        element={
          <PrivateRoute>
            <UserPosts />
          </PrivateRoute>
        }
      />
      <Route
        path="/novo-post"
        element={
          <PrivateRoute>
            <NewPost />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;