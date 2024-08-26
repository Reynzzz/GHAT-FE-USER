import { useDispatch, useSelector } from "react-redux";
import AddScheduleAdmin from "./AddScheduleAdmin";
import { useEffect, useState } from "react";
import { deleteSchedule, fetchAbsen } from "../../store/actionCreator";
import { FaTrash, FaEdit, FaDownload } from 'react-icons/fa'; // Import FaDownload icon
import { FaCheck, FaTimes } from 'react-icons/fa';
import UpdateScheduleAdmin from "./UpdateScheduleAdmin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import * as XLSX from 'xlsx'; // Import xlsx
import moment from 'moment-timezone';
const AdminSchedelu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null); // State for selected photo

    const handleModalToggle = (foto_absen) => {
        setSelectedPhoto(foto_absen); // Set the selected photo URL
        setIsModalOpen(!isModalOpen); // Toggle the modal open/close state
    };

    const dispatch = useDispatch();
    const { schedules } = useSelector((state) => state.schedules);
    
    // State for pagination
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(10);

    // State for search
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchAbsen());
    }, [dispatch]);

    // Filter and paginate schedules
    const filteredSchedules = schedules?.filter((el) =>
        el.Guru?.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedSchedules = filteredSchedules?.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );
console.log(paginatedSchedules);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const renderStatusIcon = (status) => {
        return status ? (
            <FaCheck className="text-green-500" />
        ) : (
            <FaTimes className="text-red-500" />
        );
    };

   const formatDate = (dateString) => {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false,
        timeZone: 'Asia/Makassar' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

    async function handleDelete(id) {
        try {
            await dispatch(deleteSchedule(id));
            toast.success('Delete Successfully', {
                position: 'bottom-right',
                autoClose: 2000
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleDownloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredSchedules.map(el => ({
            Username: el.Guru?.username ?? 'N/A',
            Kelas: el.Kelas?.name ?? 'N/A',
            JadwalKelas: formatDate(el.jadwalKelas),
            TanggalAbsen: el?.tanggalAbsen ? formatDate(el.tanggalAbsen) : 'N/A',
            StatusAbsen: renderStatusIcon(el.statusAbsen) === <FaCheck className="text-green-500" /> ? 'Present' : 'Absent',
            StatusJaga: renderStatusIcon(el.statusJaga) === <FaCheck className="text-green-500" /> ? 'On Duty' : 'Off Duty',
            StatusKelas: renderStatusIcon(el.statusKelas) === <FaCheck className="text-green-500" /> ? 'Active' : 'Inactive',
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Schedules');
        XLSX.writeFile(wb, 'schedules.xlsx');
    };

    return (
        <div className="flex flex-col justify-center ">
            <div className="flex justify-between items-end px-5 mb-4">
            <button 
                    onClick={handleDownloadExcel} 
                    className="flex items-center bg-blue-500 text-white py-2 px-4 rounded">
                    <FaDownload className="mr-2" /> Download Excel
                </button>
                <AddScheduleAdmin />
            </div>
            <div className="mb-4 px-5">
                <input
                    type="text"
                    placeholder="Search by username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                />
            </div>
          
            <div className="relative overflow-x-auto px-5 py-5">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Foto Absen
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Kelas
                            </th>
                            <th scope="col" className="px-6 py-3">Jadwal Kelas</th>
                            <th scope="col" className="px-6 py-3">Tanggal Absen</th>
                            <th scope="col" className="px-6 py-3">Status Absen</th>
                            <th scope="col" className="px-6 py-3">Status Jaga</th>
                            <th scope="col" className="px-6 py-3">Status Kelas</th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedSchedules && paginatedSchedules.length > 0 ? (
                            paginatedSchedules.map((el, i) => (
                                <tr key={el.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                        {i + 1 + currentPage * itemsPerPage}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {el.Guru?.username ?? 'N/A'}
                                    </th>
                                    <td className="px-6 py-4">
                                        {el.foto_absen ? (
                                            <>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleModalToggle(el.foto_absen)}
                                                >
                                                    Lihat Foto
                                                </button>

                                                {/* DaisyUI modal */}
                                                {isModalOpen && selectedPhoto === el.foto_absen && (
                                                    <div className="modal modal-open">
                                                        <div className="modal-box">
                                                            <img
                                                                src={`https://api-v1.ghatmtsn1.com/${selectedPhoto}`}
                                                                alt="Foto Absen"
                                                                className="w-full h-auto"
                                                            />
                                                            <div className="modal-action">
                                                                <button
                                                                    className="btn btn-primary"
                                                                    onClick={handleModalToggle}
                                                                >
                                                                    Tutup
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <button className="btn btn-secondary" disabled>
                                                Belum Absen
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {el.Kelas?.name ?? 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formatDate(el.jadwalKelas)}
                                    </td>
                                    <td className="px-6 py-4 text-center">{el?.tanggalAbsen ? formatDate(el.tanggalAbsen) : 'N/A'}</td>
                                    <td className="px-6 py-4 text-center">{renderStatusIcon(el.statusAbsen)}</td>
                                    <td className="px-6 py-4 text-center">{renderStatusIcon(el.statusJaga)}</td>
                                    <td className="px-6 py-4 text-center">{renderStatusIcon(el.statusKelas)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col space-y-2">
                                            <button onClick={() => handleDelete(el.id)} className="flex items-center justify-center bg-red-500 text-white py-1 px-3 rounded w-full">
                                                <FaTrash className="mr-2" /> Delete
                                            </button>
                                            <UpdateScheduleAdmin id={el.id} schedule={el} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center py-4">
                                    No schedules found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center py-5">
                <ReactPaginate
                    pageCount={Math.ceil(filteredSchedules?.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    containerClassName={"pagination flex"}
                    activeClassName={"active"}
                    disabledClassName={"disabled"}
                    pageLinkClassName={"px-2 py-1 border"}
                    activeLinkClassName={"bg-blue-500 text-white"}
                    previousLinkClassName={"px-2 py-1 border"}
                    nextLinkClassName={"px-2 py-1 border"}
                />
            </div>
        </div>
    );
};

export default AdminSchedelu;
