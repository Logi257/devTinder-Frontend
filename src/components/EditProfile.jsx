import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [toastMsg, setToastMsg] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res?.data?.data));
      setToastMsg(true);

      setTimeout(() => {
        setToastMsg(false);
      }, 3000);
    } catch (error) {
      setError(error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-base-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-10">
            Edit Your Profile
          </h1>

          <div className="flex flex-col lg:flex-row justify-center items-start gap-10">
            {/* Form */}
            <fieldset className="fieldset bg-base-200 border border-base-300 rounded-2xl w-full lg:w-2/3 p-8 shadow-xl">
              <legend className="fieldset-legend text-2xl font-bold px-2">
                Profile Information
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label font-semibold">First Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label font-semibold">Last Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="label font-semibold">Email</label>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
                    value={user.emailId}
                    readOnly
                  />
                </div>

                <div>
                  <label className="label font-semibold">Photo URL</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label font-semibold">Age</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label font-semibold">Gender</label>

                  <select
                    className="select select-bordered w-full"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="label font-semibold">About</label>

                  <textarea
                    className="textarea textarea-bordered w-full h-36"
                    placeholder="Tell people something about yourself..."
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
              </div>
              <p className="text-red-600  font-medium">{error}</p>

              <div className="flex justify-end mt-8">
                <button
                  className="btn btn-primary btn-wide"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </fieldset>

            {/* Live Preview */}
            <div className="w-full lg:w-1/3 flex flex-col items-center sticky top-24">
              <h2 className="text-xl font-bold mb-4">Live Preview</h2>
              <Card
                users={{
                  firstName,
                  lastName,
                  photoUrl,
                  age,
                  gender,
                  about,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {toastMsg && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span className="text-white">Profile Updated Successfully </span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
