import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./firebase.init";
import Form from "./components/Form/Form";
import { Button } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        console.log(result.user);
      })
      .catch((err) => console.log(err));
  };
  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
      });
  };

  return (
    <div className=" ">
      <Form></Form>
      <div className="w-50 mx-auto">
        {user.uid ? (
          <Button onClick={handleSignOut} variant="danger">
            Sign Out
          </Button>
        ) : (
          <button onClick={handleGoogleSignIn} className="google-btn">
            Sign In With Google
          </button>
        )}
      </div>
      <div>
        <h2>User Name: {user.displayName}</h2>
        <img src={user.photoURL} alt="" />
      </div>
    </div>
  );
}

export default App;
