import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import firebase from "../firebase";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [googleAuth, setGoogleAuth] = useState(false);
  const history = useHistory();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    auth
      .signInWithPopup(provider)
      .then(function (result) {
        console.log(result);
        setGoogleAuth(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function logout() {
    return auth.signOut();
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //make sure we don't render any of our app until we have current user set
      setLoading(false);
      console.log(user);
      if (user.emailVerified) {
        console.log("Email is verified");
        setCurrentUser(user);
      } else if (googleAuth) {
        setCurrentUser(user);
        history.push("/");
      } else {
        const actionCodeSettings = {
          url: "http://localhost:3000/login/" + auth.currentUser.email,
          handleCodeInApp: false,
        };
        auth.currentUser.sendEmailVerification(actionCodeSettings);
      }
    });
    //whenever we unmount the auth change listener unsubscribes.
    return unsubscribe;
  });

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
