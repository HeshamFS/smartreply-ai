# SmartReply AI

<div align="center">
  <img src="icons/sparkle-stars-icon.svg" alt="SmartReply AI Logo" width="128" height="128">
</div>

## AI-powered email response generator for Thunderbird

SmartReply AI is a powerful Thunderbird extension that helps you generate intelligent email responses using AI. It features advanced categorization, templates, and multiple AI model support to make your email communication more efficient and effective.

![Version](https://img.shields.io/badge/version-1.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Thunderbird](https://img.shields.io/badge/Thunderbird-78.0%2B-orange)

## Features

### AI-Powered Response Generation
- Generate professional, friendly, concise, or detailed email responses
- Choose from short, medium, or long response lengths
- Include action items, address questions, and use bullet points
- Customize your personal signature for all responses

### Multiple AI Model Support
- OpenAI (GPT-4o and O3-mini)
- Google Gemini Pro
- Mistral AI
- Ollama (for local LLM integration)
- Automatic fallback mechanism if primary model fails

### Email History & Categorization
- Intelligent auto-categorization of responses
- Advanced filtering by category, style, length, and date
- Tag-based organization for easy retrieval
- Beautiful two-column layout for efficient browsing

### Template System
- Create and manage reusable email templates
- Support for dynamic variables in templates
- Categorize templates for better organization
- Apply templates directly to email responses

### Additional Tools
- Email sentiment analysis
- Email summarization
- Translation capabilities
- Customizable response styles

## Installation

### From Release
1. Download the latest `.zip` file from the [Releases](https://github.com/HeshamFS/smartreply-ai/releases) page
2. In Thunderbird, go to the menu and select "Add-ons and Themes"
3. Click the gear icon and select "Install Add-on From File..."
4. Browse to the downloaded .zip file and select it
5. Click "Add" when prompted
6. Restart Thunderbird if required

### From Source
1. Clone this repository
   ```
   git clone https://github.com/HeshamFS/smartreply-ai.git
   cd smartreply-ai
   ```
2. Install dependencies: `npm install`
3. Build the extension: `npm run build`
4. The extension will be in the `dist` folder
5. Package for installation: `cd dist && zip -r ../smartreply-ai.zip *`
6. Follow steps 2-6 from "From Release" section above

## Setup

### API Keys
To use SmartReply AI, you'll need to provide at least one of the following API keys:

1. **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. **Google Gemini API Key**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Mistral AI API Key**: Get from [Mistral AI Console](https://console.mistral.ai/)
4. **Ollama**: Set up [Ollama](https://ollama.ai/) locally for offline use

Enter your API keys in the extension options page.

## Usage

### Generating Responses
1. Open an email you want to reply to in Thunderbird
2. Click the SmartReply AI icon in the message header
3. Select your desired response style and length
4. Click "Generate Response"
5. Review and edit the generated response if needed
6. Click "Insert" to add the response to your email reply

### Managing Templates
1. Click the "Templates" tab in the SmartReply AI popup
2. Create new templates with the "New Template" button
3. Use variables like `{{recipient_name}}` for dynamic content
4. Apply templates directly to your emails

### Viewing History
1. Click the "History" tab in the SmartReply AI popup
2. Browse through your past responses
3. Filter by category, style, length, or date
4. Reuse or save responses as templates

## Development

### Prerequisites
- Node.js (v14+)
- npm (v6+)

### Setup Development Environment
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

### Project Structure
- `icons/` - Extension icons and UI images
- `popup.js/html/css` - Main extension popup UI
- `background.js` - Background scripts for Thunderbird integration
- `options.js/html` - Settings page
- `history.js/html/css` - History and templates management
- `history-ui.js` - UI logic for history and templates

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact

If you have any questions or feedback, please open an issue or contact the maintainer at [hesham.salama@rub.de](mailto:hesham.salama@rub.de).

---

<div align="center">
  <p>Made with ❤️ for the Thunderbird community</p>
  <p> 2025 Hesham Salama</p>
</div>
