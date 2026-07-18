import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

const Card = ({ users }) => {
  const { _id, firstName, lastName, photoUrl, about, gender, age } = users;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );

      dispatch(removeUserFeed(_id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="card bg-base-300 w-72 shadow-sm">
        <figure className="h-52">
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName + " " + lastName}
            {age && gender && (
              <div className="badge badge-secondary">{age + ", " + gender}</div>
            )}
          </h2>
          <p>{about}</p>
          <div className="card-actions justify-end">
            <div
              className="badge badge-primary py-4 cursor-pointer"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </div>
            <div
              className="badge badge-secondary py-4 cursor-pointer"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
