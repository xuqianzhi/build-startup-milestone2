import logo from "./logo.svg";
import "./App.css";
import Landing from "./pages/Landing.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import DashboardLandlord from "./pages/landlord/DashboardLandlord.jsx";
import DashboardTenant from "./pages/tenant/DashboardTenant.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Component } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDx0Mevlnf4oDjDYidM2EzkOiOpXHoiZBo",
  authDomain: "xqz-cs5356.firebaseapp.com",
  projectId: "xqz-cs5356",
  storageBucket: "xqz-cs5356.appspot.com",
  messagingSenderId: "748563665138",
  appId: "1:748563665138:web:0b3a9baeaff9295fb0006b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

class App extends Component {
  constructor() {
    super();
    this.handleUserSignIn = this.handleUserSignIn.bind(this);
    this.handleUserSignOut = this.handleUserSignOut.bind(this);

    const signInType = window.localStorage.getItem("signInType");
    this.state = {
      signInType: signInType,
    };
  }

  handleUserSignIn(email, password, signInType) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        window.localStorage.setItem("signInType", signInType);
        this.setState({ signInType: signInType });
        window.location.href = `/dashboard/${signInType}`;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error logging in: ", errorCode, errorMessage);
      });
  }

  handleUserSignOut() {
    window.localStorage.removeItem("signInType");
    this.setState({ signInType: null });
    window.location.href = "/";
  }

  ifUserSignedIn(Component, userType) {
    const signInType= this.state.signInType;
    if (signInType && signInType == userType) {
      return <Component handleUserSignOut={this.handleUserSignOut} />;
    } else {
      return (
        <Signin userType={userType} handleUserSignIn={this.handleUserSignIn} />
      );
    }
  }

  render() {
    const handleUserSignIn = this.handleUserSignIn;
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="signin/tenant"
              element={
                <Signin userType="tenant" handleUserSignIn={handleUserSignIn} />
              }
            />
            <Route
              path="signin/landlord"
              element={
                <Signin
                  userType="landlord"
                  handleUserSignIn={handleUserSignIn}
                />
              }
            />
            <Route path="signup" element={<Signup />} />
            <Route
              path="dashboard/landlord"
              element={this.ifUserSignedIn(DashboardLandlord, "landlord")}
            />
            <Route
              path="dashboard/tenant"
              element={this.ifUserSignedIn(DashboardTenant, "tenant")}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
