import { X, Loader2, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { useState, FormEvent, useEffect, useRef } from 'react';
import axios from 'axios';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  experience_level: string;
  current_occupation: string;
  why_join: string;
  payment_plan: string;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayError {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: {
    order_id: string;
    payment_id: string;
  };
}

// Extend Window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

type PaymentStatus = 'idle' | 'creating-order' | 'processing-payment' | 'verifying' | 'success' | 'failed' | 'cancelled';

export default function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    phone: '',
    experience_level: '',
    current_occupation: '',
    why_join: '',
    payment_plan: 'upfront'
  });

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [applicationId, setApplicationId] = useState<string | null>(null);
  
  const razorpayInstanceRef = useRef<any>(null);
  const isSubmittingRef = useRef(false);
  const paymentInProgressRef = useRef(false);
  const currentOrderIdRef = useRef<string | null>(null);
  const currentAppIdRef = useRef<string | null>(null);

  // Load Razorpay script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log('Razorpay script loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (razorpayInstanceRef.current) {
        try {
          razorpayInstanceRef.current.close();
        } catch (error) {
          console.error('Error closing Razorpay:', error);
        }
      }
    };
  }, []);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Reset after animation
      setTimeout(() => {
        setPaymentStatus('idle');
        setStatusMessage('');
        setErrorMessage('');
        setApplicationId(null);
        isSubmittingRef.current = false;
      }, 300);
    }
  }, [isOpen]);

  const getPaymentAmount = (plan: string): number => {
    const amounts: Record<string, number> = {
      upfront: 30000,
      monthly: 15000,
      trial: 5000
    };
    return amounts[plan] || 0;
  };

  const getPaymentAmountWithGST = (plan: string): number => {
    const baseAmount = getPaymentAmount(plan);
    const gstAmount = baseAmount * 0.18; // 18% GST
    return Math.round(baseAmount + gstAmount);
  };

  const handlePaymentSuccess = async (response: RazorpayResponse, appId: string) => {
    try {
      paymentInProgressRef.current = false; // Payment completed
      setPaymentStatus('verifying');
      setStatusMessage('Verifying payment...');

      const { data } = await axios.post('/api/payment/verify', {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        applicationId: appId
      });

      if (data.success) {
        setPaymentStatus('success');
        setStatusMessage('Payment successful! Your application has been submitted.');
        
        // Close modal after 3 seconds
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error: any) {
      console.error('Payment verification error:', error);
      setPaymentStatus('failed');
      setErrorMessage('Payment verification failed. Please contact support with your payment ID.');
      
      // Update database about failed verification
      try {
        await axios.post('/api/payment/failed', {
          applicationId: appId,
          error: { description: 'Verification failed' },
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id
        });
      } catch (dbError) {
        console.error('Failed to update database:', dbError);
      }
    }
  };

  const handlePaymentFailure = async (error: RazorpayError, appId: string) => {
    console.error('Payment failed:', error);
    setPaymentStatus('failed');
    
    const errorMessages: Record<string, string> = {
      'BAD_REQUEST_ERROR': 'Invalid payment request. Please try again.',
      'GATEWAY_ERROR': 'Payment gateway error. Please try again.',
      'NETWORK_ERROR': 'Network error. Please check your connection.',
      'SERVER_ERROR': 'Server error. Please try again later.',
    };

    setErrorMessage(
      errorMessages[error.code] || 
      error.description || 
      'Payment failed. Please try again.'
    );

    // Update database
    try {
      await axios.post('/api/payment/failed', {
        applicationId: appId,
        error: error,
        razorpay_order_id: error.metadata?.order_id,
        razorpay_payment_id: error.metadata?.payment_id
      });
    } catch (dbError) {
      console.error('Failed to update database:', dbError);
    }
  };

  const handlePaymentCancellation = async (orderId: string, appId: string) => {
    console.log('Payment cancelled by user');
    paymentInProgressRef.current = false; // Reset flag
    setPaymentStatus('cancelled');
    setStatusMessage('Payment was not completed. You can try again anytime.');

    // Update database
    try {
      await axios.post('/api/payment/cancelled', {
        applicationId: appId,
        razorpay_order_id: orderId
      });
    } catch (error) {
      console.error('Failed to update cancellation:', error);
    }
  };

  const openRazorpayCheckout = async (orderId: string, amount: number, appId: string, demoMode: boolean = false) => {
    try {
      // Check if we're in demo mode
      const isDemo = demoMode || import.meta.env.VITE_RAZORPAY_KEY_ID === 'rzp_test_demo';

      if (isDemo) {
        // DEMO MODE: Simulate payment flow
        console.log('🎭 DEMO MODE: Simulating Razorpay payment flow');
        setPaymentStatus('processing-payment');
        setStatusMessage('Demo Mode: Simulating payment...');
        
        // Wait 2 seconds to simulate payment process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate successful payment
        const demoResponse = {
          razorpay_payment_id: `pay_demo_${Date.now()}`,
          razorpay_order_id: orderId,
          razorpay_signature: 'demo_signature'
        };
        
        handlePaymentSuccess(demoResponse, appId);
        return;
      }

      // REAL MODE: Load actual Razorpay
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'AlgoUniversity',
        description: `${formData.payment_plan.charAt(0).toUpperCase() + formData.payment_plan.slice(1)} Plan`,
        order_id: orderId,
        handler: function (response: RazorpayResponse) {
          handlePaymentSuccess(response, appId);
        },
        prefill: {
          name: formData.full_name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          application_id: appId,
          payment_plan: formData.payment_plan,
        },
        theme: {
          color: '#f21028',
        },
        modal: {
          ondismiss: function () {
            // User closed/cancelled the payment modal
            console.log('Razorpay modal dismissed');
            if (paymentInProgressRef.current) {
              paymentInProgressRef.current = false;
              handlePaymentCancellation(
                currentOrderIdRef.current || orderId, 
                currentAppIdRef.current || appId
              );
            }
          },
          confirm_close: true,
          escape: true, // Allow escape to close
          animation: true,
          backdropclose: false, // Don't close on backdrop click
        },
        retry: {
          enabled: true,
          max_count: 3,
        },
        timeout: 900, // 15 minutes
      };

      setPaymentStatus('processing-payment');
      setStatusMessage('Complete your payment in the Razorpay window...');

      // Set refs to track payment state
      paymentInProgressRef.current = true;
      currentOrderIdRef.current = orderId;
      currentAppIdRef.current = appId;

      const rzp = new window.Razorpay(options);
      razorpayInstanceRef.current = rzp;

      // Handle payment failure
      rzp.on('payment.failed', function (response: any) {
        paymentInProgressRef.current = false;
        handlePaymentFailure(response.error, appId);
      });

      rzp.open();
    } catch (error: any) {
      console.error('Razorpay checkout error:', error);
      setPaymentStatus('failed');
      setErrorMessage(error.message || 'Failed to open payment window. Please try again.');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmittingRef.current || paymentStatus !== 'idle') {
      return;
    }

    isSubmittingRef.current = true;
    setPaymentStatus('creating-order');
    setStatusMessage('Creating order...');
    setErrorMessage('');

    try {
      const amount = getPaymentAmountWithGST(formData.payment_plan);
      
      if (amount <= 0) {
        throw new Error('Invalid payment plan selected');
      }

      // Create order via backend
      const { data } = await axios.post('/api/order', {
        amount: amount,
        currency: 'INR',
        applicationData: formData
      });

      if (!data.success || !data.order) {
        throw new Error(data.error || 'Failed to create order');
      }

      setApplicationId(data.applicationId);

      // Open Razorpay checkout (with demo mode flag if applicable)
      await openRazorpayCheckout(
        data.order.id,
        data.order.amount / 100, // Convert back to rupees
        data.applicationId,
        data.demoMode || false
      );

    } catch (error: any) {
      console.error('Order creation error:', error);
      setPaymentStatus('failed');
      
      if (error.response) {
        setErrorMessage(error.response.data?.error || 'Server error. Please try again.');
      } else if (error.request) {
        setErrorMessage('Network error. Please check your connection.');
      } else {
        setErrorMessage(error.message || 'Failed to create order. Please try again.');
      }
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const handleRetry = () => {
    setPaymentStatus('idle');
    setErrorMessage('');
    setStatusMessage('');
    isSubmittingRef.current = false;
    paymentInProgressRef.current = false;
    currentOrderIdRef.current = null;
    currentAppIdRef.current = null;
  };

  if (!isOpen) return null;

  // Success screen
  if (paymentStatus === 'success') {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 max-w-md w-full border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Payment Successful!</h3>
            <p className="text-gray-300">{statusMessage}</p>
            <p className="text-sm text-gray-400">You will receive a confirmation email shortly.</p>
          </div>
        </div>
      </div>
    );
  }

  // Failed screen
  if (paymentStatus === 'failed') {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 max-w-md w-full border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-500 rounded-full mx-auto flex items-center justify-center">
              <XCircle size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Payment Failed</h3>
            <p className="text-gray-300">{errorMessage}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleRetry}
                className="bg-[#f21028] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#f21028]/80 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Cancelled screen
  if (paymentStatus === 'cancelled') {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 max-w-md w-full border border-orange-500/30 shadow-[0_0_50px_rgba(249,115,22,0.3)]">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto flex items-center justify-center">
              <X size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Payment Unsuccessful</h3>
            <p className="text-gray-300">{statusMessage}</p>
            <p className="text-sm text-gray-400">
              No charges were made to your account.
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={handleRetry}
                className="w-full bg-[#f21028] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#f21028]/80 transition-colors"
              >
                Try Payment Again
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Processing screen
  if (paymentStatus === 'creating-order' || paymentStatus === 'verifying') {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 max-w-md w-full border border-[#f21028]/30 shadow-[0_0_50px_rgba(242,16,40,0.3)]">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#f21028] rounded-full mx-auto flex items-center justify-center">
              <Loader2 size={32} className="text-white animate-spin" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {paymentStatus === 'creating-order' ? 'Creating Order...' : 'Verifying Payment...'}
            </h3>
            <p className="text-gray-300">{statusMessage}</p>
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <Loader2 size={16} className="animate-spin" />
              <span>Please wait, do not close this window</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Payment in progress (Razorpay modal open)
  if (paymentStatus === 'processing-payment') {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 max-w-md w-full border border-[#f21028]/30 shadow-[0_0_50px_rgba(242,16,40,0.3)]">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#f21028] rounded-full mx-auto flex items-center justify-center animate-pulse">
              <Loader2 size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Payment in Progress</h3>
            <p className="text-gray-300">{statusMessage}</p>
            <p className="text-sm text-gray-400">
              Please complete your payment in the Razorpay window.
              <br />
              Do not refresh or close this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main form
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 lg:p-8 max-w-2xl w-full border border-[#f21028]/30 shadow-[0_0_50px_rgba(242,16,40,0.3)] my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6 gap-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#f21028] flex-1 min-w-0">
            Apply Now
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full bg-gray-900 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f21028] transition-colors"
              placeholder="Enter your full name"
              disabled={paymentStatus !== 'idle'}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-900 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f21028] transition-colors"
                placeholder="your@email.com"
                disabled={paymentStatus !== 'idle'}
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Phone *</label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-gray-900 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f21028] transition-colors"
                placeholder="9876543210"
                disabled={paymentStatus !== 'idle'}
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Experience Level *</label>
            <select
              required
              value={formData.experience_level}
              onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
              className="w-full bg-gray-900 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f21028] transition-colors"
              disabled={paymentStatus !== 'idle'}
            >
              <option value="">Select your experience</option>
              <option value="college_student">College Student</option>
              <option value="0-2_years">0-2 Years</option>
              <option value="2-5_years">2-5 Years</option>
              <option value="5+_years">5+ Years</option>
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Current Occupation *</label>
            <input
              type="text"
              required
              value={formData.current_occupation}
              onChange={(e) => setFormData({ ...formData, current_occupation: e.target.value })}
              className="w-full bg-gray-900 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f21028] transition-colors"
              placeholder="e.g., Software Engineer at XYZ"
              disabled={paymentStatus !== 'idle'}
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Why do you want to join? *</label>
            <textarea
              required
              rows={4}
              value={formData.why_join}
              onChange={(e) => setFormData({ ...formData, why_join: e.target.value })}
              className="w-full bg-gray-900 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f21028] transition-colors resize-none"
              placeholder="Tell us about your goals and why you want to become an AI engineer..."
              disabled={paymentStatus !== 'idle'}
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Payment Plan *</label>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 bg-gray-900 border-2 border-white/20 rounded-lg cursor-pointer hover:border-[#f21028] transition-colors has-[:checked]:border-[#f21028]">
                <input
                  type="radio"
                  name="payment_plan"
                  value="upfront"
                  checked={formData.payment_plan === 'upfront'}
                  onChange={(e) => setFormData({ ...formData, payment_plan: e.target.value })}
                  className="mt-1"
                  disabled={paymentStatus !== 'idle'}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">Pay Upfront</span>
                    <span className="bg-[#f21028] text-white text-xs font-bold px-2 py-1 rounded">
                      SAVE 50%
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    <span className="line-through">₹60,000</span>{' '}
                    <span className="text-white font-bold">₹30,000</span> + GST (18%)
                  </p>
                  <p className="text-[#f21028] font-bold text-sm mt-1">
                    Total: ₹{getPaymentAmountWithGST('upfront').toLocaleString('en-IN')}
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 bg-gray-900 border-2 border-white/20 rounded-lg cursor-pointer hover:border-[#f21028] transition-colors has-[:checked]:border-[#f21028]">
                <input
                  type="radio"
                  name="payment_plan"
                  value="monthly"
                  checked={formData.payment_plan === 'monthly'}
                  onChange={(e) => setFormData({ ...formData, payment_plan: e.target.value })}
                  className="mt-1"
                  disabled={paymentStatus !== 'idle'}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">Monthly EMI</span>
                    <span className="bg-[#f21028] text-white text-xs font-bold px-2 py-1 rounded">
                      SAVE 25%
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    <span className="line-through">₹60,000</span>{' '}
                    <span className="text-white font-bold">₹15,000/month</span> + GST (18%)
                  </p>
                  <p className="text-[#f21028] font-bold text-sm mt-1">
                    First Payment: ₹{getPaymentAmountWithGST('monthly').toLocaleString('en-IN')}
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 bg-gray-900 border-2 border-white/20 rounded-lg cursor-pointer hover:border-[#f21028] transition-colors has-[:checked]:border-[#f21028]">
                <input
                  type="radio"
                  name="payment_plan"
                  value="trial"
                  checked={formData.payment_plan === 'trial'}
                  onChange={(e) => setFormData({ ...formData, payment_plan: e.target.value })}
                  className="mt-1"
                  disabled={paymentStatus !== 'idle'}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">14-Day Trial</span>
                    <span className="bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded">
                      MONTHLY-GROCERY BILL
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    <span className="text-white font-bold">₹5,000</span> + GST (18%)
                  </p>
                  <p className="text-[#f21028] font-bold text-sm mt-1">
                    Total: ₹{getPaymentAmountWithGST('trial').toLocaleString('en-IN')}
                  </p>
                </div>
              </label>

            </div>
          </div>

          <div className="bg-[#f21028]/10 border border-[#f21028]/30 rounded-lg p-4 mt-6">
            <p className="text-gray-300 text-sm">
              <strong>Note:</strong> Secure payment powered by Razorpay. Your payment information is encrypted and secure.
            </p>
          </div>

          <button
            type="submit"
            disabled={paymentStatus !== 'idle'}
            className="w-full bg-[#f21028] text-white px-8 py-4 rounded-lg font-bold hover:shadow-[0_0_30px_rgba(242,16,40,0.8)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {paymentStatus === 'idle' ? (
              'Proceed to Payment'
            ) : (
              <>
                <Loader2 size={20} className="animate-spin" />
                Processing...
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
