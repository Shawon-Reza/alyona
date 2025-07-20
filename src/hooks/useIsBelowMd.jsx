import { useEffect, useState } from "react";

const useIsBelowMd = () => {
    const [isBelowMd, setIsBelowMd] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");

        const handleResize = () => {
            setIsBelowMd(mediaQuery.matches);
        };

        handleResize(); // Set initial value
        mediaQuery.addEventListener("change", handleResize); // Listen for changes

        return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);

    return isBelowMd;
};

export default useIsBelowMd;
