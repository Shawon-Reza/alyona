import React from 'react';
import { FaWater, FaUser, FaSmile } from 'react-icons/fa';
import { PiTargetBold } from 'react-icons/pi';
import AboutMySkin from './AboutMySkin';
import GoalProgress from './GoalProgress';
import RoutineCompletion from './RoutineCompletion';
import DataSetSummary from './DataSetSummary';

const MetricCard = ({ icon: Icon, value, label }) => (
    <div className="flex flex-col items-center justify-center px-4 py-3 rounded-xl bg-white shadow-sm border text-sm text-gray-800 w-full sm:w-auto">
        <Icon className="text-lg mb-1" />
        <div className="font-semibold">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
    </div>
);


const DataSetCard = ({ label }) => (
    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-gray-300 bg-white text-xs text-gray-700">
        <div className="font-bold text-sm">{label}</div>
        <div className="text-[10px] text-gray-500">AVG 153</div>
        <div className="text-[10px] text-gray-500">151/753</div>
    </div>
);

const ReportDetails = () => {
    return (
        <div className=" py-10 text-gray-800 w-full">
            {/* Header */}
            <div className="text-sm font-semibold mb-4">Reports &gt; <span className="text-gray-600">May 2025</span></div>

            {/* about my skin + Goal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* About my skin */}
                <AboutMySkin></AboutMySkin>
                {/* Goal */}
                <GoalProgress></GoalProgress>
            </div>


            {/* Routine & Data Set */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                {/* Routine Completion */}
                <RoutineCompletion></RoutineCompletion>

                {/* Data Set */}

                <DataSetSummary></DataSetSummary>
            </div>

            {/* Guide */}
            <div className=" p-6   text-sm leading-relaxed">
                <h3 className="font-bold mb-2 text-xl">Skincare Guide for Normal Skin Type</h3>
                <p className="mb-1 text-gray-600">A simplified skincare routine for those blessed with normal skin type, focusing on maintenance and prevention:</p>
                <ul className="list-disc ml-6 text-gray-700 space-y-1">
                    <li><strong>Morning Routine:</strong></li>
                    <ul className="ml-5 list-disc">
                        <li>Gentle cleanser</li>
                        <li>Light moisturizer</li>
                        <li>Sunscreen (SPF 30+)</li>
                    </ul>
                    <li><strong>Evening Routine:</strong></li>
                    <ul className="ml-5 list-disc">
                        <li>Makeup remover (if needed)</li>
                        <li>Cleanser</li>
                        <li>Light serum (optional)</li>
                    </ul>
                </ul>
            </div>
        </div>
    );
};

export default ReportDetails;
