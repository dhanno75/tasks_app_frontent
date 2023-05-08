import React, { useEffect } from "react";
import { Container } from "./styled_components/form";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "../schemas";
import { clearSomeState, login } from "../redux/features/UserSlice";
import { toast } from "react-toastify";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, userInfo, success } = useSelector(
    (state) => state.user
  );

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/about");
  //   }
  // }, [navigate, userInfo]);

  useEffect(() => {
    if (error) {
      toast.warn(error);
      dispatch(clearSomeState());
    }
    if (success === true) {
      toast.success("Successful Login");
      dispatch(clearSomeState());
      navigate("/about");
    }
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        dispatch(login(values));
      },
    });

  return (
    <Container>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched ? (
            <span className="error">{errors.email}</span>
          ) : null}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched ? (
            <span className="error">{errors.password}</span>
          ) : null}
          <div className="btn">
            <Link to="/forgotPassword">Forgot your password?</Link>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Login;
