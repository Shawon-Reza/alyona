import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPageOverLap from '../assets/LoginPageOverLap.png';
import AuthenticationNav from '../Components/AuthenticationNav';
import { ChevronRight } from 'lucide-react';
import Stepper, { Step } from '../CustomComponent/Stepper'; // Import Stepper
import LocationSelector from './LocationSelector';
import { useDispatch, useSelector } from 'react-redux';
import { setField } from '@/store/formSlice';
import axios from 'axios';

// Array of lifestyle options with labels and values
const lifestyleOptions = [
    { value: "stress", label: "Under a lot of stress" },
    { value: "night_life", label: "Mostly night life – I love to go out" },
    { value: "early_riser", label: "Early to wake up – I enjoy early mornings" },
    { value: "balanced", label: "I believe I live a balanced life" },
    { value: "no_time", label: "Never enough time to do everything" },
    { value: "positive", label: "Positive thinking – life is beautiful" },
    { value: "social", label: "Surrounded by love, family and friends" },
    { value: "free_time", label: "I have a lot of free time" },
    { value: "workaholic", label: "I am constantly at work" },
];
// Array of eating habits options
const EATING_HABITS_CHOICES = [
    ["vegan", "Vegan"],
    ["vegetarian", "Vegetarian"],
    ["balanced", "I have a balanced diet and eat everything with no food restrictions"],
    ["occasional_overeat", "I overeat occasionally"],
    ["frequent_overeat", "I overeat quite often"],
    ["weight_loss", "I am trying to lose weight"],
    ["alcohol", "I consume a lot of alcohol"],
    ["meat", "I mostly eat meat"],
    ["fish", "I mostly eat fish"],
    ["fruits_veggies", "I mostly eat fruits and vegetables"],
];
// Array of moods options
const moodOptions = [
    { value: "creative", label: "Creative, always come up with great ideas!" },
    { value: "energetic", label: "Full of energy and motivation" },
    { value: "positive", label: "Positive – don’t worry be happy!" },
    { value: "depressed", label: "Sad and depressed, don’t feel like leaving my bed" },
    { value: "nostalgic", label: "Quiet and nostalgic, rainy day describes my mood the best" },
    { value: "worried", label: "I often worry about everything" },
    { value: "tired", label: "Tired, lack energy and motivation" },
    { value: "satisfied", label: "Satisfied with life" },
    { value: "mood_swings", label: "I experience mood swings - fight to flight mode changes by apathy" },
    { value: "angry", label: "Angry, better don’t talk to me!" },
];
// Array of water take options
const waterIntakeOptions = [
    { value: "always", label: "I drink all the time, water bottle is my best friend" },
    { value: "with_meals", label: "Only during my meals" },
    { value: "when_thirsty", label: "Only when I feel thirsty" },
    {
        value: "prefer_other",
        label:
            "I don’t drink plain water, I prefer other beverages, I have a balanced plain water intake through my day",
    },
];

// Array of sweetConsumptionOptions  options
const sweetConsumptionOptions = [
    { value: "sweet_tooth", label: "I have a sweet tooth that always craves some sugar" },
    { value: "starter_person", label: "I am more a starter person than a dessert" },
    { value: "sugary_breakfast", label: "My everyday breakfast is pure sugar" },
    { value: "indifferent", label: "I am indifferent to sweets" },
    { value: "dark_side", label: "I’ll join the dark side because they have cookies" },
];

// Array of skinConcernsOptions options
const skinConcernsOptions = [
    { value: "oiliness", label: "excess oil/shiny areas" },
    { value: "breakouts", label: "breakouts" },
    { value: "clogged_pores", label: "clogged pores & blackheads" },
    { value: "dry_skin", label: "dry skin" },
    { value: "sensitive_skin", label: "sensitive skin" },
    { value: "inflammation", label: "inflammation" },
    { value: "wrinkles", label: "fine lines and wrinkles" },
    { value: "eczema", label: "eczema" },
    { value: "rosacea", label: "rosacea" },
    { value: "uneven_tone", label: "uneven tone" },
    { value: "dull_skin", label: "dull skin that lacks glow" },
    { value: "dark_circles", label: "dark circles/eye bags" },
    { value: "loss_of_firmness", label: "my skin lacks firmness and elasticity" },
    { value: "none", label: "none of these" },
    { value: "hyperpigmentation", label: "hyperpigmentation (dark spots/marks)" },
    { value: "other", label: "other (specify)" },
    { value: "no_concerns", label: "I don’t have any particular concerns" },
];

