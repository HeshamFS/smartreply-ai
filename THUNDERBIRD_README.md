# SmartReply AI for Thunderbird

This is the Thunderbird-compatible version of SmartReply AI, an extension that helps you generate intelligent email responses using AI.

## Installation in Thunderbird

1. Download the extension package (.xpi file)
2. In Thunderbird, go to the menu and select "Add-ons and Themes"
3. Click the gear icon and select "Install Add-on From File..."
4. Browse to the downloaded .xpi file and select it
5. Click "Add" when prompted
6. Restart Thunderbird if required

## Setup

### API Keys
To use SmartReply AI, you'll need to provide at least one of the following API keys:

1. **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. **Google Gemini API Key**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. **Mistral AI API Key**: Get from [Mistral AI Console](https://console.mistral.ai/)
4. **Ollama**: Set up [Ollama](https://ollama.ai/) locally for offline use

### Configuration
1. In Thunderbird, open an email message
2. Click the SmartReply AI icon in the message header
3. Click the gear icon to access options
4. Enter your API keys
5. Configure your preferred AI model and fallback settings
6. Set your personal signature
7. Save your settings

## Usage

### Generating Responses
1. Open an email you want to reply to in Thunderbird
2. Click the SmartReply AI icon in the message header
3. Select your desired response style and length
4. Click "Generate Response"
5. Review and edit the generated response if needed
6. Click "Insert" to add the response to your email reply

### Using in Compose Window
1. When composing a new email, click the SmartReply AI icon in the compose toolbar
2. Generate a response based on the context or use a template
3. Insert the response into your compose window

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

## Troubleshooting Thunderbird-Specific Issues

### Extension Not Appearing
- Make sure you're using Thunderbird 78.0 or newer
- Check if the extension is enabled in Add-ons Manager
- Try reinstalling the extension

### Buttons Not Working
- Ensure you have the necessary permissions granted
- Restart Thunderbird completely
- Check the Error Console for any JavaScript errors

### API Connection Issues
- Verify your API key is correct and has not expired
- Check your internet connection
- Ensure you have sufficient API credits

## Support

For issues, feature requests, or questions specific to the Thunderbird version, please contact support at [support@smartreply-ai.com](mailto:support@smartreply-ai.com)
