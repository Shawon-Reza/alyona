import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

// Custom marker icon
const markerIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
    iconSize: [32, 32],
});

// Click handler inside the map
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

// Marker Component
const LocationMarker = ({ position }) => {
    return position ? <Marker position={position} icon={markerIcon} /> : null;
};

const LocationSelector = () => {
    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState({ street: '', city: '', country: '' });
    const [searchInput, setSearchInput] = useState('');
    const mapRef = useRef();

   const navigate = useNavigate();

    // Fetch human-readable address from lat/lng
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

    // Search location by input
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

    // Get user location on load
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
        <div className="min-h-screen bg-gradient-to-br from-white via-[#f7f1ec] to-white flex flex-col items-center justify-center px-6 py-10 relative">
            {/* Top Nav */}
            <div className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-6">
                <div className="text-xl font-semibold text-[#2c2c2c] flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#1e1e2f] text-white rounded-full flex items-center justify-center font-bold">YB</div>
                    YOURSELF BEAUTY
                </div>
                <div className="space-x-4">
                    <button className="text-sm text-[#1e1e2f] hover:underline">Log in</button>
                    <button className="bg-[#0c0c36] text-white px-4 py-2 rounded-md text-sm hover:bg-[#1c1c4f]">Join</button>
                </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mt-28 mb-4">Write your location</h2>

            {/* Map */}
            <div className="w-full max-w-4xl h-[400px] mb-6 rounded-xl overflow-hidden shadow">
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

            {/* Search Input */}
            <div className="mb-4 flex gap-2 w-full max-w-md">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search your location..."
                    className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm shadow-sm"
                />
                <button
                    onClick={handleSearchLocation}
                    className="bg-[#0c0c36] text-white px-4 rounded-md text-sm hover:bg-[#1c1c4f]"
                >
                    Search
                </button>
            </div>

            {/* Address Display */}
            <div className="bg-[#efdfcf] p-4 rounded-md text-left max-w-sm w-full mb-6">
                <p><strong>Dirección:</strong> {address.street}</p>
                <p><strong>City:</strong> {address.city}</p>
                <p><strong>Country:</strong> {address.country}</p>
            </div>

            {/* Save Button */}
            <button
                onClick={() => {
                    alert('Location saved!')
                    navigate('/LifestyleQuiz'); // Redirect to home or another page after saving
                }}
                className="bg-[#0c0c36] text-white px-6 py-3 rounded-md text-sm hover:bg-[#1c1c4f]"
            >
                Save my location
            </button>
        </div>
    );
};

export default LocationSelector;
