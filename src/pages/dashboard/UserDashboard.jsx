import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const getTimeOfDay = () => {
  const hours = new Date().getHours();
  if (hours < 12) return "Selamat Pagi";
  if (hours < 18) return "Selamat Siang";
  return "Selamat Malam";
};

const UserDashboard = () => {
  const [greeting, setGreeting] = useState(getTimeOfDay());
  const userType = useSelector((state) => state.userType);
  console.log(userType);
  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getTimeOfDay());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);
 
  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-7xl mx-auto text-white">
        <div className="bg-sky-700 shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{greeting}, {userType.dataUser.username}</h1>
          <p className="">Welcome to your dashboard.</p>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-sky-700 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Section 1</h2>
            <p className="">Content for section 1</p>
          </div>
          <div className="bg-sky-700 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Section 2</h2>
            <p className="">Content for section 2</p>
          </div>
          <div className="bg-sky-700 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Section 3</h2>
            <p className="">Content for section 3</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UserDashboard;
