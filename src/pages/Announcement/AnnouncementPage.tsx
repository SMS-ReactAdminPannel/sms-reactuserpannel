import { useEffect} from 'react';
import Offer from '../../components/Announcement/Offer';

const Announcement = () => {
	// const [isLoading, setIsLoading] = useState(true);

	const fetchAllOffers = async () => {
		try {
			// setIsLoading(false);
		} catch (error) {
			console.log(error);
		} finally {
			// setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchAllOffers();
	}, []);

	// if (isLoading) {
	// 	return (
	// 		<div className='min-h-screen bg-gray-50 flex items-center justify-center flex-col gap-2'>
	// 			<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500'></div>
	// 			<p className='text-red-500 text-lg font-semibold'>Loading...</p>
	// 		</div>
	// 	);
	// }
	return (
		<div style={{ textAlign: 'center', padding: '30px' }}>
			<Offer />
		</div>
	);
};

export default Announcement;
