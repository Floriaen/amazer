# Testing Guide

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Writing Tests

### Test File Location

Place test files either:
- Next to the file being tested: `lib/game/entity/man.test.js`
- In the `tests/` directory: `tests/entity/man.test.js`

### Example Test Structure

```javascript
describe('EntityName', () => {
    test('should do something', () => {
        // Arrange
        const entity = new EntityName();

        // Act
        const result = entity.someMethod();

        // Assert
        expect(result).toBe(expectedValue);
    });
});
```

### Testing Game Entities

Since the game uses ImpactJS, the `ig` global is mocked in `tests/setup.js`. You can:

1. Test entity logic
2. Test movement calculations
3. Test collision detection
4. Test state management

### Best Practices

1. **Isolate tests**: Each test should be independent
2. **Use descriptive names**: `test('should move player right when RIGHT key pressed')`
3. **Arrange-Act-Assert**: Structure tests clearly
4. **Mock dependencies**: Use Jest mocks for external dependencies
5. **Test edge cases**: Test boundary conditions and error cases

### Coverage Goals

Current coverage thresholds are set low (20%) to allow gradual improvement:
- Aim to increase coverage as you add tests
- Focus on testing critical game logic first
- Don't chase 100% coverage - focus on valuable tests

## Next Steps

1. Add tests for core game logic (Map, Man, entities)
2. Test collision detection algorithms
3. Test level loading and state management
4. Test input handling
5. Gradually increase coverage thresholds
