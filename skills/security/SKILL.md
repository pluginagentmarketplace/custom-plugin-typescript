---
name: security-practices
description: Master secure development, OWASP top 10, cryptography, authentication, and compliance. Use this skill when building secure systems, implementing authentication, protecting data, or preparing for security audits.
---

# Security & Best Practices Skill

## Quick Start

### Secure Coding - Input Validation
```javascript
// ❌ BAD: SQL Injection vulnerability
const query = `SELECT * FROM users WHERE email = '${email}'`;
db.execute(query);

// ✅ GOOD: Parameterized queries
const query = 'SELECT * FROM users WHERE email = ?';
db.execute(query, [email]);

// ❌ BAD: XSS vulnerability
const html = `<div>${userInput}</div>`;

// ✅ GOOD: Escape/sanitize output
import DOMPurify from 'dompurify';
const html = DOMPurify.sanitize(userInput);

// ✅ GOOD: Use frameworks that escape by default
// React automatically escapes strings in JSX
<div>{userInput}</div>
```

### Password Security
```javascript
// ✅ GOOD: Hash passwords with bcrypt
import bcrypt from 'bcrypt';

// Register
async function registerUser(email, password) {
  const hash = await bcrypt.hash(password, 10);
  await db.users.create({ email, passwordHash: hash });
}

// Login
async function loginUser(email, password) {
  const user = await db.users.findOne({ email });
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) throw new Error('Invalid password');
  return user;
}

// ❌ BAD: Never store plain text passwords
// ❌ BAD: Simple hashing like MD5
// ❌ BAD: Weak password requirements
```

### OWASP Top 10

1. **Injection**
```javascript
// SQL Injection
const userId = req.params.id;
const query = `SELECT * FROM users WHERE id = ${userId}`; // UNSAFE

// Safe version
const query = 'SELECT * FROM users WHERE id = ?';
db.execute(query, [userId]);

// NoSQL Injection
db.collection('users').findOne({ username: req.body.username }); // UNSAFE if directly from user

// Safe version
db.collection('users').findOne({
  username: { $eq: req.body.username } // Explicit operator
});
```

2. **Broken Authentication**
```javascript
// ❌ BAD: Storing passwords in plain text
// ❌ BAD: No rate limiting on login attempts
// ❌ BAD: Session IDs predictable or not random

// ✅ GOOD: Implement MFA
const speakeasy = require('speakeasy');

// Generate secret for TOTP
const secret = speakeasy.generateSecret({ name: 'MyApp' });

// Verify TOTP token
const verified = speakeasy.totp.verify({
  secret: user.totpSecret,
  encoding: 'base32',
  token: userToken,
  window: 2
});
```

3. **Sensitive Data Exposure**
```javascript
// ❌ BAD: Store credit card numbers
// ✅ GOOD: Use tokenization (Stripe, Square)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const token = await stripe.tokens.create({
  card: {
    number: '4242424242424242',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123'
  }
});

// ✅ GOOD: Encrypt sensitive data
const crypto = require('crypto');
function encryptData(data, encryptionKey) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}
```

4. **XML External Entities (XXE)**
```javascript
// ❌ BAD: Parse XML without restrictions
const xml = require('xml2js');
const parser = new xml.Parser();

// ✅ GOOD: Disable XXE processing
const parser = new xml.Parser({
  features: {
    external_general_entities: false,
    external_parameter_entities: false
  }
});
```

5. **Broken Access Control**
```javascript
// ❌ BAD: No authorization check
app.get('/users/:id', (req, res) => {
  const user = db.users.findById(req.params.id);
  res.json(user); // Any authenticated user can access
});

// ✅ GOOD: Check authorization
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  if (userId !== req.user.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const user = db.users.findById(userId);
  res.json(user);
});

// ✅ GOOD: Use middleware for authorization
function authorize(requiredRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

app.delete('/users/:id', authorize('admin'), (req, res) => {
  // Admin only endpoint
});
```

6. **Security Misconfiguration**
```javascript
// ✅ GOOD: Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

// Or use helmet.js
const helmet = require('helmet');
app.use(helmet());
```

7. **Cross-Site Scripting (XSS)**
```javascript
// ❌ BAD: Direct DOM manipulation
document.getElementById('output').innerHTML = userInput;

// ✅ GOOD: Use textContent or React
document.getElementById('output').textContent = userInput;

// ✅ GOOD: React automatically escapes
<div>{userInput}</div>

// ✅ GOOD: Sanitize if HTML needed
import DOMPurify from 'dompurify';
const cleanHTML = DOMPurify.sanitize(userInput);
<div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
```

## Authentication & Authorization

### JWT Implementation
```javascript
// Issue JWT
function issueToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400 // 24 hours
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256'
  });
}

// Verify JWT
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    });
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Middleware
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});
```

### OAuth 2.0 & OpenID Connect
```javascript
// OAuth 2.0 with Passport.js
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  const user = await User.findOrCreate({ googleId: profile.id });
  return done(null, user);
}));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);
```

## Cryptography

### Encryption Examples
```javascript
// AES Encryption
const crypto = require('crypto');

function encrypt(text, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text, key) {
  const parts = text.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  let decrypted = decipher.update(parts[1], 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

// Hash generation
function hashData(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// HMAC for integrity
function createHMAC(data, secret) {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}
```

## Compliance

### GDPR Compliance
```javascript
// Right to erasure (right to be forgotten)
app.delete('/users/me', authenticate, async (req, res) => {
  // Delete all user data
  await db.users.delete(req.user.id);
  await db.userActivity.deleteMany({ userId: req.user.id });
  res.json({ message: 'Account deleted' });
});

// Data portability
app.get('/users/me/data', authenticate, async (req, res) => {
  const userData = await db.users.findById(req.user.id);
  res.json(userData);
});

// Privacy policy
// Must have clear, accessible privacy policy
// Obtain explicit consent for data collection
```

### PCI DSS Compliance
```javascript
// For handling credit cards:
// 1. Never store full credit card numbers
// 2. Use tokenization (Stripe, Square, etc.)
// 3. Use HTTPS/TLS for all transmissions
// 4. Implement strong access controls
// 5. Regular security testing

// Example with Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd'
});

// Never handle card data directly in your backend
```

## Best Practices Checklist

- [ ] Use HTTPS/TLS everywhere
- [ ] Hash passwords with bcrypt or Argon2
- [ ] Validate all inputs
- [ ] Use parameterized queries
- [ ] Implement rate limiting
- [ ] Add CSRF tokens
- [ ] Set security headers
- [ ] Log security events
- [ ] Keep dependencies updated
- [ ] Regular security audits
- [ ] Implement authentication
- [ ] Use strong session management
- [ ] Encrypt sensitive data
- [ ] Secure configuration management
- [ ] Incident response plan

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [Secure Coding Guidelines](https://cwe.mitre.org/)
