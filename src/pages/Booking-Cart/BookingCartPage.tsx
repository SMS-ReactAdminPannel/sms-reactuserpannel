import { useEffect, useState, useRef } from 'react';
import { Plus, Minus, X, Wrench, Car } from 'lucide-react';
import {
	booking_cart,
	postBookingProduct,
} from '../../features/BookingCart/service';
import { toast } from 'react-toastify';
import bgImage from '../../assets/checkout-bg_1_.png';
import { postBookingService } from '../../features/Bookings/service';

interface spare {
	_id: number;
	productName: string;
	price: number;
	brand: string;
	image: string;
	quantity: number;
	category: string;
	description: string;
	stock: number;
}

interface service {
	_id: number;
	service_name: string;
	price: number;
	description: string;
}

const useScrollAnimation = <T extends HTMLElement = HTMLElement>(
	options = {}
) => {
	const [isVisible, setIsVisible] = useState(false);
	const elementRef = useRef<T>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px',
				...options,
			}
		);

		if (elementRef.current) {
			observer.observe(elementRef.current);
		}

		return () => {
			if (elementRef.current) {
				observer.unobserve(elementRef.current);
			}
		};
	}, []);

	return { elementRef, isVisible };
};

// Main Component
export default function SparePartsCart() {
	const [books, setBooks] = useState<spare[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<'service' | 'ServiceBookingPage'>(
		'service'
	);

	const [services, setServices] = useState<service[]>([]);
	const [confirmedPartOrders, setConfirmedPartOrders] = useState<
		{ part: spare; quantity: number }[]
	>([]);
	const [confirmedServiceOrders, setConfirmedServiceOrders] = useState<
		{ serv: service; quantity: number }[]
	>([]);
	const [showSummary, setShowSummary] = useState(false);
	const [showsSummary, setShowsSummary] = useState(false);
	const [cartId, setCartId] = useState<string>('');
	const [serviceId, setServiceCartId] = useState<string>('');
	const totalPartPrice = confirmedPartOrders.reduce(
		(acc, cur) => acc + cur.part.price * cur.quantity,
		0
	);
	const totalServicePrice = confirmedServiceOrders.reduce(
		(acc, cur) => acc + cur.serv.price * cur.quantity,
		0
	);

	// text-line animation
	const cartTitle = useScrollAnimation<HTMLHeadingElement>();

	const books_valid = async () => {
		try {
			const response = await booking_cart({});
			const cartData = response?.data?.data;

			if (!Array.isArray(cartData)) return;
			const spareEntry = cartData.find((item) => item.type === 'spare');
			const cartId = spareEntry._id;
			setCartId(cartId);

			if (spareEntry?.products) {
				const spares = spareEntry.products.map(
					(product: any): spare => ({
						_id: product._id || 0,
						productName: product.productId?.productName || 'Unknown',
						price: Number(product.price) || 0,
						brand: product.productId?.brand || 'Generic',
						image: product.productId?.image || '',
						quantity: Number(product.quantity) || 1,
						category: product.productId?.category || '',
						description: product.productId?.description || '',
						stock: Number(product.productId?.stock) || 0,
					})
				);
				setBooks(spares);
			}

			const serviceEntry = cartData.find((item) => item.type === 'service');
			const serviceId = serviceEntry._id;
			setServiceCartId(serviceId);

			if (serviceEntry?.services) {
				const mappedServices = serviceEntry.services.map(
					(service: any): service => ({
						_id: service._id || '0',
						service_name: service.service_name || 'Unknown',
						price: Number(service.price) || 0,
						description: service.description || '',
					})
				);
				setServices(mappedServices);
			}
		} catch (error) {
			console.error('Error fetching books/services', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		books_valid();
		setActiveTab('ServiceBookingPage');
	}, []);

	// handle Place Order function
	const placeOrder = async () => {
		try {
			const payload = {
				cartId: cartId,
			};

			const response = await postBookingProduct(payload);
			if (response) {
				toast.success('Order placed successfully!', { autoClose: 2000 });
				setConfirmedPartOrders([]);
			}
		} catch (error) {
			console.error('Order placement error:', {
				error: error.message,
				response: error.response?.data,
			});
			toast.error(error.response?.data?.message || 'Failed to place order');
		} finally {
			setLoading(false);
		}
	};

	// Service Order post
	const placeServiceOrder = async () => {
		try {
			const payload = {
				cartId: serviceId,
			};
			const response = await postBookingService(payload);
			if (response) {
				toast.success('Order placed successfully!', { autoClose: 2000 });
				setConfirmedPartOrders([]);
			}
		} catch (error) {
			console.error('Order placement error:', error);
			toast.error(error.response?.data?.message || 'Failed to place order');
		} finally {
			setLoading(false);
		}
	};

	const handleConfirmPart = (product_id: number, quantity: number) => {
		const part = books.find((p) => p._id === product_id);
		if (part) {
			setConfirmedPartOrders((prev) => [...prev, { part, quantity }]);
			setShowSummary(true);
		}
	};

	const handleConfirmService = (serviceId: number, quantity: number) => {
		const serv = services.find((s) => s._id === serviceId);
		if (serv) {
			setConfirmedServiceOrders((prev) => [...prev, { serv, quantity }]);
			setShowsSummary(true);
		}
	};

	const handleDelete = (id: number) => {
		setBooks((prev) => prev.filter((p) => p._id !== id));
		setServices((prev) => prev.filter((s) => s._id !== id));
	};

	const filteredParts = books;
	const filteredServices = services;

	const SparePartCard = ({ part }: { part: spare }) => {
		const [quantity, setQuantity] = useState(part.quantity || 1);

		return (
			<div className='rounded-lg shadow-md max-w-6xl mx-auto p-4 mb-4 border border-gray-200 bg-white'>
				<div className='flex gap-4'>
					<div className='w-36'>
						<img
							src={
								part.image
									? part.image
									: 'https://boodmo.com/media/cache/catalog_part/images/parts/3fe3e3713e19d66a47bae04233a97cf4.webp'
							}
							alt={part.productName}
							className='rounded-lg object-cover w-full h-full'
						/>

						{part.discount > 0 && (
							<span className='absolute-top-2-right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold'>
								{part.discount}%OFF
							</span>
						)}
					</div>
					<div className='flex-1'>
						<div className='flex justify-between items-start mb-2'>
							<h3 className='text-lg font-semibold'>{part.productName}</h3>
							<span
								className={`px-2 py-1 text-xs rounded-full ${
									part.stock
										? 'bg-green-100 text-green-800'
										: 'bg-gray-100 text-gray-800'
								}`}
							>
								{part.stock ? 'In Stock' : 'Out of Stock'}
							</span>
						</div>
						<p className='text-sm text-gray-600'>
							{part.description ||
								'High quality ceramic brake pads for safe and smooth breaking'}
						</p>
						<div className='flex items-center justify-between mt-4'>
							<div className='flex items-center gap-2'>
								<span className='text-xl font-bold text-red-600'>
									₹{part.price}
								</span>
								<span className='line-through text-sm text-gray-500'>
									₹{Math.round(part.price * 1.3)}
								</span>
							</div>
							<div className='flex items-center gap-2'>
								<button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
									<Minus size={16} />
								</button>
								<span>{quantity}</span>
								<button onClick={() => setQuantity(quantity + 1)}>
									<Plus size={16} />
								</button>
								<button
									onClick={() => handleConfirmPart(part._id, quantity)}
									className='bg-red-600 text-white px-3 py-1 rounded-lg'
								>
									Confirm
								</button>
								<button onClick={() => handleDelete(part._id)}>
									<X className='text-red-600' />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const ServiceCard = ({ serv }: { serv: service }) => {
		const [quantity, setQuantity] = useState(1);

		return (
			<div className='bg-white rounded-lg shadow-md p-4 mb-4 border'>
				<div className='flex gap-4'>
					<div className='w-48'></div>
					<div className='flex-1 '>
						<div className='flex justify-between'>
							<h3 className='text-lg font-semibold'>{serv.service_name}</h3>
						</div>
						<div className='flex justify-between items-center mt-4'>
							<div className='flex gap-2'>
								<span className='text-xl font-bold text-red-600'>
									₹{serv.price}
								</span>
								{serv.originalPrice > serv.price && (
									<span className='line-through text-sm text-gray-500'>
										₹{service.originalPrice}
									</span>
								)}
							</div>
							<div className='flex items-center gap-2'>
								<button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
									<Minus size={16} />
								</button>
								<span>{quantity}</span>
								<button onClick={() => setQuantity(quantity + 1)}>
									<Plus size={16} />
								</button>
								<button
									onClick={() => handleConfirmService(serv._id, quantity)}
									className='bg-red-600 text-white px-3 py-1 rounded-lg'
								>
									Confirm
								</button>
								<button onClick={() => handleDelete(serv._id)}>
									<X className='text-red-600' />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div
			className='min-h-screen p-6 bg-gray-100'
			style={{ backgroundImage: `url(${bgImage})` }}
		>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<h1 ref={cartTitle.elementRef} className='text-center'>
					<span className='inline-block pb-1 relative text-3xl font-bold text-[#9b111e] mb-6'>
						My Cart
						<span
							className={`absolute top-11 left-1/2 h-[1px] bg-[#9b111e] transform -translate-x-1/2 origin-center transition-all duration-700 ${
								cartTitle.isVisible ? 'scale-x-100 w-full' : 'scale-x-0 w-full'
							}`}
						></span>
					</span>
				</h1>

				{/* Tabs */}
				<div className='mb-6 ml-[65px]'>
					<div className='relative inline-flex p-1 bg-[#FAF3EB] rounded-full border border-gray-300'>
						<button
							onClick={() => setActiveTab('service')}
							className={`px-6 py-3 rounded-full flex items-center gap-2 z-10 transition-colors duration-300 ${
								activeTab === 'service' ? 'text-white' : 'text-black '
							}`}
						>
							<Wrench className='text-lg' />
							SparePart Orders
						</button>

						<button
							onClick={() => setActiveTab('ServiceBookingPage')}
							className={`px-6 py-3 rounded-full flex items-center gap-2 z-10 transition-colors duration-300 ${
								activeTab === 'ServiceBookingPage'
									? 'text-white'
									: 'text-black '
							}`}
						>
							<Car className='text-xl' />
							Service Order
						</button>
						{/* Animated indicator with smooth sliding */}
						<div
							className={`absolute inset-y-1 h-[calc(100%-0.5rem)] bg-[#9b111e] rounded-full shadow-md transition-all duration-300 ease-in-out ${
								activeTab === 'service'
									? 'left-1 w-[calc(50%-0.25rem)]'
									: 'left-[calc(50%+0.25rem)] w-[calc(50%-0.25rem)]'
							}`}
						/>
					</div>
				</div>

				<div className='grid grid-cols-1 max-w-6xl mx-auto gap-6'>
					{/* Main Content */}
					<div className=''>
						{/* Service Page */}
						{activeTab === 'service' && (
							<div>
								{filteredParts.length > 0 ? (
									<div className='space-y-4'>
										{filteredParts.map((part) => (
											<SparePartCard key={part._id} part={part} />
										))}
									</div>
								) : (
									<div className='bg-white rounded-lg shadow-md p-8 text-center'>
										<p className='text-gray-500'>
											No spare parts found matching your criteria.
										</p>
									</div>
								)}
							</div>
						)}

						{/* Service Booking Page */}
						{activeTab === 'ServiceBookingPage' && (
							<div>
								{filteredServices.length > 0 ? (
									<div className='space-y-4'>
										{filteredServices.map((serv) => (
											<ServiceCard key={serv._id} serv={serv} />
										))}
									</div>
								) : (
									<div className='bg-white rounded-lg shadow-md p-8 text-center'>
										<p className='text-gray-500'>
											No services found matching your criteria.
										</p>
									</div>
								)}
							</div>
						)}
					</div>

					{/* Summary Sidebar */}
					<div className=''>
						{/* Parts Summary */}
						{confirmedPartOrders.length > 0 && showSummary && (
							<div className='bg-white rounded-lg shadow-md p-4 mb-6'>
								<div className='flex justify-between items-center mb-4'>
									<div>
										<h2 className='text-xl font-semibold text-red-600'>
											Summary
										</h2>
										<h3 className='text-base font-semibold text-red-600'>
											Confirmed Part Orders
										</h3>
									</div>
									<button
										onClick={() => setShowSummary(false)}
										className='px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors'
									>
										Close
									</button>
								</div>
								<div className='space-y-2 mb-4'>
									{confirmedPartOrders.map(({ part, quantity }) => (
										<div
											key={part._id}
											className='flex justify-between text-sm'
										>
											<span>
												{part.productName} x {quantity}
											</span>
											<span>₹{part.price * quantity}</span>
										</div>
									))}
								</div>
								<div className='border-t border-orange-200 pt-2 mb-4'>
									<div className='flex justify-between font-bold text-orange-700'>
										<span>Total</span>
										<span>₹{totalPartPrice}</span>
									</div>
								</div>
								<div className='flex justify-center'>
									<button
										type='submit'
										className='flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#9b111e] hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-6 py-2 overflow-hidden border-2 rounded-full group'
										onClick={async () => {
											try {
												if (confirmedPartOrders.length > 0) {
													await placeOrder();
												}
											} catch (error: any) {
												toast.error(error.message || 'Failed to place order');
											}
										}}
									>
										{' '}
										Place Order
									</button>
								</div>
							</div>
						)}

						{/* Services Summary */}
						{confirmedServiceOrders.length > 0 && showsSummary && (
							<div className='bg-white rounded-lg shadow-md p-4 '>
								<div className='flex justify-between items-center mb-4'>
									<div>
										<h2 className='text-xl font-semibold text-red-600'>
											Summary
										</h2>
										<h3 className='text-base font-semibold text-red-600'>
											Confirmed Part Orders
										</h3>
									</div>
									<button
										onClick={() => setShowsSummary(false)}
										className='px-3 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors'
									>
										Close
									</button>
								</div>

								<div className='space-y-2 mb-4'>
									{confirmedServiceOrders.map(({ serv, quantity }) => (
										<div
											key={serv._id}
											className='flex justify-between text-sm'
										>
											<span>
												{serv.service_name} x {quantity}
											</span>
											<span>₹{serv.price * quantity}</span>
										</div>
									))}
								</div>
								<div className='border-t border-orange-200 pt-2 mb-4'>
									<div className='flex justify-between font-bold text-orange-700'>
										<span>Total</span>
										<span>₹{totalServicePrice}</span>
									</div>
								</div>
								<div className='flex justify-center'>
									<button
										type='submit'
										className='flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#9b111e] hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-6 py-2 overflow-hidden border-2 rounded-full group'
										onClick={async () => {
											try {
												await placeServiceOrder();
											} catch (error: any) {
												toast.error(error.message || 'Failed to place order');
											}
										}}
									>
										{' '}
										Place Order
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
