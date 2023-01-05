import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getAuth,
  GithubAuthProvider,
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
  const gitHubProvider = new GithubAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        console.log(result.user);
      })
      .catch((err) => console.log(err));
  };
  const handleSignInWithGithub = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        setUser(result.user);
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <div>
            <button onClick={handleGoogleSignIn} className="google-btn">
              Sign In With Google
            </button>
            <button onClick={handleSignInWithGithub} className="google-btn">
              Sign In With GitHub
            </button>
          </div>
        )}
      </div>
      <div>
        <h2>User Name: {user.displayName}</h2>
        <img referrerPolicy="no-referrer" src={user.photoURL} alt="" />
      </div>
    </div>
  );
}

export default App;
