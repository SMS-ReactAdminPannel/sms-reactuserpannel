import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCity, setSelectedCity] = useState('Select City');
	const dropdownRef = useRef<HTMLDivElement>(null);

	const cities = ['Chennai', 'Coimbatore', 'Madurai'];

	const toggleDropdown = () => setIsOpen((prev) => !prev);

	const selectCity = (city: string) => {
		setSelectedCity(city);
		setIsOpen(false);
	};

	// Close dropdown if clicked outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div ref={dropdownRef} className='relative inline-block w-40'>
			<button
				onClick={toggleDropdown}
				className='w-full flex justify-between items-center px-4 py-2 text-red-900 font-semibold bg-white  rounded shadow cursor-pointer'
			>
				<span>{selectedCity}</span>
				<svg
					className='w-4 h-4 ml-2 text-red-700'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M19 9l-7 7-7-7'
					/>
				</svg>
			</button>

			{isOpen && (
				<div className='absolute z-10 mt-1 w-full rounded shadow-lg'>
					{cities.map((city) => (
						<div
							key={city}
							onClick={() => selectCity(city)}
							className='px-4 py-2 text-white font-semibold bg-red-900 hover:bg-red-100 hover:text-red-900 cursor-pointer'
						>
							{city}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default CustomDropdown;
