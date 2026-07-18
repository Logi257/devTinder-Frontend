import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import Card from "./Card";

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.users));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  });

  if (!feed) return;
  if (feed.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-32">
        <h1 className="text-4xl font-bold">No New Users Found</h1>
      </div>
    );

  return (
    feed && (
      <div className="flex justify-center my-10">
        <Card users={feed[0]} />
      </div>
    )
  );
};

export default Feed;
