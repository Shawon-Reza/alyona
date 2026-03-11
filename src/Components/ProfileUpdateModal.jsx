import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axiosApi from '../api/axiosApi';
import { baseUrl } from '../config/config';
import { toast } from 'react-toastify';

const REGION_JSON = {
  "europe": [
    "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom", "Vatican City"
  ],
  "north_america": [
    "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Canada", "Costa Rica", "Cuba", "Dominica", "Dominican Republic", "El Salvador", "Grenada", "Guatemala", "Haiti", "Honduras", "Jamaica", "Mexico", "Nicaragua", "Panama", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Trinidad and Tobago", "United States"
  ],
  "south_america": [
    "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela"
  ],
  "africa": [
    "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cape Verde", "Cameroon", "Central African Republic", "Chad", "Comoros", "Democratic Republic of the Congo", "Republic of the Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "São Tomé and Príncipe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
  ],
  "middle_east": [
    "Bahrain", "Iran", "Iraq", "Israel", "Jordan", "Kuwait", "Lebanon", "Oman", "Palestine", "Qatar", "Saudi Arabia", "Syria", "Turkey", "United Arab Emirates", "Yemen"
  ],
  "central_asia": [
    "Kazakhstan", "Kyrgyzstan", "Tajikistan", "Turkmenistan", "Uzbekistan"
  ],
  "south_asia": [
    "Afghanistan", "Bangladesh", "Bhutan", "India", "Maldives", "Nepal", "Pakistan", "Sri Lanka"
  ],
  "east_asia": [
    "China", "Japan", "Mongolia", "North Korea", "South Korea", "Taiwan"
  ],
  "southeast_asia": [
    "Brunei", "Cambodia", "East Timor", "Indonesia", "Laos", "Malaysia", "Myanmar", "Philippines", "Singapore", "Thailand", "Vietnam"
  ],
  "oceania": [
    "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "New Zealand", "Palau", "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu"
  ]
};

// Get all countries from all regions
const getAllCountries = () => {
  const allCountries = [];
  Object.values(REGION_JSON).forEach(countries => {
    allCountries.push(...countries);
  });
  return allCountries.sort();
};

const ProfileUpdateModal = ({ isOpen, onClose, onSubmit, endpoint = '' }) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    full_name: '',
    birthday: '',
    country: '',
    image: null, // File
    imagePreview: '', // preview URL or existing image url
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialForm, setInitialForm] = useState(form);

  // Fetch user profile data
  const { data: userData, isLoading } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const response = await axiosApi.get(`${baseUrl}accounts/api/v1/profile-image`);
      console.log('Fetched user data:', response.data);
      return response.data;
    },
    enabled: isOpen,
  });

  // Populate form with fetched user data
  useEffect(() => {
    if (userData) {
      const newForm = {
        username: userData.username || '',
        email: userData.email || '',
        full_name: userData.full_name || '',
        birthday: userData.birthday || '',
        country: userData.country || '',
        image: null,
        imagePreview: userData.image,
      };
    
      setForm(newForm);
      setInitialForm(newForm);
    }
  }, [userData]);

  console.log("Img:",form.imagePreview)
  const profileMutation = useMutation({
    mutationFn: async (body) => {
      const url = endpoint ? `${baseUrl}${endpoint}` : `${baseUrl}accounts/api/v1/profile-image`;
      const response = await axiosApi.patch(url, body);
      return response.data;
    },
    onSuccess: (data) => {
      onClose?.();
      window.location.reload();
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  });



  // Revoke object URL when preview changes
  useEffect(() => {
    return () => {
      if (form.imagePreview && form.image instanceof File) {
        URL.revokeObjectURL(form.imagePreview);
      }
    };
  }, [form.imagePreview, form.image]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, image: file, imagePreview: previewUrl }));
  };

  const isValidEmail = (email) => /.+@.+\..+/.test(email);
  const isImageDirty = form.image instanceof File;
  const isDirty =
    (form.username !== initialForm.username) ||
    (form.full_name !== initialForm.full_name) ||
    (form.birthday !== initialForm.birthday) ||
    (form.country !== initialForm.country) ||
    isImageDirty;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDirty) {
      toast.info('No changes to update.');
      return;
    }
    try {
      setIsSubmitting(true);
      const isImageOnly = endpoint ? endpoint.includes('profile-image') : true;
      let payload;
      
      if (isImageOnly) {
        // Image endpoint: send FormData with ALL fields
        payload = new FormData();
        payload.append('username', form.username);
        payload.append('full_name', form.full_name);
        payload.append('birthday', form.birthday);
        if (form.country) {
          payload.append('country', form.country);
        }
        if (form.image instanceof File) {
          payload.append('image', form.image);
        }
        
        console.log('Profile update payload: [FormData with username, full_name, birthday, country, image]');
      } else {
        // Build partial payload with only changed fields
        const partial = {};
        if (form.username !== initialForm.username) partial.username = form.username;
        if (form.full_name !== initialForm.full_name) partial.full_name = form.full_name;
        if (form.birthday !== initialForm.birthday) partial.birthday = form.birthday;
        if (form.country !== initialForm.country) partial.country = form.country;
        if (form.image instanceof File) partial.image = form.image;

        if (Object.keys(partial).length === 0) {
          toast.info('No changes to update.');
          return;
        }
        payload = partial;
        console.log('Profile update payload:', partial);
      }

      profileMutation.mutate(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#0c0c36] to-[#1c1c4f] text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
          <h3 className="text-xl font-bold">Update Profile</h3>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center pb-4 border-b">
            <div className="relative group">
              {form.imagePreview ? (
                <img 
                  src={form?.imagePreview} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg transition-transform group-hover:scale-105" 
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center border-4 border-gray-200 shadow-lg">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <div className="absolute bottom-0 right-0 bg-[#0c0c36] rounded-full p-2 shadow-lg cursor-pointer hover:bg-[#1c1c4f] transition-colors">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
              </div>
            </div>
            <input 
              id="image-upload"
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="hidden" 
            />
            <p className="text-sm text-gray-500 mt-3">Click the camera icon to update your photo</p>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[#0c0c36] focus:ring-2 focus:ring-[#0c0c36]/20 outline-none transition-all"
                placeholder="Enter username"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email
                <span className="ml-2 text-xs font-normal text-gray-500">(Read-only)</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                readOnly
                disabled
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 cursor-not-allowed"
                placeholder="user@example.com"
              />
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[#0c0c36] focus:ring-2 focus:ring-[#0c0c36]/20 outline-none transition-all"
                placeholder="Enter full name"
              />
            </div>

            {/* Birthday */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Birthday
              </label>
              <input
                type="date"
                name="birthday"
                value={form.birthday}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[#0c0c36] focus:ring-2 focus:ring-[#0c0c36]/20 outline-none transition-all"
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Country
              </label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[#0c0c36] focus:ring-2 focus:ring-[#0c0c36]/20 outline-none transition-all bg-white "
              >
                <option value="">Select a country</option>
                {Object.entries(REGION_JSON).map(([region, countries]) => (
                  <optgroup key={region} label={region.replace(/_/g, ' ').toUpperCase()}>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isDirty || isSubmitting || profileMutation.isPending || isLoading}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                isDirty && !isSubmitting && !profileMutation.isPending && !isLoading 
                  ? 'bg-gradient-to-r from-[#0c0c36] to-[#1c1c4f] text-white hover:shadow-lg hover:scale-105 active:scale-95' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading…
                </span>
              ) : isSubmitting || profileMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving…
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdateModal;