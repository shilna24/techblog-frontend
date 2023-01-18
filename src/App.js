import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";

import Login from "./components/Users/Login/Login";
import Register from "./components/Users/Register/Register";
import Navbar from "./components/Navigation/Navbar";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import UserProtectedRoute from "./components/Navigation/ProtectedRoutes/UserProtectedRoute";
import AdminProtectedRoute from "./components/Navigation/ProtectedRoutes/AdminProtectedRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostsList";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
        <Route exact path="/" element={<HomePage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/posts" element={<PostsList />} />

          <Route element={<AdminProtectedRoute />}>
            {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
            {/* <Route path="/send-mail" element={<SendEmail />} /> */}

            {/* <Route path="/users" element={<UsersList />} /> */}
            {/* <Route path="/reported-list" element={<ReportedPost />} /> */}

            <Route path="/create-post" element={<CreatePost />} />

            <Route path="/add-category" element={<AddNewCategory />} />

            <Route path="/update-category/:id" element={<UpdateCategory />} />
            <Route exact path="/category-list" element={<CategoryList/>} />
          </Route>
          
         
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}
export default App;
