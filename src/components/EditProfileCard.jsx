import React from 'react'

const EditProfileCard = ({
  firstName,
  lastName,
  age,
  gender,
  about,
  photoURL,
  skills
  }) => {
  return (
    <div className="flex justify-center">
      <div
        className={`flex flex-col bg-white shadow-xl rounded-md w-full max-w-sm transition-all duration-300 cursor-pointer overflow-hidden`}          
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
          <div className="flex justify-center gap-4 my-3 text-sm text-slate-700 hover:scale-105">
            {age && <span className="bg-slate-300 px-3 py-1 rounded-full ">
               {age} {gender && `, ${gender}`}
            </span>}
            
          </div>

          <div className="relative my-10 ">
            <hr className="border-gray-400" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-3 text-blue-600 font-medium ">
              About
            </span>
          </div>
            
          {about &&<p className="text-sm text-slate-600 font-semibold  m-6 whitespace-normal break-all">{about}</p>}
        
          <div className="relative my-10">
            <hr className="border-gray-400" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-3 text-blue-600 font-medium">
              Skills
            </span>
          </div>  

            <div className='m-3'>
              <div className='flex flex-wrap gap-2'>
                {skills?.map((skill)=>(
                  <span className="px-3 py-1 rounded-xl border border-purple-700 font-medium text-purple-800 flex text-center items-center gap-4 hover:bg-gray-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          
        </div>
      </div>
    </div>
  )
}

export default EditProfileCard