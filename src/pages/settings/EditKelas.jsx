import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddKelas, AddTeacher, updateKelasAdmin } from '../../store/actionCreator'; // Adjust the path as needed
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaEdit } from 'react-icons/fa';
export default function EditKelas({id,kelas}) {
console.log(id);
console.log(kelas.id);

  const [data, setData] = useState({
    name : kelas.name,
    password : ''
  });


  
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false); 
  const handleAddChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const resetForm = () => {
    setData({
      name: '',
      password: '',

    });
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      await dispatch(updateKelasAdmin(id,data));
      document.getElementById(`edit_kelas_${id}`).close();
      toast.success('Updated Kelas Successfully', {
        position: 'top-right',
        autoClose: 2000
      });
      // resetForm()
    } catch (error) {
      console.error('Error posting Teacher:', error);
      toast.error('Failed to add Teacher', {
        position: 'top-right',
        autoClose: 2000
      });
    }
  };

  return (
    <div>
      <button onClick={() =>  document.getElementById(`edit_kelas_${id}`).showModal()} className="flex items-center justify-center bg-teal-600 text-white py-1 px-2 rounded text-xs">
                      <FaEdit className="mr-1" /> Edit
                    </button>
      <dialog id={`edit_kelas_${id}`} className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-end">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => document.getElementById(`edit_kelas_${id}`).close()}
              >
                ✕
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-4">Add Kelas</h2>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name Kelas"
                className="input input-bordered w-full"
                name="name"
                value={data.name}
                onChange={handleAddChange}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  placeholder="Enter your New password"
                  className="input input-bordered w-full"
                  name="password"
                  value={data.password}
                  onChange={handleAddChange}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {/* <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Golongan</span>
              </label>
              <input
                type="text"
                placeholder="Enter your Golongan"
                className="input input-bordered w-full"
                name="Golongan"
                value={data.Golongan}
                onChange={handleAddChange}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Umur</span>
              </label>
              <input
                type="number"
                placeholder="Enter your Umur"
                className="input input-bordered w-full"
                name="umur"
                value={data.umur}
                onChange={handleAddChange}
              />
            </div> */}
         
            {/* <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Type</span>
              </label>
              <select
                className="select select-bordered w-full"
                name="role"
                value={data.type}
                onChange={handleAddChange}
              >
                <option value="" disabled>
                  Select your type
                </option>
                <option value="Pengajar">Pengajar </option>
              
              </select>
            </div> */}
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
