# Changelog

All notable changes to the SmartReply AI extension will be documented in this file.

## [1.2.0] - 2025-03-27

### Added
- Intelligent email categorization system with both AI-powered and rule-based categorization
- Advanced filtering options for history (category, style, length, tags, date range)
- Tagging system for responses based on keywords and context
- Two-column layout for history and templates pages
- Pagination controls for both history and templates
- Template variables system with dynamic content support
- Comprehensive README with installation and usage instructions
- Production-ready optimizations (minification, error handling)

### Changed
- Redesigned history page with improved card layout
- Enhanced template management interface
- Improved filtering UI with elegant styling
- Optimized code for better performance
- Updated manifest.json to Manifest V3 format
- Removed console.log statements for production
- Added proper error handling throughout the codebase

### Fixed
- CSS compatibility issues with line-clamp property
- Various UI inconsistencies and styling issues
- Error handling for API failures
- Template variable detection and rendering

## [1.1.0] - 2025-02-15

### Added
- Support for multiple AI models:
  - OpenAI GPT-4o
  - OpenAI O3-mini
  - Gemini Pro
  - Mistral AI
  - Ollama (local LLM integration)
- Model fallback mechanism for reliability
- Response length options (short, medium, long)
- Content controls (action items, address questions, bullet points)
- Connection testing for all AI models

### Changed
- Enhanced settings interface with model-specific options
- Improved error handling for API calls
- Updated UI for better usability

### Fixed
- API connection issues
- Response formatting problems
- Template application bugs

## [1.0.0] - 2025-01-10

### Added
- Initial release of SmartReply AI
- Email response generation with Gemini Pro
- Basic template system
- Simple history tracking
- Response style selection (professional, friendly, concise, detailed)
- Personal signature customization
- Email greeting format with recipient name extraction
