const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

router.get('/verify', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      valid: false,
      message: 'No token provided' 
    });
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(403).json({ 
        valid: false,
        message: 'Invalid or expired token' 
      });
    }

    res.json({
      valid: true,
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ 
      valid: false,
      message: 'Token verification failed' 
    });
  }
});

router.post('/refresh', async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({
      error: 'Refresh token required',
      message: 'Please provide a refresh token'
    });
  }

  try {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refresh_token
    });

    if (error) {
      return res.status(401).json({
        error: 'Invalid refresh token',
        message: error.message
      });
    }

    res.json({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_in: data.session.expires_in,
      user: data.user
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      error: 'Token refresh failed',
      message: 'Unable to refresh the session'
    });
  }
});

router.post('/register', async (req, res) => {
	const { email, password } = req.body;
	
	if (!email || !password) {
		return res.status(400).json({
			error: 'Missing required fields',
			message: 'Email and password are required'
		});
	}
	
	if (password.length < 6) {
		return res.status(400).json({
			error: 'Invalid password',
			message: 'Password must be at least 6 characters long'
		});
	}
	
	try {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});
		
		if (error) {
			return res.status(400).json({
				error: 'Registration failed',
				message: error.message
			});
		}
		
		if (data.user && data.session) {
			try {
				const { error: profileError } = await supabase
					.from('profiles')
					.insert([
						{
							id: data.user.id,
							full_name: '',
							avatar_url: ''
						}
					]);
				
				if (profileError) {
					console.error('Profile creation error:', profileError);
				}
			} catch (profileErr) {
				console.error('Profile creation failed:', profileErr);
			}
			
			res.status(201).json({
				user: data.user,
				session: data.session,
				message: 'Registration successful'
			});
		} else {
			res.status(201).json({
				user: data.user,
				session: null,
				message: 'Registration successful. Please check your email for confirmation.'
			});
		}
	} catch (error) {
		console.error('Registration error:', error);
		res.status(500).json({
			error: 'Registration failed',
			message: 'Unable to create account'
		});
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	
	if (!email || !password) {
		return res.status(400).json({
			error: 'Missing required fields',
			message: 'Email and password are required'
		});
	}
	
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		
		if (error) {
			return res.status(401).json({
				error: 'Login failed',
				message: error.message
			});
		}
		
		res.json({
			user: data.user,
			session: data.session,
			message: 'Login successful'
		});
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({
			error: 'Login failed',
			message: 'Unable to sign in'
		});
	}
});

router.post('/logout', async (req, res) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	
	if (!token) {
		return res.status(400).json({
			error: 'No token provided',
			message: 'Authorization token is required'
		});
	}
	
	try {
		const { error } = await supabase.auth.signOut(token);
		
		if (error) {
			console.error('Logout error:', error);
			return res.status(500).json({
				error: 'Logout failed',
				message: error.message
			});
		}
		
		res.json({
			message: 'Logout successful'
		});
	} catch (error) {
		console.error('Logout error:', error);
		res.status(500).json({
			error: 'Logout failed',
			message: 'Unable to sign out'
		});
	}
});


module.exports = router;