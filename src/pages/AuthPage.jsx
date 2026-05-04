import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_STORAGE_KEY } from "../context/cartContext";

const initialLogin = { email: "", password: "" };
const initialSignup = { fullName: "", email: "", password: "", confirmPassword: "" };

const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [loginData, setLoginData] = useState(initialLogin);
  const [signupData, setSignupData] = useState(initialSignup);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const formErrors = {};
    if (mode === "login") {
      if (!loginData.email.trim()) formErrors.email = "Email is required.";
      else if (!validateEmail(loginData.email)) formErrors.email = "Enter a valid email address.";
      if (!loginData.password) formErrors.password = "Password is required.";
      else if (loginData.password.length < 6) formErrors.password = "Password must be at least 6 characters.";
    } else {
      if (!signupData.fullName.trim()) formErrors.fullName = "Full name is required.";
      if (!signupData.email.trim()) formErrors.email = "Email is required.";
      else if (!validateEmail(signupData.email)) formErrors.email = "Enter a valid email address.";
      if (!signupData.password) formErrors.password = "Password is required.";
      else if (signupData.password.length < 8) formErrors.password = "Password must be at least 8 characters.";
      if (!signupData.confirmPassword) formErrors.confirmPassword = "Confirm your password.";
      else if (signupData.password !== signupData.confirmPassword) {
        formErrors.confirmPassword = "Passwords do not match.";
      }
    }
    return formErrors;
  };

  const fakeSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    if (!navigator.onLine) throw new Error("You are offline. Check your internet and try again.");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setStatus({ type: "", message: "" });
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await fakeSubmit();
      const userPayload =
        mode === "login"
          ? { fullName: "Solex Member", email: loginData.email }
          : { fullName: signupData.fullName, email: signupData.email };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userPayload));
      setStatus({
        type: "success",
        message: mode === "login" ? "Logged in successfully." : "Account created successfully.",
      });
      setErrors({});
      if (mode === "login") setLoginData(initialLogin);
      else setSignupData(initialSignup);
      setTimeout(() => navigate("/profile"), 500);
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Request failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeData = mode === "login" ? loginData : signupData;

  return (
    <main className="padding-x pt-32 pb-16">
      <section className="max-container max-w-xl border border-slate-200 rounded-2xl p-8">
        <h1 className="text-4xl font-palanquin font-bold">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-2 text-slate-gray font-montserrat">
          {mode === "login" ? "Login to continue shopping." : "Sign up to save favorites and checkout faster."}
        </p>

        <div className="mt-6 grid grid-cols-2 rounded-full bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setErrors({});
              setStatus({ type: "", message: "" });
            }}
            className={`rounded-full py-2 font-montserrat ${mode === "login" ? "bg-white" : ""}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErrors({});
              setStatus({ type: "", message: "" });
            }}
            className={`rounded-full py-2 font-montserrat ${mode === "signup" ? "bg-white" : ""}`}
          >
            Sign up
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
          {mode === "signup" && (
            <div>
              <input
                type="text"
                placeholder="Full name"
                value={activeData.fullName || ""}
                onChange={(event) => setSignupData((prev) => ({ ...prev, fullName: event.target.value }))}
                className="input border border-slate-300 rounded-full p-4 w-full"
              />
              {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email address"
              value={activeData.email || ""}
              onChange={(event) =>
                mode === "login"
                  ? setLoginData((prev) => ({ ...prev, email: event.target.value }))
                  : setSignupData((prev) => ({ ...prev, email: event.target.value }))
              }
              className="input border border-slate-300 rounded-full p-4 w-full"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={activeData.password || ""}
              onChange={(event) =>
                mode === "login"
                  ? setLoginData((prev) => ({ ...prev, password: event.target.value }))
                  : setSignupData((prev) => ({ ...prev, password: event.target.value }))
              }
              className="input border border-slate-300 rounded-full p-4 w-full"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {mode === "signup" && (
            <div>
              <input
                type="password"
                placeholder="Confirm password"
                value={activeData.confirmPassword || ""}
                onChange={(event) =>
                  setSignupData((prev) => ({ ...prev, confirmPassword: event.target.value }))
                }
                className="input border border-slate-300 rounded-full p-4 w-full"
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-coral-blue text-white font-montserrat"
          >
            {isSubmitting ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
          </button>
        </form>

        {status.message && (
          <p className={`mt-4 text-sm ${status.type === "error" ? "text-red-600" : "text-green-600"}`}>
            {status.message}
          </p>
        )}

        <div className="mt-6 text-sm text-slate-gray font-montserrat">
          <Link to="/" className="text-coral-blue font-semibold">
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AuthPage;
