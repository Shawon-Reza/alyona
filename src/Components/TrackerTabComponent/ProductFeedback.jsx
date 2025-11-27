import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ProductFeedback = ({ product = {}, onSubmit = () => {}, onSkip = () => {} }) => {
  // State for feedback
  const [starRating, setStarRating] = useState(0); // 1-5
  const [textureChoice, setTextureChoice] = useState('Not sure');
  const [packagingChoice, setPackagingChoice] = useState('Not sure');
  const [skinFeelChoice, setSkinFeelChoice] = useState('Not sure');
  const [comment, setComment] = useState('');

  // Product data comes from `product` prop
  const productName = product?.productName || product?.name || 'Product';
  const productProgress = product?.compatibility_score ? Math.round(product.compatibility_score) : (product?.percent ? parseInt(String(product.percent).replace('%','')) || 0 : 0);
  const productProgressText = product?.progressText || 'Get cleaner';

  

  // Handle comment change
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Validate form before submission
  const validateForm = () => {
    if (!starRating || starRating < 1) return false;
    if (!textureChoice) return false;
    if (!packagingChoice) return false;
    if (!skinFeelChoice) return false;
    return true;
  };

  // Handle feedback submission
  const handleSubmitFeedback = async () => {
    console.log('=== SUBMITTING FEEDBACK ===');

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Prepare data in the requested shape (rating as numeric 1-5)
    const submissionData = {
      product_id: product?.id,
      productName: productName,
      rating: starRating,
      texture: textureChoice || 'Not sure',
      skin_feel: skinFeelChoice || 'Not sure',
      packaging: packagingChoice || 'Not sure',
      description: comment || ''
    };

    console.log('Feedback data to be sent (formatted):', submissionData);
    console.log('Submitted data (JSON):', JSON.stringify(submissionData));

    try {
      // Simulate API call (replace with real API request if desired)
      console.log('Calling feedback API...');

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

      // Call parent callback with submission data (if provided)
      try {
        onSubmit(submissionData);
      } catch (e) {
        console.warn('onSubmit handler threw:', e);
      }

      // Call parent callback with submission data (if provided)
      try {
        onSubmit(submissionData);
      } catch (e) {
        console.warn('onSubmit handler threw:', e);
      }

      // Show success message
      alert('Thank you for your feedback!');

      // Reset form
      setStarRating(0);
      setTextureChoice('Not sure');
      setPackagingChoice('Not sure');
      setSkinFeelChoice('Not sure');
      setComment('');

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

  // Star rating component
  const StarRating = ({ value, onChange }) => (
    <div className="flex items-center">
      {[1,2,3,4,5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="p-1 text-2xl text-yellow-500"
          aria-label={`${n} star`}
        >
          {n <= value ? <FaStar /> : <FaRegStar />}
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Give your feedback</h1>

      {/* Product Info */}
      <div className="mb-6 border-2 border-[#EFEBEB] p-2 rounded-2xl ">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {productName}
        </h2>
        <ProgressBar percentage={productProgress} text={productProgressText} />
      </div>

      {/* Feedback Question */}
      <div className="mb-6">
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          What do you think of this product?
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Share your opinion and earn 2 points
        </p>

        {/* Star Rating */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating:</label>
          <StarRating value={starRating} onChange={setStarRating} />
        </div>

        {/* Radio groups */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Texture:</label>
          <div className="flex items-center gap-4">
            {['Like','Dislike','Not sure'].map(opt => (
              <label key={opt} className="inline-flex items-center gap-2">
                <input type="radio" name="texture" value={opt} checked={textureChoice===opt} onChange={() => setTextureChoice(opt)} />
                <span className="text-sm">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Packaging:</label>
          <div className="flex items-center gap-4">
            {['Like','Dislike','Not sure'].map(opt => (
              <label key={opt} className="inline-flex items-center gap-2">
                <input type="radio" name="packaging" value={opt} checked={packagingChoice===opt} onChange={() => setPackagingChoice(opt)} />
                <span className="text-sm">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Skin Feel:</label>
          <div className="flex items-center gap-4">
            {['Like','Dislike','Not sure'].map(opt => (
              <label key={opt} className="inline-flex items-center gap-2">
                <input type="radio" name="skinfeel" value={opt} checked={skinFeelChoice===opt} onChange={() => setSkinFeelChoice(opt)} />
                <span className="text-sm">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Comments */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write your review..."
            className="w-full p-3 border border-[#D6A98C] rounded-md resize-none focus:outline-none"
            rows="4"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmitFeedback}
          disabled={!validateForm()}
          className="flex-1 bg-[#B78E6D] text-white py-3 px-4 rounded-md font-medium hover:opacity-95 transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Review
        </button>
        <button
          onClick={() => onSkip(product)}
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-md font-medium hover:opacity-95 transition-colors focus:outline-none"
        >
          Skip
        </button>
      </div>

      {/* Debug info - can be removed in production */}
      <div className="mt-4 p-3 bg-gray-100 rounded-md text-xs">
        <p className="font-semibold mb-2">Feedback Debug Info:</p>
        <p>Star Rating: {starRating || 'Not selected'}</p>
        <p>Texture: {textureChoice}</p>
        <p>Packaging: {packagingChoice}</p>
        <p>Skin Feel: {skinFeelChoice}</p>
        <p>Comment: {comment || 'None'}</p>
        <p>Form Valid: {validateForm() ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default ProductFeedback;