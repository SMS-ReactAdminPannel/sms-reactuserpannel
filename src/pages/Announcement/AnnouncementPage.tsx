import { useEffect, useState } from 'react';
import Offer from '../../components/Announcement/Offer';
import { getOfferData } from '../../features/Offers';

const Announcement = () => {
	const [announcements, setAnnouncements] = useState([]);

	const fetchAllOffers = async () => {
		try {
			const response = (await getOfferData()) as any;
			if (response) {
				setAnnouncements(response.data.data);
			}
		} catch (error) {
			console.error('Error fetching service data:', error);
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
			<Offer announcements={announcements} />
		</div>
	);
};

export default Announcement;
