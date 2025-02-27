import { Button } from "@/components/ui/button";

const LatestJobCards = () => {
  return (
    <div className="p-4 rounded-lg shadow-lg border bg-white  border-gray-100 cursor-pointer transition delay-150 duration-300 ease-in-out hover:scale-110 hover:-translate-y-1 ">
      <div>
        <h1 className="font-medium text-lg">Winspire</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold my-2 text-lg">Software Developer</h1>
        <p className="text-smtext-gray-500">Want A Full Stack Dev</p>
      </div>
      <div>
        <Button
          variant="ghost"
          className="text-yellow-500 font-bold shadow-lg "
        >
          12 Positions
        </Button>
        <Button variant="ghost" className="text-blue-700 font-bold shadow-lg ">
          Full Time
        </Button>
        <Button variant="ghost" className="text-red-700 font-bold shadow-lg ">
          12 LPA
        </Button>
      </div>
    </div>
  );
};

export default LatestJobCards;
