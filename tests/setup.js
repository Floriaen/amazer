// Jest setup file - runs before all tests

// Mock the ImpactJS global object
global.ig = {
	module: jest.fn().mockReturnThis(),
	requires: jest.fn().mockReturnThis(),
	defines: jest.fn(callback => callback && callback()),
	Game: {
		extend: jest.fn(obj => obj),
		SORT: {
			Z_INDEX: jest.fn(),
			POS_Y: jest.fn(),
			TOP_DOWN: jest.fn()
		}
	},
	Entity: {
		extend: jest.fn(obj => obj),
		TYPE: {
			NONE: 0,
			A: 1,
			B: 2
		},
		COLLIDES: {
			NEVER: 0,
			LITE: 1,
			PASSIVE: 2,
			ACTIVE: 3,
			FIXED: 4
		}
	},
	Image: jest.fn(),
	Sound: jest.fn(),
	Font: jest.fn(),
	Timer: jest.fn(() => ({
		set: jest.fn(),
		delta: jest.fn(() => 0),
		tick: jest.fn(() => 0),
		reset: jest.fn(),
		pause: jest.fn()
	})),
	input: {
		bind: jest.fn(),
		bindTouch: jest.fn(),
		state: jest.fn(),
		pressed: jest.fn()
	},
	system: {
		tick: 0.016,
		canvas: { width: 448, height: 448 },
		context: {},
		scale: 4
	},
	global: {
		TILE_SIZE: 16,
		MAX_FLOOR: 10,
		LEVEL_COUNT: 12
	},
	music: {
		add: jest.fn(),
		play: jest.fn(),
		stop: jest.fn()
	},
	CollisionMap: jest.fn()
};

// Suppress console warnings in tests
global.console = {
	...console,
	warn: jest.fn(),
	error: jest.fn()
};
