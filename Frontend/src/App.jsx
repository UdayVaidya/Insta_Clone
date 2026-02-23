import './App.css'
import AuthRoutes from './auth.routes.jsx'
import { AuthProvider } from './Features/auth/auth.context.jsx'

function App() {
  return (
    <AuthProvider>
      <AuthRoutes />
    </AuthProvider>
  )
}

export default App
