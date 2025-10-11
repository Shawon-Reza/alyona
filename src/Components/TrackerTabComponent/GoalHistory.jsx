import React from 'react';

const GoalHistory = () => {
  // Sample goal history data - in a real app, this would come from an API
  const goalHistory = [
    {
      id: 1,
      title: "Use moisturizer for 1 month",
      startDate: "06/05/25",
      endDate: "06/06/25",
      status: "in-progress",
      statusText: "In progress"
    },
    {
      id: 2,
      title: "Add toner to my routine",
      startDate: "02/04/25",
      endDate: "02/05/25",
      status: "achieved",
      statusText: "Achieved"
    },
    {
      id: 3,
      title: "Reduce acne breakouts",
      startDate: "01/01/25",
      endDate: "01/03/25",
      status: "achieved",
      statusText: "Achieved"
    },
    {
      id: 4,
      title: "Improve skin hydration",
      startDate: "12/01/24",
      endDate: "12/31/24",
      status: "achieved",
      statusText: "Achieved"
    },
    
  ];

  // Function to handle clicking on a goal history item
  const handleGoalClick = (goal) => {
    console.log('Goal history item clicked:', goal);
    // In a real app, this might open a detailed view or edit modal
  };

  // Function to get status badge color
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'achieved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-h-[calc(100vh-35px)] overflow-auto max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Goal History</h1>
      
      <div className="space-y-4">
        {goalHistory.map((goal) => (
          <div
            key={goal.id}
            onClick={() => handleGoalClick(goal)}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
          >
            {/* Goal Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {goal.title}
            </h3>
            
            {/* Date Range */}
            <p className="text-sm text-gray-600 mb-3">
              From: {goal.startDate} to {goal.endDate}
            </p>
            
            {/* Status Badge */}
            <div className="flex justify-between items-center">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(goal.status)}`}
              >
                {goal.statusText}
              </span>
              
              {/* Additional actions could go here */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('More options clicked for goal:', goal.id);
                }}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                •••
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state - uncomment if needed */}
      {/* 
      {goalHistory.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No goals yet</h3>
          <p className="text-gray-500">Start by creating your first skincare goal!</p>
        </div>
      )}
      */}

      {/* Debug info - can be removed in production */}
      <div className="mt-6 p-3 bg-gray-100 rounded-md text-xs">
        <p className="font-semibold mb-2">Goal History Debug Info:</p>
        <p>Total Goals: {goalHistory.length}</p>
        <p>In Progress: {goalHistory.filter(g => g.status === 'in-progress').length}</p>
        <p>Achieved: {goalHistory.filter(g => g.status === 'achieved').length}</p>
      </div>
    </div>
  );
};

export default GoalHistory;