import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
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
      console.log(user);
      if (user.emailVerified) {
        console.log("Email is verified");
        setCurrentUser(user);
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
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
