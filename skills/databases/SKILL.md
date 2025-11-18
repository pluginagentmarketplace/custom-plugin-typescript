---
name: databases-data
description: Master relational and NoSQL databases including PostgreSQL, MongoDB, Redis, Elasticsearch, and data warehousing. Use this skill when designing schemas, optimizing queries, implementing caching, or building data pipelines.
---

# Databases & Data Skill

## Quick Start

### SQL - PostgreSQL
```sql
-- Create table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');

-- Query data
SELECT * FROM users WHERE email = 'john@example.com';

-- Joins
SELECT u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name;

-- Indexes
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_user_posts ON posts(user_id);
```

### MongoDB - NoSQL
```javascript
// MongoDB with Node.js
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('myapp');
const users = db.collection('users');

// Insert document
await users.insertOne({
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date()
});

// Query documents
const user = await users.findOne({ email: 'john@example.com' });

// Aggregation pipeline
const results = await users.aggregate([
  { $match: { status: 'active' } },
  { $group: { _id: '$city', count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]).toArray();
```

### Redis - Caching
```javascript
// Redis with Node.js
const redis = require('redis');
const client = redis.createClient();

await client.connect();

// Set value
await client.setEx('user:123', 3600, JSON.stringify(user));

// Get value
const cached = await client.get('user:123');

// Increment counter
await client.incr('page:visits');

// Redis patterns
await client.del('user:*'); // Delete by pattern
```

## Relational Databases

### PostgreSQL Advanced Features
```sql
-- JSON/JSONB support
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  specs JSONB
);

INSERT INTO products VALUES (1, 'Laptop', '{"cpu": "i7", "ram": "16GB"}');
SELECT specs->>'cpu' as cpu FROM products WHERE id = 1;

-- Full-text search
CREATE INDEX idx_search ON articles USING GIN (to_tsvector('english', content));
SELECT * FROM articles
WHERE to_tsvector('english', content) @@ to_tsquery('english', 'database');

-- Transactions
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- Window functions
SELECT name, salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) as rank
FROM employees;
```

### Database Normalization
```sql
-- 1NF: Remove repeating groups
-- ❌ Bad: Tags in single column
CREATE TABLE posts (id INT, title VARCHAR, tags VARCHAR);

-- ✅ Good: Separate table
CREATE TABLE posts (id INT PRIMARY KEY, title VARCHAR);
CREATE TABLE post_tags (
  post_id INT,
  tag_id INT,
  FOREIGN KEY (post_id) REFERENCES posts(id)
);

-- 3NF: No transitive dependencies
-- ✅ Properly normalized
CREATE TABLE customers (id INT, name VARCHAR);
CREATE TABLE orders (id INT, customer_id INT, order_date DATE);
CREATE TABLE order_items (id INT, order_id INT, product_id INT, quantity INT);
```

## NoSQL Databases

### MongoDB Document Design
```javascript
// Denormalization for performance
db.posts.insertOne({
  _id: ObjectId(),
  title: 'MongoDB Guide',
  content: '...',
  author: {
    _id: ObjectId('...'),
    name: 'John',
    email: 'john@example.com'
  },
  comments: [
    {
      _id: ObjectId(),
      author: 'Jane',
      text: 'Great post!',
      createdAt: new Date()
    }
  ],
  tags: ['database', 'nosql'],
  stats: {
    views: 150,
    likes: 25
  }
});

// Indexing
db.posts.createIndex({ title: 'text' });
db.posts.createIndex({ 'author._id': 1 });
db.posts.createIndex({ createdAt: -1 });
```

### Cassandra for Scale
```python
# Cassandra distributed database
from cassandra.cluster import Cluster

cluster = Cluster(['127.0.0.1'])
session = cluster.connect()

# Create keyspace
session.execute("""
    CREATE KEYSPACE IF NOT EXISTS myapp
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3}
""")

# Create table
session.execute("""
    CREATE TABLE IF NOT EXISTS myapp.events (
        id UUID PRIMARY KEY,
        timestamp TIMESTAMP,
        user_id UUID,
        event_type TEXT,
        data TEXT
    )
""")
```

## In-Memory & Caching

### Redis Data Structures
```javascript
// Strings
await redis.set('key', 'value');
await redis.append('key', ' more');
await redis.incr('counter');

// Lists
await redis.lPush('queue', 'item1', 'item2');
await redis.rPop('queue');
await redis.lRange('queue', 0, -1);

// Sets
await redis.sAdd('tags', 'javascript', 'nodejs');
await redis.sMembers('tags');
await redis.sInter('tags:post1', 'tags:post2');

// Hashes
await redis.hSet('user:123', 'name', 'John', 'email', 'john@example.com');
await redis.hGetAll('user:123');

// Sorted Sets
await redis.zAdd('leaderboard', 100, 'player1', 50, 'player2');
await redis.zRange('leaderboard', 0, -1, 'WITHSCORES');
```

### Memcached
```python
import memcache

mc = memcache.Client(['127.0.0.1:11211'])

# Set and get
mc.set('user:123', user_data, time=3600)
user = mc.get('user:123')

# Delete
mc.delete('user:123')

# Increment counter
mc.incr('page:visits')
```

## Search Engines

### Elasticsearch
```json
// Create index
PUT /products
{
  "mappings": {
    "properties": {
      "name": { "type": "text" },
      "description": { "type": "text" },
      "price": { "type": "float" },
      "tags": { "type": "keyword" },
      "created_at": { "type": "date" }
    }
  }
}

// Index document
POST /products/_doc
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "tags": ["electronics", "computers"]
}

// Search
GET /products/_search
{
  "query": {
    "multi_match": {
      "query": "laptop computer",
      "fields": ["name", "description"]
    }
  }
}
```

## Query Optimization

### Index Strategy
```sql
-- Analyze query
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 1 AND created_at > '2024-01-01';

-- Create appropriate index
CREATE INDEX idx_user_orders ON orders(user_id, created_at DESC);

-- Avoid:
-- - Indexing low-cardinality columns
-- - Using functions in WHERE clauses
-- - Not indexing JOIN columns
```

### Query Patterns
```sql
-- Bad: N+1 queries
SELECT * FROM users WHERE id = 1;
SELECT * FROM posts WHERE user_id = 1;

-- Good: Single JOIN
SELECT u.*, p.* FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.id = 1;

-- Bad: Not using indexes
SELECT * FROM users WHERE YEAR(created_at) = 2024;

-- Good: Use date range
SELECT * FROM users WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01';
```

## Data Warehousing

### BigQuery
```sql
-- Create table
CREATE OR REPLACE TABLE `project.dataset.events` (
  event_id STRING,
  user_id STRING,
  event_type STRING,
  event_time TIMESTAMP,
  properties JSON
);

-- Analyze
SELECT
  event_type,
  COUNT(*) as count,
  COUNT(DISTINCT user_id) as unique_users
FROM `project.dataset.events`
WHERE event_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
GROUP BY event_type
ORDER BY count DESC;
```

## Best Practices

1. **Normalization**: Balance between normalization and denormalization
2. **Indexing**: Index frequently queried and JOIN columns
3. **Transactions**: Use ACID for critical operations
4. **Caching**: Cache read-heavy data appropriately
5. **Monitoring**: Monitor query performance continuously
6. **Backup**: Regular backups with tested recovery procedures
7. **Security**: Encrypt sensitive data, use least privilege access

## Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Redis Documentation](https://redis.io/docs/)
- [Elasticsearch Guide](https://www.elastic.co/guide/index.html)
- [SQL Performance Tuning](https://use-the-index-luke.com/)
