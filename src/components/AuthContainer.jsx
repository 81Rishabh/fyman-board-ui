
import {Routes , Route , Outlet} from 'react-router-dom'

function AuthContainer() {
  return (
     <div className="auth-container">
      <Outlet />
    </div>
  )
}

export default AuthContainer