<<<<<<< HEAD
import SettingsPage from '../../components/account-settings/Accountsettings';
=======
import { useState } from "react";

interface UserInfo {
  name: string;
  email: string;
  number: string;
  address: string;
}

interface Car {
  model: string;
  issue: string;
}

interface ServiceHistory {
  date: string;
  service: string;
  status: string;
}

const ProfilePage: React.FC = () => {
  const [isCarTab, setIsCarTab] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showHistory, setShowHistory] = useState<number | null>(null);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "John Doe",
    email: "john@example.com",
    number: "+91 9123456781",
    address: "Mumbai, India",
  });

  const [cars, setCars] = useState<Car[]>([
    { model: "Hyundai i20", issue: "Brake noise when slowing down" },
  ]);

  // Mock service history data
  const [serviceHistory] = useState<Record<number, ServiceHistory[]>>({
    0: [
      { date: "2024-12-15", service: "Brake Pad Replacement", status: "Completed" },
      { date: "2024-11-20", service: "Oil Change", status: "Completed" },
      { date: "2024-10-10", service: "Engine Diagnostic", status: "Completed" },
    ]
  });

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCarChange = (
    index: number,
    field: "model" | "issue",
    value: string
  ) => {
    const updatedCars = [...cars];
    updatedCars[index][field] = value;
    setCars(updatedCars);
  };

  const addCar = () => {
    setCars([...cars, { model: "", issue: "" }]);
  };

  const deleteCar = (index: number) => {
    const newCars = [...cars];
    newCars.splice(index, 1);
    setCars(newCars);
    setShowHistory(null);
  };

  

  return (
    <div className="h-screen w-screen flex items-center justify-center p-8 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
      <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Car Details Panel */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
            isCarTab ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          <div className="flex h-full w-full">
            {/* Red Section - Left */}
            <div
              className="w-1/2 bg-gradient-to-br from-red-700 via-red-800 to-red-900 relative overflow-hidden"
              style={{ backgroundColor: "#9b111e" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-8">
                <h2 className="text-xl font-bold mb-4">User Profile</h2>
                <p className="text-red-100 text-center mb-8 leading-relaxed">
                  Switch to manage your personal information and account details
                </p>
                <button
                  onClick={() => setIsCarTab(false)}
                  className="px-3 py-1 border-2 border-white/30 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  USER PROFILE
                </button>
              </div>
              <div className="absolute -right-14 top-0 w-24 h-full bg-gray-50 rounded-l-[3rem]" />
            </div>

            {/* Car Details Section - Right */}
            <div className="w-1/2 flex flex-col  p-8 bg-gray-50 relative">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Car Details
              </h2>

              <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2">
                <div className="w-full max-w-sm mx-auto space-y-4">
                {cars.map((car, index) => (
                  <div key={index} className="space-y-3">
                    <div className="border p-4 rounded-xl bg-white shadow relative">
                      <button
                        onClick={() => deleteCar(index)}
                        className="absolute top-2 right-2 text-red-500 text-sm hover:text-red-700 w-6 h-6 flex items-center justify-center"
                        title="Delete this car"
                      >
                        🗑
                      </button>

                      <div>
                        <label className="text-sm font-semibold block mb-1 text-gray-700">
                          Car Model
                        </label>
                        <input
                          type="text"
                          placeholder="Car Model"
                          value={car.model}
                          onChange={(e) =>
                            handleCarChange(index, "model", e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                          style={
                            {
                              "--tw-ring-color": "#9b111e",
                            } as React.CSSProperties
                          }
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold block mb-1 text-gray-700">
                          Issue Description
                        </label>
                        <input
                          type="text"
                          placeholder="Describe the issue"
                          value={car.issue}
                          onChange={(e) =>
                            handleCarChange(index, "issue", e.target.value)
                          }
                          className="w-full px-3 py-2 text-sm bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                          style={
                            {
                              "--tw-ring-color": "#9b111e",
                            } as React.CSSProperties
                          }
                        />
                      </div>
<div className="flex justify-end mt-3">
  <button
    className="w-auto py-1 px-2 bg-[#9b111e] text-white text-sm font-medium rounded-lg transition-transform duration-300 hover:scale-105"
  >
    CAR HISTORY
  </button>
</div>
>>>>>>> c38c1bbe39b8b37d19e12576fc26fddbb51d8960


                    </div>

                    {/* Service History Panel */}
                    {showHistory === index && (
                      <div className="bg-white border rounded-xl p-4 shadow-lg">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Service History</h4>
                        {serviceHistory[index] && serviceHistory[index].length > 0 ? (
                          <div className="space-y-2">
                            {serviceHistory[index].map((history, historyIndex) => (
                              <div key={historyIndex} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="font-medium text-sm text-gray-800">{history.service}</p>
                                  <p className="text-xs text-gray-600">{history.date}</p>
                                </div>
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  {history.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm">No service history available</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
<div className="flex flex-col items-center justify-center"> <button
                    onClick={addCar}
                    className="w-[180px] py-1.5 text-white font-medium rounded-lg  transition-all duration-300 hover:scale-95 shadow-lg sticky bottom-0"
                    style={{ backgroundColor: "#9b111e" }}
                  >
                    ADD ANOTHER CAR
                  </button></div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Panel */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
            isCarTab ? "opacity-0 z-10" : "opacity-100 z-20"
          }`}
        >
          <div className="flex h-full w-full">
            {/* User Profile Section - Left */}
            <div className="w-1/2 flex flex-col items-center justify-center p-4 bg-gray-50 relative">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                User Information
              </h2>

              <div className="w-full max-w-sm space-y-4">
                {editMode ? (
                  <>
                    <input
                      name="name"
                      value={userInfo.name}
                      onChange={handleUserChange}
                      placeholder="Name"
                      className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                      style={
                        { "--tw-ring-color": "#9b111e" } as React.CSSProperties
                      }
                    />
                    <input
                      name="email"
                      value={userInfo.email}
                      onChange={handleUserChange}
                      placeholder="Email"
                      className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                      style={
                        { "--tw-ring-color": "#9b111e" } as React.CSSProperties
                      }
                    />
                    <input
                      name="number"
                      value={userInfo.number}
                      onChange={handleUserChange}
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                      style={
                        { "--tw-ring-color": "#9b111e" } as React.CSSProperties
                      }
                    />
                    <input
                      name="address"
                      value={userInfo.address}
                      onChange={handleUserChange}
                      placeholder="Address"
                      className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                      style={
                        { "--tw-ring-color": "#9b111e" } as React.CSSProperties
                      }
                    />
                    <button
                      onClick={() => setEditMode(false)}
                      className="w-full py-3 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg"
                      style={{ backgroundColor: "#9b111e" }}
                    >
                      SAVE
                    </button>
                  </>
                ) : (
                  <div className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
                    <div className="space-y-3">
                      <p className="text-lg">
                        <strong className="text-gray-700">Name:</strong>{" "}
                        <span className="text-gray-600">{userInfo.name}</span>
                      </p>
                      <p className="text-lg">
                        <strong className="text-gray-700">Email:</strong>{" "}
                        <span className="text-gray-600">{userInfo.email}</span>
                      </p>
                      <p className="text-lg">
                        <strong className="text-gray-700">Phone:</strong>{" "}
                        <span className="text-gray-600">{userInfo.number}</span>
                      </p>
                      <p className="text-lg">
                        <strong className="text-gray-700">Location:</strong>{" "}
                        <span className="text-gray-600">
                          {userInfo.address}
                        </span>
                      </p>
                    </div>
                   <div className="flex flex-col items-center justify-center">
                     <button
                      onClick={() => setEditMode(true)}
                      className="w-[180px]  py-1.5 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg mt-4"
                      style={{ backgroundColor: "#9b111e" }}
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
              className="w-1/2 bg-gradient-to-br from-red-700 via-red-800 to-red-900 relative overflow-hidden"
              style={{ backgroundColor: "#9b111e" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-8">
                <h2 className="text-2xl font-bold mb-4">Car Details</h2>
                <p className="text-red-100 text-center mb-8 leading-relaxed">
                  Switch to manage your vehicle information and service requests
                </p>
                <button
                  onClick={() => setIsCarTab(true)}
                  className="px-3 py-1 border-2 border-white/30 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  CAR DETAILS
                </button>
              </div>
              <div className="absolute -left-14 top-0 w-24 h-full bg-gray-50 rounded-r-[3rem]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
