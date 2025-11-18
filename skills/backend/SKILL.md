---
name: backend-development
description: Master server-side development with Node.js, Python, Java, Go, and other backend languages. Use this skill when building APIs, designing databases, implementing authentication, or working with backend frameworks and microservices.
---

# Backend Development Skill

## Quick Start

### Node.js with Express
```javascript
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await db.users.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Python with FastAPI
```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None

@app.get("/items/{item_id}")
async def get_item(item_id: int):
    return {"item_id": item_id}

@app.post("/items/")
async def create_item(item: Item):
    return item
```

### Java with Spring Boot
```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }
}
```

## Core Technologies

### Programming Languages
- **Node.js**: JavaScript runtime, V8 engine, event-driven architecture
- **Python**: Data science friendly, clean syntax, rich ecosystem
- **Java**: Type-safe, enterprise standard, Spring ecosystem
- **Go**: Concurrent, compiled, DevOps tooling
- **Rust**: Memory safety, performance, systems programming
- **PHP**: Web-focused, easy deployment, Laravel/Symfony
- **C#**: .NET ecosystem, Azure integration, async/await

### Web Frameworks
```javascript
// Express.js middleware pattern
app.use(authenticate);
app.use(logger);
app.get('/data', authorize, (req, res) => {
  // Handler
});

// Fastify for performance
const fastify = Fastify({ logger: true });
fastify.get('/data', async (request, reply) => {
  return { data: 'value' };
});
```

### API Design (REST)
```javascript
// RESTful API conventions
GET    /api/users           // List all users
GET    /api/users/:id       // Get specific user
POST   /api/users           // Create new user
PUT    /api/users/:id       // Update user
PATCH  /api/users/:id       // Partial update
DELETE /api/users/:id       // Delete user
```

### API Design (GraphQL)
```graphql
type Query {
  user(id: ID!): User
  users(limit: Int): [User!]!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User
}

type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}
```

## Database Integration

### SQL with ORMs
```javascript
// Sequelize (Node.js)
const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

const user = await User.create({ name: 'John', email: 'john@example.com' });

// Prisma modern approach
const user = await prisma.user.create({
  data: { name: 'John', email: 'john@example.com' },
});
```

### NoSQL with ODMs
```javascript
// MongoDB with Mongoose
const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = model('User', userSchema);
const user = await User.create({ name: 'John', email: 'john@example.com' });
```

## Authentication & Authorization

### JWT Implementation
```javascript
import jwt from 'jsonwebtoken';

// Generate token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Verify token
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});
```

### OAuth 2.0 & OpenID Connect
```javascript
// OAuth 2.0 with Passport
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOrCreate({ googleId: profile.id }, (err, user) => {
    return done(err, user);
  });
}));
```

## Async & Concurrency

### Promise-based Async
```javascript
// Promise chains
fetchUser(id)
  .then(user => fetchPosts(user.id))
  .then(posts => renderPosts(posts))
  .catch(error => handleError(error));

// Async/await
const user = await fetchUser(id);
const posts = await fetchPosts(user.id);
renderPosts(posts);
```

### Message Queues
```javascript
// RabbitMQ with amqplib
const connection = await amqp.connect('amqp://localhost');
const channel = await connection.createChannel();

await channel.assertQueue('email-queue');
channel.sendToQueue('email-queue', Buffer.from(JSON.stringify(email)));

// Consume
channel.consume('email-queue', (msg) => {
  const email = JSON.parse(msg.content);
  sendEmail(email);
  channel.ack(msg);
});
```

## Testing

### Unit Testing
```javascript
import request from 'supertest';
import app from '../app';

describe('GET /api/users/:id', () => {
  it('should return user', async () => {
    const response = await request(app)
      .get('/api/users/1')
      .expect(200);

    expect(response.body).toHaveProperty('id', 1);
  });
});
```

### API Testing
```bash
# cURL example
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'

# HTTP file (VS Code REST Client)
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "John",
  "email": "john@example.com"
}
```

## Performance & Optimization

### Caching
```javascript
import Redis from 'ioredis';

const redis = new Redis();

app.get('/api/users/:id', async (req, res) => {
  const cached = await redis.get(`user:${req.params.id}`);
  if (cached) return res.json(JSON.parse(cached));

  const user = await db.users.findById(req.params.id);
  await redis.setex(`user:${req.params.id}`, 3600, JSON.stringify(user));
  res.json(user);
});
```

### Query Optimization
```sql
-- Use indexes for frequently queried columns
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_user_posts ON posts(user_id);

-- Avoid N+1 queries
SELECT u.*, p.* FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.id = ?;
```

## Best Practices

1. **Error Handling**: Use try-catch, create error classes, return meaningful errors
2. **Validation**: Validate input on server side, use schema validation
3. **Logging**: Structured logging, appropriate log levels
4. **Security**: Sanitize inputs, use parameterized queries, validate tokens
5. **Performance**: Monitor, optimize queries, use caching
6. **Testing**: Aim for 70%+ coverage, test error cases
7. **Documentation**: API documentation, code comments for complex logic

## Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Spring Boot Guide](https://spring.io/projects/spring-boot)
- [REST API Best Practices](https://restfulapi.net/)
- [GraphQL Documentation](https://graphql.org/)
