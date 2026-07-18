import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addrequests, removeRequest } from "../utils/requestSlice";
const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchrequests = async () => {
    try {
      const resData = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(resData.data.data);

      dispatch(addrequests(resData.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );

      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchrequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-32">
        <h1 className="text-4xl font-bold">No Requests Received</h1>
      </div>
    );

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-10 my-10">
        Connection Requests
      </h1>

      <div className="max-w-3xl mx-auto my-8 space-y-5">
        {requests.map((request) => (
          // const {firstName, lastName, photoUrl, about, age, gender} = request.fromUserId

          <div
            key={request._id}
            className="bg-base-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Profile Image */}
              <img
                src={request.fromUserId.photoUrl}
                alt={request.fromUserId.firstName}
                className="w-28 h-28 rounded-full object-cover border-4 border-primary"
              />

              {/* User Details */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">
                  {request.fromUserId.firstName} {request.fromUserId.lastName}
                </h2>

                {request.fromUserId.age && request.fromUserId.gender && (
                  <p className="text-gray-500 mt-1">
                    {request.fromUserId.age} • {request.fromUserId.gender}
                  </p>
                )}

                <p className="mt-3 text-base-content/70">
                  {request.fromUserId.about}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <button
                  className="btn btn-primary"
                  onClick={() => reviewRequests("accepted", request._id)}
                >
                  ✅ Accept
                </button>

                <button
                  className="btn btn-outline"
                  onClick={() => reviewRequests("rejected", request._id)}
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
