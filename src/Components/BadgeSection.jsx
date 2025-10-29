import React, { useEffect, useState } from 'react';
import axiosApi from '@/api/axiosApi';
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

const Badge = ({ label, icon, color = 'default' }) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-700 border-blue-200',
        purple: 'bg-purple-50 text-purple-700 border-purple-200',
        orange: 'bg-orange-50 text-orange-700 border-orange-200',
        default: 'bg-white text-gray-700 border-gray-300',
    };

    return (
        <div className={`w-[130px] h-[90px] flex flex-col items-center justify-center rounded-xl border shadow-sm ${colorClasses[color]}`}>
            {/* icon can be a React component or a string/emoji from the API */}
            {typeof icon === 'string' && icon ? (
                <span className="text-xl mb-1">{icon}</span>
            ) : (typeof icon === 'function' ? (
                // icon is a React component (function/class)
                (() => {
                    const IconComp = icon;
                    return <IconComp className="text-xl mb-1" />;
                })()
            ) : (
                <FaFlask className="text-xl mb-1" />
            ))}
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
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        axiosApi.get('/accounts/api/v1/categorized-badges')
            .then(res => {
                console.log('GET /accounts/api/v1/categorized-badges response:', res.data);
                if (!mounted) return;
                setCategories(Array.isArray(res.data) ? res.data : []);
            })
            .catch(err => {
                console.error('Failed to fetch badges:', err);
                if (mounted) setError(err);
            })
            .finally(() => mounted && setLoading(false));

        return () => { mounted = false; };
    }, []);

    const mapColor = (c) => {
        if (!c) return 'default';
        const lc = String(c).toLowerCase();
        if (lc.includes('blue')) return 'blue';
        if (lc.includes('purple')) return 'purple';
        if (lc.includes('orange')) return 'orange';
        return 'default';
    };

    // Choose a deterministic color for a category when the API doesn't provide one.
    const pickColorByName = (name, idx) => {
        const palette = ['blue', 'purple', 'orange', 'default'];
        if (!name) return palette[idx % palette.length];
        // simple hash from name to pick a color deterministically
        let h = 0;
        for (let i = 0; i < name.length; i++) {
            h = (h << 5) - h + name.charCodeAt(i);
            h |= 0;
        }
        return palette[Math.abs(h) % palette.length];
    };

    return (
        <div className="min-h-screen py-12 px-5 text-gray-800">
            <div>
                {loading ? (
                    <div>Loading badges...</div>
                ) : error ? (
                    <div className="text-red-500">Failed to load badges.</div>
                ) : categories.length === 0 ? (
                    <div className="text-sm text-gray-500">No badges yet.</div>
                ) : (
                    categories.map((cat, idx) => {
                        const categoryColor = cat.color ? mapColor(cat.color) : pickColorByName(cat.category, idx);
                        return (
                            <BadgeSection
                                key={idx}
                                title={cat.category}
                                color={categoryColor}
                                badges={(cat.badges || []).map(b => ({ label: b.name, icon: b.icon || '', color: b.color ? mapColor(b.color) : categoryColor }))}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default BadgesPage;
