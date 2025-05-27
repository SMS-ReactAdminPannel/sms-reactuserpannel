import { ImageCarousel } from '../../components/home/ImageCarousel';
import image1 from "../../assets/home/360_F_496483060_C9OG1wJpfmjMXcNmUBibmA9wYxxZCxnW.jpg"
import image2 from "../../assets/home/360_F_507812981_dGZXqBsqkBpEosDjTlJgmaJAyMFra7sp.jpg"
import image3 from "../../assets/home/hand-mechanic-holding-car-service-600nw-2340377479.webp"
import image4 from "../../assets/home/istockphoto-1387759698-612x612.jpg"

const imageUrls = [
	image1,
	image2,
	image3,
	image4
];

const HomePage = () => {
	return (
		<>
			<ImageCarousel images={imageUrls} interval={2000} />
		</>
	);
};

export default HomePage;
