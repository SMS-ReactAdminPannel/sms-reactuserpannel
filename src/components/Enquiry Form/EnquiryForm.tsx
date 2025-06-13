import { useEffect, useState } from 'react';
import { getEnquiryData, postEnquiryData } from '../../features/Enquiry/service';

const EnquiryForm = () => {
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		phoneNumber: '',
		carModel: '',
		ServiceType: 'general',
		yourEnquiry: '',
		Date: '',
	});

	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Form submitted:', formData);
		try{
		setSubmitted(true);
		setFormData({
			fullName: '',
			email: '',
			phoneNumber: '',
			carModel: '',
			ServiceType: '',
			yourEnquiry: '',
			Date: '',
		});
		const response = await postEnquiryData(formData)
		console.log("post Enquiry Data : ",response )
	}
	catch(error){
		console.log('Data not send : ', error);
	}

		// Reset submission status after 5 seconds
		setTimeout(() => setSubmitted(false), 5000);
	};

	// Get Enquiry data 

	const getEnquiryDatas = async () => {
		try{
			const data = {}
			const response = await getEnquiryData(data);
			console.log('Data from form submission',response);
		}
		catch(error){
			console.log(error)
		}
	}

	useEffect(() => {
		getEnquiryDatas();
	},[])


	return (
		<div className='w-2/3 mx-auto p-6 bg-white rounded-lg shadow-md'>
			<h2 className='text-2xl font-bold text-red-900 mb-6 text-center'>
				Service Enquiry Form
			</h2>

			{submitted && (
				<div className='mb-4 p-4 bg-green-100 text-green-700 rounded'>
					Thank you! Your enquiry has been submitted. We'll contact you shortly.
				</div>
			)}

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label
						htmlFor='name'
						className='block text-sm font-medium text-red-700'
					>
						Full Name *
					</label>
					<input
						type='text'
						id='name'
						name='fullName'
						value={formData.fullName}
						onChange={handleChange}
						required
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500'
					/>
				</div>

				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-red-700'
					>
						Email *
					</label>
					<input
						type='email'
						id='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						required
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500'
					/>
				</div>

				<div>
					<label
						htmlFor='phone'
						className='block text-sm font-medium text-red-700'
					>
						Phone Number *
					</label>
					<input
						type='number'
						id='phone'
						name='phoneNumber'
						value={formData.phoneNumber}
						onChange={handleChange}
						maxLength={10}
						required
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500'
					/>
				</div>

				<div>
					<label
						htmlFor='carModel'
						className='block text-sm font-medium text-red-700'
					>
						Car Model *
					</label>
					<input
						type='text'
						id='carModel'
						name='carModel'
						value={formData.carModel}
						onChange={handleChange}
						required
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500'
					/>
				</div>

				<div>
					<label
						htmlFor='serviceType'
						className='block text-sm font-medium text-red-700'
					>
						Service Type *
					</label>
					<select
						id='serviceType'
						name='ServiceType'
						value={formData.ServiceType}
						onChange={handleChange}
						className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 rounded-md'
					>
						<option value='general'>General Service</option>
						<option value='oil'>Oil Change</option>
						<option value='brakes'>Brake Service</option>
						<option value='battery'>Battery Replacement</option>
						<option value='ac'>AC Repair</option>
						<option value='other'>Other</option>
					</select>
				</div>

				<div>
					<label
						htmlFor='preferredDate'
						className='block text-sm font-medium text-red-700'
					>
						Preferred Service Date
					</label>
					<input
						type='date'
						id='preferredDate'
						name='Date'
						value={formData.Date}
						onChange={handleChange}
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500'
					/>
				</div>

				<div>
					<label
						htmlFor='enquiry'
						className='block text-sm font-medium text-red-700'
					>
						Your Enquiry *
					</label>
					<textarea
						id='enquiry'
						name='yourEnquiry'
						rows={4}
						value={formData.yourEnquiry}
						onChange={handleChange}
						required
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500'
					/>
				</div>

				<div className='flex justify-center space-x-4 mt-6'>
					<button
						type='submit'
						className='w-1/5 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700'
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default EnquiryForm;
