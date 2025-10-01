import { useAuthStore } from "../store/useAuthStore";

function ChatPage() {
  const { logout } = useAuthStore();

  return (
    <>
      <div>
        <h1>ChatPage</h1>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}

export default ChatPage;
