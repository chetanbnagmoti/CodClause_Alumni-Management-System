import React from "react";
import { Route, Routes } from "react-router-dom";
import Headers from "./Components/Headers/Headers";
import Home from "./Pages/Home/Home";
import Edit from "./Pages/Edit/Edit";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import VerticalNavbar from "./Components/Nav/VerticalNavbar";
import Gallery from "./Pages/Gallery/Gallery";
import CourseList from "./Pages/CourseList/CourseList";
import AlumniList from "./Pages/AlumniList/AlumniList";
import Jobs from "./Pages/Jobs/Jobs";
import Events from "./Pages/Events/Events";
import Settings from "./Pages/Settings/Settings";
import Users from "./Pages/Users/Users";
import GalleryFrom from "./Pages/Gallery/GalleryFrom";
import Course_From from "./Pages/CourseList/Course_From";
import Job_From from "./Pages/Jobs/Job_From";
import Events_from from "./Pages/Events/Events_from";
import Event_Edit from "./Pages/Events/Event_Edit";
import Job_Edit from "./Pages/Jobs/Job_Edit";
import GalleryEdit from "./Pages/Gallery/Gallery_Edit";
import Course_Edit from "./Pages/CourseList/Course_Edit";
import Login from "./Pages/Register/Login";
import ForgotPassword from "./Pages/Register/ForgotPassword";
import { useEffect, useState } from "react";
import UserHome from "./Pages/Home/UserHome";
import UserGallary from "./Pages/Gallery/UserGallary";
import UserCourse from "./Pages/CourseList/UserCourse";
import UserAlumni from "./Pages/AlumniList/UserAlumni";
import UserJob from "./Pages/Jobs/UserJob";
import UserEvent from "./Pages/Events/UserEvent";
import CollegeSetting from "./Pages/Settings/CollegeSetting";
import ContactSetting from "./Pages/Settings/ContactSetting";
import './App.css' ;
import PrivateComponet from "./Components/PrivateComponet";
import Notfound from "./Common/Notfound";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      const user = JSON.parse(auth);
      setIsAdmin(user.data.is_admin === 1);
    }
  }, []);

  return (
    <div className="app-container">
      <Headers />
      <div className="row">
      {isAdmin ? (
          <div className="col-lg-2 col-xl-2 col-md-2 col-sm-6 p-0 bg-primary">
            <VerticalNavbar />
          </div>
        ) : null}
        <div className={isAdmin ? "col-lg-10 col-xl-10 col-md-10 col-sm-6 p-0" : "col-12 p-0"}>
          <main className="content-container">
            <Routes>
            <Route element={<PrivateComponet />}>
               
                <Route path="/" element={isAdmin ? <Home /> : <UserHome />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/userprofile/:id" element={<Profile />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/gallery-from" element={<GalleryFrom />} />
                <Route path="/gallery-edit/:id" element={<GalleryEdit />} />
                <Route path="/course-list" element={<CourseList />} />
                <Route path="/course-from" element={<Course_From />} />
                <Route path="/course-edit/:id" element={<Course_Edit />} />
                <Route path="/alumni-list" element={<AlumniList /> } />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs-from" element={<Job_From />} />
                <Route path="/job-edit/:id" element={<Job_Edit />} />
                <Route path="/events" element={ <Events />} />
                <Route path="/events-from" element={<Events_from />} />
                <Route path="/event-edit/:id" element={<Event_Edit />} />
                <Route path="/Users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/college-setting" element={<CollegeSetting />} />
                <Route path="/contact-setting" element={<ContactSetting />} />
                <Route path="/gallery-user" element={<UserGallary />} />
                <Route path="/alumni-list-user" element={ <UserAlumni/>} />
                <Route path="/course-list-user" element={<UserCourse />} />
                <Route path="/events-user" element={<UserEvent/>} />
                <Route path="/jobs-user" element={<UserJob/>} />
                <Route path="*"  element={<Notfound />} />

             </Route>
          
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
