---
name: architecture-design
description: Master system design, scalability patterns, microservices architecture, and distributed systems. Use this skill when designing systems, making architectural decisions, or solving complex system design problems.
---

# Architecture & Systems Design Skill

## Quick Start

### SOLID Principles
```javascript
// 1. Single Responsibility Principle
class UserRepository {
  async getById(id) { /* ... */ }
  async save(user) { /* ... */ }
}

class UserService {
  constructor(userRepository) {
    this.repository = userRepository;
  }
  async getUserWithPosts(id) { /* uses repository */ }
}

// 2. Open/Closed Principle
class PaymentProcessor {
  process(payment) {
    throw new Error('Must implement');
  }
}

class CreditCardProcessor extends PaymentProcessor {
  process(payment) { /* implementation */ }
}

// 3. Liskov Substitution Principle
class Shape { getArea() {} }
class Circle extends Shape { getArea() { return Math.PI * r * r; } }
class Rectangle extends Shape { getArea() { return w * h; } }

// 4. Interface Segregation Principle
class Worker {
  work() { /* */ }
}

class Eater {
  eat() { /* */ }
}

class Robot extends Worker { work() { /* */ } }

// 5. Dependency Inversion
class UserService {
  constructor(userRepository) {
    this.repository = userRepository; // Depends on abstraction
  }
}
```

### Design Patterns
```javascript
// Singleton Pattern
class Database {
  static instance = null;

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

// Factory Pattern
class PaymentFactory {
  static create(type) {
    switch(type) {
      case 'credit': return new CreditCardPayment();
      case 'paypal': return new PayPalPayment();
    }
  }
}

// Observer Pattern
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(cb => cb(data));
    }
  }
}
```

### Monolithic vs Microservices
```plaintext
MONOLITHIC ARCHITECTURE
┌────────────────────────────────┐
│  API Gateway                   │
├────────────────────────────────┤
│  User Service  │ Post Service  │
│  Comment Svc   │ Like Service  │
├────────────────────────────────┤
│  Shared Database               │
└────────────────────────────────┘

MICROSERVICES ARCHITECTURE
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  User Svc    │  │  Post Svc    │  │  Comment Svc │
├──────────────┤  ├──────────────┤  ├──────────────┤
│  User DB     │  │  Post DB     │  │  Comment DB  │
└────────────┬──┘  └───────┬──────┘  └───────┬──────┘
             │             │                  │
             └─────────────┴──────────────────┘
              Message Broker / API Gateway
```

## Scalability Patterns

### Horizontal Scaling
```yaml
# Load balancer distributes traffic
Load Balancer (Port 80)
├── Server 1 (Port 3000)
├── Server 2 (Port 3000)
└── Server 3 (Port 3000)

# Kubernetes example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
spec:
  replicas: 3  # Horizontal scaling
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: myapp:latest
```

### Caching Strategies
```javascript
// Cache-Aside Pattern
async function getUserData(userId) {
  // Check cache first
  const cached = await cache.get(`user:${userId}`);
  if (cached) return JSON.parse(cached);

  // Get from database
  const user = await db.users.findById(userId);

  // Store in cache
  await cache.setEx(`user:${userId}`, 3600, JSON.stringify(user));
  return user;
}

// Write-Through Pattern
async function updateUser(userId, data) {
  // Write to database first
  const user = await db.users.update(userId, data);

  // Then update cache
  await cache.setEx(`user:${userId}`, 3600, JSON.stringify(user));
  return user;
}

// Cache Invalidation
async function deleteUser(userId) {
  await db.users.delete(userId);
  await cache.del(`user:${userId}`); // Invalidate
}
```

### Database Sharding
```javascript
// Hash-based sharding
function getShardId(userId) {
  const shardCount = 4;
  return Math.abs(hashFunction(userId)) % shardCount;
}

// Route requests
async function getUserData(userId) {
  const shardId = getShardId(userId);
  const shard = shards[shardId];
  return await shard.query(`SELECT * FROM users WHERE id = ${userId}`);
}

// Range-based sharding
function getShardByRange(userId) {
  if (userId < 1000000) return 'shard1';
  if (userId < 2000000) return 'shard2';
  return 'shard3';
}
```

