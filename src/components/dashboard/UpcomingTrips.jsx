import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UpcomingTrips = () => {
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState(null);
    const [trips, setTrips] = useState([
        {
            id: 'december',
            title: 'Technical Adventures',
            collection: 'Technical Adventures - Collection',
            image: 'https://picsum.photos/seed/rafting/600/400.jpg',
            tours: 12,
            price: '₹799',
            duration: '3-5 days',
            difficulty: 'Moderate',
            highlights: ['River rafting', 'Rock climbing', 'Mountain biking'],
            rating: 4.7,
            nextTrip: 'Dec 15, 2023',
            discount: '15% OFF'
        },
        {
            id: 'january',
            title: 'Heritage Explorations',
            collection: 'Heritage Explorations - Collection',
            image: 'https://picsum.photos/seed/ancient-ruins/600/400.jpg',
            tours: 14,
            price: '₹1,299',
            duration: '5-7 days',
            difficulty: 'Easy',
            highlights: ['Historical sites', 'Cultural performances', 'Local cuisine'],
            rating: 4.9,
            nextTrip: 'Jan 5, 2024',
            discount: '20% OFF'
        },
        {
            id: 'february',
            title: 'Luxury Getaways',
            collection: 'Luxury Getaways - Collection',
            image: 'https://picsum.photos/seed/hotel-resort/600/400.jpg',
            tours: 10,
            price: '₹1,599',
            duration: '4-6 days',
            difficulty: 'Easy',
            highlights: ['5-star resorts', 'Spa treatments', 'Fine dining'],
            rating: 4.8,
            nextTrip: 'Feb 10, 2024',
            discount: '10% OFF'
        }
    ]);

    const scrollContainerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [cardWidth, setCardWidth] = useState(0);

    // Detect if device is mobile and calculate card width
    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);

            // Calculate card width based on viewport - increased sizes
            if (width < 640) { // Mobile
                setCardWidth(width * 0.75); // 75vw
            } else if (width < 768) { // Small tablet
                setCardWidth(width * 0.55); // calc(55% - gap)
            } else if (width < 1024) { // Medium tablet
                setCardWidth(width * 0.40); // calc(40% - gap)
            } else if (width < 1280) { // Large tablet
                setCardWidth(width * 0.33); // calc(33% - gap)
            } else { // Desktop
                setCardWidth(width * 0.28); // calc(28% - gap)
            }
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    // Load trips from localStorage on component mount
    useEffect(() => {
        const savedTrips = localStorage.getItem('upcomingTrips');
        if (savedTrips) {
            setTrips(JSON.parse(savedTrips));
        }
    }, []);

    // Save trips to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('upcomingTrips', JSON.stringify(trips));
    }, [trips]);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            // Calculate scroll amount based on card width + gap
            const gap = isMobile ? 12 : 16; // gap-3 = 12px, gap-4 = 16px
            const scrollAmount = cardWidth + gap;
            scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            // Calculate scroll amount based on card width + gap
            const gap = isMobile ? 12 : 16; // gap-3 = 12px, gap-4 = 16px
            const scrollAmount = cardWidth + gap;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Touch event handlers for mobile
    const handleTouchStart = (e) => {
        setHoveredCard(e.currentTarget.id);
    };

    const handleTouchEnd = () => {
        setTimeout(() => setHoveredCard(null), 1000);
    };

    // Navigate to travel detail page
    const handleCardClick = () => {
        navigate('/travel');
    };

    return (
        <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-12 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-8xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left mb-4 md:mb-0 text-gray-800 relative">
                        <span className="relative z-10">UPCOMING TRIPS</span>
                        <span className="absolute bottom-0 left-0 w-full h-3 bg-orange-200 opacity-50 -z-10 transform -rotate-1"></span>
                    </h2>
                </div>

                {/* Container with equal padding and scroll buttons positioned in padding area */}
                <div className="relative px-4 sm:px-6 md:px-8">
                    {/* Left Scroll Button - Adjusted for mobile */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 sm:left-2 top-1/2 transform -translate-y-1/2 z-10 text-gray-600 hover:text-gray-800 transition-all duration-300 bg-white/80 rounded-full p-1.5 sm:p-2 shadow-md sm:shadow-lg"
                        aria-label="Scroll left"
                    >
                        <FaChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
                    </button>

                    {/* Right Scroll Button - Adjusted for mobile */}
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 sm:right-2 top-1/2 transform -translate-y-1/2 z-10 text-gray-600 hover:text-gray-800 transition-all duration-300 bg-white/80 rounded-full p-1.5 sm:p-2 shadow-md sm:shadow-lg"
                        aria-label="Scroll right"
                    >
                        <FaChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
                    </button>

                    {/* Scrollable Trips Container - Responsive width with larger cards */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-3 sm:gap-4 pb-4 scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {trips.map((trip) => (
                            <div
                                key={trip.id}
                                id={trip.id}
                                className="flex-shrink-0 w-[75vw] sm:w-[calc(55%-0.5rem)] md:w-[calc(40%-0.5rem)] lg:w-[calc(33%-0.5rem)] xl:w-[calc(28%-0.5rem)] max-w-[380px] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                                onMouseEnter={() => !isMobile && setHoveredCard(trip.id)}
                                onMouseLeave={() => !isMobile && setHoveredCard(null)}
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                                onClick={handleCardClick}
                            >
                                {/* Background Image Container with 3:2 Aspect Ratio (66.67%) */}
                                <div className="relative overflow-hidden" style={{ paddingTop: '66.67%' }}>
                                    <img
                                        src={trip.image}
                                        alt={trip.title}
                                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />

                                    {/* Black transparent overlay */}
                                    <div className="absolute inset-0 bg-black/30"></div>

                                    {/* Title at bottom when not hovered, moves to top of slider when hovered */}
                                    <div className={`absolute bottom-0 left-0 w-full px-6 py-4 transition-all duration-500 ${hoveredCard === trip.id
                                        ? 'translate-y-[-140px] opacity-100'
                                        : 'opacity-100'
                                        }`}>
                                        <div className={`transition-all duration-500 ${hoveredCard === trip.id
                                            ? 'bg-transparent'
                                            : ''
                                            }`}>
                                            <h3 className="text-xl font-bold text-white">{trip.title}</h3>
                                        </div>
                                    </div>

                                    {/* Hover Overlay - Slides up from bottom with enhanced content */}
                                    <div className={`absolute inset-0 transition-all duration-500 transform ${hoveredCard === trip.id
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-full opacity-0'
                                        }`}>
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            {/* Tours and Price Section */}
                                            <div className="flex items-start mb-2 gap-2">
                                                {/* Tours Box */}
                                                <div className="flex flex-col items-center">
                                                    <div className="text-[10px] font-bold text-white uppercase tracking-wider opacity-80 mb-1">
                                                        TOURS
                                                    </div>
                                                    <div className="px-3 py-2">
                                                        <div className="text-xl text-white font-bold text-center">
                                                            {trip.tours}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Price Section */}
                                                <div className="flex flex-col items-center">
                                                    <div className="text-center">
                                                        <div className="text-[10px] font-bold text-white uppercase tracking-wider opacity-80">
                                                            STARTING FROM
                                                        </div>
                                                    </div>
                                                    <div className="px-3 py-2">
                                                        <div className="text-center">
                                                            <div className="text-xl font-bold text-white">
                                                                {trip.price}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bottom Section with Buttons */}
                                            <div className="flex gap-2">
                                                <button
                                                    className="bg-transparent border border-white/40 text-white font-montserrat py-3 px-4 hover:bg-white/30 hover:border-white/40 transition-all duration-300 text-sm tracking-[0.2em]"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent card click event
                                                        handleCardClick();
                                                    }}
                                                >
                                                    EXPLORE MORE
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add custom CSS to hide scrollbar and add animations */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default UpcomingTrips;