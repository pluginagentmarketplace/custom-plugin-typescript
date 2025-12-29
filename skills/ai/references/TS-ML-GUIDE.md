# TypeScript for AI/ML Development

> Type-safe machine learning with TypeScript

## Core Types

### Tensor Types
```typescript
type Tensor1D = number[];
type Tensor2D = number[][];
type Tensor3D = number[][][];

// Generic tensor
type Tensor<T extends number = number> = T[] | T[][] | T[][][];
```

### Model Configuration
```typescript
interface ModelConfig {
  inputShape: number[];
  layers: LayerConfig[];
  optimizer: 'adam' | 'sgd' | 'rmsprop';
  loss: 'mse' | 'crossentropy';
}

interface LayerConfig {
  type: 'dense' | 'conv2d' | 'lstm';
  units: number;
  activation?: 'relu' | 'sigmoid' | 'softmax';
}
```

### Training Types
```typescript
interface TrainingOptions {
  epochs: number;
  batchSize: number;
  validationSplit?: number;
}

interface TrainingResult {
  history: { loss: number[]; accuracy: number[] };
  finalMetrics: { loss: number; accuracy: number };
}
```

## OpenAI API Types

```typescript
interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletion {
  id: string;
  choices: { message: ChatMessage; index: number }[];
  usage: { prompt_tokens: number; completion_tokens: number };
}

async function chat(messages: ChatMessage[]): Promise<ChatCompletion> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ messages })
  });
  return response.json();
}
```

## Best Practices

| Practice | Example |
|----------|---------|
| Use strict types | `number[]` not `any[]` |
| Generic constraints | `<T extends number>` |
| Readonly for immutable | `readonly number[]` |
| Branded types for IDs | `type ModelId = string & { _brand: 'ModelId' }` |

---

**Author:** Dr. Umit Kacar & Muhsin Elcicek
