"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "@/styles/login.module.css";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("johndoe@gmail.com");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      setError("Failed to initiate Google sign-in. Check credentials.");
      setLoading(false);
    }
  };

  const handleAppleLogin = () => {
    alert("Apple Sign-In is configured for production. Please use 'Sign in with Google' or demo account!");
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/"
      });

      if (res?.error) {
        setError("Invalid credentials. Try again.");
        setLoading(false);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Something went wrong during sign-in.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Column Hero with "Board." */}
      <div className={styles.leftHero}>
        <h1 className={styles.brandLogo}>Board.</h1>
        <span className={styles.heroTagline}>Glass Analytics Platform</span>
      </div>

      {/* Right Column Sign In Form */}
      <div className={styles.rightContent}>
        <div className={styles.formWrapper}>
          <h2 className={styles.title}>Sign In</h2>
          <p className={styles.subtitle}>Sign in to your account</p>

          {/* Social Sign In Buttons */}
          <div className={styles.socialRow}>
            {/* Google OAuth Button */}
            <button
              type="button"
              className={styles.socialButton}
              onClick={handleGoogleLogin}
              disabled={loading}
              title="Sign in with your Google Account"
            >
              <svg className={styles.socialIcon} viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

            {/* Apple OAuth Button */}
            <button
              type="button"
              className={styles.socialButton}
              onClick={handleAppleLogin}
              disabled={loading}
              title="Sign in with Apple"
            >
              <svg className={styles.socialIcon} viewBox="0 0 170 170" width="14" height="14" fill="#000000">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.83-7.98-12.43-14.7-6.09-8.9-10.9-18.73-14.42-29.49-3.53-10.76-5.29-21.14-5.29-31.14 0-14.83 3.8-27.27 11.41-37.33 7.6-10.06 17.2-15.17 28.79-15.34 5.34 0 11.06 1.41 17.16 4.23 6.1 2.82 10.05 4.35 11.85 4.58 2.23-.46 6.39-2.12 12.48-4.99 6.09-2.87 11.75-4.14 16.99-3.8 12.98.66 23.36 5.56 31.14 14.71-11.37 6.87-16.94 16.51-16.71 28.92.24 9.94 4.09 18.23 11.55 24.87 7.46 6.64 16.27 10.37 26.43 11.2-2.23 6.75-4.8 13.11-7.72 19.07zM119.22 33.15c0-7.39 2.67-14.28 8.01-20.67 5.34-6.39 12-10.74 19.98-13.06-.24 1.54-.48 2.97-.73 4.29-1.22 6.99-4.22 13.56-9.01 19.71-4.79 6.15-10.66 10.22-17.61 12.21-.24-.83-.44-1.65-.64-2.48z" />
              </svg>
              <span>Sign in with Apple</span>
            </button>
          </div>

          {/* Credentials Card */}
          <div className={styles.card}>
            {error && <div className={styles.errorMessage}>{error}</div>}

            <form onSubmit={handleCredentialsSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@gmail.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <a
                href="#forgot-password"
                className={styles.forgotLink}
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password recovery link has been simulated for your email: " + email);
                }}
              >
                Forgot password?
              </a>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>

          {/* Registration Footer */}
          <p className={styles.registerText}>
            Don't have an account?
            <a
              href="#register"
              className={styles.registerLink}
              onClick={(e) => {
                e.preventDefault();
                alert("Account registration is open! You can log in instantly with Google or click 'Sign In'.");
              }}
            >
              Register here
            </a>
          </p>

          <div className={styles.infoBanner}>
            💡 <strong>Quick Demo:</strong> Click &quot;Sign In&quot; to test with prefilled demo credentials, or click &quot;Sign in with Google&quot; for Google OAuth.
          </div>
        </div>
      </div>
    </div>
  );
}
