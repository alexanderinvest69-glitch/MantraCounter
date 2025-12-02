# Just Counter - Test Suite Documentation

## Quick Start

### Install and Run Tests
```bash
npm install
npm test              # Run all tests
npm run test:watch   # Run in watch mode
npm run test:coverage # Generate coverage report
```

## Test Suite Overview

This project includes **100+ comprehensive test cases** ensuring code quality and reliability across all major components.

### Test Files

#### 1. Context Provider Tests
**File**: `context/CounterContext.test.tsx`
```
✓ Initial State (3 tests)
  - Default counter initialization
  - Default settings initialization
  - Active counter setup

✓ Counter Operations (5 tests)
  - Increment count
  - Decrement count
  - Prevent decrement below 0
  - Reset count to 0
  - Cap count at 9999

✓ Add Counter (3 tests)
  - Add new counter
  - Set as active
  - Assign unique ID

✓ Settings Management (2 tests)
  - Update settings
  - Preserve other settings

✓ Edge Cases (2 tests)
  - Handle empty active ID
  - Handle rapid increments
```

#### 2. Type Validation Tests
**File**: `types/counter.test.ts`
```
✓ Counter Interface (5 tests)
  - Valid counter creation
  - Numeric properties
  - String properties
  - Count zero allowed
  - Count can exceed goal

✓ AppSettings Interface (6 tests)
  - Valid settings creation
  - Theme value validation
  - Dark theme support
  - Toggle haptic/sound
  - Avatar type validation
  - Default goal validation

✓ PRESET_COLORS Constant (6 tests)
  - Colors array defined
  - Valid hex codes
  - Minimum 8 colors
  - Contains specific colors
  - No duplicates
  - All strings

✓ DEFAULT_GOALS Constant (6 tests)
  - Goals array defined
  - Numeric values
  - Contains specific goals
  - Minimum 4 goals
  - Ascending order
  - Positive integers

✓ Type Compatibility (2 tests)
  - Counter array creation
  - Partial updates
```

#### 3. Theme Constants Tests
**File**: `constants/theme.test.ts`
```
✓ Light Theme (4 tests)
  - Theme defined
  - All colors present
  - Valid hex format
  - Proper text colors

✓ Dark Theme (4 tests)
  - Theme defined
  - All colors present
  - Valid hex format
  - Dark backgrounds

✓ Color Consistency (6 tests)
  - Same primary across themes
  - Same accent colors
  - Same success color
  - Same button text
  - Light theme contrast
  - Dark theme contrast

✓ Spacing (6 tests)
  - Tokens defined
  - All values present
  - Numeric values
  - Ascending order
  - Input height reasonable
  - Button height reasonable

✓ Border Radius (7 tests)
  - Tokens defined
  - All values present
  - Numeric values
  - Ascending order
  - Full radius large
  - Circle support
  - Proper sizing

✓ Typography (10 tests)
  - Tokens defined
  - All styles present
  - fontSize property
  - fontWeight property
  - Valid weights
  - Readable sizes
  - Size hierarchy
  - Body readable
  - Small smaller
  - Bold headings

✓ Design Consistency (3 tests)
  - Spacing scale
  - Responsive support
  - Touch targets
```

#### 4. Hook Tests
**File**: `hooks/useTheme.test.ts`
```
✓ Light Theme (3 tests)
  - Returns light colors
  - isDark false
  - All colors present

✓ Dark Theme (3 tests)
  - Returns dark colors
  - isDark true
  - Dark backgrounds

✓ Auto Theme (1 test)
  - Handles gracefully

✓ Null Scheme (2 tests)
  - Defaults to light
  - isDark false

✓ Return Value (4 tests)
  - Has theme property
  - Has isDark property
  - Correct types
  - Stable reference

✓ Color Properties (5 tests)
  - Text color present
  - Primary present
  - Background colors
  - Valid hex colors
  - All properties

✓ Theme Switching (2 tests)
  - Updates on change
  - Consistent primary

✓ Edge Cases (2 tests)
  - Handles undefined
  - Multiple calls safe
```