## Distributed Systems

### CAP Theorem
```plaintext
┌─────────────────────────────────┐
│     CAP Theorem                 │
│                                 │
│  Consistency, Availability,     │
│  Partition Tolerance            │
│  (Choose 2 of 3)                │
│                                 │
│  SQL (CA):  Strong consistency  │
│  NoSQL (AP): High availability  │
│  Cache (CP): Partition handling │
└─────────────────────────────────┘
```

### Eventual Consistency
```javascript
// Event sourcing pattern
class EventStore {
  async saveEvent(aggregateId, event) {
    const eventRecord = {
      aggregateId,
      timestamp: new Date(),
      type: event.type,
      data: event.data,
      version: event.version
    };
    await this.db.insert('events', eventRecord);

    // Publish event for other services
    await this.eventBus.publish(event);
  }

  async getAggregate(aggregateId) {
    const events = await this.db.query(
      'SELECT * FROM events WHERE aggregateId = ? ORDER BY version',
      [aggregateId]
    );

    // Rebuild state from events
    let aggregate = {};
    for (const event of events) {
      aggregate = this.applyEvent(aggregate, event);
    }
    return aggregate;
  }
}
```

### Consistency Models
```javascript
// Strict Consistency
class StrictConsistency {
  // All nodes see same value immediately
  async set(key, value) {
    await this.coordinator.acquire(key);
    await this.broadcast('SET', key, value);
    await this.coordinator.release(key);
  }
}

// Eventual Consistency
class EventualConsistency {
  // Updates propagate over time
  async set(key, value) {
    this.localSet(key, value);
    this.queue.push({ op: 'SET', key, value });
    // Async replication to other nodes
  }
}
```

## Microservices Architecture

### Service Communication
```javascript
// REST Communication
class UserService {
  async getUserWithPosts(userId) {
    const user = await this.getUser(userId);
    const posts = await fetch(
      `http://post-service/api/posts?userId=${userId}`
    ).then(r => r.json());
    return { ...user, posts };
  }
}

// Message Queue Communication
class OrderService {
  async createOrder(order) {
    const savedOrder = await this.db.save(order);

    // Async notification
    await this.eventBus.publish('order.created', {
      orderId: savedOrder.id,
      userId: savedOrder.userId,
      timestamp: new Date()
    });

    return savedOrder;
  }
}

// Event consumer
class NotificationService {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.subscribe('order.created', (event) => {
      this.sendOrderConfirmationEmail(event);
    });
  }
}
```

### API Gateway Pattern
```javascript
// API Gateway routes requests to services
class APIGateway {
  async handleRequest(req, res) {
    const route = this.router.match(req.path);

    if (!route) return res.status(404).send('Not found');

    // Route to appropriate service
    const response = await this.serviceClients[route.service]
      .request(req.method, route.path, req.body);

    res.json(response);
  }
}

// Service registry for discovery
class ServiceRegistry {
  register(serviceName, instances) {
    this.services[serviceName] = instances;
  }

  getHealthyInstance(serviceName) {
    const instances = this.services[serviceName];
    return instances.find(i => i.healthy);
  }
}
```

## Resilience Patterns

### Circuit Breaker
```javascript
class CircuitBreaker {
  constructor(service, threshold = 5, timeout = 60000) {
    this.service = service;
    this.failureCount = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = 'CLOSED';
  }

  async call(method, ...args) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailure > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await this.service[method](...args);
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    this.lastFailure = Date.now();
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
    }
  }
}
```

## Best Practices

1. **Separation of Concerns**: Each component has single responsibility
2. **Loose Coupling**: Components independent, communicate through interfaces
3. **High Cohesion**: Related functionality grouped together
4. **Scalability First**: Design for horizontal scaling from start
5. **Observability**: Comprehensive logging and monitoring
6. **Resilience**: Handle failures gracefully with retries, fallbacks
7. **Documentation**: Keep architecture decisions documented (ADRs)

## Resources

- [System Design Interview](https://www.systemdesigninterview.com/)
- [Designing Data-Intensive Applications](https://dataintensive.net/)
- [Microservices Patterns](https://microservices.io/)
- [Martin Fowler's Architecture Articles](https://martinfowler.com/architecture/)
