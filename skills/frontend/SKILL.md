---
name: frontend-technologies
description: Master web interface development with HTML, CSS, JavaScript, and modern frameworks like React, Vue, and Angular. Use this skill when building web applications, optimizing frontend performance, implementing responsive designs, or exploring mobile development with React Native and Flutter.
---

# Frontend Technologies Skill

## Quick Start

### HTML & CSS Foundation
```html
<!-- Semantic HTML structure -->
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <ul role="menubar">
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main role="main">
  <article role="article">
    <h1>Page Title</h1>
  </article>
</main>
```

### JavaScript ES6+ Essentials
```javascript
// Arrow functions and destructuring
const handleClick = (event) => {
  const { target } = event;
  console.log(target);
};

// Async/await patterns
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
  }
};
```

### React Basics
```jsx
import React, { useState, useEffect } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## Core Technologies

### Frontend Stack
- **HTML5**: Semantic markup, accessibility (A11y), meta tags, structured data
- **CSS3**: Flexbox, Grid, animations, responsive design, custom properties
- **JavaScript**: ES6+, async programming, DOM manipulation, APIs
- **TypeScript**: Type safety, interfaces, generics, advanced types

### Framework Ecosystem
- **React**: Hooks, Context API, performance optimization, Next.js
- **Vue.js**: Composition API, reactivity system, Nuxt.js
- **Angular**: RxJS, dependency injection, TypeScript integration
- **Svelte**: Compiler approach, reactivity, performance benefits

### Essential Tools
- **Build Tools**: Webpack, Vite, Turbopack, esbuild
- **Package Managers**: npm, yarn, pnpm
- **Testing**: Jest, Vitest, React Testing Library, Cypress
- **Styling**: Tailwind CSS, CSS-in-JS, SASS/SCSS

### Performance & Optimization
```javascript
// Code splitting in React
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() =>
  import('./HeavyComponent')
);

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### State Management
- **React**: Redux, Zustand, Jotai, Recoil
- **Vue**: Pinia, Vuex
- **Angular**: NgRx, Akita
- **Context API**: Built-in React solution

### Accessibility (A11y)
```html
<!-- ARIA attributes for screen readers -->
<button
  aria-label="Close menu"
  aria-expanded="false"
  aria-controls="menu"
>
  ×
</button>

<div id="menu" role="navigation" aria-hidden="true">
  <!-- Menu content -->
</div>
```

## Advanced Patterns

### Component Architecture
- Presentational vs Container components
- Custom Hooks for logic reuse
- Compound components pattern
- Render props and Higher-Order Components (HOCs)

### Performance Optimization
- Lazy loading and code splitting
- Image optimization and responsive images
- Bundle analysis and tree shaking
- Web Vitals (LCP, FID, CLS)

### Progressive Web Apps (PWA)
```javascript
// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('SW registered:', registration);
    });
}
```

## Mobile Development

### React Native
```javascript
import { View, Text, StyleSheet } from 'react-native';

export function App() {
  return (
    <View style={styles.container}>
      <Text>Hello, React Native!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
```

### Flutter (Dart)
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
        body: const Center(child: Text('Hello Flutter')),
      ),
    );
  }
}
```

## Testing Strategies

### Unit Testing
```javascript
import { render, screen } from '@testing-library/react';
import { Counter } from './Counter';

test('increments count on button click', () => {
  render(<Counter />);
  const button = screen.getByRole('button');
  button.click();
  expect(screen.getByText(/Count: 1/)).toBeInTheDocument();
});
```

### E2E Testing
```javascript
// Cypress example
describe('User Flow', () => {
  it('should complete checkout', () => {
    cy.visit('/');
    cy.get('[data-testid="product"]').first().click();
    cy.get('[data-testid="add-to-cart"]').click();
    cy.get('[data-testid="checkout"]').click();
  });
});
```

## Best Practices

1. **Semantic HTML**: Use proper semantic tags for accessibility
2. **CSS Organization**: Use methodologies like BEM or Atomic CSS
3. **Performance**: Optimize images, lazy load, minimize JavaScript
4. **Accessibility**: WCAG 2.1 compliance, keyboard navigation, screen reader support
5. **Type Safety**: Use TypeScript for large applications
6. **Testing**: Aim for 70%+ code coverage, focus on user interactions
7. **Documentation**: Keep README and component documentation updated

## Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [React Documentation](https://react.dev/)
- [Vue.js Guide](https://vuejs.org/)
- [Angular Documentation](https://angular.io/)
- [Web Accessibility (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev Performance Guide](https://web.dev/performance/)
