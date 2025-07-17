import { useEffect, useState } from 'react';
import {
  getUserProfile,
  updateUserProfile,
} from '../../features/Profile/service';
import { toast } from 'react-toastify';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  contact_info: {
    city: string;
    state: string;
    phoneNumber: string;
    address1: string;
    address2: string;
    [key: string]: string;
  };
  vehicleInfo: {
    registerNumber: string;
    model: string;
    year: string;
    company: string;
    fuelType: string;
    [key: string]: string;
  };
  [key: string]: any;
}

interface Car {
  model: string;
  registerNumber: string;
}

const ProfilePage: React.FC = () => {
  const [isCarTab, setIsCarTab] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [profileData, setProfileData] = useState<any>({});
  const [editCarMode, setEditCarMode] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    image: '',
    contact_info: {
      city: '',
      state: '',
      phoneNumber: '',
      address1: '',
      address2: '',
    },
    vehicleInfo: {
      registerNumber: '',
      model: '',
      company: '',
      fuelType: '',
      year: '',
    },
  });

  const fetchUserProfile = async () => {
    try {
      const response: any = await getUserProfile({});
      if (response) {
        setFormData({
          firstName: response?.data?.data?.firstName,
          lastName: response?.data?.data?.lastName,
          email: response?.data?.data?.email,
          image: response?.data?.data?.image,
          contact_info: {
            city: response?.data?.data?.contact_info?.city,
            state: response?.data?.data?.contact_info?.state,
            phoneNumber: response?.data?.data?.contact_info?.phoneNumber,
            address1: response?.data?.data?.contact_info?.address1,
            address2: response?.data?.data?.contact_info?.address2,
          },
          vehicleInfo: {
            registerNumber: response?.data?.data?.vehicleInfo?.registerNumber,
            model: response?.data?.data?.vehicleInfo?.model,
            company: response?.data?.data?.vehicleInfo?.company,
            fuelType: response?.data?.data?.vehicleInfo?.fuelType,
            year: response?.data?.data?.vehicleInfo?.year,
          },
        });
        setProfileData(response?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const [cars, setCars] = useState<Car[]>([
    {
      model: '',
      registerNumber: '',
    },
  ]);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstName':
        return !value.trim() ? 'First name is required' : '';
      case 'lastName':
        return !value.trim() ? 'Last name is required' : '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return 'Invalid email format';
        return '';
      case 'contact_info.phoneNumber':
      case 'phoneNumber':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[6-9]\d{9}$/.test(value.replace(/\D/g, '')))
          return 'Invalid Indian phone number format';
        return '';
      case 'contact_info.address1':
      case 'address1':
        return !value.trim() ? 'Address is required' : '';
      case 'contact_info.address2':
      case 'address2':
        return !value.trim() ? 'Address 2 is required' : '';
      case 'contact_info.city':
      case 'city':
        return !value.trim() ? 'City is required' : '';
      case 'contact_info.state':
      case 'state':
        return !value.trim() ? 'State is required' : '';
      case 'vehicleInfo.registerNumber':
        return !value.trim() ? 'Register number is required' : '';
      case 'vehicleInfo.model':
        return !value.trim() ? 'Model is required' : '';
      case 'vehicleInfo.company':
        return !value.trim() ? 'Company is required' : '';
      case 'vehicleInfo.fuelType':
        return !value.trim() ? 'Fuel type is required' : '';
      case 'vehicleInfo.year':
        return !value.trim() ? 'Year is required' : '';
      default:
        return '';
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });

    const error = validateField(name, value);
    setValidationErrors((prev) => ({ ...prev, [name]: error }));
  };

  const addCar = () => {
    setCars([...cars, { model: '', registerNumber: '' }]);
  };

  const deleteCar = (index: number) => {
    const newCars = [...cars];
    newCars.splice(index, 1);
    setCars(newCars);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate top-level fields
    newErrors.firstName = validateField('firstName', formData.firstName);
    newErrors.lastName = validateField('lastName', formData.lastName);
    newErrors.email = validateField('email', formData.email);

    // Validate contact_info fields
    newErrors['contact_info.phoneNumber'] = validateField('contact_info.phoneNumber', formData.contact_info.phoneNumber);
    newErrors['contact_info.address1'] = validateField('contact_info.address1', formData.contact_info.address1);
    newErrors['contact_info.address2'] = validateField('contact_info.address2', formData.contact_info.address2);
    newErrors['contact_info.city'] = validateField('contact_info.city', formData.contact_info.city);
    newErrors['contact_info.state'] = validateField('contact_info.state', formData.contact_info.state);

    // Validate vehicle info if in car tab or edit car mode
    if (isCarTab || editCarMode) {
      newErrors['vehicleInfo.registerNumber'] = validateField('vehicleInfo.registerNumber', formData.vehicleInfo.registerNumber);
      newErrors['vehicleInfo.model'] = validateField('vehicleInfo.model', formData.vehicleInfo.model);
      newErrors['vehicleInfo.company'] = validateField('vehicleInfo.company', formData.vehicleInfo.company);
      newErrors['vehicleInfo.fuelType'] = validateField('vehicleInfo.fuelType', formData.vehicleInfo.fuelType);
      newErrors['vehicleInfo.year'] = validateField('vehicleInfo.year', formData.vehicleInfo.year);
    }

    setValidationErrors(newErrors);

    // Check if there are any errors
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleEditProfile = async () => {
    if (!validateForm()) {
      return; // Don't proceed if validation fails
    }

    setEditMode(false);
    setEditCarMode(false);

    try {
      const transformedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        contact_info: {
          phoneNumber: formData.contact_info.phoneNumber,
          address1: formData.contact_info.address1,
          address2: formData.contact_info.address2,
          city: formData.contact_info.city,
          state: formData.contact_info.state,
        },
        image: formData.image,
        vehicleInfo: {
          registerNumber: formData.vehicleInfo.registerNumber,
          model: formData.vehicleInfo.model,
          company: formData.vehicleInfo.company,
          year: formData.vehicleInfo.year,
          fuelType: formData.vehicleInfo.fuelType,
        },
      };

      const response = await updateUserProfile(transformedData);
      if (response) {
        toast.success('Profile updated successfully!');
        fetchUserProfile();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='h-screen w-screen flex items-center justify-center p-8 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden'>
      <div className='relative w-full max-w-4xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden'>
        {/* Car Details Panel */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${isCarTab ? 'opacity-100 z-20' : 'opacity-0 z-10'
            }`}
        >
          <div className='flex h-full w-full'>
            {/* Red Section - Left */}
            <div
              className='w-1/2  relative overflow-hidden'
              style={{ backgroundColor: '#0050A5' }}
            >
              <div className='absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent' />
              <div className='relative z-10 flex flex-col items-center justify-center h-full text-white p-8'>
                <h2 className='text-xl font-bold mb-4'>User Profile</h2>
                <p className='text-red-100 text-center mb-8 leading-relaxed'>
                  Switch to manage your personal information and account details
                </p>
                <button
                  onClick={() => setIsCarTab(false)}
                  className='px-3 py-1 border-2 border-white bg-white rounded-full text-[#0050A5] font-medium  transition-all duration-300 hover:scale-105'
                >
                  USER PROFILE
                </button>
              </div>
              <div className='absolute -right-14 top-0 w-24 h-full bg-gray-50 rounded-l-[3rem]' />
            </div>

            {/* Car Details Section - Right */}
           {/* Car Details Section - Right */}
<div className='w-1/2 flex flex-col p-8 bg-gray-50 relative'>
  <h2 className='text-3xl font-bold text-[#0050A5] mb-6 text-center'>
    Car Details
  </h2>
  <div className='flex-1 overflow-y-auto overflow-x-hidden pr-2 scrollbar-hide'>
    {editCarMode ? (
      <div className='w-full max-w-sm mx-auto space-y-4'>
        {cars.map((_, index) => (
          <div key={index} className='space-y-3'>
            <div className='border p-4 rounded-xl bg-white shadow relative'>
              <button
                onClick={() => deleteCar(index)}
                className='absolute top-3 right-5 bg-red-600 text-white rounded-md text-sm w-6 h-6 flex items-center justify-center'
                title='Delete this car'
              >
                X
              </button>

              <div className='grid gap-3 mt-8'>
                <input
                  type='text'
                  name='vehicleInfo.registerNumber'
                  value={formData?.vehicleInfo?.registerNumber}
                  onChange={handleUserChange}
                  placeholder='Car Registration No'
                  className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                    validationErrors['vehicleInfo.registerNumber'] ? 'ring-2 ring-red-500' : ''
                  }`}
                />
                {validationErrors['vehicleInfo.registerNumber'] && (
                  <p className='text-red-500 text-sm mt-1'>{validationErrors['vehicleInfo.registerNumber']}</p>
                )}

                <input
                  name='vehicleInfo.model'
                  type='text'
                  placeholder='Car Model'
                  value={formData?.vehicleInfo?.model}
                  onChange={handleUserChange}
                  className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                    validationErrors['vehicleInfo.model'] ? 'ring-2 ring-red-500' : ''
                  }`}
                />
                {validationErrors['vehicleInfo.model'] && (
                  <p className='text-red-500 text-sm mt-1'>{validationErrors['vehicleInfo.model']}</p>
                )}

                <input
                  name='vehicleInfo.company'
                  type='text'
                  placeholder='Car Company'
                  value={formData?.vehicleInfo?.company}
                  onChange={handleUserChange}
                  className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                    validationErrors['vehicleInfo.company'] ? 'ring-2 ring-red-500' : ''
                  }`}
                />
                {validationErrors['vehicleInfo.company'] && (
                  <p className='text-red-500 text-sm mt-1'>{validationErrors['vehicleInfo.company']}</p>
                )}

                <input
                  name='vehicleInfo.year'
                  type='text'
                  placeholder='Car Year'
                  value={formData?.vehicleInfo?.year}
                  onChange={handleUserChange}
                  className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                    validationErrors['vehicleInfo.year'] ? 'ring-2 ring-red-500' : ''
                  }`}
                />
                {validationErrors['vehicleInfo.year'] && (
                  <p className='text-red-500 text-sm mt-1'>{validationErrors['vehicleInfo.year']}</p>
                )}

                <input
                  name='vehicleInfo.fuelType'
                  type='text'
                  placeholder='Car Fuel Type'
                  value={formData?.vehicleInfo?.fuelType}
                  onChange={handleUserChange}
                  className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                    validationErrors['vehicleInfo.fuelType'] ? 'ring-2 ring-red-500' : ''
                  }`}
                />
                {validationErrors['vehicleInfo.fuelType'] && (
                  <p className='text-red-500 text-sm mt-1'>{validationErrors['vehicleInfo.fuelType']}</p>
                )}

                <div className='flex gap-3'>
                  <button
                    onClick={() => setEditCarMode(false)}
                    className='py-3 flex-1 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 bg-gray-400 shadow-lg'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (validateForm()) {
                        handleEditProfile();
                      }
                    }}
                    className='py-3 flex-1 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 bg-[#0050A5] shadow-lg'
                  >
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className='flex flex-col items-center justify-center'>
          <button
            onClick={addCar}
            className='w-[180px] py-1.5 text-white font-medium rounded-lg transition-all duration-300 hover:scale-95 shadow-lg sticky bottom-0'
            style={{ backgroundColor: '#0050A5' }}
          >
            ADD ANOTHER CAR
          </button>
        </div>
      </div>
    ) : (
      <div className='space-y-4 bg-white p-6 rounded-xl shadow-lg'>
        <div className='space-y-3'>
          <p className='text-lg flex'>
            <strong className='text-gray-700 w-1/2'>Register No:</strong>
            <span className='text-gray-600 w-2/3'>
              {profileData?.vehicleInfo?.registerNumber || 'N/A'}
            </span>
          </p>
          <p className='text-lg flex'>
            <strong className='text-gray-700 w-1/2'>Car Model:</strong>
            <span className='text-gray-600 w-2/3'>
              {profileData?.vehicleInfo?.model}
            </span>
          </p>
          <p className='text-lg flex'>
            <strong className='text-gray-700 w-1/2'>Car Company:</strong>
            <span className='text-gray-600 w-2/3'>
              {profileData?.vehicleInfo?.company}
            </span>
          </p>
          <p className='text-lg flex'>
            <strong className='text-gray-700 w-1/2'>Car Year:</strong>
            <span className='text-gray-600 w-2/3'>
              {profileData?.vehicleInfo?.year}
            </span>
          </p>
          <p className='text-lg flex'>
            <strong className='text-gray-700 w-1/2'>Fuel Type:</strong>
            <span className='text-gray-600 w-2/3'>
              {profileData?.vehicleInfo?.fuelType}
            </span>
          </p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <button
            onClick={() => setEditCarMode(true)}
            className='w-[180px] py-1.5 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg mt-4'
            style={{ backgroundColor: '#0050A5' }}
          >
            EDIT
          </button>
        </div>
      </div>
    )}
  </div>
