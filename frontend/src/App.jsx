import { Route, Routes, Navigate } from "react-router";
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth) return <PageLoader />;

  return (
    <section className="Routes">
      <Routes>
        {/* if user type any other route or url , so redirect to this route */}
        <Route path="*" element={<Navigate to="/chat" replace />} />
        {/* Basic Routes */}
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to={"/signup"} />}
        ></Route>
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/chat"} />}
        ></Route>
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/chat"} />}
        ></Route>
      </Routes>

      <Toaster />
    </section>
  );
}

export default App;
