import { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext';

export default function UserMenu () {
  const [open, setOpen] = useState(false);
  const { displayName, avatar, organization } = useContext(UserContext);

  useEffect(() => {
    if (open) registerClickAway()
  }, [open])

  const registerClickAway = () => {
    document.removeEventListener("click", unregisterClickAway);
    document.addEventListener("click", unregisterClickAway);

    document.querySelectorAll('iframe').forEach(iframe => {
      iframe.contentWindow.document.removeEventListener("click", unregisterClickAway);
      iframe.contentWindow.document.addEventListener("click", unregisterClickAway);
    })
  }

  const unregisterClickAway = () => {
    setOpen(false)
    document.removeEventListener("click", unregisterClickAway);
    document.querySelectorAll('iframe').forEach(iframe => {
      iframe.contentWindow.document.removeEventListener("click", unregisterClickAway);
    })
  }

  return (
    <div className="hidden md:block">
      <div className="ml-4 flex items-center md:ml-6">
        <div className="ml-3 relative">
          <button onClick={() => setOpen(!open)} className="flex text-left">
            <div className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid">
              <img className="h-8 w-8 rounded-full" src={avatar} alt="" />
            </div>
            <div className="ml-3">
              <p className="text-sm leading-5 font-medium text-gray-500 group-hover:text-gray-900">
                {displayName}
              </p>
              <p className="text-xs leading-4 font-medium text-gray-600 group-hover:text-gray-700 group-focus:underline transition ease-in-out duration-150">
                {organization}
              </p>
            </div>
          </button>
          { open &&
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-30">
              <div className="py-1 rounded-md bg-white shadow-xs">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}