// Admin Dashboard - Backend Endpoint
// Add this to server/index.js

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
