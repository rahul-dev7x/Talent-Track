import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const carouselItem = [
  "Backend Developer",
  "FullStack Developer",
  "Software Engineer",
  "Devops Engineer",
];

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="max-w-xl mx-auto w-full my-20">
        <CarouselContent className="">
          {carouselItem.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
              {item}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
