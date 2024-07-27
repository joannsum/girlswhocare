// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const cors = require('cors');

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const app = express();
const port = 3001;

const auth = getAuth();
const db = getFirestore();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new GoogleStrategy({
//     clientID: '',
//     clientSecret: '',
//     callbackURL: "http://localhost:3001/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     // Here you would typically find or create a user in your database
//     return cb(null, profile);
//   }
// ));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// Middleware to verify Firebase ID token
const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization;
  if (!idToken) {
    return res.status(403).send('Unauthorized');
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).send('Invalid token');
  }
};

// Create a new user profile
app.post('/api/users', verifyToken, async (req, res) => {
  try {
    const { uid, name, email } = req.user;
    const userRef = db.collection('users').doc(uid);
    await userRef.set({
      name,
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    res.json({ message: 'User profile created/updated successfully' });
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ error: 'Error creating user profile' });
  }
});

// Get user profile
app.get('/api/users/me', verifyToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const userRef = db.collection('users').doc(uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(doc.data());
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// app.get('/auth/google', (req, res) => {
//   const authUrl = passport.authenticate('google', { scope: ['profile', 'email'] });
//   res.json({ redirectUrl: authUrl });
// });

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('http://localhost:5173'); // Adjust this URL to your frontend URL
//   }
// );

// app.get('/api/user', (req, res) => {
//   res.json(req.user);
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

