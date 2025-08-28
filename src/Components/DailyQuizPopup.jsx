// components/DailyQuizPopup.js

import React, { useState } from 'react';
import { markQuizDoneToday } from '../lib/utils';
import axiosApi from '@/api/axiosApi';
import { toast } from 'react-toastify';

const questionData = [
  {
    question: "How does your skin feel today?",
    name: "skin_feel",
    options: ['Very dry', 'Slightly dry', 'Balanced', 'Oily', 'Very oily']
  },
  {
    question: "Do you notice any irritation/redness/itching today?",
    name: "skin_sensitivity",
    options: ['None', 'Mild', 'Moderate', 'Strong', 'Severe']
  },
  {
    question: "How radiant/glowy does your skin look today?",
    name: "glow",
    options: ['Dull', 'Slightly radiant', 'Moderately radiant', 'Radiant', 'Very radiant']
  },
  {
    question: "Did you complete your skincare routine yesterday?",
    name: "completed_routine",
    options: ['Yes fully', 'Partially', 'No']
  },
  {
    question: "How effective do you feel your products were today?",
    name: "product_effectiveness",
    options: ['Not effective', 'Slightly effective', 'Effective', 'Very effective', 'Extremely effective']
  },
  {
    question: "How many hours of sleep did you get last night?",
    name: "sleep",
    options: ['<5', '5-6', '6-7', '7-8', '8+']
  },
  {
    question: "How would you rate your stress level today?",
    name: "stress",
    options: ['Low', 'Medium', 'High', 'Very high']
  }
];

const DailyQuizPopup = ({ onClose }) => {
  const [answers, setAnswers] = useState({});

  const handleChange = (name, value) => {
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questionData.length) {
      alert('Please answer all questions.');
      return;
    }
    console.log("Submitted quiz:", answers); 

    // Post answers to backend
    axiosApi.post('/accounts/api/v1/daily-quiz', {
      ...answers,
      quiz_done: true
    })
      .then(response => {
        toast.success("Quiz submitted successfully!")
        console.log(response.data)

        markQuizDoneToday();
        onClose();

      })
      .catch(error => {
        console.log(error);
        toast.error("Failed to submit quiz. Please try again.")
      });

  };

  const handleSkip = () => {
    markQuizDoneToday();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 bg-opacity-30">
      <div className="bg-white/95 p-8 rounded-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] shadow-xl transition-all transform duration-300 ease-in-out">

        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Daily Skin Quiz</h2>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          {questionData.map((q, idx) => (
            <div key={idx}>
              <p className="text-lg font-semibold text-gray-700">{q.question}</p>
              <div className="flex flex-wrap gap-3 mt-3">
                {q.options.map(opt => (
                  <button
                    key={opt}
                    className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition duration-200 ease-in-out ${answers[q.name] === opt
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-blue-500'
                      }`}
                    onClick={() => handleChange(q.name, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            className="text-gray-600 hover:text-gray-800 text-sm font-medium transition duration-150 ease-in-out"
            onClick={handleSkip}
          >
            Skip
          </button>
          <div className="space-x-4">
            <button
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full text-sm font-medium transition duration-200 ease-in-out hover:bg-gray-400"
              onClick={handleSkip}
            >
              Skip
            </button>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition duration-200 ease-in-out hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default DailyQuizPopup;
