import logo from "./logo.svg";
import "./App.css";
import Landing from "./pages/Landing.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import DashboardLandlord from "./pages/landlord/DashboardLandlord.jsx";
import DashboardTenant from "./pages/tenant/DashboardTenant.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, setDoc, addDoc, collection, doc } from "firebase/firestore";
import { auth, db, app } from "./firebase.js";
import { populateData } from "./populate";
import { getPerformance } from "firebase/performance";

const perf = getPerformance(app);
const building1Id = "UAOvFSgW51PrvvIq30Oi";

const setSignInLocalStorage = (signInType, userEmail, userId) => {
  window.localStorage.setItem("signInType", signInType);
  window.localStorage.setItem("userEmail", userEmail);
  window.localStorage.setItem("signInId", userId);
};

const removeSignInLocalStorage = () => {
  window.localStorage.removeItem("signInType");
  window.localStorage.removeItem("userEmail");
  window.localStorage.removeItem("signInId");
};

class App extends Component {
  constructor() {
    super();
    this.handleUserSignIn = this.handleUserSignIn.bind(this);
    this.handleUserSignOut = this.handleUserSignOut.bind(this);
    this.handleUserSignUp = this.handleUserSignUp.bind(this);

    this.signinElement = React.createRef();
    this.signupElement = React.createRef();

    const signInType = window.localStorage.getItem("signInType");
    this.state = {
      signInType: signInType,
      userEmail: "",
    };
  }

  handleUserSignIn(email, password, signInType) {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        this.signinElement.current.setState({ errorMessage: "" });
        // Signed in
        const user = userCredential.user;
        const uid = user.uid;
        const userDocRef = doc(db, signInType, uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          // perform signin
          setSignInLocalStorage(signInType, email, uid);
          this.setState({ signInType: signInType, userEmail: email });
          window.location.href = `/dashboard/${signInType}`;
        } else {
          throw {
            message: "User not found. Are you signing in as the correct role?",
          };
        }
      })
      .catch((error) => {
        const msg = error.message;
        console.log("error signing in: ", msg);
        this.signinElement.current.setState({ errorMessage: msg });
      });
  }

  handleUserSignUp(email, password, signUpType) {
    const generateRandomInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  
    const generateRandomPhoneNumber = () => {
      return `${generateRandomInteger(100, 1000)}-${generateRandomInteger(
        100,
        1000
      )}-${generateRandomInteger(1000, 10000)}`;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        this.signupElement.current.setState({ errorMessage: "" });
        const user = userCredential.user;
        const uid = user.uid;
        console.log(user.email, uid);
        const userDoc = doc(db, signUpType, uid);
        if (signUpType === "tenant") {
          await setDoc(userDoc, {
            email: email,
            buildingId: building1Id, // prototype purpose, all tenant belong to buildling 1
            phoneNumber: generateRandomPhoneNumber(),
            room: generateRandomInteger(100, 10000)
          });
        } else {
          await setDoc(userDoc, {
            email: email,
            buildings: [building1Id], // prototype purpose, all landlord own buildling 1
            phoneNumber: generateRandomPhoneNumber(),
          });
        }
        // sign in user
        setSignInLocalStorage(signUpType, email, uid);
        this.setState({ signInType: signUpType, userEmail: email });
        window.location.href = `/dashboard/${signUpType}`;
      })
      .catch((error) => {
        const msg = error.message;
        console.log("error signing up: ", msg);
        this.signupElement.current.setState({ errorMessage: msg });
      });
  }

  handleUserSignOut() {
    const type = window.localStorage.getItem("signInType");
    removeSignInLocalStorage();
    this.setState({ signInType: null, userEmail: "" });
    window.location.href = `/signin/${type}`;
  }

  ifUserSignedIn(Component, userType) {
    const signInType = this.state.signInType;
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
    const handleUserSignUp = this.handleUserSignUp;
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="signin/tenant"
              element={
                <Signin
                  userType="tenant"
                  handleUserSignIn={handleUserSignIn}
                  ref={this.signinElement}
                />
              }
            />
            <Route
              path="signin/landlord"
              element={
                <Signin
                  userType="landlord"
                  handleUserSignIn={handleUserSignIn}
                  ref={this.signinElement}
                />
              }
            />
            <Route
              path="signup"
              element={
                <Signup
                  handleUserSignUp={handleUserSignUp}
                  ref={this.signupElement}
                />
              }
            />
            <Route
              path="dashboard/landlord"
              element={this.ifUserSignedIn(DashboardLandlord, "landlord")}
            />
            <Route
              path="dashboard/tenant"
              element={this.ifUserSignedIn(DashboardTenant, "tenant")}
            />
            <Route path="populate" element={populateData()} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
