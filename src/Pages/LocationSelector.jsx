import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import AuthenticationNav from '../Components/AuthenticationNav';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import MapProgressBar from '../Components/MapProgressBar';

// Custom marker icon
const markerIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
    iconSize: [32, 32],
});

const ClickHandler = ({ setPosition, fetchAddress }) => {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            const newPos = [lat, lng];
            setPosition(newPos);
            fetchAddress(lat, lng);
        }
    });
    return null;
};

const LocationMarker = ({ position }) => {
    return position ? <Marker position={position} icon={markerIcon} /> : null;
};

const LocationSelector = () => {
    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState({ street: '', city: '', country: '' });
    const [searchInput, setSearchInput] = useState('');
    const mapRef = useRef();
    const navigate = useNavigate();

    const fetchAddress = async (lat, lon) => {
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await res.json();
            setAddress({
                street: data.address.road || '',
                city: data.address.city || data.address.town || data.address.village || '',
                country: data.address.country || '',
            });
        } catch (err) {
            console.error("Error fetching address:", err);
        }
    };

    const handleSearchLocation = async () => {
        if (!searchInput) return;
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchInput)}`);
            const data = await res.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const newPos = [parseFloat(lat), parseFloat(lon)];
                setPosition(newPos);
                fetchAddress(lat, lon);

                if (mapRef.current) {
                    mapRef.current.setView(newPos, 13);
                }
            } else {
                alert("Location not found.");
            }
        } catch (err) {
            console.error("Search error:", err);
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                const newPos = [latitude, longitude];
                setPosition(newPos);
                fetchAddress(latitude, longitude);
            },
            () => {
                console.log('Location access denied.');
            }
        );
    }, []);

    return (
        <div className='min-h-screen bg-gradient-to-b from-white via-[#f3ebe6] to-white relative'>
            <div className='pt-4'>
                <AuthenticationNav />
            </div>
            <div className='sm:my-5'>
                <MapProgressBar progress={30} />
            </div>

            {/* Overlay Image */}
            <div className='absolute bottom-0 right-0'>
                <img src={LoginPageOverLap} alt="OverlapIMG" />
            </div>

            <div className="px-8 py-6 relative lg:px-20">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-15 xl:gap-20 ">
                    {/* Map Area */}
                    <div className="w-full lg:w-2/3 h-[400px] lg:h-[650px] rounded-xl overflow-hidden shadow">
                        <MapContainer
                            center={position || [48.8566, 2.3522]}
                            zoom={13}
                            scrollWheelZoom={true}
                            ref={(mapInstance) => {
                                if (mapInstance) mapRef.current = mapInstance;
                            }}
                            className="h-full w-full"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {position && <LocationMarker position={position} />}
                            <ClickHandler setPosition={setPosition} fetchAddress={fetchAddress} />
                        </MapContainer>
                    </div>

                    {/* Right Controls */}
                    {/* Right Controls */}
                    <div className="flex-1 flex flex-col justify-between h-[650px]">
                        <div>
                            {/* Search Field */}
                            <div className="mb-4">
                                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 shadow-sm bg-white w-full">
                                    <Search size={18} className="text-gray-500 mr-2" />
                                    <input
                                        type="text"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSearchLocation();
                                            }
                                        }}
                                        placeholder="Write your location"
                                        className="w-full text-sm outline-none"
                                    />

                                </div>
                                <button
                                    onClick={handleSearchLocation}
                                    className="mt-2 text-sm text-blue-600 hover:underline"
                                >
                                    Search
                                </button>
                            </div>

                            {/* Address Display */}
                            <div className="bg-[#efdfcf] p-4 rounded-md mb-6 space-y-1 text-sm">
                                <p><strong>Dirección:</strong> {address.street || 'Street, 1234'}</p>
                                <p><strong>City:</strong> {address.city || 'City'}</p>
                                <p><strong>Country:</strong> {address.country || 'Country'}</p>
                            </div>
                        </div>

                        {/* Save Button fixed at bottom */}
                        <button
                            onClick={() => {
                                alert('Location saved!');
                                navigate('/LifestyleQuiz');
                            }}
                            className="bg-[#0c0c36] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#1c1c4f] w-full flex justify-between cursor-pointer "
                        >
                            Save my location
                            <ChevronRight />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LocationSelector;
