# Contributing to SmartReply AI

Thank you for your interest in contributing to SmartReply AI! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:
- A clear, descriptive title
- Steps to reproduce the bug
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Your environment (Thunderbird version, OS, etc.)

### Suggesting Features

We welcome feature suggestions! Please create an issue with:
- A clear, descriptive title
- Detailed description of the proposed feature
- Any relevant examples or mockups
- Explanation of why this feature would be useful

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests if available
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Pull Request Guidelines

- Update the README.md with details of changes if applicable
- Update the CHANGELOG.md with details of changes
- The PR should work on the latest Thunderbird version
- Follow the existing code style
- Include appropriate tests if adding new functionality
- Reference any related issues in your PR description

## Development Setup

1. Clone the repository
   ```
   git clone https://github.com/HeshamFS/smartreply-ai.git
   cd smartreply-ai
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Build the extension
   ```
   npm run build
   ```

4. For development, you can load the extension temporarily in Thunderbird:
   - Go to Add-ons Manager
   - Click the gear icon and select "Debug Add-ons"
   - Click "Load Temporary Add-on" and select any file in the `dist` directory

## Code Style

- Use consistent indentation (2 spaces)
- Use meaningful variable and function names
- Add comments for complex code sections
- Follow JavaScript best practices

## Testing

- Test your changes in Thunderbird before submitting a PR
- Ensure your changes don't break existing functionality
- Test with different API providers if your changes affect the AI integration

## License

By contributing to SmartReply AI, you agree that your contributions will be licensed under the project's MIT License.

## Questions?

If you have any questions about contributing, please open an issue or contact the maintainer at [hesham.salama@rub.de](mailto:hesham.salama@rub.de).

Thank you for contributing to SmartReply AI!
