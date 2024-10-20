import { useState } from "react";
import backpack from "../assets/backpack.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [toggleMore, setToggleMore] = useState<boolean>(false);
  return (
    <div className="flex mt-4 mx-4 text-white justify-between font-[600] text-[14px]">
      <div className="flex min-w-[375px] justify-between items-center ">
        <Link
          className="text-white flex font-[600] text-[18px] items-center"
          to={"/"}
        >
          <img src={backpack} alt="" />
          Backpack
        </Link>
        <Link to={"/"}>Markets</Link>
        <Link className="text-gray-400" to={"/"}>
          Spot
        </Link>
        <button className="text-gray-400 relative">
          <button
            className="flex items-center"
            onClick={() => setToggleMore(!toggleMore)}
          >
            More{" "}
            <ion-icon
              size=""
              name={`chevron-${toggleMore == true ? "up" : "down"}-outline`}
            ></ion-icon>
          </button>{" "}
          <div
            className={`absolute grid layout top-10 bg-[#131418] left-[-40px] ${
              !toggleMore && "hidden"
            }`}
          >
            <button className="flex flex-col gap-1">
              <div className="flex gap-1 text-white">
                <ion-icon size="small" name="school-outline"></ion-icon>
                Learn{" "}
                <span>
                  <ion-icon size="small" name="log-out-outline"></ion-icon>
                </span>
              </div>
              <h1 className="text-[12px] relative left-6">
                Find out more about crypto
              </h1>
            </button>
            <button className="flex flex-col gap-1">
              <div className="flex gap-1 text-white">
                <ion-icon size="small" name="help-circle-outline"></ion-icon>{" "}
                Support{" "}
                <span>
                  <ion-icon size="small" name="log-out-outline"></ion-icon>
                </span>
              </div>
              <h1 className="text-[12px] relative left-6">
                Find answers & get help
              </h1>
            </button>
            <button className="flex flex-col gap-1">
              <div className="flex gap-1 text-white">
                <ion-icon size="small" name="document-text-outline"></ion-icon>{" "}
                Documentation{" "}
                <span>
                  <ion-icon size="small" name="log-out-outline"></ion-icon>
                </span>
              </div>
              <h1 className="text-[12px] relative left-6">API documentation</h1>
            </button>
            <button className="flex flex-col">
              <div className="flex gap-1 text-white">
                <ion-icon size="small" name="download-outline"></ion-icon>{" "}
                Download{" "}
                <span>
                  <ion-icon size="small" name="log-out-outline"></ion-icon>
                </span>
              </div>
              <h1 className="text-[12px] relative left-6">
                Apps and browser extension
              </h1>
            </button>
          </div>
        </button>
      </div>
      <div className="flex min-w-[150px] justify-between">
        <Link
          to={""}
          className="bg-[rgba(0,194,120,.16)] px-2 py-1 rounded-xl text-[rgba(0,194,120)]"
        >
          Sign Up
        </Link>
        <Link
          to={""}
          className="bg-[rgba(76,148,255,.16)] px-2 py-1 rounded-xl text-[rgba(76,148,255)]"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
