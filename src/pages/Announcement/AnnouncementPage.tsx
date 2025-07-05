import { useEffect, useState } from 'react';
import Offer from '../../components/Announcement/Offer';
import HttpClient from '../../api/httpClient';
import { API_END_POINTS } from '../../api/httpEndpoints';

const Announcement = () => {
	const [announcements, setAnnouncements] = useState([]);

	const fetchAllOffers = async () => {
		try {
			const response = (await HttpClient.get(API_END_POINTS.offer.Get)) as any;
			const dataToSet = response.data?.data || [];
			setAnnouncements(dataToSet);
		} catch (error) {
			console.log('API Error:', error);
		}
	};

	useEffect(() => {
		fetchAllOffers();
	}, []);

	return (
		<div style={{ textAlign: 'center', padding: '30px' }}>
			<Offer announcements={announcements} />
		</div>
	);
};

export default Announcement;
