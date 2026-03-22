import React, { useState } from "react";

export const Card = ({
  firstName,
  lastName,
  age,
  gender,
  about,
  photoURL,
  handleSentRequest,
  toUserId,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex justify-center my-6 px-4">
      <div
        className={`flex flex-col bg-white border rounded-xl w-full max-w-sm transition-all duration-300 cursor-pointer 
        ${
          isActive
            ? "shadow-2xl border-pink-400 bg-pink-50 scale-105"
            : "shadow-md border-slate-200 hover:shadow-lg hover:scale-[1.02]"
        }`}
        onClick={() => setIsActive(!isActive)}
      >
        {/* Image */}
        <div className="overflow-hidden rounded-t-xl h-60 flex justify-center items-center">
          <img
            className="w-full h-full object-cover"
            src={photoURL || "https://docs.material-tailwind.com/img/team-3.jpg"}
            alt="profile-picture"
          />
        </div>

        {/* Content */}
        <div className="p-5 text-center ">
          <h4 className="mb-2 text-xl font-bold text-slate-800">
            {firstName + " " + lastName}
          </h4>
          {about &&<p className="text-sm text-slate-600 font-normal">{about}</p>}

          <div className="flex justify-center gap-4 mt-4 text-sm text-slate-700">
            {age && <span className="bg-slate-100 px-3 py-1 rounded-full">
              Age: {age}
            </span>}
            {gender && <span className="bg-slate-100 px-3 py-1 rounded-full">
              {gender}
            </span>}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 p-5 ">
          <button
            className="min-w-28 rounded-lg bg-pink-500 hover:bg-pink-600 font-medium py-2 px-4 text-white text-sm shadow-md hover:shadow-lg transition-all"
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // prevent toggling on click
              handleSentRequest("interested", toUserId);
            }}
          >
            Interested
          </button>
          <button
            className="min-w-28 rounded-lg bg-gray-300 hover:bg-gray-400 font-medium py-2 px-4 text-gray-800 text-sm shadow-md hover:shadow-lg transition-all"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSentRequest("ignored", toUserId);
            }}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};
