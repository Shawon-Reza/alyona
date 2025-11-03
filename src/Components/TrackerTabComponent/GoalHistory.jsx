import React, { useState } from 'react';
import axiosApi from '@/api/axiosApi'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { AiOutlineDelete } from 'react-icons/ai';

const GoalHistory = ({ data }) => {
  // Use data passed from parent (expected to be an array). No local dummy data.
  const goalHistory = Array.isArray(data) ? data : [];

  // Track which goal is expanded for answering (by id)
  const [activeGoalId, setActiveGoalId] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  // Function to handle clicking on a goal history item (toggle inline answer UI)
  const handleGoalClick = (goal) => {
    setActiveGoalId(prev => (prev === goal.id ? null : goal.id))
  };

  const closeInline = () => setActiveGoalId(null)

  const handleGoalAnswer = async (answerBool) => {
    const goal = goalHistory.find(g => g.id === activeGoalId)
    if (!goal) return
    setIsSaving(true)
    try {
      // Post the user's answer for this goal. Adjust endpoint/payload as backend expects.
      // await axiosApi.post('/products/api/v1/goal-response', {
      //   goal_id: goal.id,
      //   answer: answerBool,
      // })
      console.log(goal.id, answerBool)
      toast.success('Response saved')
    } catch (err) {
      console.error('Failed to save goal response', err)
      toast.error('Failed to save response')
    } finally {
      setIsSaving(false)
      closeInline()
    }
  }

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

  // Handler for delete click (stops propagation so it doesn't toggle the card)
  const queryClient = useQueryClient()
  const handleDeleteClick = (e, id) => {
    e.stopPropagation()
    console.log('Delete goal id:', id)
    // Call delete API and invalidate goalData on success
    axiosApi.delete(`/products/api/v1/goals/${id}`)
      .then((res) => {
        if (res && res.status >= 200 && res.status < 300) {
          toast.success('Goal deleted')
          queryClient.invalidateQueries(['goalData'])
        } else {
          toast.error('Failed to delete goal')
        }
      })
      .catch((err) => {
        console.error('Delete failed', err)
        toast.error('Failed to delete goal')
      })
  }

  return (
    <div className="max-h-[calc(100vh-35px)] overflow-auto max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Goal History</h1>

      <div className="space-y-4">
        {goalHistory.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No goals yet</h3>
            <p className="text-gray-500">Start by creating your first skincare goal!</p>
          </div>
        ) : (
          goalHistory.map((goal) => {
            // Normalize fields from parent data shape
            const title = goal.custom_goal || (Array.isArray(goal.goals) ? goal.goals[0] : null) || 'Untitled goal'
            const startDate = goal.created_at ? new Date(goal.created_at).toLocaleDateString() : (goal.startDate || '')
            const endDate = goal.updated_at ? new Date(goal.updated_at).toLocaleDateString() : (goal.endDate || '')
            const status = goal.is_complete ? 'achieved' : (goal.is_active ? 'in-progress' : 'failed')
            const statusText = goal.is_complete ? 'Achieved' : (goal.is_active ? 'In progress' : 'Failed')

            return (
              <div
                key={goal.id}
                onClick={() => handleGoalClick(goal)}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 mb-3">From: {startDate} {endDate ? `to ${endDate}` : ''}</p>

                <div className="flex justify-between items-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(status)}`}>
                    {statusText}
                  </span>

                  <AiOutlineDelete
                    size={18}
                    onClick={(e) => handleDeleteClick(e, goal.id)}
                    className='hover:scale-110 transform transition-transform duration-700 ease-in-out cursor-pointer'
                    title='Delete goal'
                  />
                </div>

                {/* Inline answer section shown when this goal is active */}
                {activeGoalId === goal.id && (
                  <div className="mt-4 border-t pt-4 flex flex-col gap-3">
                    <p className="text-sm text-gray-600">Did you complete this goal?</p>
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleGoalAnswer(false) }}
                        disabled={isSaving}
                        className="px-4 py-2 rounded bg-gray-100"
                      >
                        No
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleGoalAnswer(true) }}
                        disabled={isSaving}
                        className="px-4 py-2 rounded bg-amber-500 text-white"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
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
        <p>In Progress: {goalHistory.filter(g => !g.is_complete && g.is_active).length}</p>
        <p>Achieved: {goalHistory.filter(g => g.is_complete).length}</p>
      </div>

      {/* Modal removed — using inline answer section per-goal instead */}
    </div>
  );
};

export default GoalHistory;