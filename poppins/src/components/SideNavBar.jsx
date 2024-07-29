import { Link } from "react-router-dom"
import { MdOutlineCheckBox } from "react-icons/md";
import { FaRegFolder } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { BsArrowReturnLeft } from "react-icons/bs";


const SideNavBar = () => {
  return (
    <aside className="h-screen w-1/6">
      <nav className="h-full flex flex-col bg-primary-04 border-r shadow-sm rounded-r-2xl">
        <h2 className="pt-8 px-12 text-4xl text-white">Poppins</h2>
        <div className="flex-1">
          <ul className="flex flex-col mt-32 gap-4 px-6 text-xl">
            <Link className="text-white px-6 py-3 border-2 rounded-3xl border-primary-04 hover:border-primary-05 hover:bg-primary-05 flex flex-row items-center gap-2" to={'/'}>
              <MdOutlineCheckBox className="text-2xl"/>
              Check-in
            </Link>
            <Link className="text-white px-6 py-3 border-2 rounded-3xl border-primary-04 hover:border-primary-05 hover:bg-primary-05 flex flex-row items-center gap-2" to={'/reports/'}>
              <FaRegFolder />
              Reports
            </Link>
          </ul>
        </div>
        <div className="flex justify-center">
          <hr className="w-4/5"></hr>
        </div>
        <div className="flex flex-col py-3 px-6 text-lg gap-3">
          <div className="text-white px-6 py-3 border-2 rounded-3xl border-primary-04 hover:border-primary-05 hover:bg-primary-05 flex flex-row items-center gap-2">
            <IoMdSettings />
            Settings
          </div>
          <div className="text-white px-6 py-3 border-2 rounded-3xl border-primary-04 hover:border-primary-05 hover:bg-primary-05 flex flex-row items-center gap-2">
            <BsArrowReturnLeft />
            Log out
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default SideNavBar