</div>
          </div>
        </div>

      
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${isCarTab ? 'opacity-0 z-10' : 'opacity-100 z-20'
            }`}
        >
          <div className='flex h-full w-full'>
          
            <div className='w-1/2 flex flex-col items-center justify-top pt-10 p-4 bg-gray-50 relative'>
              <h2 className='text-3xl font-bold text-[#0050A5] mb-6'>
                User Information
              </h2>

              <div className='w-full overflow-scroll scrollbar-hide px-2 space-y-4'>
                {editMode ? (
                  <>
                    <div>
                      <input
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleUserChange}
                        placeholder='First Name'
                        className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${validationErrors['firstName'] ? 'ring-2 ring-red-500' : ''
                          }`}
                      />
                      {validationErrors['firstName'] && (
                        <p className='text-red-500 text-sm mt-1'>{validationErrors['firstName']}</p>
                      )}
                    </div>
                    <div>
                      <input
                        name='lastName'
                        value={formData?.lastName}
                        onChange={handleUserChange}
                        required
                        //	maxLength={15}
                        placeholder='Last Name'
                        className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${validationErrors['firstName'] ? 'ring-2 ring-red-500' : ''
                          }`}
                      />
                      {validationErrors['lastName'] && (
                        <p className='text-red-500 text-sm mt-1'>{validationErrors['lastName']}</p>
                      )}
                    </div>
                    <div>
                      <input
                        name='email'
                        value={formData?.contact_info.email}
                        onChange={handleUserChange}
                        //maxLength={25}
                        placeholder='Email'
                        className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${validationErrors['email'] ? 'ring-2 ring-red-500' : ''
                          }`}
                      />
                      {validationErrors['email'] && (
                        <p className='text-red-500 text-sm mt-1'>{validationErrors['email']}</p>
                      )}
                    </div>
                    <div>
                      <input
                        name='contact_info.phoneNumber'
                        value={formData.contact_info.phoneNumber}
                        onChange={handleUserChange}
                        placeholder='Phone Number'
                        className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${validationErrors['contact_info.phoneNumber'] ? 'ring-2 ring-red-500' : ''
                          }`}
                      />
                      {validationErrors['contact_info.phoneNumber'] && (
                        <p className='text-red-500 text-sm mt-1'>{validationErrors['contact_info.phoneNumber']}</p>
                      )}
                    </div>
                    <div>
                      <input
                        name='contact_info.address1'
                        value={formData?.contact_info?.address1}
                        //maxLength={25}
                        onChange={handleUserChange}
                        placeholder='Address 1'
                        className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${validationErrors['contact_info.address1'] ? 'ring-2 ring-red-500' : ''
                          }`}
                      />
                      {validationErrors['contact_info.address1'] && (
                        <p className='text-red-500 text-sm mt-1'>{validationErrors['contact_info.address1']}</p>
                      )}
                    </div>

                    <div>
                      <input
                        name='contact_info.address2'
                        value={formData?.contact_info?.address2}
                        onChange={handleUserChange}
                        //maxLength={25}
                        placeholder='Address 2'
                         className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${validationErrors['contact_info.address2'] ? 'ring-2 ring-red-500' : ''
                          }`}
                      />
                      {validationErrors['contact_info.address2'] && (
                        <p className='text-red-500 text-sm mt-1'>{validationErrors['contact_info.address2']}</p>
                      )}
                    </div>

                    <div>
                      <input
                        name='contact_info.city'
                        value={formData?.contact_info?.city}
                        //maxLength={15}
                        onChange={handleUserChange}
                        placeholder='City'
                         className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${validationErrors['contact_info.city'] ? 'ring-2 ring-red-500' : ''
                          }`}
                      />
                      {validationErrors['contact_info.city'] && (
                        <p className='text-red-500 text-sm mt-1'>{validationErrors['contact_info.city']}</p>
                      )}
                    </div>

                    <div>
                      <input
                        name='contact_info.state'
                        value={formData?.contact_info?.state}
                        //maxLength={15}
                        onChange={handleUserChange}
                        placeholder='state'
                         className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${validationErrors['contact_info.state'] ? 'ring-2 ring-red-500' : ''
                          }`}
                      />
                      {validationErrors['contact_info.state'] && (
                        <p className='text-red-500 text-sm mt-1'>{validationErrors['contact_info.state']}</p>
                      )}
                    </div>

                    <div>
                      <div className='px-4 py-3 bg-gray-200 border-0 rounded-lg '>
                        <input
                          type='file'
                          name='image'
                          accept='image/*'
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFormData((prev: any) => ({
                                ...prev,
                                image: URL.createObjectURL(file),
                              }));
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className='flex gap-4 '>
                      <button
                        className='py-3 flex-1 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 bg-gray-400  shadow-lg'
                        onClick={() => setEditMode(false)}
                      >
                        CANCEL
                      </button>
                      <button
                        onClick={() => {
                          if (validateForm()) {
                            handleEditProfile();
                          }
                        }}
                        //	onClick={() => handleEditProfile()}
                        className='py-3 flex-1 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300  shadow-lg'
                        style={{ backgroundColor: '#0050A5' }}
                      >
                        SAVE
                      </button>
                    </div>
                  </>
                ) : (
                  <div className='space-y-4 bg-white p-6 rounded-xl shadow-lg'>
                    <div className='space-y-3'>
                      <div className='flex justify-center'>
                        <img
                          src={formData?.image}
                          alt='profile Pic'
                          className='w-24 h-24 rounded-full object-cover'
                        />
                      </div>

                      <p className='text-lg flex'>
                        <strong className='text-gray-700 w-1/2'>
                          First Name:
                        </strong>
                        <span className='text-gray-600 break-words w-2/3'>
                          {formData?.firstName}
                        </span>
                      </p>

                      <p className='text-lg flex'>
                        <strong className='text-gray-700 w-1/2'>
                          Last Name:
                        </strong>
                        <span className='text-gray-600 break-words w-2/3'>
                          {formData?.lastName}
                        </span>
                      </p>

                      <p className='text-lg flex'>
                        <strong className='text-gray-700 w-1/2'>Email:</strong>
                        <span className='text-gray-600 break-words w-2/3'>
                          {formData?.email}
                        </span>
                      </p>

                      <p className='text-lg flex'>
                        <strong className='text-gray-700 w-1/2'>Phone:</strong>
                        <span className='text-gray-600 break-words w-2/3'>
                          {formData?.contact_info?.phoneNumber}
                        </span>
                      </p>

                      <p className='text-lg flex'>
                        <strong className='text-gray-700 w-1/2'>
                          Address:
                        </strong>
                        <span className='text-gray-600 break-words w-2/3'>
                          {formData?.contact_info?.address1},{' '}
                          {formData?.contact_info?.address2}
                        </span>
                      </p>

                      <p className='text-lg flex'>
                        <strong className='text-gray-700 w-1/2'>City:</strong>
                        <span className='text-gray-600 break-words w-2/3'>
                          {formData?.contact_info?.city}
                        </span>
                      </p>

                      <p className='text-lg flex'>
                        <strong className='text-gray-700 w-1/2'>State:</strong>
                        <span className='text-gray-600 break-words w-2/3'>
                          {formData?.contact_info?.state}
                        </span>
                      </p>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                      <button
                        onClick={() => setEditMode(true)}
                        className='w-[180px] py-1.5 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg mt-4'
                        style={{ backgroundColor: '#0050A5' }}
                      >
                        EDIT
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Red Section - Right */}
            <div
              className='w-1/2  relative overflow-hidden'
              style={{ backgroundColor: '#0050A5' }}
            >
              <div className='absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent' />
              <div className='relative z-10 flex flex-col items-center justify-center h-full text-white p-8'>
                <h2 className='text-2xl font-bold mb-4'>Car Details</h2>
                <p className='text-red-100 text-center mb-8 leading-relaxed'>
                  Switch to manage your vehicle information and service requests
                </p>
                <button
                  onClick={() => setIsCarTab(true)}
                  className='px-3 py-1 border-2 border-white bg-white text-[#0050A5] rounded-full  font-medium  transition-all duration-300 hover:scale-105'
                >
                  CAR DETAILS
                </button>
              </div>
              <div className='absolute -left-14 top-0 w-24 h-full bg-gray-50 rounded-r-[3rem]' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
// function setShowHistory(_arg0: null) {
//   throw new Error('Function not implemented.');
// }
