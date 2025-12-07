# Running Tests - Quick Reference

## Get Started (30 seconds)

```bash
# 1. Install dependencies
npm install

# 2. Run all tests
npm test

# Done! 🎉
```

## Common Commands

### Run All Tests
```bash
npm test
```

### Watch Mode (auto-rerun on changes)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
# Opens: coverage/lcov-report/index.html
```

### Run Specific Test File
```bash
npm test -- CounterContext.test
npm test -- counter.test
npm test -- theme.test
npm test -- useTheme.test
```

### Run Specific Test Case
```bash
npm test -- --testNamePattern="should increment"
```

### Debug Mode
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

---

## What You Have

### ✅ Test Files (100+ test cases)
- `context/CounterContext.test.tsx` - 20+ tests
- `types/counter.test.ts` - 25+ tests
- `constants/theme.test.ts` - 35+ tests
- `hooks/useTheme.test.ts` - 20+ tests

### ✅ Configuration
- `jest.config.js` - Jest setup
- `jest.setup.js` - Mocks & environment
- `package.json` - Test scripts

### ✅ Utilities
- `__tests__/testUtils.ts` - Helper functions

### ✅ Documentation
- `TESTING.md` - Complete guide
- `TEST_SUITE.md` - Test reference
- `CODE_QUALITY_REPORT.md` - Quality metrics
- `IMPLEMENTATION_SUMMARY.md` - Full overview

---

## Expected Results

When you run `npm test`, you should see:

```
PASS  context/CounterContext.test.tsx
PASS  types/counter.test.ts
PASS  constants/theme.test.ts
PASS  hooks/useTheme.test.ts

Test Suites: 4 passed, 4 total
Tests:       100+ passed, 100+ total
Snapshots:   0 total
Time:        X.XXs
```

---

## Coverage Report

After running `npm run test:coverage`, you'll see:

```
=============== Coverage summary ===============
Statements   : 75% + (target: 75%)
Branches     : 70% + (target: 70%)
Functions    : 75% + (target: 75%)
Lines        : 75% + (target: 75%)
```

---

## Troubleshooting

### Tests Not Found?
```bash
npm test -- --listTests
```

### Cache Issues?
```bash
npm test -- --clearCache
```

### Dependencies Missing?
```bash
npm install
npm test
```

### Still Issues?
Check `TESTING.md` for detailed troubleshooting.

---

## Test Overview

| Component | Tests | Status |
|-----------|-------|--------|
| CounterContext | 20+ | ✅ Ready |
| Types | 25+ | ✅ Ready |
| Theme | 35+ | ✅ Ready |
| Hooks | 20+ | ✅ Ready |
| **Total** | **100+** | **✅ Ready** |

---

## Next: Learn More

- Full guide: `TESTING.md`
- Test reference: `TEST_SUITE.md`
- Quality metrics: `CODE_QUALITY_REPORT.md`

---

**Ready to test!** Run: `npm test` 🚀

