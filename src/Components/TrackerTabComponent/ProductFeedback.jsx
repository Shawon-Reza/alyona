import React, { useState } from 'react';
import { FaStar, FaRegStar, FaSmile, FaFrown, FaCheck } from 'react-icons/fa';

const ProductFeedback = () => {
  // State for feedback
  const [feedback, setFeedback] = useState({
    rating: null, // 'like' or 'dislike'
    dislikedAspects: [],
    comment: ''
  });

  // State for UI
  const [showDislikeReasons, setShowDislikeReasons] = useState(false);

  // Product data (could come from props in real app)
  const product = {
    name: "Alpha Beta Pore Perfecting Cleansing Gel",
    progress: 70,
    progressText: "Get cleaner"
  };

  // Dislike reasons options
  const dislikeReasons = [
    "I don't see results",
    "Texture",
    "Smell",
    "Packaging experience"
  ];

  // Handle like/dislike selection
  const handleRatingSelect = (rating) => {
    console.log('Rating selected:', rating);
    setFeedback(prev => ({
      ...prev,
      rating,
      // Reset disliked aspects if switching from dislike to like
      ...(rating === 'like' && { dislikedAspects: [] })
    }));

    // Show/hide dislike reasons section
    if (rating === 'dislike') {
      setShowDislikeReasons(true);
    } else {
      setShowDislikeReasons(false);
    }
  };

  // Handle dislike reason toggle
  const handleDislikeReasonToggle = (reason) => {
    console.log('Toggling dislike reason:', reason);
    setFeedback(prev => {
      const currentReasons = [...prev.dislikedAspects];
      if (currentReasons.includes(reason)) {
        return {
          ...prev,
          dislikedAspects: currentReasons.filter(r => r !== reason)
        };
      } else {
        return {
          ...prev,
          dislikedAspects: [...currentReasons, reason]
        };
      }
    });
  };

  // Handle comment change
  const handleCommentChange = (e) => {
    console.log('Comment changed:', e.target.value);
    setFeedback(prev => ({
      ...prev,
      comment: e.target.value
    }));
  };

  // Validate form before submission
  const validateForm = () => {
    if (!feedback.rating) {
    //   alert('Please select whether you like or dislike the product');
      return false;
    }

    if (feedback.rating === 'dislike' && feedback.dislikedAspects.length === 0) {
    //   alert('Please select at least one reason for disliking the product');
      return false;
    }

    return true;
  };

  // Handle feedback submission
  const handleSubmitFeedback = async () => {
    console.log('=== SUBMITTING FEEDBACK ===');

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Prepare data for API
    const submissionData = {
      product: product.name,
      rating: feedback.rating,
      dislikedAspects: feedback.dislikedAspects,
      comment: feedback.comment,
      pointsEarned: 2,
      timestamp: new Date().toISOString(),
      metadata: {
        progress: product.progress,
        progressText: product.progressText
      }
    };

    console.log('Feedback data to be sent:', submissionData);

    try {
      // Simulate API call
      console.log('Calling feedback API...');
      
      // In real implementation:
      // const response = await fetch('/api/feedback', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(submissionData)
      // });

      // Simulate API response
      const mockResponse = {
        status: 'success',
        message: 'Feedback submitted successfully',
        data: {
          ...submissionData,
          id: Math.random().toString(36).substr(2, 9),
          submittedAt: new Date().toISOString()
        }
      };

      console.log('API Response:', mockResponse);

      // Show success message
      alert('Thank you for your feedback! You earned 2 points.');

      // Reset form
      setFeedback({
        rating: null,
        dislikedAspects: [],
        comment: ''
      });
      setShowDislikeReasons(false);

    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback. Please try again.');
    }
  };

  // Progress bar component
  const ProgressBar = ({ percentage, text }) => (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{percentage}%</span>
        <span className="text-sm text-gray-500">{text}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );

  // Like/Dislike button component
  const RatingButton = ({ type, selected, onClick }) => {
    const isLike = type === 'like';
    const Icon = isLike ? FaSmile : FaFrown;
    const text = isLike ? "I like it" : "I don't recommend it";
    const selectedClass = isLike 
      ? 'bg-green-100 border-green-500 text-green-700' 
      : 'bg-red-100 border-red-500 text-red-700';
    const defaultClass = 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200';

    return (
      <button
        onClick={() => onClick(type)}
        className={`flex items-center justify-center p-4 border-2 rounded-lg font-medium transition-all duration-200 ${
          selected ? selectedClass : defaultClass
        } ${isLike ? 'mr-3' : 'ml-3'}`}
      >
        <Icon className={`mr-2 text-lg ${selected ? 'opacity-100' : 'opacity-60'}`} />
        {text}
      </button>
    );
  };

  // Dislike reason checkbox component
  const DislikeReasonCheckbox = ({ reason, checked, onChange }) => (
    <div
      onClick={() => onChange(reason)}
      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
        checked
          ? 'border-red-500 bg-red-50'
          : 'border-gray-200 hover:bg-gray-50'
      }`}
    >
      <div
        className={`w-5 h-5 border rounded flex items-center justify-center mr-3 ${
          checked
            ? 'bg-red-500 border-red-500'
            : 'border-gray-300'
        }`}
      >
        {checked && <FaCheck className="text-white text-xs" />}
      </div>
      <span className="text-gray-700">{reason}</span>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Give your feedback</h1>

      {/* Product Info */}
      <div className="mb-6 border-2 border-[#EFEBEB] p-2 rounded-2xl ">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h2>
        <ProgressBar percentage={product.progress} text={product.progressText} />
      </div>

      {/* Feedback Question */}
      <div className="mb-6">
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          What do you think of this product?
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Share your opinion and earn 2 points
        </p>

        {/* Like/Dislike Buttons */}
        <div className="flex justify-between mb-6">
          <RatingButton
            type="like"
            selected={feedback.rating === 'like'}
            onClick={handleRatingSelect}
          />
          <RatingButton
            type="dislike"
            selected={feedback.rating === 'dislike'}
            onClick={handleRatingSelect}
          />
        </div>

        {/* Dislike Reasons Section */}
        {showDislikeReasons && (
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">
              What aspect did you dislike?
            </h4>
            <div className="space-y-2">
              {dislikeReasons.map((reason) => (
                <DislikeReasonCheckbox
                  key={reason}
                  reason={reason}
                  checked={feedback.dislikedAspects.includes(reason)}
                  onChange={handleDislikeReasonToggle}
                />
              ))}
            </div>
          </div>
        )}

        {/* Additional Comments */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional comments (optional)
          </label>
          <textarea
            value={feedback.comment}
            onChange={handleCommentChange}
            placeholder="Share more details about your experience..."
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitFeedback}
        disabled={!feedback.rating || (feedback.rating === 'dislike' && feedback.dislikedAspects.length === 0)}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Send my feedback
      </button>

      {/* Debug info - can be removed in production */}
      <div className="mt-4 p-3 bg-gray-100 rounded-md text-xs">
        <p className="font-semibold mb-2">Feedback Debug Info:</p>
        <p>Rating: {feedback.rating || 'Not selected'}</p>
        <p>Disliked Aspects: {feedback.dislikedAspects.join(', ') || 'None'}</p>
        <p>Comment: {feedback.comment || 'None'}</p>
        <p>Form Valid: {validateForm() ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default ProductFeedback;