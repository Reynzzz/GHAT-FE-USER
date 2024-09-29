import React from 'react'

export default function AddScheduleGuru() {
  return (
    <div>{/* You can open the modal using document.getElementById('ID').showModal() method */}
    <button className="btn bg-green-500 text-white" onClick={()=>document.getElementById('my_modal_add_schedule').showModal()}>Add Schedule</button>
    <dialog id="my_modal_add_schedule" className="modal">
      <div className="modal-box">
        <form method="dialog" >
          <div className='flex justify-end'>
          <button type='button' onClick={()=> document.getElementById('my_modal_add_schedule').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </div>
          <h2 className="text-2xl font-bold mb-4">Add Schedule</h2>
          {/* <div className="form-control mb-4">
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
            </div> */}
            {/* <div className="form-control mb-4">
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
            </div> */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Jadwal Kelas :</span>
              </label>
              <input
                type="datetime-local"
                placeholder="Enter your jadwal"
                className="input input-bordered w-full"
                name="jadwalKelas"
               
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
