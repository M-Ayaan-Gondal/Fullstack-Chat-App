import { Route, Routes, Navigate } from "react-router";
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/useAuthStore";

function App() {

  const {authUser , isLoggedIn , login} = useAuthStore();
  
  console.log("auth user : ", authUser);
  console.log("is Logged In : ", isLoggedIn);

  return (
    <section className="Routes">

      <button onClick={login} className="btn btn-primary">Login</button>

      <Routes>
        {/* Root route -> /chat */}
        <Route path="/" element={<Navigate to="/chat" replace />} />
        {/* Basic Routes */}
        <Route path="/chat" element={<ChatPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        {/* if user type any other route or url , so redirect to this route */}
        <Route path="*" element={<Navigate to="/chat" replace />} />
      </Routes>
    </section>
  );
}

export default App;
