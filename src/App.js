import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Users/Login/Login";
import Register from "./components/Users/Register/Register";
import Navbar from "./components/Navigation/Navbar";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import AdminProtectedRoute from "./components/Navigation/ProtectedRoutes/AdminProtectedRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostsList";
import PostDetails from "./components/Posts/PostDetails";
import UserProtectedRoute from "./components/Navigation/ProtectedRoutes/UserProtectedRoute";
import UpdatePost from "./components/Posts/UpdatePost";
import UpdateComment from "./components/Comments/UpdateComment";
import Profile from "./components/Users/Profile/Profile";
import UploadProfilePhoto from "./components/Users/Profile/UploadProfilePhoto";
import AccountVerified from "./components/Users/AccountVerification/AccountVerified";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/register" element={<Register />} />

          <Route exact path="/login" element={<Login />} />

          <Route exact path="/posts" element={<PostsList />} />

          <Route exact path="/posts/:id" element={<PostDetails />} />

          

          <Route
            path="/upload-photo/:id"
            element={
              <UserProtectedRoute>
                <UploadProfilePhoto />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/update-post/:id"
            element={
              <UserProtectedRoute>
                <UpdatePost />
              </UserProtectedRoute>
            }
          />
          

          <Route
            path="/create-post"
            element={
              <UserProtectedRoute>
                <CreatePost />
              </UserProtectedRoute>
            }
          />

<Route
            path="/update-comment/:id"
            element={
              <UserProtectedRoute>
                <UpdateComment />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/profile/:id"
            element={
              <UserProtectedRoute>
                <Profile />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/verify-account/:token"
            element={
              <UserProtectedRoute>
                <AccountVerified />
              </UserProtectedRoute>
            }
          />
          
          <Route element={<AdminProtectedRoute />}>
            <Route path="/add-category" element={<AddNewCategory />} />
            <Route path="/update-category/:id" element={<UpdateCategory />} />
            <Route exact path="/category-list" element={<CategoryList />} />
          </Route>

          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}
export default App;
