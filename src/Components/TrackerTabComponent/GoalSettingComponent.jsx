import axiosApi from '@/api/axiosApi';
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FaChevronDown, FaCheck, FaGreaterThan } from 'react-icons/fa';
import { PiGreaterThan } from 'react-icons/pi';
import { toast } from 'react-toastify';

const GoalSettingComponent = ({ onSaved }) => {
    // State for predefined goals section
    const [predefinedDuration, setPredefinedDuration] = useState('30 days');
    const [selectedGoals, setSelectedGoals] = useState([]);

    // State for custom goal section
    const [customDuration, setCustomDuration] = useState('30 days');
    const [customGoal, setCustomGoal] = useState('');

    // Available duration options
    const durationOptions = ['15 days', '30 days', '1 month', '3 months', '6 months', 'A year'];

    const [PersonalizedGoal, setPersonalizedGoal] = useState(false);

    // Predefined goals
    const predefinedGoalsList = [
        'Improve overall skin hydration',
        'Decrease pore visibility',
        'Control acne and blemishes',
        'Reduce fine lines and wrinkles',
        'Calm sensitivity and redness',

    ];

    // Handle predefined goal selection
    const handleGoalSelection = (goal) => {
        console.log('Selecting goal:', goal);
        // Only allow a single selected goal at a time. Clicking the same goal toggles it off.
        if (selectedGoals.includes(goal)) {
            setSelectedGoals([])
        } else {
            setSelectedGoals([goal])
            // Ensure personalized mode is off when choosing a predefined goal
            setPersonalizedGoal(false)
        }
    };

    // Handle custom goal input change
    const handleCustomGoalChange = (e) => {
        console.log('Custom goal changed:', e.target.value);
        setCustomGoal(e.target.value);
    };

    // Handle duration change for predefined section
    const handlePredefinedDurationChange = (duration) => {
        console.log('Predefined duration changed to:', duration);
        setPredefinedDuration(duration);
    };

    // Handle duration change for custom section
    const handleCustomDurationChange = (duration) => {
        console.log('Custom duration changed to:', duration);
        setCustomDuration(duration);
    };

    // Handle personalized goal click
    const handlePersonalizedGoalClick = () => {
        console.log('Personalized goal clicked');
        setPersonalizedGoal(!PersonalizedGoal);
        setSelectedGoals([]); // Clear selected predefined goals when switching to personalized
    };

    // Save function - would call API in real implementation
    const queryClient = useQueryClient()
    const [isSaving, setIsSaving] = useState(false)
    const handleSave = async () => {
            console.log('=== SAVE BUTTON CLICKED ===');
            // Prevent duplicate submissions
            if (isSaving) return
            setIsSaving(true)

            // Map duration option to a numeric number of days expected by the API.
            // This is explicit and avoids confusion between codes and days.
            const mapDurationToDays = (value) => {
                switch (value) {
                    case '15 days': return 15
                    case '30 days': return 30
                    case '1 month': return 30
                    case '3 months': return 90
                    case '6 months': return 180
                    case 'A year': return 365
                    default: return 0
                }
            }

            // Build the payload according to the API contract you provided:
            // { duration: number, goals: string[], custom_goal: string, updated_at: string }
            const payload = {
                duration: PersonalizedGoal ? mapDurationToDays(customDuration) : mapDurationToDays(predefinedDuration),
                goals: PersonalizedGoal ? [] : selectedGoals,
                custom_goal: customGoal || '',
                updated_at: new Date().toISOString().split('T')[0],
            }

            console.log('Payload to be sent to API:', payload)

            try {
                const res = await axiosApi.post('/products/api/v1/goals', payload)
                console.log('API Response:', res?.data)
                // Invalidate tracker/goalData so GoalHistory and sidebar refetch
                queryClient.invalidateQueries(['goalData'])
                toast.success('Goals saved successfully!')
                // Call parent callback to close the popup if provided
                if (typeof onSaved === 'function') onSaved()
            } catch (error) {
                console.error('Error saving goals:', error)
                toast.error('Error saving goals. Please try again.')
            } finally {
                setIsSaving(false)
            }
    };

    // Dropdown component
    const DurationDropdown = ({ value, onChange, label }) => (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md appearance-none bg-white pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {durationOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <FaChevronDown className="text-gray-500" />
            </div>
        </div>
    );

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Write your goal</h1>

            {/* Predefined Goals Section */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    How long would it last?
                </h2>

                <div className="mb-4">
                    <DurationDropdown
                        value={predefinedDuration}
                        onChange={handlePredefinedDurationChange}
                        label="Duration of your challenge"
                    />
                </div>

                <div className="mb-4">
                    <h3 className="text-md font-medium text-gray-700 mb-3">What is your goal?</h3>
                    <div className="space-y-2">
                        {predefinedGoalsList.map((goal) => (
                            <div
                                key={goal}
                                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${selectedGoals.includes(goal)
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:bg-gray-50'
                                    }  ${PersonalizedGoal ? 'hidden' : 'block'}`}
                                onClick={() => handleGoalSelection(goal)}
                            >
                                <div
                                    className={`w-5 h-5 border rounded flex items-center justify-center mr-3 ${selectedGoals.includes(goal)
                                        ? 'bg-blue-500 border-blue-500'
                                        : 'border-gray-300'
                                        }`}
                                >
                                    {selectedGoals.includes(goal) && (
                                        <FaCheck className="text-white text-xs" />
                                    )}
                                </div>
                                <span className="text-gray-700">{goal}</span>
                            </div>
                        ))}
                    </div>
                    <div
                        onClick={() => handlePersonalizedGoalClick()}
                        className={`flex items-center justify-between p-3 mt-2 border border-gray-300 rounded-lg cursor-pointer transition-colors font-semibold text-[#7271E3] `}>
                        <p>
                            Personalized goal
                        </p>
                        <FaGreaterThan />

                    </div>
                </div>
            </div>

            <hr className="my-6 border-gray-200" />
            {/* ${PersonalizedGoal? 'inline-block' : 'hidden'} */}
            {/* Custom Goal Section */}
            <div className={`mb-8 ${PersonalizedGoal ? 'block' : 'hidden'}`}>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Write your own goal
                </h2>

                <div className="mb-4">
                    <DurationDropdown
                        value={customDuration}
                        onChange={handleCustomDurationChange}
                        label="Duration of your challenge"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Write your goal
                    </label>
                    <textarea
                        value={customGoal}
                        onChange={handleCustomGoalChange}
                        placeholder="Enter your custom goal here..."
                        className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                    />
                </div>
            </div>

            {/* Save Button */}
            <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Save
            </button>

            {/* Debug info - can be removed in production */}
            <div className="mt-4 p-3 bg-gray-100 rounded-md text-xs">
                <p className="font-semibold">Debug Info:</p>
                <p>Predefined Duration: {predefinedDuration}</p>
                <p>Selected Goals: {selectedGoals.join(', ') || 'None'}</p>
                <p>Custom Duration: {customDuration}</p>
                <p>Custom Goal: {customGoal || 'None'}</p>
            </div>
        </div>
    );
};

export default GoalSettingComponent;