import type React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';
import {
	Search,
	Package,
	Wrench,
	CheckCircle,
	Calendar,
	Truck,
	Clock,
	MapPin,
} from 'lucide-react';
import bgImage from '../../assets/checkout-bg_1_.png';
import { getBookingAll } from '../../features/Bookings/service';

interface OrderDetails {
	id: string;
	uuid: string;
	name: string;
	imageUrl?: string;
	description?: string;
	date: string;
	price: number;
	status: 'pending' | 'completed' | 'delivered';
	type: 'spare' | 'service';
	products?: Array<{
		productId: {
			_id: string;
			productName: string;
			price: string;
			slug: string;
			brand: string;
		} | null;
		quantity: number;
		price: string;
		_id: string;
	}>;
	services?: Array<{
		service_name: string;
		description: string;
		price: number;
		uuid: string;
		_id: string;
	}>;
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

// OrderCard Component
interface OrderCardProps {
	order: OrderDetails;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
	const orderDate = new Date(order.date);
	const isCompleted =
		order.status === 'completed' || order.status === 'delivered';
	const isOld = orderDate < new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

	// Determine if it's a service or product order
	const isService = order.type === 'service';
	const items = isService ? order.services : order.products;
	const firstItem = items?.[0];

	// Get name and description based on order type
	const getName = () => {
		if (isService) {
			return order.services?.[0]?.service_name || 'Service Order';
		}
		return order.products?.[0]?.productId?.productName || 'Product Order';
	};

	const getDescription = () => {
		if (isService) {
			return order.services?.[0]?.description || 'Service appointment';
		}
		return `Order containing ${order.products?.length || 0} items`;
	};

	const getPrice = () => {
		return isService
			? order.services?.reduce((sum, service) => sum + (service.price || 0), 0)
			: order.products?.reduce(
					(sum, product) => sum + parseInt(product.price) * product.quantity,
					0
			  );
	};

	return (
		<div className='opacity-90 rounded-2xl shadow-lg-red-300 border max-w-6xl mx-auto border-red-800 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-red-300'>
			<div className='flex flex-col'>
				<div className='flex flex-row'>
					{/* Image Section */}
					<div className='md:w-48 h-48 md:h-auto relative overflow-hidden rounded-lg shadow-md'>
						{/* Placeholder image since API doesn't provide images */}
						<div className='w-full h-full bg-red-100 flex items-center justify-center'>
							{isService ? (
								<Wrench className='w-16 h-16 text-gray-400' />
							) : (
								<Package className='w-16 h-16 text-gray-400' />
							)}
						</div>

						{/* Type badge (top-left) */}
						<div className='absolute top-3 left-3 z-10'>
							<span
								className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
									isService
										? 'bg-purple-100 text-purple-800'
										: 'bg-blue-100 text-blue-800'
								}`}
							>
								{isService ? (
									<>
										<Wrench className='w-3 h-3 mr-1' />
										Service
									</>
								) : (
									<>
										<Package className='w-3 h-3 mr-1' />
										Product
									</>
								)}
							</span>
						</div>

						{/* Status badge (top-right) */}
						{/* <div className='absolute top-3 right-3 z-10'>
							<span
								className={`px-2 py-1 text-xs font-medium rounded-full ${
									isCompleted
										? 'bg-green-100 text-green-700'
										: 'bg-orange-100 text-orange-700'
								}`}
							>
								{order.status || (isCompleted ? 'Completed' : 'Pending')}
							</span>
						</div> */}
					</div>

					{/* Content Section */}
					<div className='flex-1 p-6'>
						<div className='flex flex-col h-full'>
							{/* Header */}
							<div className='flex justify-between'>
								{/* name and description */}
								<div>
									<div>
										<h3 className='text-xl font-bold text-red-900 mb-1'>
											{getName()}
										</h3>
										<p className='text-red-700 text-sm leading-relaxed'>
											{getDescription()}
										</p>
									</div>
									<div>
										{/* Date Section */}
										<div className='flex items-center text-sm text-red-700'>
											<Calendar className='w-4 h-4 text-red-800 mr-2' />
											<span>
												{orderDate.toLocaleDateString('en-US', {
													year: 'numeric',
													month: 'long',
													day: 'numeric',
												})}
											</span>
										</div>
									</div>
								</div>
								<div>
									<div className='text-2xl font-bold text-gray-900'>
										₹{getPrice().toLocaleString()}
									</div>
									{isOld && (
										<span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block'>
											Old Order
										</span>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Actions */}
				<div className='flex items-center justify-between p-2'>
					<div className='flex items-center space-x-4'>
						{isCompleted ? (
							<div className='flex items-center text-green-600 text-sm font-medium'>
								<CheckCircle className='w-4 h-4 mr-1' />
								Completed
							</div>
						) : (
							<div className='flex items-center text-orange-600 text-sm font-medium'>
								<Clock className='w-4 h-4 mr-1' />
								{order.status || 'Pending'}
							</div>
						)}
					</div>

					<div className='flex space-x-2'>
						<button className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors'>
							View Details
						</button>

						{/* {isService && (
							<button className='px-4 py-2 text-sm font-medium text-white bg-[#9b111e] rounded-lg hover:from-red-200 hover:to-red-100 transition-all duration-200 shadow-sm hover:shadow-md'>
								<Truck className='w-4 h-4 mr-1 inline' />
								Track Order
							</button>
						)} */}
					</div>
				</div>
			</div>
		</div>
	);
};

const OrdersPage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [filterType, setFilterType] = useState<'all' | 'spare' | 'service'>(
		'all'
	);
	const [sortBy, setSortBy] = useState<'date' | 'price' | 'name'>('date');
	const [orders, setOrders] = useState<OrderDetails[]>([]);
	const orderTitle = useScrollAnimation<HTMLHeadingElement>();

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await getBookingAll({});
				console.log('Fetched orders:', response);
				if (response?.data) {
					const transformedOrders = [
						...(response.data.productConfirm?.map((productOrder: any) => ({
							id: productOrder._id,
							uuid: productOrder.uuid,
							name:
								productOrder.products?.[0]?.productId?.productName ||
								'Product Order',
							date: productOrder.confirm_Date,
							price: productOrder.amount,
							status: productOrder.status,
							type: 'spare',
							products: productOrder.products,
						})) || []),

						...(response.data.serviceConfirm?.map((serviceOrder: any) => ({
							id: serviceOrder._id,
							uuid: serviceOrder.uuid,
							name: serviceOrder.services?.[0]?.service_name || 'Service Order',
							description: serviceOrder.services?.[0]?.description,
							date: serviceOrder.confirm_Date,
							price: serviceOrder.amount,
							status: serviceOrder.status,
							type: 'service',
							services: serviceOrder.services,
						})) || []),
					];

					setOrders(transformedOrders);
				}
			} catch (err) {
				console.error('Error fetching orders:', err);
			}
		};

		fetchOrders();
	}, []);

	const filteredOrders = useMemo(() => {
		return orders
			.filter((order) => {
				const matchesSearch =
					order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					(order.description &&
						order.description.toLowerCase().includes(searchTerm.toLowerCase()));
				const matchesType = filterType === 'all' || order.type === filterType;
				return matchesSearch && matchesType;
			})
			.sort((a, b) => {
				switch (sortBy) {
					case 'date':
						return new Date(b.date).getTime() - new Date(a.date).getTime();
					case 'price':
						return b.price - a.price;
					case 'name':
						return a.name.localeCompare(b.name);
					default:
						return 0;
				}
			});
	}, [orders, searchTerm, filterType, sortBy]);

	const totalOrders = filteredOrders.length;
	const completedOrders = filteredOrders.filter(
		(order) => order.status === 'completed' || order.status === 'delivered'
	).length;

	return (
		<div
			className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100'
			style={{ backgroundImage: `url("${bgImage}")` }}
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header */}
				<div className='mb-8'>
					<h1 className='text-center' ref={orderTitle.elementRef}>
						<span className='inline-block pb-1 relative text-4xl font-bold text-red-900 mb-2'>
							My Orders
							<span
								className={`absolute top-12 left-1/2 h-[1px] bg-[#9b111e] transform -translate-x-1/2 origin-center transition-all duration-700 ${
									orderTitle.isVisible
										? 'scale-x-100 w-full'
										: 'scale-x-0 w-full'
								}`}
							></span>
						</span>
					</h1>
					<p className='text-red-600 text-lg max-w-6xl mx-auto'>
						Track and manage all your orders in one place
					</p>

					{/* Stats */}
					<div className='flex space-x-6 mt-4 max-w-6xl mx-auto text-[#9b111e]'>
						<div className='bg-white rounded-lg px-4 py-2 shadow-sm border'>
							<span className='text-2xl font-bold text-gray-900'>
								{totalOrders}
							</span>
							<span className=' ml-2'>Total Orders</span>
						</div>
						<div className='bg-white rounded-lg px-4 py-2 shadow-sm border'>
							<span className='text-2xl font-bold text-green-600'>
								{completedOrders}
							</span>
							<span className=' ml-2'>Completed</span>
						</div>
						<div className='bg-white rounded-lg px-4 py-2 shadow-sm border'>
							<span className='text-2xl font-bold text-orange-600'>
								{totalOrders - completedOrders}
							</span>
							<span className=' ml-2'>In Progress</span>
						</div>
					</div>
				</div>

				{/* Filters and Search */}
				<div className='bg-[#FAF3EB] rounded-2xl shadow-sm max-w-6xl mx-auto border border-gray-100 p-6 mb-8'>
					<div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
						{/* Search */}
						<div className='relative flex-1 max-w-md'>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
							<input
								type='text'
								value={searchTerm}
								placeholder='Search orders...'
								onChange={(e) => setSearchTerm(e.target.value)}
								className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all'
							/>
						</div>

						{/* Filters */}
						<div className='flex flex-wrap gap-3'>
							{/* Filter Buttons */}
							<div className='flex bg-gray-100 rounded-xl p-1'>
								<button
									onClick={() => setFilterType('all')}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
										filterType === 'all'
											? 'bg-white text-gray-900 shadow-sm'
											: 'text-gray-600 hover:text-gray-900'
									}`}
								>
									All Orders
								</button>
								<button
									onClick={() => setFilterType('spare')}
									className={`px-4 py-2 rounded-lg  text-sm font-medium transition-all flex items-center ${
										filterType === 'spare'
											? 'bg-white text-gray-900 shadow-sm'
											: 'text-gray-600 hover:text-gray-900'
									}`}
								>
									<Package className='w-4 h-4 mr-1' />
									Spare Parts
								</button>
								<button
									onClick={() => setFilterType('service')}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
										filterType === 'service'
											? 'bg-white text-gray-900 shadow-sm'
											: 'text-gray-600 hover:text-gray-900'
									}`}
								>
									<Wrench className='w-4 h-4 mr-1' />
									Services
								</button>
							</div>

							{/* Sort Dropdown */}
							<select
								value={sortBy}
								onChange={(e) =>
									setSortBy(e.target.value as 'date' | 'price' | 'name')
								}
								className='px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-smpx-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-gray-600 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm'
							>
								<option value='date'>Sort by Date</option>
								<option value='price'>Sort by Price</option>
								<option value='name'>Sort by Name</option>
							</select>

							{/* Reset Button */}
							<button
								onClick={() => {
									setSearchTerm('');
									setFilterType('all');
									setSortBy('date');
								}}
								className='ml-[400px] px-4 py-1 text-gray-500 rounded-xl hover:text-white hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm'
							>
								Reset Filters
							</button>
						</div>
					</div>
				</div>

				{/* Orders List */}
				<div className='space-y-6'>
					{filteredOrders.length > 0 ? (
						filteredOrders.map((order) => (
							<OrderCard key={order.id} order={order} />
						))
					) : (
						<div className='text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100'>
							<Package className='h-16 w-16 text-gray-400 mx-auto mb-4' />
							<h3 className='text-xl font-semibold text-gray-900 mb-2'>
								No orders found
							</h3>
							<p className='text-gray-600 max-w-md mx-auto'>
								Try adjusting your search terms or filters to find what you're
								looking for.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default OrdersPage;
