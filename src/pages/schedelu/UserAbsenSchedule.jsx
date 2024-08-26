import React, { useState, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';
import { FaCamera } from 'react-icons/fa'; // Ganti dengan import dari react-icons
import axios from 'axios';

const UserAbsenSchedule = () => {
  const { id } = useParams();
  const webcamRef = useRef(null);
  const [foto_absen, setFotoAbsen] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [keterangan, setKeterangan] = useState('');
  const [materiAjar, setMateriAjar] = useState('');
  const navigate = useNavigate();
  const videoConstraints = {
    facingMode: isFrontCamera ? 'user' : 'environment',
    width: 500,
    height: 400,
  };
  const webcamClass = `rounded-lg mb-4 ${isFrontCamera ? 'transform scale-x-[-1]' : ''}`;
  const imageClass = `rounded-lg ${isFrontCamera ? 'transform scale-x-[-1]' : ''}`;

  const capture = useCallback(() => {
    const foto_absen = webcamRef.current.getScreenshot();
    setFotoAbsen(foto_absen);
  }, [webcamRef]);

  const closeCamera = () => {
    setIsCameraActive(false);
    setFotoAbsen(null);
  };

  const deleteImage = () => {
    setFotoAbsen(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (foto_absen) {
      const blob = await fetch(foto_absen).then((res) => res.blob());
      const formData = new FormData();
      formData.append('foto_absen', blob, 'foto_absen.jpg');
      formData.append('keterangan', keterangan);
      formData.append('materiAjar', materiAjar);
  
      try {
        const response = await axios.put(`https://api-v1.ghatmtsn1.com/absen/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        console.log(response,'ini response')
        
        console.log('Image uploaded successfully:', response.data);
        navigate('/schedule');
        toast.success('Successful Absen');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Page</h1>
      {!isCameraActive ? (
        <button
          className="flex flex-col items-center justify-center bg-blue-500 text-white px-8 py-6 rounded-lg hover:bg-blue-600 shadow-lg transition-transform transform hover:scale-105"
          onClick={() => setIsCameraActive(true)}
        >
          <FaCamera className="w-12 h-12 mb-2" />
          <span className="text-lg">Absen</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className={webcamClass}
          />
          <div className="flex space-x-4 mb-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              type="button"
              onClick={capture}
            >
              Capture Photo
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              type="button"
              onClick={closeCamera}
            >
              Close Camera
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              type="button"
              onClick={() => setIsFrontCamera(!isFrontCamera)}
            >
              {isFrontCamera ? 'Switch to Back Camera' : 'Switch to Front Camera'}
            </button>
          </div>
          <div className="mb-4 w-full max-w-md ">
            <div className='flex gap-2 mb-1'>
            <label htmlFor="keterangan" className="block text-sm font-medium text-white">Keterangan</label>
            <p className='text-white text-sm'>Bersifat Opsional : </p>
            </div>
            <textarea
              id="keterangan"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              rows="4"
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter description"
            />
          </div>
          <div className="mb-4 w-full max-w-md">
            <label htmlFor="materiAjar" className="block text-sm font-medium text-white mb-1">Materi Ajar</label>
            <textarea
              id="materiAjar"
              value={materiAjar}
              onChange={(e) => setMateriAjar(e.target.value)}
              rows="4"
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter teaching material"
            />
          </div>
          {foto_absen && (
            <div className="mt-4 gap-5">
              <h2 className="text-xl font-semibold mb-2">Captured Image:</h2>
              <img src={foto_absen} alt="Captured" className={imageClass} />
              <div className='flex gap-5'>
              <button
                className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-yellow-600"
                type="button"
                onClick={deleteImage}
              >
                Delete Photo
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
                type="submit"
              >
                Submit Photo
              </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default UserAbsenSchedule;
