import React, { useState ,useEffect} from "react";
import { Card } from "../pages/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import EditProfileCard from "./EditProfileCard";

//add dtoast profile saved succesfully
//useSetTimeOut for alert

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [photoURL, setPhotoURL] = useState(user?.photoURL);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [skills, setSkills] = useState(user?.skills);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditProfile = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:3000/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          age,
          about,
          gender,
          skills
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/feed");
    } catch (error) {
      console.log(error.message);
    }
  };



  const handleSkills = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setSkills((prev) => [...prev, inputValue.trim()]);
      setInputValue("");
    }
  };

  return (
    <div className="min-h-screen flex justify-between bg-gray-50 pr-4">
      {/* Left card */}
      <div className="w-[30%]">
        <EditProfileCard
          firstName={firstName}
          lastName={lastName}
          photoURL={photoURL}
          age={age}
          about={about}
          gender={gender}
          skills={skills}
        />
      </div>

      <div className="card bg-white w-[70%] shadow-2xl rounded-xl p-8 border-t-2 ">
        <div className="card-body ">
          <h2 className="text-center text-3xl font-semibold mb-6 text-gray-800">
            Edit Profile
          </h2>

          <div className="flex gap-6 mb-5">
            <div className="w-1/2">
              <label className="block mb-1 font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full text-base text-gray-700"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
              />
            </div>

            <div className="w-1/2">
              <label className="block mb-1 font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full text-base text-gray-700"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
              />
            </div>
          </div>

          {/* Row 2: Age + Gender */}
          <div className="flex gap-6 mb-5">
            <div className="w-1/2">
              <label className="block mb-1 font-medium  text-gray-700 ">
                Age
              </label>
              <input
                type="number"
                className="input input-bordered w-full text-base text-gray-700"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
              />
            </div>

            <div className="w-1/2">
              <label className="block mb-1 font-medium  text-gray-700">
                Gender
              </label>
              <select
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled value="">
                  Select gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Photo URL */}
          <div className="mb-5">
            <label className="block mb-1 font-medium  text-gray-700">
              Photo URL
            </label>
            <input
              type="text"
              className="input input-bordered w-full text-base text-gray-700"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Paste image link"
            />
          </div>

          {/* Skills */}

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Skills
            </label>
            <input
              type="text"
              className="input input-bordered w-full text-base text-gray-700"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Singing"
              onKeyDown={handleSkills}
            />
            <div className="mt-3 flex flex-wrap gap-3">
              {skills?.map((skill) => (
                <span className="px-3 py-1 rounded-2xl font-medium text-gray-700 bg-gray-300 flex text-center items-center gap-4">
                  {skill}{" "}
                  <button
                    type="button"
                    onClick={() =>
                      setSkills(skills.filter((data) => data !== skill))
                    }
                    className="hover:bg-gray-300 rounded-full p-1 transition"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2997/2997911.png"
                      alt="remove"
                      className="h-3 w-3 cursor-pointer"
                    />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="my-5">
            <label className="block mb-1 font-medium text-gray-700">
              About
            </label>
            <textarea
              className="textarea textarea-bordered w-full text-base text-gray-700"
              rows="3"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell something about yourself"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              className="btn btn-primary px-10"
              onClick={handleEditProfile}
            >
              Save Profile ✅
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
