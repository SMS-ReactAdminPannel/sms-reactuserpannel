import { useState } from "react"

interface UserInfo {
  name: string
  email: string
  number: string
  address: string
}

interface Car {
  model: string
  issue: string
}

const ProfilePage: React.FC = () => {
  const [isCarTab, setIsCarTab] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "John Doe",
    email: "john@example.com",
    number: "+91 9123456781",
    address: "Mumbai, India",
  })

  const [cars, setCars] = useState<Car[]>([
    { model: "Hyundai i20", issue: "Brake noise when slowing down" },
  ])

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleCarChange = (
    index: number,
    field: "model" | "issue",
    value: string
  ) => {
    const updatedCars = [...cars]
    updatedCars[index][field] = value
    setCars(updatedCars)
  }

  const addCar = () => {
    setCars([...cars, { model: "", issue: "" }])
  }

  const deleteCar = (index: number) => {
    const newCars = [...cars]
    newCars.splice(index, 1)
    setCars(newCars)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-gray-50 to-red-200 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Car Details Panel */}
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out ${
            isCarTab ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full w-full">
            {/* Red Section - Left */}
            <div className="w-1/2 bg-gradient-to-br from-red-700 via-red-800 to-red-900 relative overflow-hidden" style={{ backgroundColor: '#9b111e' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-8">
                <h2 className="text-4xl font-bold mb-4">User Profile</h2>
                <p className="text-red-100 text-center mb-8 leading-relaxed">
                  Switch to manage your personal information and account details
                </p>
                <button
                  onClick={() => setIsCarTab(false)}
                  className="px-8 py-3 border-2 border-white/30 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  USER PROFILE
                </button>
              </div>
              {/* Decorative curved shape */}
              <div className="absolute -right-12 top-0 w-24 h-full bg-gray-50 rounded-l-[3rem]" />
            </div>

            {/* Car Details Section - Right */}
            <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-gray-50 relative">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Car Details</h2>

              <div className="w-full max-w-sm space-y-4 max-h-80 overflow-y-auto">
                {cars.map((car, index) => (
                  <div
                    key={index}
                    className="space-y-3 border p-4 rounded-xl bg-white shadow relative"
                  >
                    <button
                      onClick={() => deleteCar(index)}
                      className="absolute top-2 right-2 text-red-500 text-sm hover:text-red-700 w-6 h-6 flex items-center justify-center"
                      title="Delete this car"
                    >
                      🗑
                    </button>

                    <div>
                      <label className="text-sm font-semibold block mb-1 text-gray-700">Car Model</label>
                      <input
                        type="text"
                        placeholder="Car Model"
                        value={car.model}
                        onChange={(e) => handleCarChange(index, "model", e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                        style={{ '--tw-ring-color': '#9b111e' } as React.CSSProperties}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold block mb-1 text-gray-700">Issue Description</label>
                      <input
                        type="text"
                        placeholder="Describe the issue"
                        value={car.issue}
                        onChange={(e) => handleCarChange(index, "issue", e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                        style={{ '--tw-ring-color': '#9b111e' } as React.CSSProperties}
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={addCar}
                  className="w-full py-3 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg"
                  style={{ backgroundColor: '#9b111e' }}
                >
                  ADD ANOTHER CAR
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Panel */}
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out ${
            isCarTab ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="flex h-full w-full">
            {/* User Profile Section - Left */}
            <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-gray-50 relative">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">User Information</h2>

              <div className="w-full max-w-sm space-y-4">
                {editMode ? (
                  <>
                    <input
                      name="name"
                      value={userInfo.name}
                      onChange={handleUserChange}
                      placeholder="Name"
                      className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{ '--tw-ring-color': '#9b111e' } as React.CSSProperties}
                    />
                    <input
                      name="email"
                      value={userInfo.email}
                      onChange={handleUserChange}
                      placeholder="Email"
                      className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{ '--tw-ring-color': '#9b111e' } as React.CSSProperties}
                    />
                    <input
                      name="number"
                      value={userInfo.number}
                      onChange={handleUserChange}
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{ '--tw-ring-color': '#9b111e' } as React.CSSProperties}
                    />
                    <input
                      name="address"
                      value={userInfo.address}
                      onChange={handleUserChange}
                      placeholder="Address"
                      className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{ '--tw-ring-color': '#9b111e' } as React.CSSProperties}
                    />
                    <button
                      onClick={() => setEditMode(false)}
                      className="w-full py-3 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg"
                      style={{ backgroundColor: '#9b111e' }}
                    >
                      SAVE
                    </button>
                  </>
                ) : (
                  <div className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
                    <div className="space-y-3">
                      <p className="text-lg"><strong className="text-gray-700">Name:</strong> <span className="text-gray-600">{userInfo.name}</span></p>
                      <p className="text-lg"><strong className="text-gray-700">Email:</strong> <span className="text-gray-600">{userInfo.email}</span></p>
                      <p className="text-lg"><strong className="text-gray-700">Phone:</strong> <span className="text-gray-600">{userInfo.number}</span></p>
                      <p className="text-lg"><strong className="text-gray-700">Location:</strong> <span className="text-gray-600">{userInfo.address}</span></p>
                    </div>
                    <button
                      onClick={() => setEditMode(true)}
                      className="w-full py-3 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg mt-4"
                      style={{ backgroundColor: '#9b111e' }}
                    >
                      EDIT
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Red Section - Right */}
            <div className="w-1/2 bg-gradient-to-br from-red-700 via-red-800 to-red-900 relative overflow-hidden" style={{ backgroundColor: '#9b111e' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-8">
                <h2 className="text-4xl font-bold mb-4">Car Details</h2>
                <p className="text-red-100 text-center mb-8 leading-relaxed">
                  Switch to manage your vehicle information and service requests
                </p>
                <button
                  onClick={() => setIsCarTab(true)}
                  className="px-8 py-3 border-2 border-white/30 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  CAR DETAILS
                </button>
              </div>
              {/* Decorative curved shape */}
              <div className="absolute -left-12 top-0 w-24 h-full bg-gray-50 rounded-r-[3rem]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage