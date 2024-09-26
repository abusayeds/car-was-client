
import { NavLink } from 'react-router-dom';

const Failed = () => {
    return (
        <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-[#07074D] ">Order Placed Faild!</h1>

        <p className="text-lg mb-2">We have received your servise</p>

        <NavLink className= ' underline font-bodyfont' to="/booking">Back to Booking</NavLink>
      </div>
    </div>
    );
};

export default Failed;