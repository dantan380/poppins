import { Link } from "react-router-dom"
const SideNavBar = () => {
  return (
    <aside className="h-screen w-1/5">
      <nav className="h-full flex flex-col bg-primary-04 border-r shadow-sm rounded-r-2xl">
        <h2 className="pt-8 pl-7 text-2xl text-white">Poppins</h2>
        <div className="flex-1 px-3">
          <ul className="flex flex-col mt-32 gap-5">
            <Link className="text-white pl-4 text-lg" to={'/'}>Check In</Link>
            <Link className="text-white pl-4" to={'/reports/'}>Reports</Link>
          </ul>
        </div>
        <div className="flex justify-center">
          <hr className="w-4/5"></hr>
        </div>
        <div className="flex flex-col py-3">
          <div className="pl-7 text-white py-5">Settings</div>
          <div className="pl-7 text-white py-5">Log out</div>
        </div>
      </nav>
    </aside>
  )
}

export default SideNavBar
