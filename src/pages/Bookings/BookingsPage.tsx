import { useState } from 'react';

const PRIMARY_COLOR = '#9b111e';

const services = [
  {
    id: 'premium',
    title: 'Premium Service',
    description: 'Comfortable rides with top-class amenities and professional drivers.',
    details: 'Our Premium Service offers high-end vehicles like Audi A6, BMW 5 Series with complimentary Wi-Fi, mineral water, and customer-first experience.',
  },
  {
    id: 'luxury',
    title: 'Luxury Service',
    description: 'Experience ultimate luxury and prestige in your travel.',
    details: 'Our Luxury Service features chauffeur-driven cars like Mercedes S-Class, BMW 7 Series, and Lexus LS with leather interiors and VIP concierge service.',
  },
  {
    id: 'medium',
    title: 'Medium Service',
    description: 'Affordable rides for everyday needs with great comfort.',
    details: 'Choose from reliable and clean vehicles like Swift Dzire, Toyota Etios, and Honda Amaze. Ideal for family and daily travel.',
  },
];

const maintenanceServices = [
  'Engine Diagnostics',
  'Oil Change',
  'Tyre Replacement',
  'Battery Check',
  'AC Service',
  'Brake Inspection',
];

const BookingsPage = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10" style={{ color: PRIMARY_COLOR }}>
          Our Car Booking Services
        </h1>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className="cursor-pointer p-6 bg-white rounded-2xl shadow-lg border hover:shadow-xl transition"
              style={{ borderColor: PRIMARY_COLOR }}
            >
              <h2 className="text-xl font-bold mb-2" style={{ color: PRIMARY_COLOR }}>
                {service.title}
              </h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Service Details */}
        {selectedService && (
          <div
            className="bg-red-50 p-6 rounded-xl mb-12 border-l-4 shadow-inner"
            style={{ borderColor: PRIMARY_COLOR }}
          >
            <h2 className="text-2xl font-bold mb-2" style={{ color: PRIMARY_COLOR }}>
              {services.find((s) => s.id === selectedService)?.title}
            </h2>
            <p className="text-gray-700">
              {services.find((s) => s.id === selectedService)?.details}
            </p>
            <button
              onClick={() => setSelectedService(null)}
              className="mt-4 text-sm underline"
              style={{ color: PRIMARY_COLOR }}
            >
              ← Back to all services
            </button>
          </div>
        )}

        {/* Maintenance Section */}
        <div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
            Maintenance Services
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {maintenanceServices.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border rounded-xl p-4 shadow hover:shadow-md transition"
                style={{ borderColor: PRIMARY_COLOR }}
              >
                <p className="font-medium" style={{ color: PRIMARY_COLOR }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
