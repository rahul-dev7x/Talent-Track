import { GrSearch } from "react-icons/gr"
import {Button} from "@/components/ui/button"


const HeroSection = () => {
  return (
    <div className="mt-32 text-center">
      <div className="flex flex-col gap-8 my-6">
<span className="bg-gray-100 mx-auto px-4 py-2 rounded-lg font-medium text-[#f11919]">
  No 1 Job Application
</span>
<h1 className="text-5xl font-bold">Search,Apply & <br/>Get Your <span className="text-[#121dff]">Dream Jobs</span></h1>
   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi rerum eius minus.</p>  
     <div className="flex pl-3 w-[40%] mx-auto shadow-lg rounded-full border border-gray-200">
      <input type="text" placeholder="Find Your Dream Jobs here" className="outline-none border-none w-full"/>
     <Button className="rounded-r-full bg-gray-300"><GrSearch className="h-5 w-5"/></Button>
     </div>
      </div>
    </div>
  )
}

export default HeroSection
