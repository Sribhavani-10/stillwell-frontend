
import { useState, type FormEvent } from "react";
import "./App.css";
import Assessment from "./Assessment.tsx";

type Page = "home" | "consent" | "auth" | "dashboard" | "assessment";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [consent, setConsent] = useState(false);
  const [register, setRegister] = useState(false);
  const [userName, setUserName] = useState("Friend");
  const [message, setMessage] = useState("");

  function handleAuth(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const name = String(form.get("fullName") || "");
    const confirm = String(form.get("confirmPassword") || "");

    if (register) {
      if (!name.trim()) {
        setMessage("Please enter your name.");
        return;
      }

      if (password.length < 6) {
        setMessage("Password must have at least 6 characters.");
        return;
      }

      if (password !== confirm) {
        setMessage("Passwords do not match.");
        return;
      }

      setUserName(name.trim().split(" ")[0]);
    } else {
      if (!email || !password) {
        setMessage("Enter your email and password.");
        return;
      }

      setUserName(email.split("@")[0]);
    }

    setMessage("");
    setPage("dashboard");
  }

  function logout() {
    setPage("home");
    setConsent(false);
    setRegister(false);
    setMessage("");
    setUserName("Friend");
  }

  if (page === "assessment") {
    return (
      <Assessment onBack={() => setPage("dashboard")} />
    );
  }

  return (
    <div className="app">

      {/* HOME PAGE */}

      {page === "home" && (
        <>
          <nav className="navbar">
            <div className="logo">
              ✿ stillwell<span>.</span>
            </div>

            <div className="nav-links">
              <a href="#about">About</a>
              <a href="#privacy">Privacy</a>
              <a href="#support">Support</a>
            </div>

            <button
              className="nav-button"
              onClick={() => setPage("consent")}
            >
              Get Started
            </button>
          </nav>

          <section className="hero">
            <div className="hero-content">
              <div className="hero-tag">
                ✦ YOUR PERSONAL REFLECTION SPACE
              </div>

              <h1>
                Understand yourself,
                <br />
                <em>gently.</em>
              </h1>

              <p className="hero-description">
                Your emotions deserve to be understood.
                Explore your feelings, recognise emotional
                patterns and discover your inner strength
                through a personalised reflection journey.
              </p>

              <button
                className="hero-button"
                onClick={() => setPage("consent")}
              >
                Begin Your Journey →
              </button>

              <p className="hero-note">
                No judgement. No pressure. Just you.
              </p>
            </div>

            <div className="hero-visual">
              <div className="hero-decoration">✿</div>
              <h2>
                Healing begins
                <br />
                with understanding.
              </h2>
              <p>
                Take a moment. Breathe. You are allowed to feel.
              </p>
              <span>♡ Your journey matters</span>
            </div>
          </section>

          <section className="feature-grid" id="about">
            <div>
              <span>01</span>
              <h3>Understand</h3>
              <p>Recognise your emotional experiences.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Reflect</h3>
              <p>Explore your thoughts through reflection.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Grow</h3>
              <p>Discover healthy ways to support yourself.</p>
            </div>
          </section>

          <footer id="support">
            stillwell. ♡
            <p>Your feelings matter. Your journey matters.</p>
          </footer>
        </>
      )}

      {/* CONSENT PAGE */}

      {page === "consent" && (
        <section className="consent-section">
          <div className="consent-card">
            <div className="logo">
              ✿ stillwell<span>.</span>
            </div>

            <div className="assessment-tag">
              YOUR REFLECTION JOURNEY
            </div>

            <h1>
              Let's begin
              <br />
              <em>gently.</em>
            </h1>

            <p>
              This is a personal self-reflection experience.
              You are always in control of your participation.
            </p>

            <div className="consent-info">
              <p>✓ Questions are designed for reflection.</p>
              <p>✓ You can skip any question.</p>
              <p>✓ You can pause whenever you need.</p>
              <p>✓ Your answers do not define you.</p>
            </div>

            <label className="consent-checkbox">
              <input
                type="checkbox"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
              />
              I understand that this is not a clinical
              assessment or diagnosis.
            </label>

            <button
              className="hero-button"
              disabled={!consent}
              onClick={() => {
                setMessage("");
                setPage("auth");
              }}
            >
              Continue →
            </button>

            <button
              className="assessment-secondary"
              onClick={() => setPage("home")}
            >
              ← Back to Home
            </button>
          </div>
        </section>
      )}

      {/* LOGIN AND REGISTER */}

      {page === "auth" && (
        <section className="auth-section">
          <div className="auth-card">
            <div className="logo">
              ✿ stillwell<span>.</span>
            </div>

            <div className="assessment-tag">
              YOUR PERSONAL SPACE
            </div>

            <h1>
              {register ? "Create your account." : "Welcome back."}
            </h1>

            <p>
              {register
                ? "Begin your personal reflection journey."
                : "Continue your journey at your own pace."}
            </p>

            <div className="auth-tabs">
              <button
                type="button"
                className={!register ? "active" : ""}
                onClick={() => {
                  setRegister(false);
                  setMessage("");
                }}
              >
                Login
              </button>

              <button
                type="button"
                className={register ? "active" : ""}
                onClick={() => {
                  setRegister(true);
                  setMessage("");
                }}
              >
                Register
              </button>
            </div>

            <form className="auth-form" onSubmit={handleAuth}>
              {register && (
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label>Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  minLength={6}
                  required
                />
              </div>

              {register && (
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    minLength={6}
                    required
                  />
                </div>
              )}

              {message && (
                <p className="auth-message" role="alert">
                  {message}
                </p>
              )}

              <button type="submit" className="hero-button">
                {register ? "Create Account →" : "Login →"}
              </button>
            </form>

            <button
              className="assessment-secondary"
              onClick={() => setPage("consent")}
            >
              ← Back to consent
            </button>
          </div>
        </section>
      )}

      {/* DASHBOARD */}

      {page === "dashboard" && (
        <>
          <nav className="navbar">
            <div className="logo">
              ✿ stillwell<span>.</span>
            </div>

            <button className="nav-button" onClick={logout}>
              Logout
            </button>
          </nav>

          <main className="dashboard">
            <div className="dashboard-welcome">
              <div className="assessment-tag">
                YOUR PERSONAL SPACE
              </div>

              <h1>Welcome, {userName} ♡</h1>

              <p>
                Take a moment for yourself. Your journey is
                yours, and you can move at your own pace.
              </p>
            </div>

            <section className="dashboard-card">
              <div className="assessment-flower">✿</div>

              <div className="assessment-tag">
                YOUR EMOTIONAL WELLNESS JOURNEY
              </div>

              <h2>
                Ready when
                <br />
                you are.
              </h2>

              <p>
                Explore your feelings, reflect on your
                experiences and understand your emotional
                patterns through a guided self-reflection
                assessment.
              </p>

              <button
                className="hero-button"
                onClick={() => setPage("assessment")}
              >
                Start Assessment →
              </button>

              <p className="dashboard-note">
                Take your time. You can skip questions
                whenever you need.
              </p>
            </section>

            <section className="dashboard-explore">
              <div className="assessment-tag">YOUR SPACE</div>
              <h2>Explore your dashboard</h2>

              <div className="feature-grid">
                <div>
                  <span>01</span>
                  <h3>Self Reflection</h3>
                  <p>Understand your experiences.</p>
                </div>
                <div>
                  <span>02</span>
                  <h3>Your Progress</h3>
                  <p>Review your reflection journey.</p>
                </div>
                <div>
                  <span>03</span>
                  <h3>Support</h3>
                  <p>Explore helpful support resources.</p>
                </div>
              </div>
            </section>
          </main>
        </>
      )}

    </div>
  );
}
