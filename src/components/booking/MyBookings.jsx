import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaMoneyBillWave, FaMapMarkerAlt, FaClock, FaChevronRight, FaFilter } from 'react-icons/fa';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { getUserBookings } from '../../services/BookingService';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [statusFilter, setStatusFilter] = useState('all');
    const navigate = useNavigate();

    // Check for logged in user - using email from localStorage as a simple proxy for now
    const userEmail = localStorage.getItem('userEmail') || 'test@example.com'; // Fallback for demo if needed

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await getUserBookings(userEmail);
                if (response.success) {
                    setBookings(response.data);
                }
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError('Failed to load your bookings. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [userEmail]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredBookings = bookings.filter(booking => {
        if (statusFilter === 'all') return true;
        return booking.booking_status === statusFilter;
    });

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'paid': return 'bg-green-500';
            case 'pending': return 'bg-yellow-500';
            case 'failed': return 'bg-red-500';
            default: return 'bg-gray-400';
        }
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header scrolled={scrolled} />
                <div className="pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-500 text-3xl">!</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
                    <p className="text-gray-600 mb-8 max-w-md">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition-all shadow-lg"
                    >
                        Try Again
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header scrolled={scrolled} />

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 bg-gradient-to-b from-yellow-400/20 to-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 italic tracking-tight uppercase">My <span className="text-yellow-500">Bookings</span></h1>
                            <p className="text-gray-600 text-lg">Manage your adventures and upcoming travel plans.</p>
                        </div>

                        {/* Summary Stats */}
                        <div className="flex gap-4">
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 min-w-[120px]">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total</p>
                                <p className="text-2xl font-black text-gray-900">{bookings.length}</p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 min-w-[120px]">
                                <p className="text-xs text-green-600 uppercase font-bold tracking-wider mb-1">Active</p>
                                <p className="text-2xl font-black text-green-600">{bookings.filter(b => b.booking_status !== 'cancelled').length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 pb-32">
                {/* Filters */}
                <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                    <button
                        onClick={() => setStatusFilter('all')}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${statusFilter === 'all' ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:border-yellow-400'}`}
                    >
                        All Bookings
                    </button>
                    <button
                        onClick={() => setStatusFilter('pending')}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${statusFilter === 'pending' ? 'bg-yellow-400 text-gray-900 shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:border-yellow-400'}`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setStatusFilter('confirmed')}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${statusFilter === 'confirmed' ? 'bg-green-500 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400'}`}
                    >
                        Confirmed
                    </button>
                    <button
                        onClick={() => setStatusFilter('cancelled')}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${statusFilter === 'cancelled' ? 'bg-red-500 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:border-red-400'}`}
                    >
                        Cancelled
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 font-medium">Fetching your adventures...</p>
                    </div>
                ) : filteredBookings.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-16 text-center">
                        <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaCalendarAlt className="text-4xl text-yellow-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No bookings found</h3>
                        <p className="text-gray-600 mb-10 max-w-sm mx-auto">Looks like you haven't booked any trips yet. Explore our latest destinations and start your adventure today!</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-4 bg-yellow-500 text-white rounded-2xl font-black italic uppercase tracking-wider hover:bg-yellow-600 transition-all shadow-xl hover:scale-105 active:scale-95"
                        >
                            Explore Trips
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredBookings.map((booking) => (
                            <div key={booking.id} className="group bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row">
                                {/* Left Section - Image/Summary */}
                                <div className="md:w-1/4 bg-gray-900 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent z-10"></div>
                                    <div className="p-8 relative z-20 h-full flex flex-col justify-between text-white">
                                        <div>
                                            <p className="text-yellow-400 font-black text-sm uppercase tracking-widest mb-2 italic">#{booking.id}</p>
                                            <h3 className="text-2xl font-bold leading-tight group-hover:text-yellow-400 transition-colors uppercase">{booking.trip_type && booking.trip_type.replace('_', ' ')}</h3>
                                        </div>
                                        <div className="mt-8">
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Total Amount</p>
                                            <p className="text-3xl font-black italic">₹{parseFloat(booking.total_amount).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Middle Section - Details */}
                                <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-yellow-50 rounded-xl text-yellow-500">
                                                <FaCalendarAlt />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Travel Date</p>
                                                <p className="text-gray-900 font-bold">{new Date(booking.travel_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-blue-50 rounded-xl text-blue-500">
                                                <FaUser />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Travelers</p>
                                                <p className="text-gray-900 font-bold">{booking.number_of_people} {parseInt(booking.number_of_people) === 1 ? 'Person' : 'People'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                                        <p className="text-xs text-gray-500 uppercase font-black tracking-widest mb-2 px-1">Payment Breakdown</p>
                                        <div className="space-y-3 px-1">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600 font-medium">Total Amount:</span>
                                                <span className="text-gray-900 font-black">₹{parseFloat(booking.total_amount).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600 font-medium">Token Paid:</span>
                                                <span className="text-green-600 font-black">₹{Math.round(parseFloat(booking.total_amount) * 0.10).toLocaleString()}</span>
                                            </div>
                                            <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                                                <span className="text-xs text-gray-500 uppercase font-black">Remaining Balance:</span>
                                                <span className="text-lg font-black text-yellow-600 italic">₹{Math.round(parseFloat(booking.total_amount) * 0.90).toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-4">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border ${getStatusColor(booking.booking_status)}`}>
                                                {booking.booking_status || 'Pending'}
                                            </span>
                                            <span className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg text-[10px] font-black text-gray-700 uppercase tracking-tighter border border-gray-100">
                                                <div className={`w-1.5 h-1.5 rounded-full ${getPaymentStatusColor(booking.payment_status)}`}></div>
                                                {booking.payment_status || 'Unpaid'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Section - Actions */}
                                <div className="md:w-48 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100 p-8 flex flex-col justify-center gap-4">
                                    <button
                                        className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all group-hover:shadow-lg"
                                    >
                                        Details <FaChevronRight className="text-[10px]" />
                                    </button>
                                    <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest">Booked on {new Date(booking.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default MyBookings;
