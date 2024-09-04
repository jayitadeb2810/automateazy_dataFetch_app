import React, { useState, useEffect } from "react"

const DynamicTable = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] =
    useState(1)
  const rowsPerPage = 4

  useEffect(() => {
    fetch(
      "https://jsonplaceholder.typicode.com/users"
    )
      .then((response) => response.json())
      .then((data) => {
        // Sort data alphabetically by name
        const sortedData = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        )
        setData(sortedData)
        setLoading(false)
      })
      .catch((error) => {
        console.error(
          "Error fetching data:",
          error
        )
        setError(
          "Failed to fetch data. Please try again later."
        )
        setLoading(false)
      })
  }, [])

  const filteredData = data.filter((user) =>
    user.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  // Calculate total pages
  const totalPages = Math.ceil(
    filteredData.length / rowsPerPage
  )

  // Get the current page data
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  // Handle pagination
  const handlePreviousPage = () => {
    if (currentPage > 1)
      setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages)
      setCurrentPage(currentPage + 1)
  }

  if (loading) {
    return (
      <div className=" w-screen h-screen flex items-center justify-center">
        <p className=" font-semibold">
          Data Loading...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className=" w-screen h-screen flex items-center justify-center">
        <p className=" text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center content-center">
      <h1 className=" text-lg font-bold mb-8">
        Dynamic Table
      </h1>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">
              Name
            </th>
            <th className="py-2 px-4 border-b">
              Username
            </th>
            <th className="py-2 px-4 border-b">
              Email
            </th>
            <th className="py-2 px-4 border-b">
              Website
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">
                {user.name}
              </td>
              <td className="py-2 px-4 border-b">
                {user.username}
              </td>
              <td className="py-2 px-4 border-b">
                {user.email}
              </td>
              <td className="py-2 px-4 border-b">
                {user.website}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4 w-[80%]">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="py-2 px-4 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="py-2 px-4 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default DynamicTable
