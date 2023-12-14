import { Link } from "react-router-dom"

const Brum = () => {
  return (
    <>
        <div className="mx-auto max-w-screen-xl">
  <nav className="text-sm sm:text-base bg-white p-4 md:p-6 lg:p-6 rounded-md shadow-lg">
    <ol className="list-none p-0 inline-flex space-x-2">
      <li className="flex items-center">
        
      </li>
      <li className="flex items-center">
        <Link to={'/'} className="text-gray-600 hover:text-blue-500 transition-colors duration-300">Home</Link>
        <span className="mx-2">/</span>
      </li>
      <li className="flex items-center">
        <span className="text-gray-800">Products</span>
      </li>
    </ol>
  </nav>
</div>
    </>
  )
}

export default Brum