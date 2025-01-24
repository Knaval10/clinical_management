import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      Home
      <Link
        to="/patients"
        className="bg-gray-300 p-2 rounded-xl hover:bg-green-300"
      >
        Go to Patients Table
      </Link>
    </div>
  );
};

export default Home;
