import React, { useState } from 'react';
import { FaTrash, FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { updateTeacher } from '../../store/actionCreator';
import { useDispatch } from 'react-redux';
const formatDateTimeForInput = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const day = String(dateTime.getDate()).padStart(2, '0');
  const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
export default function UpdateTeacher({ id, teacher }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: teacher.username || '',
    Golongan: teacher.Golongan || '',
    umur: teacher.umur || '',
    password: '',
    jenisKelamin: teacher.jenisKelamin || '',
    role: teacher.role || '',
    type: teacher.type || '',
    jadwalGuruJagaFrom: formatDateTimeForInput(teacher.jadwalGuruJagaFrom || ''),
    jadwalGuruJagaTo: formatDateTimeForInput(teacher.jadwalGuruJagaTo || ''),
  });


  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      username: '',
      Golongan: '',
      umur: '',
      password: '',
      jenisKelamin: '',
      role: '',
      type: '',
      jadwalGuruJagaFrom: '',
      jadwalGuruJagaTo: '',
    });
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(updateTeacher(id, formData));
      document.getElementById(`my_modal_${id}`).close();
      toast.success('Update Teacher Successfully', {
        position: 'top-right',
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <button onClick={() => document.getElementById(`my_modal_${id}`).showModal()} className="flex items-center justify-center bg-teal-600 text-white py-1 px-3 rounded w-full">
        <FaEdit className="mr-2" /> Edit
      </button>
      <dialog id={`my_modal_${id}`} className="modal">
        <div className="modal-box">
          <form onSubmit={handleEdit}>
            <div className="flex justify-end">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => document.getElementById(`my_modal_${id}`).close()}
              >
                ✕
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-4">Edit Teacher</h2>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your name"
                className="input input-bordered w-full"
                name="username"
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your new password"
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  name="password"
                  value={formData.password}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                className="select select-bordered w-full"
                name="jenisKelamin"
                value={formData.jenisKelamin}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                className="select select-bordered w-full"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Type</span>
              </label>
              <select
                className="select select-bordered w-full"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select your type
                </option>
                <option value="Pengajar">Pengajar</option>
                <option value="Pengajar dan Guru Jaga">Pengajar dan Guru Jaga</option>
              </select>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Jadwal Guru Jaga Dari</span>
              </label>
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                name="jadwalGuruJagaFrom"
                onChange={handleChange}
                value={formData.jadwalGuruJagaFrom}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Jadwal Guru Jaga Sampai</span>
              </label>
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                name="jadwalGuruJagaTo"
                onChange={handleChange}
                value={formData.jadwalGuruJagaTo}
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
