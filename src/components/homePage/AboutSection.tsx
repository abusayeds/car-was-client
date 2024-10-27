import { Link } from "react-router-dom";
import { pic } from "../../assets";

const AboutSection = () => {
  return (
    <main className="mx-auto w-[90%] text-center justify-center items-center flex flex-col gap-10 py-10">
      <p className=" text-4xl text-gray-600  font-titlefont">WHY CHOOSE US ?</p>
      <p className=" text-gray-400">
        We are one of the leading auto repair shops serving customers in Tucson.{" "}
        <br />
        All mechanic services are performed by highly qualified mechanics.
      </p>
      <section className=" md:flex w-full  justify-between items-center gap-10 ">
        <div className=" flex flex-col gap-6 justify-center items-center">
          <img className=" h-44 w-44" src={pic.about1} alt="" />
          <p className="text-gray-800 ">EVERY JOB IS PERSONAL</p>
          <p className="text-gray-400 ">
            If you want the quality you would expect from the dealership, but
            with a more personal and friendly atmosphere, you have found it.
          </p>
        </div>
        <div className=" flex flex-col gap-6 justify-center items-center">
          <img className=" h-44 w-44" src={pic.about2} alt="" />
          <p className="text-gray-800 ">BEST MATERIALS</p>
          <p className="text-gray-400 ">
            We have invested in all the latest specialist tools and diagnostic
            software that is specifically tailored for the software in your
            vehicle.
          </p>
        </div>
        <div className=" flex flex-col gap-6 justify-center items-center">
          <img className=" h-44 w-44" src={pic.about3} alt="" />
          <p className="text-gray-800 ">PROFESSIONAL STANDARDS</p>
          <p className="text-gray-400 ">
            Our auto repair shop is capable of servicing a variety of models. We
            only do the work that is needed to fix your problem.
          </p>
        </div>
      </section>
      <Link
        to={"/about"}
        className="z-10 relative rounded border text-lg
       border-gray-400 bg-transparent px-6 py-3 uppercase  transition-colors before:absolute
        before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:origin-top-left before:scale-x-0
         before:bg-designColor before:transition-transform before:duration-300 hover:text-white before:hover:scale-x-100
          overflow-hidden"
      >
        Read More
      </Link>
    </main>
  );
};

export default AboutSection;
