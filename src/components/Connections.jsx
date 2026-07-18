import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const resData = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(resData.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-32">
        <h1 className="text-4xl font-bold">No Connections Yet</h1>

        <p className="text-gray-500 mt-3">
          Start connecting with people to build your network.
        </p>
        <Link to="/feed">
          <button className="btn btn-primary mt-6">Explore Developers</button>
        </Link>
      </div>
    );

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-10 my-10">
        My Connections
      </h1>

      <div className="max-w-3xl mx-auto my-8 space-y-5">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="bg-base-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Profile Image */}
              <img
                src={connection.photoUrl}
                alt={connection.firstName}
                className="w-28 h-28 rounded-full object-cover border-4 border-primary"
              />

              {/* User Details */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">
                  {connection.firstName} {connection.lastName}
                </h2>

                {connection.age && connection.gender && (
                  <p className="text-gray-500 mt-1">
                    {connection.age} • {connection.gender}
                  </p>
                )}

                <p className="mt-3 text-base-content/70">{connection.about}</p>
              </div>

              {/* Buttons */}
              {/* <div className="flex flex-col gap-3 w-full md:w-auto">
                <button className="btn btn-primary">💬 Message</button>

                
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
