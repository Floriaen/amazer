# Development Guide

## Setup

### Initial Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure deployment** (optional):
   ```bash
   cp .env.example .env
   # Edit .env with your deployment credentials
   ```

3. **Install git hooks**:
   ```bash
   npm run prepare
   ```

## Development Workflow

### Running the Game

Open `index.html` in your browser to play the game during development. No build step is required for development.

### Building for Production

```bash
npm run build
```

This will:
- Minify and bundle the game code
- Copy assets to the `build/` directory
- Create `build/game.min.js`

### Code Quality

#### Linting

Check your code for issues:
```bash
npm run lint
```

Auto-fix issues:
```bash
npm run lint:fix
```

#### Formatting

Check code formatting:
```bash
npm run format:check
```

Format all files:
```bash
npm run format
```

#### Pre-commit Hooks

Git hooks automatically run linting and formatting on staged files before each commit. This ensures code quality and consistency.

To bypass hooks (not recommended):
```bash
git commit --no-verify
```

### Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

See `tests/README.md` for more information on writing tests.

## Deployment

### Website Deployment

**SECURITY NOTE**: Never use root user for deployment!

1. Set up environment variables in `.env`:
   ```bash
   DEPLOY_USER=deploy          # Use a non-root user
   DEPLOY_HOST=example.com     # Your server
   DEPLOY_PATH=/var/www/amazer # Deployment path
   ```

2. Deploy:
   ```bash
   npm run deploy:website
   ```

### Itch.io Deployment

1. Configure in `.env`:
   ```bash
   ITCHIO_TOOL_PATH=~/path/to/butler
   ITCHIO_TARGET=yourusername/amazer:html5
   ```

2. Deploy:
   ```bash
   npm run deploy:itchio
   ```

## Project Structure

```
amazer/
├── lib/
│   ├── game/           # Game-specific code (EDIT THESE)
│   │   ├── entity/     # Game entities (player, enemies, items)
│   │   ├── engine/     # Custom engine extensions
│   │   ├── levels/     # Level data (JSON)
│   │   ├── main.js     # Main game loop
│   │   └── map.js      # Level/floor management
│   ├── impact/         # ImpactJS engine (DON'T EDIT)
│   ├── plugins/        # Third-party plugins (DON'T EDIT)
│   └── weltmeister/    # Level editor (DON'T EDIT)
├── media/              # Images, sounds, fonts
├── tests/              # Test files
├── tools/              # Build scripts
├── build/              # Production build (generated)
├── index.html          # Game entry point
└── weltmeister.html    # Level editor
```

## Code Style

The project uses:
- **ESLint** for code quality
- **Prettier** for code formatting
- **EditorConfig** for editor consistency

Your editor should automatically pick up these configurations. Install the appropriate plugins:
- VSCode: ESLint, Prettier, EditorConfig
- JetBrains IDEs: Have built-in support

## Common Issues

### `npm run build` fails

Make sure PHP is installed (required by the bake script):
```bash
php --version
```

### Git hooks not working

Reinstall hooks:
```bash
npm run prepare
```

### ESLint errors on ImpactJS globals

ImpactJS globals (`ig`, `Map`, `Man`, etc.) are configured in `.eslintrc.json`. Add new globals there if needed.

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure tests pass: `npm test`
4. Ensure linting passes: `npm run lint`
5. Commit your changes (pre-commit hooks will run)
6. Push and create a pull request

## Resources

- [ImpactJS Documentation](https://impactjs.com/documentation)
- [Jest Testing Guide](https://jestjs.io/docs/getting-started)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
