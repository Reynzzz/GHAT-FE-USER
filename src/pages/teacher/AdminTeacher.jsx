import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeacher, fetchTeacher } from "../../store/actionCreator";
import { FaTrash, FaEdit } from 'react-icons/fa';
import AddAdminTeacher from "./AddAdminTeacher";
import UpdateTeacher from "./UpdateTeacher";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from 'react-paginate';

const AdminTeacher = () => {
    const dispatch = useDispatch();
    const { Teacher } = useSelector((state) => state.Teacher);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        dispatch(fetchTeacher());
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteTeacher(id));
            toast.success('Delete Successfully', {
                position: 'bottom-right',
                autoClose: 2000
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const filteredTeachers = Teacher.filter(teacher =>
        teacher?.username?.toLowerCase().includes(search.toLowerCase())
    );
    

    const paginatedTeachers = filteredTeachers.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <div>
            <div className="flex justify-between items-center pr-5 sm:pr-10 pl-5 mt-5 sm:mt-0 mb-2">
            <input
                    type="text"
                    placeholder="Search by username"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className=" p-2 border border-gray-300 rounded"
                />
                <AddAdminTeacher />
            </div>

            <div className="relative overflow-x-auto px-5">
                

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">No</th>
                            <th scope="col" className="px-6 py-3">Username</th>
                            {/* <th scope="col" className="px-6 py-3">Golongan</th> */}
                            {/* <th scope="col" className="px-6 py-3">Umur</th> */}
                            <th scope="col" className="px-6 py-3">Jenis Kelamin</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Type</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedTeachers.map((el, i) => (
                            <tr key={el.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {i + 1 + currentPage * itemsPerPage}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {el?.username}
                                </th>
                                {/* <td className="px-6 py-4">{el.Golongan}</td> */}
                                {/* <td className="px-6 py-4">{el.umur}</td> */}
                                <td className="px-6 py-4">{el.jenisKelamin}</td>
                                <td className="px-6 py-4">{el.role}</td>
                                <td className="px-6 py-4">{el.type}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col space-y-2">
                                        <button onClick={() => handleDelete(el.id)} className="flex items-center justify-center bg-red-500 text-white py-1 px-3 rounded w-full">
                                            <FaTrash className="mr-2" /> Delete
                                        </button>
                                        <div className="w-full">
                                            <UpdateTeacher id={el.id} teacher={el} /> 
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-center mt-4 mb-10">
    <ReactPaginate
        previousLabel={<span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 border rounded-l-md hover:bg-gray-300">Previous</span>}
        nextLabel={<span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 border rounded-r-md hover:bg-gray-300">Next</span>}
        breakLabel={<span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 border border-gray-300">...</span>}
        pageCount={Math.ceil(filteredTeachers.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"flex space-x-1"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"bg-blue-500 text-white border-blue-500 rounded"}
    />
</div>

            </div>

            <ToastContainer />
        </div>
    );
};

export default AdminTeacher;
