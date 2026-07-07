import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Education from './pages/Education';
import CourseDetail from './pages/CourseDetail';
import DiamondDetail from './pages/DiamondDetail';
import Resources from './pages/Resources';
import Tools from './pages/Tools';
import Cart from './pages/Cart';
import { Blog, BlogPost } from './pages/Blog';
import { About } from './pages/About';
import { Contact } from './pages/About';
import { FAQ } from './pages/About';
import { PaymentSuccess } from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { Terms } from './pages/legal/LegalPages';
import { RefundPolicy } from './pages/legal/LegalPages';
import { PrivacyPolicy } from './pages/legal/LegalPages';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourses from './pages/admin/AdminCourses';
import AdminCourseForm from './pages/admin/AdminCourseForm';
import AdminDiamonds from './pages/admin/AdminDiamonds';
import AdminDiamondForm from './pages/admin/AdminDiamondForm';
import AdminUsers from './pages/admin/AdminUsers';
import AdminOrders from './pages/admin/AdminOrders';
import AdminLeads from './pages/admin/AdminLeads';
import AdminResources from './pages/admin/AdminResources';
import AdminBlog, { AdminBlogForm } from './pages/admin/AdminBlog';
import AdminComingSoon from './pages/admin/AdminComingSoon';
import AdminTools from './pages/admin/AdminTools';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div style={{ display:'flex',justifyContent:'center',alignItems:'center',minHeight:'60vh' }}><div className="spinner" /></div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { isAdmin, loading, isAuthenticated } = useAuth();
  if (loading) return <div style={{ display:'flex',justifyContent:'center',alignItems:'center',minHeight:'60vh' }}><div className="spinner" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="courses/new" element={<AdminCourseForm />} />
        <Route path="courses/edit/:id" element={<AdminCourseForm />} />
        <Route path="diamonds" element={<AdminDiamonds />} />
        <Route path="diamonds/new" element={<AdminDiamondForm />} />
        <Route path="diamonds/edit/:id" element={<AdminDiamondForm />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="resources" element={<AdminResources />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="blog/new" element={<AdminBlogForm />} />
        <Route path="blog/edit/:id" element={<AdminBlogForm />} />
        <Route path="comingsoon" element={<AdminComingSoon />} />
        <Route path="tools" element={<AdminTools />} />
      </Route>

      <Route path="*" element={
        <div style={{ display:'flex',flexDirection:'column',minHeight:'100vh' }}>
          <ScrollToTop />
          <Navbar />
          <main style={{ flex:1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/education" element={<Education />} />
              <Route path="/education/:slug" element={<CourseDetail />} />
              <Route path="/diamonds" element={<Navigate to="/resources" replace />} />
              <Route path="/diamonds/:id" element={<DiamondDetail />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="*" element={<div style={{textAlign:'center',padding:'100px 20px'}}><h2>404 — Page not found</h2></div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      } />
    </Routes>
  );
}