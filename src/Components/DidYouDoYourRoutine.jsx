import React from 'react'
import { Sun, Moon } from 'lucide-react'

export const DidYouDoYourRoutine = ({ data }) => {
    // Accept either an object { am_usage, pm_usage } OR an array like [ product, { am_usage, pm_usage } ]
    const usage = (() => {
        if (!data) return { am_usage: Array(7).fill(0), pm_usage: Array(7).fill(0) }
        if (Array.isArray(data)) {
            // prefer an element that actually contains usage arrays
            const found = data.find(item => item && (Array.isArray(item.am_usage) || Array.isArray(item.pm_usage)))
            if (found) return found
            // fallback to common positions
            if (data[1] && (Array.isArray(data[1].am_usage) || Array.isArray(data[1].pm_usage))) return data[1]
            if (data[0] && (Array.isArray(data[0].am_usage) || Array.isArray(data[0].pm_usage))) return data[0]
            return { am_usage: Array(7).fill(0), pm_usage: Array(7).fill(0) }
        }
        return data
    })()

    const am = Array.isArray(usage.am_usage) ? usage.am_usage : Array(7).fill(0)
    const pm = Array.isArray(usage.pm_usage) ? usage.pm_usage : Array(7).fill(0)

    // Debugging: print normalized arrays when not in production
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.log('DidYouDoYourRoutine normalized', { data, usage, amLength: am.length, pmLength: pm.length, am, pm })
    }

    return (
        <div className="">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Mi Daily Routine</h3>
                <span className="text-sm text-gray-500">Track your AM / PM usage</span>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 flex items-center justify-center">
                        <Sun size={18} className="text-yellow-400" />
                    </div>
                    <div className="flex-1">
                        {/* horizontal scrolling & no-wrap to avoid hiding the last item on very small screens */}
                        <div className="flex items-end gap-2 flex-nowrap overflow-x-auto">
                            {am.map((v, i) => (
                                <div key={i} className="flex flex-col items-center min-w-[20px]">
                                    <div className={`w-6 md:w-7 h-2 rounded-sm ${v ? 'bg-violet-500' : 'bg-violet-200'}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-10 flex items-center justify-center">
                        <Moon size={18} className="text-indigo-500" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-end gap-2 flex-nowrap overflow-x-auto">
                            {pm.map((v, i) => (
                                <div key={i} className="flex flex-col items-center min-w-[20px]">
                                    <div className={`w-6 md:w-7 h-2 rounded-sm ${v ? 'bg-violet-500' : 'bg-violet-200'}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
