import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScheduleByUser, fetchScheduleNoUser, validasiGuruJaga } from '../../store/actionCreator';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes, FaCalendarCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import 'daisyui/dist/full.css'; // Import DaisyUI CSS

const isLate = (jadwal, absen) => {
  if (!jadwal || !absen) return false;
  
  const jadwalTime = new Date(jadwal);
  const absenTime = new Date(absen);
  
  // Calculate difference in minutes
  const diffMinutes = (absenTime - jadwalTime) / (1000 * 60);
  
  // Lateness if more than 15 minutes
  return diffMinutes > 15;
};

const RealTimeClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  return (
    <span>{currentTime.toLocaleTimeString(undefined, timeOptions)}</span>
  );
};

export default function ValidasiGuruJaga() {
  const dispatch = useDispatch();
  const { validasiUsers } = useSelector((state) => state.validasiUsers);
  const [localUsers, setLocalUsers] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // State to manage the selected photo
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Adjust the number of items per page
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchScheduleByUser());
    dispatch(fetchScheduleNoUser());
  }, [dispatch]);

  useEffect(() => {
    setLocalUsers(validasiUsers);
  }, [validasiUsers]);

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

  const renderStatus = (absenDate, jadwalDate) => {
    if (!absenDate) {
      return <span className="text-gray-500">Belum Absen</span>;
    }
    const lateStatus = isLate(jadwalDate, absenDate);
    return lateStatus ? (
      <span className="text-red-500">Terlambat</span>
    ) : (
      <span className="text-green-500">Tepat Waktu</span>
    );
  };

  const HandleValidate = async (id) => {
    try {
      await dispatch(validasiGuruJaga(id));
      // Optimistic update
      setLocalUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, statusJaga: true } : user
        )
      );
      toast.success('Validate Success');
    } catch (error) {
      toast.error('Error');
      console.log(error);
    }
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  // Search and pagination logic
  const filteredUsers = localUsers.filter((user) =>
    user.Guru.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredUsers.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="relative overflow-x-auto px-5">
      <div className="pb-2 pt-5 sm:pt-0 text-justify">
        <input
          type="text"
          placeholder="Search by username..."
          className="border rounded p-2 mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-2 text-center">No</th>
            <th scope="col" className="px-2 py-2 text-center">Username</th>
            <th scope="col" className="px-2 py-2 text-center">Kelas</th>
            <th scope="col" className="px-2 py-2 text-center">Jadwal Kelas</th>
            <th scope="col" className="px-2 py-2 text-center">Tanggal Absen</th>
            <th scope="col" className="px-2 py-2 text-center">Status Guru Jaga</th>
            <th scope="col" className="px-2 py-2 text-center">Status Kehadiran</th>
            <th scope="col" className="px-2 py-2 text-center">jam</th>
            <th scope="col" className="px-2 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((el, i) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {offset + i + 1}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {el?.Guru.username}
                </th>
                <td className="px-6 py-4">
                  {el?.Kelas?.name ? el.Kelas.name : 'belum tersedia'}
                </td>
                <td className="px-6 py-4">
                  {el?.jadwalKelas ? formatDate(el.jadwalKelas) : 'belum tersedia'}
                </td>
                <td className="px-6 py-4">
                  {el?.tanggalAbsen ? formatDate(el.tanggalAbsen) : 'belum tersedia'}
                </td>
                <td className='px-10 py-4 text-center'>
                  {el?.statusJaga ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td className="px-6 py-4">
                  {renderStatus(el?.tanggalAbsen, el?.jadwalKelas)}
                </td>
                <td className="px-6 py-4">
                  <RealTimeClock />
                </td>
                <td className="p-2 py-4">
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => HandleValidate(el.id)}
                      className="flex items-center justify-center py-1 px-2 rounded bg-teal-500 text-white hover:bg-teal-600"
                    >
                      <FaCalendarCheck className="mr-1" /> Validate
                    </button>
                    <button
                      onClick={() => openModal(`https://api-v1.ghatmtsn1.com/${el.foto_absen}`)}
                      className={`flex items-center justify-center py-1 px-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${!el.foto_absen && 'opacity-50 cursor-not-allowed'}`}
                      disabled={!el.foto_absen}
                    >
                      Lihat Foto
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {selectedPhoto && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={closeModal}
            >
              &times;
            </button>
            <img src={selectedPhoto} alt="Foto Absen" />
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <div className="text-white">
          Page {currentPage + 1} of {pageCount}
        </div>
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex space-x-2"}
          pageClassName={"px-3 py-1 border rounded"}
          pageLinkClassName={"text-blue-500"}
          previousClassName={"px-3 py-1 border rounded"}
          nextClassName={"px-3 py-1 border rounded"}
          breakClassName={"px-3 py-1 border rounded"}
          activeClassName={"bg-blue-500 text-white"}
        />
      </div>
    </div>
  );
}
