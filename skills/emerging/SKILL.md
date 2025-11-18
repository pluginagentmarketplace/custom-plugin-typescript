---
name: emerging-technologies
description: Master cutting-edge technologies including AI/ML, Large Language Models, blockchain, Web3, and mobile development. Use this skill when exploring new technologies, building with LLMs, developing smart contracts, or preparing for future industry trends.
---

# Emerging Technologies & AI Skill

## Quick Start

### Machine Learning Basics
```python
# Linear Regression with scikit-learn
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import numpy as np

# Sample data
X = np.array([[1, 2], [3, 4], [5, 6], [7, 8]])
y = np.array([1, 2, 3, 4])

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict
predictions = model.predict(X_test)
score = model.score(X_test, y_test)
```

### Large Language Models with OpenAI API
```javascript
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Simple completion
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: 'You are helpful assistant' },
    { role: 'user', content: 'Explain quantum computing' }
  ],
  temperature: 0.7,
  max_tokens: 500
});

console.log(response.choices[0].message.content);
```

### Prompt Engineering
```javascript
// 1. Clear Instructions
// ❌ BAD
"Explain AI"

// ✅ GOOD
"Explain artificial intelligence in 2-3 sentences for a 5-year-old child"

// 2. Examples (Few-shot learning)
const prompt = `
Classify the sentiment of customer reviews:

Review: "Great product, highly recommend!"
Sentiment: Positive

Review: "Terrible quality, broke after one day"
Sentiment: Negative

Review: "Good value for money"
Sentiment: Positive

Review: "${userReview}"
Sentiment:`;

// 3. Chain-of-Thought
"Let's work through this step by step:
1. First, identify the key information
2. Then, determine the relationships
3. Finally, draw conclusions"
```

### Neural Networks with TensorFlow
```javascript
// TensorFlow.js for JavaScript
const tf = require('@tensorflow/tfjs');

// Create sequential model
const model = tf.sequential({
  layers: [
    tf.layers.dense({ units: 64, activation: 'relu', inputShape: [10] }),
    tf.layers.dropout({ rate: 0.2 }),
    tf.layers.dense({ units: 32, activation: 'relu' }),
    tf.layers.dense({ units: 1, activation: 'sigmoid' })
  ]
});

// Compile model
model.compile({
  optimizer: tf.train.adam(0.01),
  loss: 'binaryCrossentropy',
  metrics: ['accuracy']
});

// Train model
await model.fit(trainX, trainY, {
  epochs: 50,
  batchSize: 32,
  validationSplit: 0.2
});

// Make predictions
const predictions = model.predict(testX);
```

## AI & Machine Learning

### Supervised Learning
```python
# Classification with decision tree
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, precision_score

X_train = [[0, 0], [1, 1], [2, 2]]
y_train = [0, 1, 1]

clf = DecisionTreeClassifier()
clf.fit(X_train, y_train)

predictions = clf.predict([[1.5, 1.5]])
accuracy = accuracy_score(y_test, predictions)
```

### Unsupervised Learning
```python
# Clustering with K-means
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Sample data
X = [[1, 2], [2, 2], [2, 3], [8, 8], [8, 9], [9, 9]]

# Create and fit model
kmeans = KMeans(n_clusters=2, random_state=0)
labels = kmeans.fit_predict(X)

# Visualize
plt.scatter(X[:, 0], X[:, 1], c=labels)
plt.show()
```

### Deep Learning
```python
# Neural network for image classification
import tensorflow as tf
from tensorflow import keras

# Load dataset
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()

# Normalize
X_train = X_train / 255.0
X_test = X_test / 255.0

# Build model
model = keras.Sequential([
  keras.layers.Flatten(input_shape=(28, 28)),
  keras.layers.Dense(128, activation='relu'),
  keras.layers.Dropout(0.2),
  keras.layers.Dense(10, activation='softmax')
])

model.compile(
  optimizer='adam',
  loss='sparse_categorical_crossentropy',
  metrics=['accuracy']
)

model.fit(X_train, y_train, epochs=10, validation_split=0.2)
```

## Large Language Models & Generative AI

