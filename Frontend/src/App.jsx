import './App.css'
import AuthRoutes from './auth.routes.jsx'
import { AuthProvider } from './Features/auth/auth.context.jsx'
import { PostProvider } from './Features/Post/post.context.jsx'

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <AuthRoutes />
      </PostProvider>
    </AuthProvider>
  )
}

export default App
