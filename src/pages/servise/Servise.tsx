/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useServiseQuery } from "../../redux/features/servise/ServiseApi";
import { durationfield, pricefield } from "./servise-constant";
import { TfiAngleDown, TfiAngleRight } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";


const Servise = () => {
  const [priceOpen, setPriceOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState(3);

  const [reange, setReange] = useState(() => {
    const savedRengeValue = localStorage.getItem("renge");
    return savedRengeValue ? JSON.parse(savedRengeValue) : "";
  });
  const [filterField, setFilterField] = useState<any[]>(() => {
    const savedFilterField = localStorage.getItem("filterField");
    return savedFilterField ? JSON.parse(savedFilterField) : [];
  });
  const [filterValue, setFilterValue] = useState<any[]>(() => {
    const savedFilterValue = localStorage.getItem("filterValue");
    return savedFilterValue ? JSON.parse(savedFilterValue) : [];
  });
  const [searchValue, setSearchValue] = useState(() => {
    const savedSearchValue = localStorage.getItem("SearchValue");
    return savedSearchValue ? JSON.parse(savedSearchValue) : "";
  });
  const [sortValue, setSortValue] = useState(() => {
    const savedSearchValue = localStorage.getItem("sortValue");
    return savedSearchValue ? JSON.parse(savedSearchValue) : "";
  });
  const args = {
    data: filterValue,
    search: searchValue,
    sort: sortValue,
  };
  const { data } = useServiseQuery(args);

  const handleFieldChange = (data: any) => {
    setFilterField((prev) =>
      prev.includes(data) ? prev.filter((c) => c !== data) : [...prev, data]
    );
  };

  useEffect(() => {
    const priceFilterValues = filterField.map((field, index) => ({
      name: "price",
      value: field,
      key: index,
    }));
    setFilterValue(priceFilterValues);

    localStorage.setItem("filterField", JSON.stringify(filterField));
    localStorage.setItem("filterValue", JSON.stringify(priceFilterValues));
    localStorage.setItem("SearchValue", JSON.stringify(searchValue));
    localStorage.setItem("sortValue", JSON.stringify(sortValue));
  }, [filterField, searchValue, sortValue]);

  const priceDropdown = () => {
    setPriceOpen(!priceOpen);
  };
  const sortDropdown = () => {
    setSortOpen(!sortOpen);
  };
  const empty = () => {
    setFilterField([]);
    setFilterValue([]);
    setSearchValue("");
    setSortValue("");
    setReange("");
    localStorage.setItem("renge", JSON.stringify(""));
  };
  const showMoreItems = () => {
    setVisibleItems(data?.data?.length);
  };

  const showLessItems = () => {
    setVisibleItems(3);
  };

  const sortPriceRange = (renge: any, value: string) => {
    const prices = renge.map((item: any) => item.price);
    const low = Math.min(...prices);
    const high = Math.max(...prices);
    if (value === "price") {
      setReange(`${low}  to ${high}`);
      localStorage.setItem("renge", JSON.stringify(`${low}  to ${high}`));
      setSortOpen(!sortOpen);
    } else if (value === "-price") {
      setReange(`${high}  to ${low}`);
      localStorage.setItem("renge", JSON.stringify(`${high}  to ${low}`));
      setSortOpen(!sortOpen);
    }
  };
  const sortDurationRange = (renge: any, value: string) => {
    const prices = renge.map((item: any) => item.duration);
    const low = Math.min(...prices);
    const high = Math.max(...prices);
    if (value === "duration") {
      setReange(`${low}m to ${high}m`);
      localStorage.setItem("renge", JSON.stringify(`${low}m to ${high}m`));
      setSortOpen(!sortOpen);
    } else if (value === "-duration") {
      setReange(`${high}m to ${low}M`);
      localStorage.setItem("renge", JSON.stringify(`${high}m to ${low}M`));
      setSortOpen(!sortOpen);
    }
  };
  const serviseId = (id : any) => {
    localStorage.setItem("serviseDetailsId", JSON.stringify(id));
  }

  return (
    <main className="md:mt-40 mt-20 mb-10 w-full">
      <p className="text-xl md:text-4xl text-gray-700 pb-10 text-center uppercase font-titlefont">
        OUR, most popular service
      </p>
      <section className=" sm:flex lg:flex xl:flex  w-full gap-8 font-titlefont">
        <section className=" w-[300px  p-2 ">
          <form className="relative">
            <input
              className="w-full p-3 font-titlefont outline-none border border-gray-300 rounded-md"
              type="text"
              name="search"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />

            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <CiSearch className="text-2xl" />
            </button>
          </form>
          <section className="bg-slate-50 mt-4 p-3 flex flex-col gap-3">
            {/* price dropdown */}
            <p className="">Select Service Prices</p>
            <div
              onClick={priceDropdown}
              className="  text-gray-500   w-full flex justify-between items-center "
            >
              <p>Prices</p>
              {priceOpen ? (
                <TfiAngleDown></TfiAngleDown>
              ) : (
                <TfiAngleRight></TfiAngleRight>
              )}
            </div>
            <div
              className={`bg-white shadow-lg   grid grid-cols-3 transition-all duration-300 ease-in-out ${
                priceOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              {pricefield?.map((fieldname: any) => (
                <div className="p-2" key={fieldname.price}>
                  <input
                    type="checkbox"
                    onChange={() => handleFieldChange(fieldname.price)}
                  />
                  <label className="ml-2 font-titlefont text-xs md:text-sm">
                    {fieldname.price}{" "}
                    <span className="text-designColor text-xs">$</span>
                  </label>
                </div>
              ))}
            </div>
            {/* price dropdown */}

            {/* sort dropdown */}
            <p>Sort by</p>
            <div
              onClick={sortDropdown}
              className=" text-gray-500   w-full flex justify-between items-center"
            >
              <input
                className=" outline-none bg-slate-50"
                type="text"
                defaultValue={reange}
                placeholder="Defult"
              />
              {sortOpen ? (
                <TfiAngleDown></TfiAngleDown>
              ) : (
                <TfiAngleRight></TfiAngleRight>
              )}
            </div>
            <div
              className={`bg-white shadow-lg   text-center flex flex-col    transition-all duration-300 ease-in-out ${
                sortOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <p
                className=" p-2 my-1 hover:bg-slate-300 duration-300 font-titlefont md:text-sm text-sx "
                onClick={() => {
                  setSortValue("price");
                  sortPriceRange(pricefield, "price");
                }}
              >
                Price Low to High
              </p>

              <p
                className=" p-2 my-1 hover:bg-slate-300 duration-300 font-titlefont md:text-sm text-sx "
                onClick={() => {
                  setSortValue("-price");
                  sortPriceRange(pricefield, "-price");
                }}
              >
                Price High to Low
              </p>

              <p
                className=" p-2 my-1 hover:bg-slate-300 duration-300 font-titlefont md:text-sm text-sx "
                onClick={() => {
                  setSortValue("duration");
                  sortDurationRange(durationfield, "duration");
                }}
              >
                Duration Low to High
              </p>

              <p
                className=" p-2 my-1 hover:bg-slate-300 duration-300 font-titlefont md:text-sm text-sx "
                onClick={() => {
                  setSortValue("-duration");
                  sortDurationRange(durationfield, "-duration");
                }}
              >
                Duration High to Low
              </p>
            </div>
            {/* sort dropdown */}
          </section>

          <button
            onClick={() => empty()}
            className="bg-designColor w-full mt-4 p-3 text-white opacity-80 hover:opacity-100 duration-500"
          >
            Remove all
          </button>
        </section>

        {data?.data?.length === 0 ? (
          <div className=" flex-1  flex-col gap-6 text-center">
            <p className=" mt-5 font-serif md:text-9xl text-4xl text-designColor">
              Oops !{" "}
            </p>
            <p className=" mt-5 text-2xl font-titlefont ">Servise not found</p>
            <p className="mt-8 text-white" onClick={() => empty()}>
              <span className="  bg-blue-600 uppercase p-2 text-sm opacity-90 hover:opacity-100 ">
                see all servise{" "}
              </span>
            </p>
          </div>
        ) : (
          <section className="flex-1 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 h-auto">
              {data?.data?.slice(0, visibleItems).map((item: any) => (
                <div
                  className="border md:h-[350px] md:overflow-y-auto flex flex-col gap-4 relative overflow-hidden group"
                  key={item._id}
                >
                  <img
                    className="w-full h-60 transition-transform duration-300 ease-in-out group-hover:scale-110"
                    src={item.image}
                    alt=""
                  />
                  <div className="flex flex-col justify-start px-3 md:pb-0 pb-2 gap-2">
                    <p className="font-bodyfont text-designColor">
                      {item.name} /{" "}
                      <small className="text-sm text-black font-titlefont">
                        price : {item.price} $
                      </small>
                    </p>
                    <p className="font-titlefont text-sm">
                      Duration Time {item.duration} minutes
                    </p>
                    <p className="font-titlefont text-xs">{item.description}</p>
                  </div>

                  {/* View Details Button */}
                  <Link
                    to="/servise-details"
                    className="absolute bottom-0 left-0 right-0 bg-designColor text-white py-2 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                  >
                    <p
                      className="text-center"
                      onClick={() => serviseId(item._id)}
                    >
                      View Details
                    </p>
                  </Link>
                </div>
              ))}
            </div>

            {/* Show More/Show Less Button */}
            <div className="w-full flex justify-center mt-4">
              {visibleItems < data?.data?.length ? (
                <button
                  className=" text-black border  py-2 px-4 hover:font-bodyfont duration-500 "
                  onClick={showMoreItems}
                >
                  Show More ...
                </button>
              ) : (
                <button
                  className="text-black border  py-2 px-4 hover:font-bodyfont duration-500 "
                  onClick={showLessItems}
                >
                  Show Less
                </button>
              )}
            </div>
          </section>
        )}
      </section>
    </main>
  );
};

export default Servise;
