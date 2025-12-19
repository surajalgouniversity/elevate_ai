const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://algoelevate.ai',
  'https://www.algoelevate.ai',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.some(allowed => origin.includes(allowed))) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for now, restrict later if needed
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Razorpay
// Check if we're in demo mode
const DEMO_MODE = !process.env.VITE_RAZORPAY_KEY_ID || 
                  process.env.VITE_RAZORPAY_KEY_ID === 'rzp_test_demo' ||
                  process.env.VITE_RAZORPAY_KEY_ID === 'rzp_test_your_key_id_here';

let razorpay = null;

if (!DEMO_MODE) {
  razorpay = new Razorpay({
    key_id: process.env.VITE_RAZORPAY_KEY_ID,
    key_secret: process.env.VITE_RAZORPAY_KEY_SECRET,
  });
  console.log('✅ Razorpay initialized with real keys');
} else {
  console.log('⚠️  DEMO MODE: Razorpay keys not configured');
  console.log('📝 To use real Razorpay:');
  console.log('   1. Go to https://dashboard.razorpay.com');
  console.log('   2. Switch to TEST MODE');
  console.log('   3. Go to Settings > API Keys');
  console.log('   4. Copy your keys to .env file');
}

// Initialize Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Create Razorpay Order
app.post('/api/order', async (req, res) => {
  try {
    const { amount, currency = 'INR', applicationData } = req.body;

    // Validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid amount' 
      });
    }

    if (!applicationData) {
      return res.status(400).json({ 
        success: false, 
        error: 'Application data is required' 
      });
    }

    // Validate application data
    const requiredFields = ['full_name', 'email', 'phone', 'experience_level', 'current_occupation', 'why_join', 'payment_plan'];
    for (const field of requiredFields) {
      if (!applicationData[field]) {
        return res.status(400).json({ 
          success: false, 
          error: `Missing required field: ${field}` 
        });
      }
    }

    let order;

    // DEMO MODE: Create a fake order for demonstration
    if (DEMO_MODE) {
      console.log('📝 DEMO MODE: Creating simulated order');
      order = {
        id: `order_demo_${Date.now()}`,
        entity: 'order',
        amount: amount * 100,
        currency: currency,
        receipt: `receipt_demo_${Date.now()}`,
        status: 'created',
        notes: {
          email: applicationData.email,
          phone: applicationData.phone,
          payment_plan: applicationData.payment_plan,
          demo_mode: true
        }
      };
    } else {
      // REAL MODE: Create actual Razorpay order
      const options = {
        amount: amount * 100, // Convert to paise
        currency: currency,
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1, // Auto capture
        notes: {
          email: applicationData.email,
          phone: applicationData.phone,
          payment_plan: applicationData.payment_plan
        }
      };

      order = await razorpay.orders.create(options);
    }

    // Store application in Supabase with order_id
    const { data: applicationRecord, error: dbError } = await supabase
      .from('applications')
      .insert([{
        ...applicationData,
        razorpay_order_id: order.id,
        payment_status: DEMO_MODE ? 'demo_pending' : 'pending'
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to save application' 
      });
    }

    res.json({
      success: true,
      order: {
        id: order.id,
        currency: order.currency,
        amount: order.amount,
      },
      applicationId: applicationRecord.id,
      demoMode: DEMO_MODE
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create order. Please try again.' 
    });
  }
});

