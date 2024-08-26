import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { fetchKelas, fetchTeacher, updateSchedule } from '../../store/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

export default function UpdateScheduleAdmin({ id, schedule }) {
  // Format datetime string to match 'datetime-local' input type
  const formatDateTimeForInput = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    guruId: schedule.guruId,
    kelasId: schedule.kelasId,
    jadwalKelas: formatDateTimeForInput(schedule.jadwalKelas),
  });

  const dispatch = useDispatch();
  const { Teacher } = useSelector((state) => state.Teacher);
  const { Kelases } = useSelector((state) => state.Kelases);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleEdit(e) {
    try {
      e.preventDefault();
      await dispatch(updateSchedule(id, formData));
      document.getElementById(`modal_${id}`).close();
      toast.success('Update Schedule Successfully', {
        position: 'top-right',
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(fetchTeacher());
    dispatch(fetchKelas());
  }, [dispatch]);

  return (
    <div>
      <button
        onClick={() => document.getElementById(`modal_${id}`).showModal()}
        className="flex items-center justify-center bg-teal-600 text-white py-1 px-3 rounded w-full"
      >
        <FaEdit className="mr-2" /> Edit
      </button>
      <dialog id={`modal_${id}`} className="modal">
        <div className="modal-box">
          <form onSubmit={handleEdit}>
            <div className='flex justify-end'>
              <button
                type='button'
                onClick={() => document.getElementById(`modal_${id}`).close()}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-4">Edit Schedule</h2>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Guru :</span>
              </label>
              <select
                className="select select-bordered w-full"
                name="guruId"
                value={formData.guruId}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Guru</option>
                {Teacher.map(el => (
                  <option key={el.id} value={el.id}>{el.username}</option>
                ))}
              </select>
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Kelas :</span>
              </label>
              <select
                className="select select-bordered w-full"
                name="kelasId"
                value={formData.kelasId}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Kelas</option>
                {Kelases.map(el => (
                  <option key={el.id} value={el.id}>{el.name}</option>
                ))}
              </select>
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Jadwal Kelas :</span>
              </label>
              <input
                type="datetime-local"
                placeholder="Enter your jadwal"
                className="input input-bordered w-full"
                name="jadwalKelas"
                value={formData.jadwalKelas} // Use value here
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
