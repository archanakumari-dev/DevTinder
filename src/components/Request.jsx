import axios from 'axios'
import {useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addRequest } from '../utils/requestSlice'

const Request = () => {

    const dispatch=useDispatch();
    const receivedRequest=useSelector((store)=>store.request);


    const fetchRequests=async()=>{
        const res=await axios.get('http://localhost:3000/user/request/received',{withCredentials:true});
        dispatch(addRequest(res.data.data));
    }

    const reviewRequest=async(status,_id)=>{
      try {
            const res=await axios.post(
                `http://localhost:3000/user/review/${status}/${_id}`,  
                {},
                {withCredentials:true}
            );
            fetchRequests();
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        fetchRequests();
    },[]);

  return (
    receivedRequest && receivedRequest.length>0 ? (
        <div className='min-h-screen bg-gray-50 py-10 px-4'>
            <h1 className='text-center'>Request({receivedRequest?.length})</h1>
            <div className='mt-10 flex flex-col gap-4'>
            {   
                receivedRequest.map((data)=>(
                    <div key={Math.random()}><RequestCard firstName={data.fromUserId.firstName}  lastName={data.fromUserId.lastName} age={data.fromUserId.age} gender={data.fromUserId.gender} reviewRequest={reviewRequest}  _id={data._id}
                    /></div>
                ))
            }
            </div>
        </div>
    ):(
      <div className="text-center py-30 px-6  rounded-xl shadow-inner">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          No Requests Yet 🤝
        </h2>
        <p className=" text-sm max-w-sm mx-auto">
           Your connection list is empty. Start connecting with amazing people and grow your network.
        </p>
      </div>   
       )
  )
}

export default Request;

const RequestCard = ({ photoURL, firstName, lastName, age, gender,reviewRequest,_id}) => {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white rounded-xl p-4 border border-gray-700 hover:border-gray-500 transition-all duration-200 shadow-md w-full max-w-4xl mx-auto">
      {/* Left: Photo */}
      <div className="flex items-center gap-4">
        <img
          src={photoURL?photoURL:"https://cdn-icons-png.flaticon.com/128/17487/17487636.png"}
          alt={firstName.charAt(0).toUpperCase()}
          className="w-14 h-14 rounded-full object-cover border border-gray-600"
        />
        <div>
          <h2 className="text-lg font-semibold">{firstName} {lastName}</h2>
          <p className="text-sm text-gray-400">{age}</p>
          <p className="text-sm text-gray-400">{gender}</p>

        </div>
      </div>

      {/* Right: Buttons */}
      <div className="flex gap-3">
        <button
          className="px-4 py-1.5 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-all"
          onClick={()=>reviewRequest('accepted',_id)}
        >
          Accept
        </button>
        <button
          className="px-4 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-all"
          onClick={()=>reviewRequest('rejected',_id)}

        >
          Reject
        </button>
      </div>
    </div>
  );
};