import React from 'react';
import { FaMobileAlt, FaUniversity, FaMoneyBillWave } from 'react-icons/fa';
import { SiPaytm, SiGooglepay } from 'react-icons/si';

const PaymentMethodSelector = ({ selectedMethod, onSelect }) => {
    const paymentMethods = [
        {
            id: 'paytm',
            name: 'Paytm',
            icon: <SiPaytm className="w-12 h-12" />,
            description: 'Pay using Paytm Wallet or UPI',
            color: 'from-blue-500 to-blue-600'
        },
        {
            id: 'gpay',
            name: 'Google Pay',
            icon: <SiGooglepay className="w-12 h-12" />,
            description: 'Pay using Google Pay UPI',
            color: 'from-green-500 to-green-600'
        },
        {
            id: 'bank_transfer',
            name: 'Bank Transfer',
            icon: <FaUniversity className="w-12 h-12" />,
            description: 'Direct bank transfer / NEFT / RTGS',
            color: 'from-purple-500 to-purple-600'
        },
        {
            id: 'cash',
            name: 'Cash',
            icon: <FaMoneyBillWave className="w-12 h-12" />,
            description: 'Pay in cash at office',
            color: 'from-yellow-500 to-yellow-600'
        }
    ];

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                    <div
                        key={method.id}
                        onClick={() => onSelect(method.id)}
                        className={`relative cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden ${selectedMethod === method.id
                                ? 'border-yellow-500 shadow-lg scale-105'
                                : 'border-gray-200 hover:border-yellow-300 hover:shadow-md'
                            }`}
                    >
                        {/* Selected Indicator */}
                        {selectedMethod === method.id && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}

                        {/* Card Content */}
                        <div className="p-6">
                            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${method.color} text-white mb-4`}>
                                {method.icon}
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{method.name}</h4>
                            <p className="text-sm text-gray-600">{method.description}</p>
                        </div>

                        {/* Hover Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 transition-opacity duration-300 ${selectedMethod === method.id ? 'opacity-5' : 'hover:opacity-5'
                            }`} />
                    </div>
                ))}
            </div>

            {/* Payment Instructions */}
            {selectedMethod && (
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Payment Instructions</h4>
                    <div className="text-sm text-blue-800">
                        {selectedMethod === 'paytm' && (
                            <div className="space-y-2">
                                <p>1. After booking confirmation, you'll receive payment details via email</p>
                                <p>2. Open Paytm app and scan the QR code or use the UPI ID</p>
                                <p>3. Complete the payment and save the transaction ID</p>
                                <p>4. Share the transaction ID with us for confirmation</p>
                            </div>
                        )}
                        {selectedMethod === 'gpay' && (
                            <div className="space-y-2">
                                <p>1. After booking confirmation, you'll receive payment details via email</p>
                                <p>2. Open Google Pay and scan the QR code or use the UPI ID</p>
                                <p>3. Complete the payment and save the transaction ID</p>
                                <p>4. Share the transaction ID with us for confirmation</p>
                            </div>
                        )}
                        {selectedMethod === 'bank_transfer' && (
                            <div className="space-y-2">
                                <p>1. Bank details will be sent to your email after booking</p>
                                <p>2. Transfer the amount using NEFT/RTGS/IMPS</p>
                                <p>3. Keep the transaction reference number</p>
                                <p>4. Share the reference number with us for confirmation</p>
                                <p className="font-semibold mt-2">Note: Bank transfers may take 1-2 business days to process</p>
                            </div>
                        )}
                        {selectedMethod === 'cash' && (
                            <div className="space-y-2">
                                <p>1. Visit our office during business hours (10 AM - 6 PM)</p>
                                <p>2. Bring your booking confirmation email/SMS</p>
                                <p>3. Pay the amount in cash and collect the receipt</p>
                                <p className="font-semibold mt-2">Office Address: [Your Office Address Here]</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600 bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">SSL Secured</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">100% Safe</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                    <span className="font-medium">Instant Confirmation</span>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodSelector;
