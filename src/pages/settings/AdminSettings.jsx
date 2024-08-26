import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteKelas, fetchKelas } from "../../store/actionCreator";
import { FaTrash, FaEdit } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import AddKelasAdmin from "./AddkelasAdmin";
import EditKelas from "./EditKelas";

const AdminSettings = () => {
  const { Kelases } = useSelector((state) => state.Kelases);
  const dispatch = useDispatch();
console.log(Kelases);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Adjust the number of items per page

  useEffect(() => {
    dispatch(fetchKelas());
  }, [dispatch]);
  const handleDelete = async (id) => {
    try {
        await dispatch(deleteKelas(id));
       
    } catch (error) {
        console.log(error);
    }
};
  const filteredKelases = Kelases.filter((el) =>
    el.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredKelases.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredKelases.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="flex justify-between items-end px-10 mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded py-2 px-5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <AddKelasAdmin/>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">No</th>
                <th scope="col" className="px-6 py-3">Kelas</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((el, i) => (
                <tr key={el.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">{offset + i + 1}</td>
                  <td className="px-6 py-4">{el.name}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => handleDelete(el.id)} className="flex items-center justify-center bg-red-500 text-white py-1 px-2 rounded text-xs">
                      <FaTrash className="mr-1" /> Delete
                    </button>
                   <EditKelas kelas={el} id={el.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <ReactPaginate
            previousLabel={<span className="inline-flex items-center px-4 py-1 text-sm font-medium text-gray-500 bg-gray-200 border rounded-l-md hover:bg-gray-300">Previous</span>}
            nextLabel={<span className="inline-flex items-center px-4 py-1 text-sm font-medium text-gray-500 bg-gray-200 border rounded-r-md hover:bg-gray-300">Next</span>}
            breakLabel={<span className="inline-flex items-center px-4 py-1 text-sm font-medium text-gray-500 bg-gray-200 border border-gray-300">...</span>}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"flex space-x-1"}
            pageClassName={"page-item"}
            pageLinkClassName={"inline-flex items-center px-4 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100"}
            previousClassName={"page-item"}
            previousLinkClassName={"inline-flex items-center px-4 py-1 text-sm font-medium text-gray-500 bg-gray-200 border rounded-l-md hover:bg-gray-300"}
            nextClassName={"page-item"}
            nextLinkClassName={"inline-flex items-center px-4 py-1 text-sm font-medium text-gray-500 bg-gray-200 border rounded-r-md hover:bg-gray-300"}
            breakClassName={"page-item"}
            breakLinkClassName={"inline-flex items-center px-4 py-1 text-sm font-medium text-gray-500 bg-gray-200 border border-gray-300"}
            activeClassName={"bg-blue-500 text-white border-blue-500 rounded"}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