// Array of sleepQualityOptions options
const sleepQualityOptions = [
    { value: "less_than_7h", label: "too little (less than 7 hours per day)" },
    { value: "more_than_9h", label: "too much (more than 9-10 hours per day)" },
    { value: "ideal_7_8h", label: "just a right amount – 7 to 8 hours" },
    { value: "inconsistent", label: "I do not have a firm sleep routine: sometimes I sleep too little with some days when I sleep a lot" },
    { value: "insomnia", label: "I struggle from insomnia" },
    { value: "difficulty_falling_asleep", label: "I have troubles to fall asleep" },
    { value: "difficulty_waking_up", label: "I have troubles to wake up" },
];

// Array of dailyActivityOptions options
const dailyActivityOptions = [
    { value: "very_active", label: "I’m a sport addict, cannot imagine my life without some action everyday" },
    { value: "active_when_possible", label: "I know the benefits of active lifestyle and I do my best to stay active when I can" },
    { value: "moderately_active", label: "I do some sports/yoga/dancing 2-3 times a week" },
    { value: "mostly_sedentary", label: "Well, to be honest I spend most of my day in front of my computer and then I am too tired to do anything extra" },
    { value: "not_active", label: "Not at all, I prefer my cuddly bed" },
];

// Skincare time options
const skincareTimeOptions = [
    { value: "simple", label: "Keep it simple, so it is easy to follow" },
    { value: "beauty_addict", label: "I’m a beauty addict, the more products the merrier! Bring it all!" },
    { value: "new_to_routine", label: "I’m new to skincare but aware of its benefits and want to try" },
    { value: "busy_life", label: "I live a busy life, prefer quick mornings but commit in evenings" },
    { value: "morning_focus", label: "I prefer extra effort in the morning and simpler night routine" },
];

// supplementOptions time options
const supplementOptions = [
    { value: "no", label: "No" },
    { value: "yes", label: "Yes" },
    { value: "yes_which", label: "Yes; if yes, which ones" }
];

// pregnancyBreastfeedingOptions time options
const pregnancyBreastfeedingOptions = [
    { value: "pregnant", label: "Yes, I am expecting" },
    { value: "breastfeeding", label: "Yes, I am on breastfeeding journey" },
    { value: "none", label: "No, neither of two" }
];




