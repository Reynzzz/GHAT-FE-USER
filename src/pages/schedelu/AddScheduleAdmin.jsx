import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddSchedule, fetchKelas, fetchTeacher } from '../../store/actionCreator'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AddScheduleAdmin() {
  const dispacth = useDispatch()
  const [data, setData] = useState({
    guruId: null,
    kelasId: null,
    jadwalKelas: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };
    const {Teacher} = useSelector((state) => state.Teacher)
    const {Kelases} = useSelector((state) => state.Kelases)
  //  console.log(Kelases);
  const resetForm = () => {
    setData({
      guruId : '',
      kelasId : '',
      jadwalKelas : ''
    })
  }
    const handleSubmit = async(event) => {
      try {
        event.preventDefault();
        const dataToSubmit = {
          ...data,
          guruId: parseInt(data.guruId),
          kelasId: parseInt(data.kelasId), // Ensure this is the correct integer value for 'kelas'
          jadwalKelas: data.jadwalKelas
        };
        await dispacth(AddSchedule(dataToSubmit));
        console.log(dataToSubmit);
       
        document.getElementById("my_modal_add_schedule").close();
        toast.success('Add Schedule Successfully', {
          position: 'top-right',
          autoClose: 2000
        });
        resetForm()
      } catch (error) {
        console.error('Error posting Absen:', error);
        toast.error('Failed to add Absen Teacher', {
          position: 'top-right',
          autoClose: 2000
        });
      }
    };
    useEffect(() => {
        dispacth(fetchTeacher())
        dispacth(fetchKelas())
    },[])

  return (
    <div>{/* You can open the modal using document.getElementById('ID').showModal() method */}
    <button className="btn bg-green-500 text-white" onClick={()=>document.getElementById('my_modal_add_schedule').showModal()}>Add Schedule</button>
    <dialog id="my_modal_add_schedule" className="modal">
      <div className="modal-box">
        <form method="dialog" onSubmit={handleSubmit}>
          <div className='flex justify-end'>
          <button type='button' onClick={()=> document.getElementById('my_modal_add_schedule').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </div>
          <h2 className="text-2xl font-bold mb-4">Add Schedule</h2>
          <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Guru :</span>
              </label>
              <select
                className="select select-bordered w-full"
                name="guruId"
                value={data.guruId}
                onChange={handleChange}
                // required
              >
                <option  value="" disabled selected >  Select Guru  </option>
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
                value={data.kelasId}
                onChange={handleChange}
                // required
              >
                <option  disabled selected>
                  Select Kelas
                </option>
                {Kelases.map(el => {
                  return (
                    <option key={el.id} value={el.id}>{el.name}</option>
                  )
                })}
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
                value={data.jadwalKelas}
                onChange={handleChange}
                // required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
        </form>
        
      </div>
    </dialog></div>
  )
}
