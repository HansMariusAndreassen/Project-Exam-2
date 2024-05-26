import React, { useState, useEffect } from "react";
import useLogin from "../../API/auth/Login";
import { loginUrl } from "../../../utils/constants";
import { PiAt, PiPassword } from "react-icons/pi";
import Modal from "../../Modal";
import { useNavigate } from "react-router-dom";

/**
 * LoginForm component.
 *
 * @component
 * @example
 * return (
 *   <LoginForm />
 * )
 */
const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { login, loggedIn, error, loading, isSuccess } = useLogin(loginUrl);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
    login(credentials);
  };

  useEffect(() => {
    if (loggedIn) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [loggedIn, navigate]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-center w-full">
      <Modal isOpen={showModal} onClose={closeModal} isSuccess={isSuccess}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {loggedIn && <p>Successful login! Redirecting...</p>}
      </Modal>
      <form
        onSubmit={handleSubmit}
        className="flex-col align-middle bg-accentTwo p-4 rounded-25 w-[20rem]"
      >
        <div className="border-b pb-12 min-w-3/4">
          <h2 className="leading-7 text">Login</h2>

          <div className="text-left mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-4">
            <div className="sm:col-span-4">
              <div className="flex">
                <PiAt className="mr-2 h-6 w-6 text" />
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email address
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="first.last@stud.noroff.no"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <div className="flex">
                <PiPassword className="mr-2 h-6 w-6 " />
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  className="block w-full rounded-md border py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="btn-revert text-sm font-semibold leading-6"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button type="submit" className="btn">
            {loading ? <p>Loading...</p> : <p>Send</p>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
