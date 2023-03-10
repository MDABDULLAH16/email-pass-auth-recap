import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase.init";

const auth = getAuth(app);

const Forms = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };
  const handleUserName = (event) => {
    setName(event.target.value);
  };

  const handleRegisteredChange = (event) => {
    setRegistered(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //form validity
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    if (!/(?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]/.test(password)) {
      setError("Please enter a special character");
      return;
    }

    setValidated(true);
    setError();
    //form validity up

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          console.log(result.user);
          setEmail("");
          setPassword("");
          verifyEmail();
          userName();
        })
        .catch((error) => {
          setError(error.message);
        });
    }

    event.preventDefault();
  };

  const userName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("updating name");
      })
      .catch(() => {
        setError(error.message);
      });
  };
  const handleForgetPassword = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      console.log("sent rest password");
    });
  };
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then((result) => {
      console.log("Email verification sent successfully");
    });
  };
  return (
    <div className=" w-50 mx-auto mt-4 mb-4">
      <h2 className="text-primary">
        Please {registered ? "Login" : "Register"}
      </h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {!registered && (
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              onBlur={handleUserName}
              type="text"
              placeholder="Enter Name"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Name.
            </Form.Control.Feedback>
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onBlur={handleEmailBlur}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Email.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onBlur={handlePasswordBlur}
            type="password"
            placeholder="Password"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid Password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            onChange={handleRegisteredChange}
            type="checkbox"
            label="Already Registered?"
          />
        </Form.Group>
        <p className="text-danger">{error}</p>

        <Button onClick={handleForgetPassword} variant="link">
          Forget Password?
        </Button>

        <Button variant="primary" type="submit">
          {registered ? "Login" : "Register"}
        </Button>
      </Form>
    </div>
  );
};

export default Forms;
