# Contributing to Nexus Starter Kit

We love contributions! Here's how to help improve the Nexus Starter Kit.

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions.

## How to Contribute

### 1. Fork & Clone

```bash
git clone https://github.com/yourusername/nexus-starter.git
cd nexus-starter
npm install
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes

- Keep changes focused and atomic
- Write clear commit messages
- Test your changes: `npm run dev` and `npm run build`
- Don't include API keys or secrets

### 4. Commit & Push

```bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

### 5. Submit a Pull Request

- Describe what your PR does
- Reference any related issues
- Include screenshots if UI changes
- Wait for review

## Development Setup

```bash
npm install
cp .env.example .env
# Fill in .env with test values
npm run dev
```

## Project Structure

- `src/components/` - React/Astro components
- `src/pages/` - Website routes
- `src/layouts/` - Page templates
- `src/lib/api/` - External API integrations
- `src/styles/` - Global styles

## Code Style

- Use TypeScript when possible
- Follow existing patterns in the codebase
- Comment complex logic
- Keep components focused and reusable

## Testing

```bash
npm run dev      # Start dev server
npm run build    # Test production build
npm run preview  # Preview production build
```

## Reporting Issues

When reporting bugs, include:
- Clear description
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots if applicable
- Environment info (OS, Node version, etc.)

## Questions?

- Check existing issues & PRs
- Review documentation in `/docs`
- Ask in GitHub Discussions

## License

By contributing, you agree your code is licensed under the same license as the project.

---

Thanks for contributing! 🙏
