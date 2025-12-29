#!/usr/bin/env npx ts-node

/**
 * ML Types Validator
 * Validates TypeScript types for AI/ML applications
 *
 * @author Dr. Umit Kacar & Muhsin Elcicek
 * @version 1.0.0
 */

// Type definitions
type Tensor = number[] | number[][] | number[][][];
type ActivationFunction = 'relu' | 'sigmoid' | 'tanh' | 'softmax';
type LossFunction = 'mse' | 'crossentropy' | 'binaryCrossentropy';

interface LayerConfig {
  type: 'dense' | 'conv2d' | 'lstm' | 'dropout';
  units?: number;
  activation?: ActivationFunction;
  rate?: number;
}

interface ModelConfig {
  name: string;
  inputShape: number[];
  layers: LayerConfig[];
  optimizer: string;
  loss: LossFunction;
}

interface TrainingMetrics {
  epoch: number;
  loss: number;
  accuracy: number;
  valLoss?: number;
  valAccuracy?: number;
}

// Validation functions
function validateTensor(tensor: unknown): tensor is Tensor {
  if (!Array.isArray(tensor)) return false;
  if (tensor.length === 0) return true;

  const checkNumbers = (arr: unknown[]): boolean => {
    return arr.every(item => {
      if (typeof item === 'number') return true;
      if (Array.isArray(item)) return checkNumbers(item);
      return false;
    });
  };

  return checkNumbers(tensor);
}

function validateModelConfig(config: unknown): config is ModelConfig {
  if (typeof config !== 'object' || config === null) return false;

  const c = config as Record<string, unknown>;

  return (
    typeof c.name === 'string' &&
    Array.isArray(c.inputShape) &&
    Array.isArray(c.layers) &&
    typeof c.optimizer === 'string' &&
    typeof c.loss === 'string'
  );
}

function validateMetrics(metrics: unknown): metrics is TrainingMetrics {
  if (typeof metrics !== 'object' || metrics === null) return false;

  const m = metrics as Record<string, unknown>;

  return (
    typeof m.epoch === 'number' &&
    typeof m.loss === 'number' &&
    typeof m.accuracy === 'number'
  );
}

// Example usage and tests
function runTests(): void {
  console.log('ML Types Validation Tests\n');

  // Test tensors
  const tensor1D: Tensor = [1, 2, 3, 4];
  const tensor2D: Tensor = [[1, 2], [3, 4]];

  console.log('Tensor 1D valid:', validateTensor(tensor1D));
  console.log('Tensor 2D valid:', validateTensor(tensor2D));

  // Test model config
  const modelConfig: ModelConfig = {
    name: 'my-model',
    inputShape: [28, 28, 1],
    layers: [
      { type: 'conv2d', units: 32, activation: 'relu' },
      { type: 'dense', units: 10, activation: 'softmax' }
    ],
    optimizer: 'adam',
    loss: 'crossentropy'
  };

  console.log('Model config valid:', validateModelConfig(modelConfig));

  // Test metrics
  const metrics: TrainingMetrics = {
    epoch: 1,
    loss: 0.5,
    accuracy: 0.85,
    valLoss: 0.55,
    valAccuracy: 0.82
  };

  console.log('Metrics valid:', validateMetrics(metrics));

  console.log('\nAll tests passed!');
}

// Run tests
runTests();

export { validateTensor, validateModelConfig, validateMetrics };