const LifestyleQuizStepper = () => {
    // Single state object to store all data in `QuizDetails`
    const [QuizDetails, setQuizDetails] = useState({
        name: '', // User's name
        age: '', // User's age
        selectedLifestyle: [],
        selectedEatingHabits: [],
        selectedMood: '',  // Change from [] to ''
        selectedWaterIntake: '',
        selectedSweetConsumption: [],
        selectedSkinConcerns: [],
        selectedSkincareGoals: [],
        selectedSleepQuality: '',  // Change from [] to ''
        selectedDailyActivity: '',  // Change from [] to ''
        selectedSkincareTime: [],
        selectedSupplement: '',
        selectedPregnancyBreastfeeding: '',
    });

    const handleSave = () => {

    }


    const navigate = useNavigate();



    // ..............................Toggleing for each quiz....................//
    // Toggle the selection of a lifestyle option
    const toggleLifestyleOption = (option) => {
        setQuizDetails(prevState => {
            const updatedLifestyle = prevState.selectedLifestyle.includes(option.value)
                ? prevState.selectedLifestyle.filter(item => item !== option.value)
                : [...prevState.selectedLifestyle, option.value];

            console.log("Updated Lifestyle Options: ", updatedLifestyle); // Log selected lifestyle options
            return {
                ...prevState,
                selectedLifestyle: updatedLifestyle
            };
        });
    };

    // Toggle the selection of eating habits
    const toggleEatingHabit = (habit) => {
        setQuizDetails(prevState => {
            const updatedEatingHabits = prevState.selectedEatingHabits.includes(habit)
                ? prevState.selectedEatingHabits.filter(item => item !== habit)
                : [...prevState.selectedEatingHabits, habit];

            console.log("Updated Eating Habits: ", updatedEatingHabits); // Log selected eating habits
            return {
                ...prevState,
                selectedEatingHabits: updatedEatingHabits
            };
        });
    };

    // Toggle the selection of mood options
    const toggleMoodOption = (mood) => {
        setQuizDetails(prevState => ({
            ...prevState,
            selectedMood: prevState.selectedMood === mood ? '' : mood // If selected, deselect it, otherwise select the new one
        }));
    };


    // Toggle the selection of water intake options (Allow only one selection)
    const toggleWaterIntakeOption = (option) => {
        setQuizDetails(prevState => {
            // If the same option is clicked again, deselect it (set it to an empty string)
            const updatedWaterIntake = prevState.selectedWaterIntake === option ? '' : option;

            return {
                ...prevState,
                selectedWaterIntake: updatedWaterIntake
            };
        });
    };

    // Toggle the selection of sweet consumption options (allowing multiple selections)
    const toggleSweetConsumptionOption = (option) => {
        setQuizDetails(prevState => {
            // Check if the option is already selected
            const updatedSweetConsumption = prevState.selectedSweetConsumption.includes(option)
                ? prevState.selectedSweetConsumption.filter(item => item !== option)  // Deselect if already selected
                : [...prevState.selectedSweetConsumption, option];  // Add if not already selected

            return {
                ...prevState,
                selectedSweetConsumption: updatedSweetConsumption
            };
        });
    };

    // Toggle the selection of skin concern options (allowing multiple selections)
    const toggleSkinConcern = (option) => {
        setQuizDetails(prevState => {
            const updatedSkinConcerns = prevState.selectedSkinConcerns.includes(option)
                ? prevState.selectedSkinConcerns.filter(item => item !== option)  // Deselect if already selected
                : [...prevState.selectedSkinConcerns, option];  // Select the new option

            return {
                ...prevState,
                selectedSkinConcerns: updatedSkinConcerns
            };
        });
    };

    // Toggle the skincareGoalsOptions options (allowing multiple selections)
    const skincareGoalsOptions = [
        { value: "protect_skin", label: "protect and support my skin" },
        { value: "increase_hydration", label: "increase hydration" },
        { value: "radiant_skin", label: "radiant and glow skin" },
        { value: "reduce_clogging", label: "reduce breakouts/blackheads/clogged pores" },
        { value: "control_oil", label: "control sebum/skin oil production" },
        { value: "reduce_aging", label: "reduce skin aging signs" },
        { value: "slow_aging", label: "slowdown skin aging" },
        { value: "plump_skin", label: "plump skin" },
        { value: "healthy_skin", label: "healthy looking skin" },
        { value: "less_makeup", label: "reduce amount of make-up used" },
        { value: "improve_appearance", label: "improve skin’s overall look" },
        { value: "reduce_inflammation", label: "reduce skin inflammation" },
        { value: "manage_eczema", label: "control eczema" },
        { value: "manage_rosacea", label: "control rosacea" },
        { value: "reduce_dark_circles", label: "reduce dark circles" },
    ];

    // Toggle the selection of skincare goal options (allowing multiple selections)
    const toggleSkincareGoal = (goal) => {
        setQuizDetails(prevState => {
            const updatedSkincareGoals = prevState.selectedSkincareGoals.includes(goal)
                ? prevState.selectedSkincareGoals.filter(item => item !== goal)  // Deselect if already selected
                : [...prevState.selectedSkincareGoals, goal];  // Select the new option

            return {
                ...prevState,
                selectedSkincareGoals: updatedSkincareGoals
            };
        });
    };

    // Toggle the selection of sleep quality options (allowing multiple selections)
    const toggleSleepQuality = (option) => {
        setQuizDetails(prevState => ({
            ...prevState,
            selectedSleepQuality: prevState.selectedSleepQuality === option ? '' : option // If selected, deselect it, otherwise select the new one
        }));
    };


    // Toggle the selection of daily activity options (allowing multiple selections)
    const toggleDailyActivityOption = (option) => {
        setQuizDetails(prevState => ({
            ...prevState,
            selectedDailyActivity: prevState.selectedDailyActivity === option ? '' : option // If selected, deselect it, otherwise select the new one
        }));
    };


    // Toggle the selection of skincare time options (allowing multiple selections)
    const toggleSkincareTimeOption = (option) => {
        setQuizDetails(prevState => {
            const updatedSkincareTime = prevState.selectedSkincareTime.includes(option)
                ? prevState.selectedSkincareTime.filter(item => item !== option)  // Deselect if already selected
                : [...prevState.selectedSkincareTime, option]; // Select if not selected

            return {
                ...prevState,
                selectedSkincareTime: updatedSkincareTime
            };
        });
    };

    // Toggle the supplement options
    const toggleSupplementOption = (option) => {
        setQuizDetails(prevState => ({
            ...prevState,
            selectedSupplement: prevState.selectedSupplement === option ? '' : option
        }));
    };

    // Toggle the pregnancy/breastfeeding options
    const togglePregnancyBreastfeedingOption = (option) => {
        setQuizDetails(prevState => ({
            ...prevState,
            selectedPregnancyBreastfeeding: prevState.selectedPregnancyBreastfeeding === option ? '' : option
        }));
    };







    // ..............................Toggleing for each quiz....................//END.......







    // Handle the continue action
    const handleContinue = () => {
        console.log("Final Quiz Details:", QuizDetails); // Log the entire collected data
        navigate('/PeriodDatePicker');
    };

    // Handle the name and age inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuizDetails(prevState => ({
            ...prevState,
            [name]: value, // Dynamically update name or age in the state
        }));
    };

    // Check if name and age are filled to enable the Continue button
    const isNameAndAgeValid = QuizDetails.name !== '' && QuizDetails.age !== '';

    // Add useEffect to track state change in QuizDetails
    useEffect(() => {
        console.log("Current QuizDetails:", QuizDetails);
    }, [QuizDetails]);  // Logs whenever QuizDetails changes


    // Redux..........................

    const formData = useSelector((state) => state.form);
    console.log('Redux data', formData)

    const dispatch = useDispatch();

    const handleQuizePostRequest = () => {
        console.log(formData)

        const finalQuizeData = {
            location_area: formData.location_area,
            area: formData.area,
            country: formData.country,
            city: formData.city,
            age: formData.age,
            daily_period: formData.daily_period,
            last_period: formData["month-1"], 
            next_period: formData["month-2"],
            pregnant_or_breastfeeding: formData.selectedPregnancyBreastfeeding,
            life_styles: formData.selectedLifestyle,
            mood_choices: formData.selectedMood,
            water_intake: formData.selectedWaterIntake,
            sweet_consumptions: formData.selectedSweetConsumption,
            skin_concerns: formData.selectedSkinConcerns,
            eating_habits: formData.selectedEatingHabits,
            take_supplements: formData.selectedSupplement,
            sleep_quality: formData.selectedSleepQuality,
            daily_activity: formData.selectedDailyActivity,
            skincare_times: formData.selectedSkincareTime,
            skincare_goals: formData.selectedSkincareGoals,
        };

        console.log("This is reva : ", finalQuizeData)

    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-[#f7f1ec] to-white relative px-4">
            {/* Top Nav */}
            <div className="pt-4">
                <AuthenticationNav />
            </div>

            {/* Overlay Image */}
            <div className='absolute bottom-15 right-20 hidden sm:block'>
                <img src={LoginPageOverLap} alt="OverlapIMG" className='scale-120' />
            </div>

            <div className='mt-2 sm:mt-35 md:mt-40 lg:mt-30 xl:mt-5 2xl:-mt-10'>
                <Stepper
                    initialStep={1}
                    onStepChange={(step) => {
                        console.log(step);
                    }}
                    onFinalStepCompleted={() => {
                        // Save data on Redux storage.......................
                        Object.entries(QuizDetails).forEach(([field, value]) => {
                            dispatch(setField({ field, value }));
                        });

                        handleQuizePostRequest()

                        navigate("/QuizGreetings")
                        console.log("All steps completed!")
                    }}
                    backButtonText="Back"
                    nextButtonText="Continue"
                >
                    {/* Step 1: Greeting and Name/Age Input */}
                    <Step>
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                Hello there! Tell us about Yourself.
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">
                                What is Your name? What is Your age? <br />
                                *We need this information to adapt better to your routine and skin needs.
                            </p>

                            {/* Name Input */}
                            <input
                                type="text"
                                name="name"
                                value={QuizDetails.name}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c4a484]"
                            />

                            {/* Age Input */}
                            <input
                                type="number"
                                name="age"
                                value={QuizDetails.age}
                                onChange={handleInputChange}
                                placeholder="Enter your age"
                                className="w-full px-4 py-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c4a484]"
                            />
                        </div>
                    </Step>

                    {/* Step 2: Lifestyle options */}
                    <Step>
                        <div className="mt-8 w-full space-y-4">
                            <h3 className='text-[28px] font-bold'>What is your lifestyle?</h3>
                            {lifestyleOptions.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => toggleLifestyleOption(option)} // Use the option object here
                                    className={`w-full px-4 py-3 text-left rounded-md border flex justify-between items-center transition cursor-pointer
                                        ${QuizDetails.selectedLifestyle.includes(option.value) ? 'bg-[#f0e5d9] border-[#c4a484]' : 'bg-white border-gray-300'}`}
                                >
                                    {option.label}
                                    {QuizDetails.selectedLifestyle.includes(option.value) && (
                                        <span className="text-[#BB9777] font-bold z-10 border border-[#BB9777] p-1 px-2 rounded-lg">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </Step>

                    {/* Step 3: Eating Habits */}
                    <Step>
                        <h3 className='text-[28px] font-bold'>What are your eating habits?</h3>

                        <div className="mt-8 w-full space-y-4">
                            {EATING_HABITS_CHOICES.map(([value, label], index) => (
                                <button
                                    key={index}
                                    onClick={() => toggleEatingHabit(value)} // Use value here to toggle
                                    className={`w-full px-4 py-3 text-left rounded-md border flex justify-between items-center transition cursor-pointer
                                        ${QuizDetails.selectedEatingHabits.includes(value) ? 'bg-[#f0e5d9] border-[#c4a484]' : 'bg-white border-gray-300'}`}
                                >
                                    {label}
                                    {QuizDetails.selectedEatingHabits.includes(value) && (
                                        <span className="text-[#BB9777] font-bold z-10 border border-[#BB9777] p-1 px-2 rounded-lg">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </Step>


                    {/* Step 4: Mood */}
                    <Step>

                        <div className="mt-8 w-full space-y-4">
                            <h3 className='text-[28px] font-bold'>What is your mood most often?</h3>

                            {moodOptions.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => toggleMoodOption(option.value)} // Use the mood option here
                                    className={`w-full px-4 py-3 text-left rounded-md border flex justify-between items-center transition cursor-pointer
                    ${QuizDetails.selectedMood.includes(option.value) ? 'bg-[#f0e5d9] border-[#c4a484]' : 'bg-white border-gray-300'}`}
                                >
                                    {option.label}
                                    {QuizDetails.selectedMood.includes(option.value) && (
                                        <span className="text-[#BB9777] font-bold z-10 border border-[#BB9777] p-1 px-2 rounded-lg">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </Step>

                    {/* Step 5: Water Intake Quiz */}
                    <Step>
                        <div className="mt-8 w-full space-y-4">
                            <h3 className="text-[28px] font-bold">How much plain water do you drink throughout your day?</h3>

                            {waterIntakeOptions.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => toggleWaterIntakeOption(option.value)} // Use the toggle function here
                                    className={`w-full px-4 py-3 text-left rounded-md border flex justify-between items-center transition cursor-pointer
                    ${QuizDetails.selectedWaterIntake === option.value ? 'bg-[#f0e5d9] border-[#c4a484]' : 'bg-white border-gray-300'}`}
                                >
                                    {option.label}
                                    {QuizDetails.selectedWaterIntake === option.value && (
                                        <span className="text-[#BB9777] font-bold z-10 border border-[#BB9777] p-1 px-2 rounded-lg">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </Step>

                    {/* Step:6 Sweet Consumption Quiz */}
                    <Step>
                        <div className="mt-8 w-full space-y-4">
                            <h3 className="text-[28px] font-bold">How many sweets do you consume throughout your day? </h3>

                            {sweetConsumptionOptions.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => toggleSweetConsumptionOption(option.value)} // Use the toggle function here
                                    className={`w-full px-4 py-3 text-left rounded-md border flex justify-between items-center transition cursor-pointer
                      ${QuizDetails.selectedSweetConsumption.includes(option.value) ? 'bg-[#f0e5d9] border-[#c4a484]' : 'bg-white border-gray-300'}`}
                                >
                                    {option.label}
                                    {QuizDetails.selectedSweetConsumption.includes(option.value) && (
                                        <span className="text-[#BB9777] font-bold z-10 border border-[#BB9777] p-1 px-2 rounded-lg">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </Step>

                    {/* Step:7 Skin Concerns/health Quiz */}
                    <Step>
                        <div className="mt-8 w-full space-y-4">
                            <h3 className="text-[28px] font-bold">What are your skin concerns?</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Apply grid layout */}
                                {skinConcernsOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => toggleSkinConcern(option.value)} // Use the toggle function
                                        className={`w-full px-4 py-3 text-left rounded-md border flex justify-between items-center transition cursor-pointer
                                       ${QuizDetails.selectedSkinConcerns.includes(option.value) ? 'bg-[#f0e5d9] border-[#c4a484]' : 'bg-white border-gray-300'}`}
                                    >
                                        {option.label}
                                        {QuizDetails.selectedSkinConcerns.includes(option.value) && (
                                            <span className="text-[#BB9777] font-bold z-10 border border-[#BB9777] p-1 px-2 rounded-lg">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Step>

                    {/* Step:8 Skincare Goals Quiz */}
                    <Step>
                        <div className="mt-8 w-full space-y-4">
                            <h3 className="text-[28px] font-bold">What are your skincare goals?</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Two-column grid layout */}
                                {skincareGoalsOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => toggleSkincareGoal(option.value)} // Use the toggle function here
                                        className={`w-full px-4 py-3 text-left rounded-md border flex justify-between items-center transition cursor-pointer
                                          ${QuizDetails.selectedSkincareGoals.includes(option.value) ? 'bg-[#f0e5d9] border-[#c4a484]' : 'bg-white border-gray-300'}`}
                                    >
                                        {option.label}
                                        {QuizDetails.selectedSkincareGoals.includes(option.value) && (
                                            <span className="text-[#BB9777] font-bold z-10 border border-[#BB9777] p-1 px-2 rounded-lg">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Step>

                    {/* Step 9: Sleep Quality Options */}
                    <Step>
                        <div className="mt-8 w-full space-y-4">
                            <h3 className="text-[28px] font-bold">What is your sleep quality like?</h3>

                            <div className="grid grid-cols-1 sm:grid-cols- gap-4"> {/* Two-column grid layout */}
                                {sleepQualityOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => toggleSleepQuality(option.value)} // Use the toggle function here
                                        className={`w-full px-4 py-3 text-left rounded-md border flex justify-between items-center transition cursor-pointer
                                         ${QuizDetails.selectedSleepQuality.includes(option.value) ? 'bg-[#f0e5d9] border-[#c4a484]' : 'bg-white border-gray-300'}`}
                                    >
                                        {option.label}
                                        {QuizDetails.selectedSleepQuality.includes(option.value) && (
                                            <span className="text-[#BB9777] font-bold z-10 border border-[#BB9777] p-1 px-2 rounded-lg">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Step>

                    {/* Step:10 Daily Activity Quiz */}
                    <Step>
                        <div className="mt-8 w-full space-y-4">
                            <h3 className="text-[28px] font-bold">How active are you daily?</h3>

                            {/* Single column layout */}
                            <div className="grid grid-cols-1 gap-4"> {/* Single column layout */}
                                {dailyActivityOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => toggleDailyActivityOption(option.value)} // Use the toggle function here
                                        className={`w-full px-4 py-3 text-left rounded-md border flex justify-between items-center transition cursor-pointer
                                      ${QuizDetails.selectedDailyActivity.includes(option.value) ? 'bg-[#f0e5d9] border-[#c4a484]' : 'bg-white border-gray-300'}`}
                                    >
                                        {option.label}
                                        {QuizDetails.selectedDailyActivity.includes(option.value) && (
                                            <span className="text-[#BB9777] font-bold z-10 border border-[#BB9777] p-1 px-2 rounded-lg">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Step>

                    {/* Step:11 Skincare Time Options */}
                    <Step>
                        <div className="mt-8 w-full space-y-4">
                            <h3 className="text-[28px] font-bold">How do you approach your skincare routine?</h3>

                            {/* Single-column grid layout */}
                            <div className="grid grid-cols-1 gap-4">
                                {skincareTimeOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => toggleSkincareTimeOption(option.value)} // Use the toggle function here
                                        className={`w-full px-4 py-3 text-left rounded-md border flex justify-between items-center transition cursor-pointer
                                        ${QuizDetails.selectedSkincareTime.includes(option.value) ? 'bg-[#f0e5d9] border-[#c4a484]' : 'bg-white border-gray-300'}`}
                                    >
                                        {option.label}
                                        {QuizDetails.selectedSkincareTime.includes(option.value) && (
                                            <span className="text-[#BB9777] font-bold z-10 border border-[#BB9777] p-1 px-2 rounded-lg">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Step>
                    {/* Step:11 supplementOptions  pregnancyBreastfeedingOptions Options */}
                    <Step>
                        <div className="mt-8 w-full space-y-4">
                            <h3 className="text-[28px] font-bold">Do you take supplements and/or are you pregnant/breastfeeding?</h3>

                            {/* Supplements Options */}
                            <div className="space-y-4">
                                <h4 className="text-xl font-semibold">Do you take any supplements?</h4>
                                {supplementOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => toggleSupplementOption(option.value)}
                                        className={`w-full px-4 py-3 text-left rounded-md border flex justify-between items-center transition cursor-pointer
                    ${QuizDetails.selectedSupplement === option.value ? 'bg-[#f0e5d9] border-[#c4a484]' : 'bg-white border-gray-300'}`}
                                    >
                                        {option.label}
                                        {QuizDetails.selectedSupplement === option.value && (
                                            <span className="text-[#BB9777] font-bold z-10 border border-[#BB9777] p-1 px-2 rounded-lg">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Pregnancy/Breastfeeding Options */}
                            <div className="space-y-4 mt-6">
                                <h4 className="text-xl font-semibold">Are you pregnant or breastfeeding?</h4>
                                {pregnancyBreastfeedingOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => togglePregnancyBreastfeedingOption(option.value)}
                                        className={`w-full px-4 py-3 text-left rounded-md border flex justify-between items-center transition cursor-pointer
                    ${QuizDetails.selectedPregnancyBreastfeeding === option.value ? 'bg-[#f0e5d9] border-[#c4a484]' : 'bg-white border-gray-300'}`}
                                    >
                                        {option.label}
                                        {QuizDetails.selectedPregnancyBreastfeeding === option.value && (
                                            <span className="text-[#BB9777] font-bold z-10 border border-[#BB9777] p-1 px-2 rounded-lg">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Step>






                </Stepper>
            </div>
        </div>
    );
};

export default LifestyleQuizStepper;
