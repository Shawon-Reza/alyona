import React, { useState } from 'react'

const MyBadges = ({ data }) => {
    const badges = Array.isArray(data) ? data : []
    const [flippedIndex, setFlippedIndex] = useState(null)

    const toggleFlip = (i) => {
        setFlippedIndex((prev) => (prev === i ? null : i))
    }

    const formatDate = (iso) => {
        if (!iso) return '—'
        try {
            return new Date(iso).toLocaleDateString()
        } catch (e) {
            return iso
        }
    }

    const bgFor = (color) => {
        switch ((color || '').toLowerCase()) {
            case 'platinum':
                return 'bg-gradient-to-br from-slate-100 to-white'
            case 'silver':
                return 'bg-gray-100'
            case 'golden':
                return 'bg-yellow-50'
            case 'normal':
            default:
                return 'bg-white'
        }
    }

    return (
        <div className="">
            <h2 className="text-base font-semibold text-gray-800 mb-3">My Badges</h2>
            <div className="flex overflow-x-auto space-x-3 pb-2  ">
                {badges.map((badge, i) => {
                    const isFlipped = flippedIndex === i
                    return (
                        <div key={i} className="flex-shrink-0 hover:scale-101 transition-transform duration-300 ease-in-out">
                            {/* perspective wrapper */}
                            <div style={{ perspective: 1000 }} className="min-w-[140px]">
                                <button
                                    onClick={() => toggleFlip(i)}
                                    aria-pressed={isFlipped}
                                    aria-label={`Toggle details for ${badge.name || badge.label || 'badge'}`}
                                    className="w-[220px] h-36 p-0 bg-transparent border-0"
                                >
                                    <div
                                            className={`w-full h-full relative transition-transform duration-600 ease-in-out`}
                                            style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                                        >
                                            {/* Front side */}
                                            <div
                                                className={`absolute inset-0 ${bgFor(badge.color)} rounded-xl shadow-md flex items-center gap-3 p-4`}
                                                style={{ backfaceVisibility: 'hidden' }}
                                            >
                                            <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-gray-50">
                                                <div className="text-2xl">{badge.icon || '🏅'}</div>
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="text-sm font-medium text-gray-800 truncate">{badge.name || badge.label || 'Badge'}</div>
                                                <div className="text-xs text-gray-400">Tap to view details</div>
                                            </div>
                                        </div>

                                        {/* Back side */}
                                        <div
                                            className={`absolute inset-0 ${bgFor(badge.color)} rounded-xl shadow-md p-4`}
                                            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                                        >
                                            <div className="text-sm font-semibold text-gray-800 mb-2">{badge.name || badge.label || 'Badge'}</div>
                                            <div className="text-xs text-gray-500">Category: <span className="text-gray-800">{badge.category || '—'}</span></div>
                                            <div className="text-xs text-gray-500">Earned at: <span className="text-gray-800">{formatDate(badge.earned_at)}</span></div>
                                            {badge.number_of_days !== null && badge.number_of_days !== undefined && (
                                                <div className="text-xs text-gray-500">Streak days: <span className="text-gray-800">{badge.number_of_days}</span></div>
                                            )}
                                            {badge.reason && (
                                                <div className="text-xs text-gray-500 mt-2">Reason: <span className="text-gray-800">{badge.reason}</span></div>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyBadges