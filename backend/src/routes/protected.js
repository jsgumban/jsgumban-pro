const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const supabase = require('../config/supabase');

const router = express.Router();

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    res.json({
      user: {
        id: req.user.id,
        email: req.user.email,
        created_at: req.user.created_at,
        last_sign_in_at: req.user.last_sign_in_at
      },
      profile: profile || null,
      message: 'Profile retrieved successfully'
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch profile',
      message: error.message
    });
  }
});

router.put('/profile', authenticateToken, async (req, res) => {
  const { full_name, avatar_url } = req.body;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: req.user.id,
        full_name,
        avatar_url,
        updated_at: new Date()
      })
      .select()
      .single();

    if (error) throw error;

    res.json({
      profile: data,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      error: 'Failed to update profile',
      message: error.message
    });
  }
});

router.get('/dashboard-data', authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email
    },
    data: {
      stats: {
        totalUsers: 1250,
        activeUsers: 890,
        revenue: 45600,
        growth: 12.5
      },
      recentActivity: [
        {
          id: 1,
          action: 'User login',
          timestamp: new Date().toISOString(),
          user: req.user.email
        },
        {
          id: 2,
          action: 'Profile updated',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          user: req.user.email
        }
      ]
    },
    message: 'Dashboard data retrieved successfully'
  });
});

module.exports = router;