import { Outlet } from "react-router-dom"

const Navigation = () => {
  return (
    <div>
      <div> 
        <h1>Iam navgi</h1>
      </div>
      <Outlet />
    </div>
  )
}

export default Navigation