### RAG (Retrieval-Augmented Generation)
```javascript
// Combine vector search with LLMs
const { OpenAI } = require('openai');
const { Pinecone } = require('@pinecone-database/pinecone');

const openai = new OpenAI();
const pinecone = new Pinecone();

// 1. Create embeddings
const embedding = await openai.embeddings.create({
  model: 'text-embedding-3-small',
  input: userQuery
});

// 2. Search vector database
const results = await pinecone.query({
  vector: embedding.data[0].embedding,
  topK: 3,
  includeMetadata: true
});

// 3. Build context
const context = results.matches
  .map(m => m.metadata.text)
  .join('\n\n');

// 4. Generate response
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    {
      role: 'system',
      content: `You are a helpful assistant. Use this context to answer:\n${context}`
    },
    { role: 'user', content: userQuery }
  ]
});
```

### Fine-tuning LLMs
```bash
# OpenAI fine-tuning example

# 1. Prepare training data (JSONL format)
{"messages": [{"role": "system", "content": "You are helpful"}, {"role": "user", "content": "q1"}, {"role": "assistant", "content": "a1"}]}

# 2. Upload file
openai api files.create -c fine_tuning -f train.jsonl

# 3. Create fine-tuning job
openai api fine_tuning.jobs.create \
  -m gpt-3.5-turbo \
  --training-file file_id

# 4. Check status and use
openai api fine_tuning.jobs.get -i job_id
```

### Function Calling with LLMs
```javascript
const functions = [
  {
    name: 'get_weather',
    description: 'Get weather for a location',
    parameters: {
      type: 'object',
      properties: {
        location: { type: 'string' },
        unit: { type: 'string', enum: ['celsius', 'fahrenheit'] }
      },
      required: ['location']
    }
  }
];

const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'What is the weather in Paris?' }],
  functions: functions,
  function_call: 'auto'
});

if (response.choices[0].message.function_call) {
  const funcName = response.choices[0].message.function_call.name;
  const args = JSON.parse(response.choices[0].message.function_call.arguments);
  // Call appropriate function
}
```

## Blockchain & Web3

### Smart Contracts with Solidity
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleToken {
    string public name = "MyToken";
    uint8 public decimals = 18;
    uint public totalSupply = 1000000 * 10 ** uint(decimals);

    mapping(address => uint) public balanceOf;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address to, uint value) public returns (bool) {
        require(balanceOf[msg.sender] >= value);
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        return true;
    }
}
```

### Web3.js Interaction
```javascript
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

// Get account balance
const balance = await web3.eth.getBalance('0x123...');
console.log(web3.utils.fromWei(balance, 'ether'));

// Send transaction
const tx = await web3.eth.sendTransaction({
  from: '0x123...',
  to: '0x456...',
  value: web3.utils.toWei('1', 'ether')
});

// Interact with smart contract
const contract = new web3.eth.Contract(ABI, contractAddress);
const result = await contract.methods.getName().call();
```

### DeFi Protocols
```javascript
// Uniswap swap example
const { ethers } = require('ethers');
const { ChainId, Token, WETH, Fetcher, Route, Trade, TradeType } = require('@uniswap/sdk');

// Get token pair
const UNI = new Token(ChainId.MAINNET, '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', 18);
const pair = await Fetcher.fetchPairData(UNI, WETH[ChainId.MAINNET]);

// Create route and trade
const route = new Route([pair], WETH[ChainId.MAINNET]);
const trade = new Trade(route, new TokenAmount(WETH[ChainId.MAINNET], '1000000000000000000'), TradeType.EXACT_INPUT);

// Execute swap
const slippageTolerance = new Percent('50', '10000');
const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
```

## Mobile Development

### React Native
```javascript
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export function App() {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Button
        title="Submit"
        onPress={() => console.log(name)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16
  }
});
```

### Flutter with Dart
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Flutter App')),
        body: const MyHomePage(),
      ),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text('Count: $_counter'),
          ElevatedButton(
            onPressed: () => setState(() => _counter++),
            child: const Text('Increment'),
          )
        ],
      ),
    );
  }
}
```

## AI Engineering Best Practices

1. **Data Quality**: Garbage in, garbage out - ensure quality training data
2. **Prompt Engineering**: Invest time in well-crafted prompts
3. **Model Selection**: Choose appropriate models for your use case
4. **Error Handling**: LLMs can hallucinate - validate outputs
5. **Cost Management**: Monitor API usage and optimize costs
6. **User Experience**: Design intuitive interactions with AI
7. **Transparency**: Disclose when users interact with AI
8. **Ethical Considerations**: Address bias and fairness

## Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [TensorFlow Documentation](https://www.tensorflow.org/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [React Native Documentation](https://reactnative.dev/)
- [Flutter Documentation](https://flutter.dev/)
- [ML Mastery](https://machinelearningmastery.com/)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