## Test Utilities

### Mock Factories
Located in `__tests__/testUtils.ts`

```typescript
// Create individual counter
createMockCounter({ name: 'Custom' })

// Create multiple counters
createMockCounters(5)

// Create settings
createMockSettings({ theme: 'dark' })

// Simulate operations
simulateCounterOperation(counter, 'increment', 5)
```

### Helper Functions
```typescript
// Progress tracking
hasReachedGoal(counter)
getProgressPercentage(counter)
getRemainingCount(counter)

// Validation
isValidCounter(obj)
isValidSettings(obj)
```

### Mock Data
```typescript
MOCK_DATA.counters.daily
MOCK_DATA.counters.weekly
MOCK_DATA.settings.default
MOCK_DATA.progressLevels.half
```

## Coverage Report

### Target Metrics
- **Branches**: 70%
- **Functions**: 75%
- **Lines**: 75%
- **Statements**: 75%

### Generate Report
```bash
npm run test:coverage
# Opens: coverage/lcov-report/index.html
```

### Covered Areas
- ✓ Context state management
- ✓ Type validation
- ✓ Design system constants
- ✓ Theme hooks
- ✓ Utility functions

## Writing New Tests

### Template: Unit Test
```typescript
describe('Feature Name', () => {
  describe('Specific Behavior', () => {
    it('should do something specific', () => {
      // Arrange
      const data = createMockCounter({ count: 5 });
      
      // Act
      const result = simulate(data, 'increment');
      
      // Assert
      expect(result.count).toBe(6);
    });
  });
});
```

### Template: Hook Test
```typescript
import { renderHook } from '@testing-library/react-native';

describe('useCustomHook', () => {
  it('should return expected value', () => {
    const { result } = renderHook(() => useCustomHook());
    expect(result.current).toBeDefined();
  });
});
```

### Template: Component Test
```typescript
import { render } from '@testing-library/react-native';

describe('Component', () => {
  it('should render correctly', () => {
    const { getByTestID } = render(<Component />);
    expect(getByTestID('element')).toBeTruthy();
  });
});
```

## Running Specific Tests

### Single Test File
```bash
npm test -- CounterContext.test
```

### Single Test Case
```bash
npm test -- --testNamePattern="should increment"
```

### Test Pattern
```bash
npm test -- --testNamePattern="Counter"
```

### Debug Mode
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Best Practices

### Do's ✓
- Use descriptive test names
- Follow AAA pattern (Arrange-Act-Assert)
- One assertion concept per test
- Use mock factories
- Test edge cases
- Keep tests isolated

### Don'ts ✗
- Don't use vague names
- Don't test multiple concepts
- Don't skip setup/cleanup
- Don't hardcode test data
- Don't ignore edge cases
- Don't create test dependencies

## Troubleshooting

### Tests Not Running
```bash
# Clear cache
npm test -- --clearCache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm test
```

### Module Not Found
Check `jest.config.js` moduleNameMapper:
```javascript
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/$1',
}
```

### Async Test Timeout
Use `waitFor` for async operations:
```typescript
await waitFor(() => {
  expect(element).toBeVisible();
});
```

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Install dependencies
  run: npm install

- name: Run tests
  run: npm test -- --coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
```

## Code Quality Checklist

Before committing:
- [ ] All tests pass: `npm test`
- [ ] Coverage meets target: `npm run test:coverage`
- [ ] Code lints: `npm run lint`
- [ ] Format correct: `npm run format`

## Resources

- [Jest Documentation](https://jestjs.io)
- [React Testing Library](https://testing-library.com)
- [React Native Testing](https://reactnative.dev/docs/testing)
- [Expo Testing Guide](https://docs.expo.dev/guides/testing)

## Support

For test-related questions:
1. Check inline test comments
2. Review TESTING.md guide
3. Check jest.config.js setup
4. Review test examples in existing files

---

**Test Suite Created**: December 2, 2025
**Total Test Cases**: 100+
**Coverage Target**: 75%
**Status**: Ready for Development ✓

