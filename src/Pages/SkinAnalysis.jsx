import React from "react";
import SkinAnalysisPageIMG from "../assets/SkinAnalysisPageIMG.png";
import AuthNav from "../Components/AuthNav";
import RowButton from "../Components/RowButton";
import LoginPageOverLap from '../assets/LoginPageOverLap.png';

export default function SkinAnalysis() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#fdf8f3] to-[#e8e3de] p-4 md:p-6 pb-32 md:pb-24">
            <div className=" mx-auto  p-4 md:p-8">

                <AuthNav></AuthNav>

                <div className="absolute bottom-0 right-0">
                    <img src={LoginPageOverLap} alt="OverlapIMG" />
                </div>

                <div className="mt-20 flex flex-col lg:flex-row gap-8">
                    {/* Left Panel */}
                    <div className="lg:w-1/3 space-y-4 text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start">
                            <img
                                src={SkinAnalysisPageIMG}
                                alt="avatar"
                                className="w-20 h-20 mb-2"
                            />
                        </div>
                        <div className="text-2xl font-semibold">Normal Type</div>
                        <p className="text-gray-600 text-lg">
                            Congratulations! You are a happy owner of a normal skin type. Even if you
                            might have some skin concerns like wrinkles or dark circles, your skin is
                            perfect! Your skincare routine should be focused on maintaining your skin
                            beauty and tackling your specific concerns that is quite doable with right
                            ingredients. Protect the microbiome (natural skin’s barrier) as it does a
                            great job in keeping your skin well-balanced. Right diet and lifestyle will
                            support your skin natural beauty, correct skincare routine will prolong your
                            youth and fortify your skin even more.
                        </p>
                    </div>

                    {/* Right Panel */}
                    <div className="lg:w-2/3">
                        <div className="text-lg font-medium mb-4">About your skin</div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { label: "Current level of stress", value: 79 },
                                { label: "Level of activity", value: 79 },
                                { label: "Beauty sleep quality", value: 50 },
                                // { label: "Water intake", value: 79 },
                                // { label: "Diet efficiency", value: 79 },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="bg-[#fdf6f0] rounded-xl p-4 shadow-sm text-center flex flex-col items-center justify-center"
                                >
                                    <div
                                        className="radial-progress text-[#c7885e] mb-2"
                                        style={{ "--value": item.value }}
                                        role="progressbar"
                                        aria-valuenow={item.value}
                                    >
                                        {item.value}%
                                    </div>
                                    <div className="text-sm text-gray-700 mt-1">{item.label}</div>
                                </div>
                            ))}
                        </div>


                        <div className="my-10">
                            <div className="text-sm font-medium text-gray-700 mb-2">Recommendations</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "Practice daily meditation or deep breathing exercises",
                                    "Avoid screens 1 hour before bed",
                                    "Include protein in every meal",
                                    "Create a relaxing bedtime routine",
                                ].map((rec, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm text-sm flex items-start gap-2"
                                    >
                                        <span className="text-yellow-500">💡</span> {rec}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className="w-full my-6"
                            style={{
                                borderTop: "1px dashed #BB9777",
                                borderImage: "repeating-linear-gradient(to right, #BB9777 0 16px, transparent 8px 32px)",
                                borderImageSlice: 1,
                            }}
                        ></div>



                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { label: "Water intake", value: 79 },
                                { label: "Diet efficiency", value: 79 },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="bg-[#fdf6f0] rounded-xl p-4 shadow-sm text-center flex flex-col items-center justify-center"
                                >
                                    <div
                                        className="radial-progress text-[#c7885e] mb-2"
                                        style={{ "--value": item.value }}
                                        role="progressbar"
                                        aria-valuenow={item.value}
                                    >
                                        {item.value}%
                                    </div>
                                    <div className="text-sm text-gray-700 mt-1">{item.label}</div>
                                </div>
                            ))}
                        </div>


                        <div className="absolute bottom-5 right-8 md:right-14 md:bottom-7 lg:bottom-20 lg:right-20" >
                            <RowButton text="Let's get started"

                                onClick={() => console.log("Started!")} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
