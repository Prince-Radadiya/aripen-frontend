import React from 'react'
import { Link } from "react-router-dom";

const StatsCard = ({ item,path }) => {
  return (
    <>
      <Link to={path} className="card w-[30%] h-[40%] bg-white rounded-md shadow-md p-4 m-2 flex  justify-center items-center" >
        <div className="data w-[60%] h-full flex flex-col justify-center items-center">
          <h2 className="text-lg font-semibold flex justify-center text-[2.5vw]">{item.value}</h2>
          <p className="text-gray-600 flex justify-center text-ellipsis  text-[1.2vw]">{item.title}</p>
        </div>

        <div className="icon w-[18%] h-[60%] flex justify-center items-center ">
          {item.icon}
        </div>
      </Link>
    </>
  )
}

export default StatsCard
