import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { Card } from "./Card";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const handleSentRequest = async (status, toUserId) => {
    const res = await axios.post(
      `http://localhost:3000/request/send/${status}/${toUserId}`,
      {},
      { withCredentials: true }
    );
    console.log(res.data);
    getFeed();
  };

  const getFeed = async () => {
    const res = await axios.get("http://localhost:3000/user/feed", {
      withCredentials: true,
    });
    dispatch(addFeed(res?.data?.users));
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h2 className="text-3xl font-bold text-center  mb-10">
        Your Feed
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {feed && feed.length > 0 ? (
          feed.map((user) => (
            <Card
              key={user._id}
              firstName={user.firstName}
              lastName={user.lastName}
              age={user.age}
              about={user.about}
              gender={user.gender}
              photoURL={user.photoURL}
              handleSentRequest={handleSentRequest}
              toUserId={user._id}
            />
          ))
        ) : (
          <p className="col-span-full text-gray-500 text-center text-lg">
            No users found in your feed.
          </p>
        )}
      </div>
    </div>
  );
};

export default Feed;
