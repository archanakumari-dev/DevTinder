import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

export const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/connections', {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {connections && connections.length > 0 ? (
        <div className="flex flex-wrap gap-8 justify-items-center">
          {connections.map((data) => (
            <ConnectionCard
              key={data._id}
              firstName={data.firstName}
              lastName={data.lastName}
              gender={data.gender}
              photoURL={data.photoURL}
              about={data.about}
              age={data.age}
              skills={data.skills}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-700">
          No Connections found!
        </div>
      )}
    </div>
  );
};

const ConnectionCard = ({ firstName, lastName, gender, photoURL, about, age, skills }) => {
  return (
    <div className="bg-white w-80 min-h-[180px] rounded-2xl p-6 shadow shadow-fuchsia-300  border border-gray-100  flex flex-col justify-between relative">
        <img src="https://cdn-icons-png.flaticon.com/128/2121/2121954.png" alt="" className='w-7 h-7 absolute top-7 right-5 cursor-pointer transition-transform duration-300 hover:scale-85'
        
         />
    
      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
          alt="Profile"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-500">
            {age}
          </p>
          <p className="text-sm text-gray-500">
            {gender}
          </p>
        </div>
      </div>

      {/* About Section */}
      <p className="text-sm text-gray-600 leading-relaxed pl-3 italic whitespace-normal break-all">
        {about?.length > 80 ? about.slice(0, 100) + "..." : about || ""}
      </p>

      {/* Skills Section */}
      <div className="flex flex-wrap gap-2 mt-5">
        {skills && skills.length > 0 ? (
          skills.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100"
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-400 italic"></span>
        )}
      </div>

      
    </div>
  );
};
