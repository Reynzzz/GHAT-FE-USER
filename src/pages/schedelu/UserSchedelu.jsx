import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchScheduleByUser } from "../../store/actionCreator";
import { FaCheck, FaTimes, FaCalendarCheck } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const isLate = (jadwal, absen) => {
  if (!jadwal || !absen) return false;
  
  const jadwalTime = new Date(jadwal);
  const absenTime = new Date(absen);
  
  // Hitung selisih waktu dalam menit
  const diffMinutes = (absenTime - jadwalTime) / (1000 * 60);
  
  // Dapatkan hari dari jadwal
  const dayOfWeek = jadwalTime.getDay();
  
  // Periksa apakah waktu jadwal adalah 07:30
  const isSpecificTime = jadwalTime.getHours() === 7 && jadwalTime.getMinutes() === 30;
  
  // Tentukan batas keterlambatan berdasarkan waktu dan hari
  let latenessThreshold = 18; // Default threshold
  
  if (isSpecificTime && (dayOfWeek === 1 || dayOfWeek === 4 || dayOfWeek === 5)) {
    latenessThreshold = 30; // Keterlambatan 30 menit jika waktu jadwal adalah 07:30 pada Senin, Kamis, dan Jumat
  } else if (dayOfWeek === 1 || dayOfWeek === 4 || dayOfWeek === 5) {
    latenessThreshold = 30; // Keterlambatan 30 menit pada Senin, Kamis, dan Jumat jika tidak pada waktu 07:30
  }
  
  return diffMinutes > latenessThreshold;
};


const canAbsen = (jadwal) => {
  if (!jadwal) return false;
  
  const jadwalDate = new Date(jadwal);
  const now = new Date();
  
  // Cek apakah hari ini sama dengan jadwal kelas
  const isSameDay = now.toDateString() === jadwalDate.toDateString();
  
  // Cek jika absensi dapat dilakukan jika sekarang adalah waktu jadwal kelas atau sudah lewat
  const canAbsenNow = now.getTime() >= jadwalDate.getTime();
  
  return isSameDay && canAbsenNow;
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

const RealTimeClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);
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
  const timeOptions = { hour: '2-digit', minute: '2-digit',timeZone: 'Asia/Makassar',month: 'long', 
    day: 'numeric',   };
  return (
    <span>{currentTime.toLocaleTimeString(undefined, timeOptions)}</span>
  );
};

export default function UserSchedelu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userSchedules } = useSelector((state) => state.userSchedules);

  useEffect(() => {
    dispatch(fetchScheduleByUser());
  }, [dispatch]);

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

  return (
    <div>
      <div className="relative overflow-x-auto px-5">
        <div className="pb-2 pt-5 sm:pt-0 text-justify">
          <h1 className="text-sm font-semibold text-yellow-300">
            Note : Absen Hanya bisa dilakukan Ketika Sudah Jam pelajaran dimulai dan setelah 18 menit jam masuk belum absen di hitung terlambat !
          </h1>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-2 text-center">No</th>
              <th scope="col" className="px-2 py-2 text-center">Username</th>
              <th scope="col" className="px-2 py-2 text-center">Kelas</th>
              <th scope="col" className="px-2 py-2 text-center">Jadwal Kelas</th>
              <th scope="col" className="px-2 py-2 text-center">Tanggal Absen</th>
              <th scope="col" className="px-2 py-2 text-center">Status Kehadiran</th>
              <th scope="col" className="px-2 py-2 text-center">jam</th>
              <th scope="col" className="px-2 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {userSchedules.map((el, i) => {
              const isButtonDisabled = el?.statusAbsen || !canAbsen(el?.jadwalKelas);

              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {i + 1}
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
                  <td className="px-6 py-4">
                    {renderStatus(el?.tanggalAbsen, el?.jadwalKelas)}
                  </td>
                  <td className="px-6 py-4">
                    <RealTimeClock />
                  </td>
                  <td className="p-2 py-4">
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => !isButtonDisabled && navigate(`/absen/${el.id}`)}
                        className={`flex items-center justify-center py-1 px-2 rounded ${isButtonDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-teal-500 text-white hover:bg-teal-600'}`}
                        disabled={isButtonDisabled}
                      >
                        <FaCalendarCheck className="mr-1" /> Absen
                      </button>
                      <div className="w-full"></div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

