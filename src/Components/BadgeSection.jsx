import React, { useEffect } from 'react';
import {
    FaStar,
    FaMagic,
    FaMedal,
    FaSun,
    FaHeart,
    // FaDroplet,
    FaLeaf,
    FaFlask
} from 'react-icons/fa';

const Badge = ({ label, icon: Icon, color = 'default' }) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-700 border-blue-200',
        purple: 'bg-purple-50 text-purple-700 border-purple-200',
        orange: 'bg-orange-50 text-orange-700 border-orange-200',
        default: 'bg-white text-gray-700 border-gray-300',
    };

    return (
        <div className={`w-[130px] h-[90px] flex flex-col items-center justify-center rounded-xl border shadow-sm ${colorClasses[color]}`}>
            <Icon className="text-xl mb-1" />
            <span className="text-sm font-medium text-center">{label}</span>
        </div>
    );
};

const BadgeSection = ({ title, badges, color }) => (
    <div className="mb-10">
        <h3 className="text-base font-semibold mb-4">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
                <Badge
                    key={index}
                    label={badge.label}
                    icon={badge.icon}
                    color={color}
                />
            ))}
        </div>
    </div>
);

const BadgesPage = () => {
    useEffect(() => {
        // fetch badges from backend and log the response
        import('@/api/axiosApi').then(({ default: axiosApi }) => {
            axiosApi.get('/accounts/api/v1/categorized-badges')
                .then(res => {
                    console.log('GET /accounts/api/v1/badges response:', res.data);
                })
                .catch(err => {
                    console.error('Failed to fetch badges:', err);
                });
        }).catch(err => console.error('Failed to load axiosApi for badges:', err));
    }, []);

    return (
        <div className="min-h-screen  py-12  px-5 text-gray-800">

            <div className=" ">

                {/* Reviews */}
                <BadgeSection
                    title="Reviews badges:"
                    color="blue"
                    badges={[
                        { label: 'My first review', icon: FaStar },
                        { label: '5 reviews', icon: FaStar },
                        { label: '10 reviews', icon: FaStar },
                        { label: 'Skincare expert', icon: FaMedal },
                        { label: 'Skincare expert', icon: FaMedal },
                    ]}
                />

                {/* Routine */}
                <BadgeSection
                    title="Routine badges:"
                    color="purple"
                    badges={[
                        { label: 'My first product', icon: FaMagic },
                        { label: '3 products', icon: FaMagic },
                        { label: '5 products', icon: FaMagic },
                        { label: 'Day/Night', icon: FaSun },
                    ]}
                />

                {/* Product */}
                <BadgeSection
                    title="Product badges:"
                    color="orange"
                    badges={[
                        { label: "You've tried 3 cleansers", icon: FaHeart },
                        { label: 'Add Facial Oil', icon: FaHeart },
                        { label: 'Mask Lover', icon: FaHeart },
                        { label: 'Mark Lover', icon: FaHeart },
                    ]}
                />

                {/* Ingredients */}
                <BadgeSection
                    title="Ingredients badges:"
                    color="default"
                    badges={[
                        { label: 'Aloe Vera', icon: FaLeaf },
                        { label: 'Lotus flower extract', icon: FaLeaf },
                        { label: 'Tea tree oil', icon: FaHeart },
                        { label: 'Tea tree oil', icon: FaHeart },
                    ]}
                />
            </div>
        </div>
    );
};

export default BadgesPage;
