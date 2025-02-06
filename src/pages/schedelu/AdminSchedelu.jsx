import { useDispatch, useSelector } from "react-redux";
import AddScheduleAdmin from "./AddScheduleAdmin";
import { useEffect, useState } from "react";
import {
  deleteSchedule,
  deleteScheduleAll,
  fetchAbsen,
} from "../../store/actionCreator";
import { FaTrash, FaEdit, FaDownload } from "react-icons/fa";
import { FaCheck, FaTimes } from "react-icons/fa";
import UpdateScheduleAdmin from "./UpdateScheduleAdmin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";
import moment from "moment-timezone";
import { AiOutlineClockCircle } from "react-icons/ai";
const AdminSchedelu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  const handleModalToggle = (foto_absen) => {
    setSelectedPhoto(foto_absen); // Set the selected photo URL
    setIsModalOpen(!isModalOpen); // Toggle the modal open/close state
  };
  const dispatch = useDispatch();
  const { schedules } = useSelector((state) => state.schedules);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  console.log(schedules)
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAbsen());
      setLoading(false); // Set loading ke false setelah data selesai diambil
    };

    fetchData();
  }, [dispatch]);

  const filteredSchedules = schedules?.filter((el) => {
    const usernameMatch = el.Guru?.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const scheduleDate = moment(el.jadwalKelas).tz("Asia/Makassar");
    const dayMatch = selectedDay
      ? scheduleDate.format("dddd") === selectedDay
      : true;
    const monthMatch = selectedMonth
      ? scheduleDate.format("MMMM") === selectedMonth
      : true;

    return usernameMatch && dayMatch && monthMatch;
  });
  const paginatedSchedules = filteredSchedules?.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

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
    return moment(dateString).tz("Asia/Makassar").format("DD MMMM YYYY, HH:mm");
  };

  async function handleDelete(id) {
    try {
      await dispatch(deleteSchedule(id));
      toast.success("Delete Successfully", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDeleteAll(id) {
    try {
      await dispatch(deleteScheduleAll(id));
      toast.success("Delete Successfully", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  }
  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredSchedules.map((el) => ({
        "Nama Pengguna": el.Guru?.username ?? "N/A",
        "Kelas": el.Kelas?.name ?? "N/A",
        "Jadwal Kelas": formatDate(el.jadwalKelas),
        "Tanggal Absen": el?.tanggalAbsen ? formatDate(el.tanggalAbsen) : "N/A",
        "Status Absen": el.statusAbsen ? "Hadir" : "Tidak Hadir",
        "Status Jaga": el.statusJaga ? "Sedang Jaga" : "Tidak Jaga",
        "Status Kelas": el.statusKelas ? "Masuk" : "Tidak Masuk",
        "Tujuan Pembelajaran": el.keterangan ?? "belum mengisi",
        "Materi Ajar": el.materiAjar?? "belum mengisi",
        "Jam Absen": formatDate(el.tanggalAbsen) ?? "belum mengisi",
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Jadwal");
    XLSX.writeFile(wb, "jadwal.xlsx");
  };

  return (
    <div className="flex flex-col justify-center">
      {loading ? (
        <div className="flex justify-center items-center">
          <AiOutlineClockCircle className="animate-spin-slow text-green-500 text-6xl" />
        </div>
      ) : (
        <>
          <div></div>
          <div className="flex justify-between items-end px-5 mb-4">
            <div className="flex justify-start gap-5">
              <button
                onClick={handleDownloadExcel}
                className="flex items-center bg-blue-500 text-white py-2 px-4 rounded"
              >
                <FaDownload className="mr-2" /> Download Excel
              </button>
              <button
                onClick={() =>
                  document.getElementById("confirm-modal").showModal()
                }
                className="flex items-center bg-red-500 text-white py-2 px-4 rounded"
              >
                <FaTrash className="mr-2" /> Delete All Data
              </button>

              {/* DaisyUI Modal */}
              <dialog id="confirm-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Konfirmasi</h3>
          <p className="py-4">Apakah Anda yakin ingin menghapus semua data?</p>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                document.getElementById("confirm-modal").close();
                document.getElementById("final-confirm-modal").showModal();
              }}
            >
              Ya
            </button>
            <button className="btn btn-secondary ml-2" onClick={() => document.getElementById("confirm-modal").close()}>
              Tidak
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="final-confirm-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Peringatan Terakhir!</h3>
          <p className="py-4 text-red-500">
            Jika Anda menghapus data, data tersebut TIDAK BISA dikembalikan. Apakah Anda benar-benar yakin?
          </p>
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={async () => {
                await handleDeleteAll();
                document.getElementById("final-confirm-modal").close();
              }}
            >
              Hapus Permanen
            </button>
            <button className="btn btn-secondary ml-2" onClick={() => document.getElementById("final-confirm-modal").close()}>
              Batal
            </button>
          </div>
        </div>
      </dialog>

    
  
            </div>

            <AddScheduleAdmin />
          </div>
          <div className="flex gap-3 mb-4 px-5">
            <input
              type="text"
              placeholder="Search by username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-3 py-2 w-1/3"
            />

            <select
              className="border rounded px-3 py-2 w-1/3"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <option value="">Semua Hari</option>
              <option value="Monday">Senin</option>
              <option value="Tuesday">Selasa</option>
              <option value="Wednesday">Rabu</option>
              <option value="Thursday">Kamis</option>
              <option value="Friday">Jumat</option>
              <option value="Saturday">Sabtu</option>
              <option value="Sunday">Minggu</option>
            </select>

            <select
              className="border rounded px-3 py-2 w-1/3"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">Semua Bulan</option>
              <option value="January">Januari</option>
              <option value="February">Februari</option>
              <option value="March">Maret</option>
              <option value="April">April</option>
              <option value="May">Mei</option>
              <option value="June">Juni</option>
              <option value="July">Juli</option>
              <option value="August">Agustus</option>
              <option value="September">September</option>
              <option value="October">Oktober</option>
              <option value="November">November</option>
              <option value="December">Desember</option>
            </select>
          </div>

          <div className="relative overflow-x-auto px-5 py-5 dark:bg-gray-900 dark:text-white">
            <table className="w-full text-sm  text-left text-gray-500 dark:text-gray-300">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
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
                  <th scope="col" className="px-6 py-3">
                    Jadwal Kelas
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tanggal Absen
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status Absen
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status Jaga
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status Kelas
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedSchedules && paginatedSchedules.length > 0 ? (
                  paginatedSchedules.map((el, i) => (
                    <tr
                      key={el.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">
                        {i + 1 + currentPage * itemsPerPage}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {el.Guru?.username ?? "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {el.foto_absen ? (
                          <>
                            <button
                              className="btn btn-primary dark:bg-blue-700 dark:text-white"
                              onClick={() => handleModalToggle(el.foto_absen)}
                            >
                              Lihat Foto
                            </button>
                            {isModalOpen && selectedPhoto === el.foto_absen && (
                              <div className="modal modal-open dark:bg-gray-900">
                                <div className="modal-box dark:bg-gray-800 dark:text-white">
                                  <img
                                    src={`https://api-v1.ghatmtsn1.com/${selectedPhoto}`}
                                    alt="Foto Absen"
                                    className="w-full h-auto"
                                  />
                                  <div className="modal-action">
                                    <button
                                      className="btn btn-primary dark:bg-blue-700 dark:text-white"
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
                          <button
                            className="btn btn-secondary dark:bg-gray-600 dark:text-white"
                            disabled
                          >
                            Belum Absen
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4">{el.Kelas?.name ?? "N/A"}</td>
                      <td className="px-6 py-4">
                        {formatDate(el.jadwalKelas)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {el?.tanggalAbsen ? formatDate(el.tanggalAbsen) : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderStatusIcon(el.statusAbsen)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderStatusIcon(el.statusJaga)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {renderStatusIcon(el.statusKelas)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(el.id)}
                          className="flex items-center justify-center bg-red-500 dark:bg-red-700 text-white py-1 px-3 rounded w-full"
                        >
                          <FaTrash className="mr-2" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="10"
                      className="text-center py-4 dark:text-gray-400"
                    >
                      No schedules found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex justify-center py-5">
              <ReactPaginate
                pageCount={Math.ceil(filteredSchedules?.length / itemsPerPage)}
                onPageChange={handlePageChange}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                containerClassName={"pagination flex gap-2"}
                activeClassName={"active"}
                disabledClassName={"disabled"}
                pageLinkClassName={
                  "px-2 py-1 border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                }
                activeLinkClassName={"bg-blue-500 dark:bg-blue-700 text-white"}
                previousLinkClassName={
                  "px-2 py-1 border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                }
                nextLinkClassName={
                  "px-2 py-1 border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminSchedelu;
