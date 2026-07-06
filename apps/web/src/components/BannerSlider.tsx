import Slider from "react-slick";
import { Image } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/** Ported from the original kpopschool/src/Page/CS/Home.js SimpleSlider. */
export function BannerSlider({ images }: { images: string[] }) {
  // react-slick's infinite-loop mode clones slides to fake the wraparound —
  // with a single image that clone renders as a second, visibly duplicated
  // copy directly below the real one instead of off-screen. infinite/autoplay
  // only make sense with more than one slide anyway.
  const hasMultipleSlides = images.length > 1;
  const settings = {
    infinite: hasMultipleSlides,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: hasMultipleSlides,
    autoplaySpeed: 4000,
  };

  return (
    <Slider {...settings}>
      {images.map((src) => (
        <Image key={src} src={src} alt="" borderRadius="20px" w="full" />
      ))}
    </Slider>
  );
}
