import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddTeacher } from '../../store/actionCreator'; // Adjust the path as needed
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AddAdminTeacher() {
  const input = {
    username: '',
    Golongan: '',
    umur: 0,
    password: '',
    jenisKelamin: '',
    role: '',
  };

  const [data, setData] = useState(input);
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
      username: '',
      Golongan: '',
      umur: '',
      password: '',
      jenisKelamin: '',
      role: '',
      type :''
    });
  };
  const handleSubmit = async(event) => {
    try {
      event.preventDefault();
      await dispatch(AddTeacher(data));
      document.getElementById("my_modal_teacher").close();
      toast.success('Add Teacher Successfully', {
        position: 'top-right',
        autoClose: 2000
      });
      resetForm()
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
      <button
        className=" btn bg-green-500 px-3 py-1 rounded-lg max-sm:w-full text-white"
        onClick={() => document.getElementById('my_modal_teacher').showModal()}
      >
        Add Teachers
      </button>
      <dialog id="my_modal_teacher" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-end">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => document.getElementById('my_modal_teacher').close()}
              >
                ✕
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-4">Add Teachers</h2>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                name="username"
                value={data.username}
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
                  placeholder="Enter your password"
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
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                className="select select-bordered w-full"
                name="jenisKelamin"
                value={data.jenisKelamin}
                onChange={handleAddChange}
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
                value={data.role}
                onChange={handleAddChange}
              >
                <option value="" disabled>
                  Select your type
                </option>
                <option value="User">user </option>
                <option value="admin">Admin</option>
              </select>
            </div>
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
