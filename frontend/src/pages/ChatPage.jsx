import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
function ChatPage() {
   const {logout} = useAuthStore();
  return (
    <div>
      ChatPage
      <button onClick={logout} className='btn-primary btn'>logout</button>
    </div>
  )
}

export default ChatPage