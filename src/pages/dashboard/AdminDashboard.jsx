import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2'; // Untuk grafik
import 'chart.js/auto'; // Import chart.js
import { useDispatch, useSelector } from 'react-redux';
import { fetchKelas, fetchTeacher } from '../../store/actionCreator';

const AdminDashboard = () => {
  // Data untuk grafik
  const dispatch = useDispatch()
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales Data',
        data: [30, 45, 25, 60, 70, 55],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const { Teacher } = useSelector((state) => state.Teacher);
  const { Kelases } = useSelector((state) => state.Kelases);

  useEffect(() => {
    dispatch(fetchTeacher());
    dispatch(fetchKelas());
  }, [dispatch]);

  // Contoh data untuk tabel
  const tableData = [
    { id: 1, name: 'John Doe', role: 'Admin' },
    { id: 2, name: 'Jane Smith', role: 'User' },
    { id: 3, name: 'Mike Johnson', role: 'Editor' },
  ];

  return (
    <div className="p-6 space-y-6 dark:bg-transparent dark:text-white">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {/* Statistik Card */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold">Total Guru</h5>
          <p className="text-2xl font-bold">{Teacher.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold">Total Kelas</h5>
          <p className="text-2xl font-bold">{Kelases.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold">All Data</h5>
          <p className="text-2xl font-bold">{Kelases.length + Teacher.length}</p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Grafik */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold mb-2">Kelas List</h5>
          <div className="">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Name</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {Kelases.slice(0, 5).map((user, i) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{i + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Tabel Pengguna */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h5 className="text-xl font-semibold mb-2">Teacher List</h5>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Name</th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Role</th> */}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {Teacher.slice(0, 5).map((user, i) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{i + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.username}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.role}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
