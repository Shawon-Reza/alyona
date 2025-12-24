import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import AuthenticationNav from '../Components/AuthenticationNav';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import MapProgressBar from '../Components/MapProgressBar';
import { useDispatch } from 'react-redux';
import { setField } from '@/store/formSlice';
import { useMutation } from '@tanstack/react-query';
import { baseUrl } from '../config/config';
import axiosApi from '../api/axiosApi';

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
            console.log(data)


            setAddress({
                street: data.address.road || '',
                city: data.address.city || data.address.town || data.address.village || '',
                country: data.address.country || '',
            });
        } catch (err) {
            console.error("Error fetching address:", err);
        }
    };
    console.log(searchInput)
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

    // Send Data to Redux store
    const [livingArea, setLivingArea] = useState('');
    useEffect(() => {
        console.log("Living area updated:", livingArea);
    }, [livingArea]);

    const dispatch = useDispatch();

    // Mutation hook at component level
    const locationMutation = useMutation({
        mutationFn: async (locationData) => {
            const response = await axiosApi.post(`${baseUrl}accounts/api/v1/quiz`, locationData);
            return response.data;
        },
        onSuccess: (data) => {
            console.log('Location data submitted successfully:', data);

        },
        onError: (error) => {
            console.error('Error submitting location data:', error);
        }
    });
    console.log(address)

    // Check if all required fields are filled
    const isFormValid = address.street && address.city && address.country && livingArea;

    const check = JSON.parse(localStorage.getItem('accessToken'));

    const handleSave = () => {
        // Log all location-related data on save
        console.log('Saving location data:', {
            direccion: address.street,
            city: address.city,
            country: address.country,
            livingArea: livingArea,
        });

        // Dispatch to Redux store
        dispatch(setField({ field: 'location_area', value: livingArea }));
        dispatch(setField({ field: 'area', value: address.street }));
        dispatch(setField({ field: 'city', value: address.city }));
        dispatch(setField({ field: 'country', value: address.country }));

        console.log("Save on Redux store")

        // Execute mutation
        locationMutation.mutate({
            location_area: livingArea,
            area: address.street,
            city: address.city,
            country: address.country,
        });

        
        navigate('/PeriodDatePicker');
        console.log("Mutarion is called")
    };


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
                                <p><strong>Direccion:</strong> {address.street || 'Street, 1234'}</p>
                                <p><strong>City:</strong> {address.city || 'City'}</p>
                                <p><strong>Country:</strong> {address.country || 'Country'}</p>
                            </div>

                            <div className="bg-[#efdfcf] p-4 rounded-md mb-6 space-y-1 text-sm">
                                <label htmlFor="location" className="block font-bold mb-1">
                                    Where do you live?
                                </label>
                                <select
                                    name="location"
                                    id="location"
                                    value={livingArea}
                                    onChange={(e) => {
                                        setLivingArea(e.target.value);
                                    }}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
                                >
                                    <option value="">-- Select --</option>
                                    <option value="city">City</option>
                                    <option value="countryside">Countryside</option>
                                    <option value="half_and_half">Half and a half</option>
                                </select>

                            </div>
                            ``
                        </div>

                        {/* Save Button fixed at bottom */}
                        <button
                            onClick={handleSave}
                            disabled={!isFormValid}
                            className={`px-6 py-3 rounded-md text-lg font-semibold w-full flex justify-between cursor-pointer ${isFormValid
                                ? 'bg-[#0c0c36] text-white hover:bg-[#1c1c4f]'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
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