// Verify Payment
app.post('/api/payment/verify', async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      applicationId 
    } = req.body;

    // Validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing payment details' 
      });
    }

    // Verify signature
    let signatureValid = false;

    if (DEMO_MODE) {
      // In demo mode, accept demo signatures
      console.log('📝 DEMO MODE: Simulating signature verification');
      signatureValid = razorpay_signature === 'demo_signature' || razorpay_order_id.includes('demo');
    } else {
      // Real mode: verify actual signature
      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.VITE_RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");
      signatureValid = razorpay_signature === expectedSign;
    }

    if (signatureValid) {
      // Signature verified - payment is authentic
      
      // Update payment status in Supabase
      if (applicationId) {
        const { error: updateError } = await supabase
          .from('applications')
          .update({
            payment_status: DEMO_MODE ? 'demo_completed' : 'completed',
            razorpay_payment_id: razorpay_payment_id,
            razorpay_signature: razorpay_signature,
            payment_completed_at: new Date().toISOString()
          })
          .eq('id', applicationId);

        if (updateError) {
          console.error('Database update error:', updateError);
        }
      }

      res.json({
        success: true,
        message: DEMO_MODE ? 'Demo payment verified successfully' : 'Payment verified successfully',
        paymentId: razorpay_payment_id,
        demoMode: DEMO_MODE
      });
    } else {
      // Invalid signature - possible fraud
      console.error('Invalid signature:', {
        received: razorpay_signature,
        expected: expectedSign
      });

      // Mark as failed in database
      if (applicationId) {
        await supabase
          .from('applications')
          .update({
            payment_status: 'failed',
            razorpay_payment_id: razorpay_payment_id,
            failure_reason: 'Invalid signature'
          })
          .eq('id', applicationId);
      }

      res.status(400).json({ 
        success: false, 
        error: 'Invalid payment signature' 
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to verify payment' 
    });
  }
});

// Handle payment failures
app.post('/api/payment/failed', async (req, res) => {
  try {
    const { applicationId, error, razorpay_order_id, razorpay_payment_id } = req.body;

    if (applicationId) {
      await supabase
        .from('applications')
        .update({
          payment_status: 'failed',
          razorpay_order_id: razorpay_order_id,
          razorpay_payment_id: razorpay_payment_id,
          failure_reason: error?.description || 'Payment failed'
        })
        .eq('id', applicationId);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Failed payment update error:', error);
    res.status(500).json({ success: false, error: 'Failed to update status' });
  }
});

// Handle payment cancellation
app.post('/api/payment/cancelled', async (req, res) => {
  try {
    const { applicationId, razorpay_order_id } = req.body;

    if (applicationId) {
      await supabase
        .from('applications')
        .update({
          payment_status: 'cancelled',
          razorpay_order_id: razorpay_order_id
        })
        .eq('id', applicationId);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Cancelled payment update error:', error);
    res.status(500).json({ success: false, error: 'Failed to update status' });
  }
});

// Razorpay Webhook for production (optional but recommended)
app.post('/api/webhook', async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    if (webhookSecret) {
      const signature = req.headers['x-razorpay-signature'];
      const shasum = crypto.createHmac('sha256', webhookSecret);
      shasum.update(JSON.stringify(req.body));
      const digest = shasum.digest('hex');

      if (digest !== signature) {
        return res.status(400).json({ error: 'Invalid signature' });
      }
    }

    const event = req.body.event;
    const payment = req.body.payload.payment.entity;

    // Handle different events
    switch (event) {
      case 'payment.captured':
        // Payment successful
        await supabase
          .from('applications')
          .update({
            payment_status: 'completed',
            razorpay_payment_id: payment.id
          })
          .eq('razorpay_order_id', payment.order_id);
        break;

      case 'payment.failed':
        // Payment failed
        await supabase
          .from('applications')
          .update({
            payment_status: 'failed',
            razorpay_payment_id: payment.id,
            failure_reason: payment.error_description
          })
          .eq('razorpay_order_id', payment.order_id);
        break;
    }

    res.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Admin Dashboard Endpoints
// Get all applications (Admin only)
app.get('/api/admin/applications', async (req, res) => {
  try {
    // In production, add authentication middleware here
    // For now, anyone can access this endpoint
    
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch applications' 
      });
    }

    res.json({
      success: true,
      applications: data
    });

  } catch (error) {
    console.error('Fetch applications error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch applications' 
    });
  }
});

// Get dashboard statistics
app.get('/api/admin/stats', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('payment_status');

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch statistics' 
      });
    }

    // Calculate statistics
    const stats = {
      total: data.length,
      completed: data.filter(app => app.payment_status === 'completed' || app.payment_status === 'demo_completed').length,
      pending: data.filter(app => app.payment_status === 'pending' || app.payment_status === 'demo_pending').length,
      failed: data.filter(app => app.payment_status === 'failed').length,
      cancelled: data.filter(app => app.payment_status === 'cancelled').length,
    };

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Fetch stats error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch statistics' 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
