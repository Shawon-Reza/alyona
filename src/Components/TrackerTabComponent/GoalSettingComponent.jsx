import React, { useState } from 'react';
import { FaChevronDown, FaCheck, FaGreaterThan } from 'react-icons/fa';
import { PiGreaterThan } from 'react-icons/pi';

const GoalSettingComponent = () => {
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
        console.log('Toggling goal:', goal);
        if (selectedGoals.includes(goal)) {
            setSelectedGoals(selectedGoals.filter(item => item !== goal));
        } else {
            setSelectedGoals([...selectedGoals, goal]);
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
    const handleSave = async () => {
        console.log('=== SAVE BUTTON CLICKED ===');

        // Prepare data for API call
        const apiData = {
            predefinedGoals: {
                duration: predefinedDuration,
                selectedGoals: selectedGoals
            },
            customGoal: {
                duration: customDuration,
                goal: customGoal
            },
            timestamp: new Date().toISOString()
        };

        console.log('Data to be sent to API:', apiData);

        try {
            // Simulate API call
            console.log('Calling API...');

            // In a real implementation, this would be:
            // const response = await fetch('/api/goals', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify(apiData)
            // });

            // Simulate API response
            const mockResponse = {
                status: 'success',
                message: 'Goals saved successfully',
                data: apiData
            };

            console.log('API Response:', mockResponse);

            // Show success message
            alert('Goals saved successfully! Check console for details.');

        } catch (error) {
            console.error('Error saving goals:', error);
            alert('Error saving goals. Please try again.');
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

                {/* <div className="mb-4">
                    <DurationDropdown
                        value={customDuration}
                        onChange={handleCustomDurationChange}
                        label="Duration of your challenge"
                    />
                </div> */}

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