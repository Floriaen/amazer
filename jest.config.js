module.exports = {
	// Test environment
	testEnvironment: 'jsdom',

	// Root directory for tests
	roots: ['<rootDir>/lib/game', '<rootDir>/tests'],

	// Test file patterns
	testMatch: [
		'**/__tests__/**/*.js',
		'**/?(*.)+(spec|test).js'
	],

	// Coverage configuration
	collectCoverageFrom: [
		'lib/game/**/*.js',
		'!lib/game/levels/**',
		'!lib/game/**/*.test.js',
		'!lib/game/**/*.spec.js'
	],

	// Coverage thresholds (start low, increase over time)
	coverageThreshold: {
		global: {
			branches: 20,
			functions: 20,
			lines: 20,
			statements: 20
		}
	},

	// Setup files
	setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

	// Module paths
	modulePaths: ['<rootDir>'],

	// Transform files with babel
	transform: {
		'^.+\\.js$': 'babel-jest'
	},

	// Ignore patterns
	testPathIgnorePatterns: [
		'/node_modules/',
		'/build/',
		'/lib/impact/',
		'/lib/plugins/',
		'/lib/weltmeister/'
	],

	// Verbose output
	verbose: true
};
