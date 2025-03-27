// Background script for the Thunderbird extension
browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log("Background script received message:", message);
  
  if (message.action === 'getCurrentMessage') {
    return getCurrentMessage();
  } else if (message.action === 'insertResponse') {
    try {
      await insertResponse(message.messageId, message.response, message.replyAll);
      return { success: true };
    } catch (error) {
      console.error("Error in insertResponse:", error);
      return { 
        success: false, 
        error: error.message || "Unknown error" 
      };
    }
  } else if (message.action === 'checkModelConnection') {
    try {
      const { model, apiKey } = message;
      const result = await checkModelConnection(model, apiKey);
      
      return { success: true, result };
    } catch (error) {
      console.error('Error checking model connection:', error);
      return { success: false, error: error.message };
    }
  } else if (message.action === 'testConnection') {
    try {
      let result;
      
      if (message.model === 'gemini') {
        result = await testGeminiConnection(message.apiKey);
      } else if (message.model === 'openai') {
        result = await testOpenAIConnection(message.apiKey, 'o3-mini');
      } else if (message.model === 'gpt4o') {
        result = await testOpenAIConnection(message.apiKey, 'gpt-4o');
      } else if (message.model === 'mistral') {
        result = await testMistralConnection(message.apiKey);
      } else if (message.model === 'ollama') {
        result = await testOllamaConnection(message.host, message.modelName);
      } else {
        throw new Error('Unknown model type');
      }
      
      return result;
    } catch (error) {
      console.error('Error testing connection:', error);
      return { connected: false, message: error.message };
    }
  }
  
  // Other message handlers can be added here
});

// Register options page
browser.runtime.onInstalled.addListener(() => {
  if (browser.runtime.openOptionsPage) {
    console.log("Options page registered");
  }
});

// Function to check connection to the selected AI model
async function checkModelConnection(model, apiKey) {
  console.log(`Checking connection to ${model} model...`);
  
  try {
    let result;
    
    switch (model) {
      case 'gemini':
        result = await testGeminiConnection(apiKey);
        break;
      case 'openai':
        result = await testOpenAIConnection(apiKey, 'o3-mini');
        break;
      case 'gpt4o':
        result = await testOpenAIConnection(apiKey, 'gpt-4o');
        break;
      case 'mistral':
        result = await testMistralConnection(apiKey);
        break;
      case 'ollama':
        // For Ollama, we need to get the host and model from storage
        const { ollamaHost, ollamaModel, ollamaCustomModel } = await browser.storage.local.get([
          'ollamaHost', 'ollamaModel', 'ollamaCustomModel'
        ]);
        
        const modelName = ollamaModel === 'custom' ? ollamaCustomModel : ollamaModel;
        result = await testOllamaConnection(ollamaHost, modelName);
        break;
      default:
        throw new Error(`Unknown model: ${model}`);
    }
    
    return result;
  } catch (error) {
    console.error(`Error checking ${model} connection:`, error);
    return {
      connected: false,
      message: `Connection failed: ${error.message}`
    };
  }
}

// Function to test Gemini API connection
async function testGeminiConnection(apiKey) {
  try {
    console.log('Testing Gemini connection...');
    
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-exp-03-25:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: 'Hello, please respond with "Connection successful" if you can receive this message.'
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 10
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    return {
      connected: data.candidates && data.candidates.length > 0,
      message: 'Gemini API connection successful'
    };
  } catch (error) {
    console.error('Error testing Gemini connection:', error);
    return {
      connected: false,
      message: `Gemini API connection failed: ${error.message}`
    };
  }
}

// Function to test OpenAI API connection
async function testOpenAIConnection(apiKey, model) {
  try {
    console.log(`Testing OpenAI connection with model ${model}...`);
    
    // Create different request bodies based on the model
    let requestBody;
    
    if (model === 'o3-mini') {
      requestBody = {
        model: 'o3-mini',
        messages: [
          {
            role: 'user',
            content: 'Hello, please respond with "Connection successful" if you can receive this message.'
          }
        ],
        max_completion_tokens: 10,
        reasoning_effort: 'medium'
      };
    } else {
      // For GPT-4o and other standard OpenAI models
      requestBody = {
        model: model,
        messages: [
          {
            role: 'user',
            content: 'Hello, please respond with "Connection successful" if you can receive this message.'
          }
        ],
        max_tokens: 10
      };
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    return {
      connected: data.choices && data.choices.length > 0,
      message: 'OpenAI API connection successful'
    };
  } catch (error) {
    console.error('Error testing OpenAI connection:', error);
    return {
      connected: false,
      message: `OpenAI API connection failed: ${error.message}`
    };
  }
}

// Function to test Mistral API connection
async function testMistralConnection(apiKey) {
  try {
    console.log('Testing Mistral connection...');
    
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          {
            role: 'user',
            content: 'Hello, please respond with "Connection successful" if you can receive this message.'
          }
        ],
        max_tokens: 10
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Mistral API error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    return {
      connected: data.choices && data.choices.length > 0,
      message: 'Mistral API connection successful'
    };
  } catch (error) {
    console.error('Error testing Mistral connection:', error);
    return {
      connected: false,
      message: `Mistral API connection failed: ${error.message}`
    };
  }
}

// Function to test Ollama API connection
async function testOllamaConnection(host, modelName) {
  try {
    console.log(`Testing Ollama connection to ${host} with model ${modelName || 'default'}...`);
    
    // Ensure the host URL is properly formatted
    if (!host.startsWith('http')) {
      host = 'http://' + host;
    }
    
    // Remove trailing slash if present
    if (host.endsWith('/')) {
      host = host.slice(0, -1);
    }
    
    // First, try a simple fetch to check if the server is reachable
    try {
      const serverCheckResponse = await fetch(`${host}/api/tags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!serverCheckResponse.ok) {
        console.error('Ollama server not reachable:', serverCheckResponse.status, serverCheckResponse.statusText);
        return {
          connected: false,
          message: `Ollama server not reachable: ${serverCheckResponse.statusText}`
        };
      }
      
      // If the server is reachable, get the list of available models
      const tagsData = await serverCheckResponse.json();
      const availableModels = tagsData.models ? tagsData.models.map(m => m.name) : [];
      console.log('Available Ollama models:', availableModels.join(', '));
      
      // If a specific model was provided, check if it exists
      let modelExists = false;
      let modelMessage = '';
      
      if (modelName && tagsData.models) {
        modelExists = tagsData.models.some(m => 
          m.name === modelName || 
          m.name.startsWith(modelName + ':')
        );
        
        if (!modelExists) {
          modelMessage = `Model ${modelName} not found in available models. It may need to be downloaded first.`;
          console.warn(modelMessage);
        }
      }
      
      return {
        connected: true,
        message: modelExists ? 
          'Ollama connection successful' : 
          'Ollama connection successful, but specified model not found',
        availableModels: availableModels,
        modelExists: modelExists,
        modelMessage: modelMessage
      };
    } catch (error) {
      console.error('Error connecting to Ollama server:', error);
      
      // Try a simpler approach as fallback
      try {
        // Try a simple model query with minimal parameters
        const modelResponse = await fetch(`${host}/api/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: modelName || 'llama3',
            prompt: 'Hello',
            stream: false
          })
        });
        
        if (!modelResponse.ok) {
          let errorMessage = modelResponse.statusText;
          try {
            const errorData = await modelResponse.json();
            errorMessage = errorData.error || errorMessage;
          } catch (e) {
            // Ignore JSON parsing errors
          }
          
          // If the error mentions that the model doesn't exist, it means the server is working
          if (errorMessage.includes('model') && errorMessage.includes('not found')) {
            return {
              connected: true,
              message: 'Ollama server is running, but the specified model may need to be downloaded',
              availableModels: [],
              modelExists: false
            };
          }
          
          return {
            connected: false,
            message: `Ollama API error: ${errorMessage}`,
            availableModels: []
          };
        }
        
        return {
          connected: true,
          message: 'Ollama connection successful',
          availableModels: [],
          modelExists: true
        };
      } catch (fallbackError) {
        console.error('Fallback connection attempt failed:', fallbackError);
        return {
          connected: false,
          message: `Ollama connection failed: ${error.message}`,
          availableModels: []
        };
      }
    }
  } catch (error) {
    console.error('Error testing Ollama connection:', error);
    return {
      connected: false,
      message: `Ollama connection failed: ${error.message}`,
      availableModels: []
    };
  }
}

// Function to get the currently selected message
async function getCurrentMessage() {
  try {
    // Get current tab
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    if (!tabs || !tabs.length) {
      console.error("No active tab found");
      return null;
    }
    
    // Get current message displayed in the tab
    const tabId = tabs[0].id;
    const messageList = await browser.messageDisplay.getDisplayedMessages(tabId);
    
    if (!messageList || !messageList.length) {
      console.error("No message currently displayed");
      return null;
    }
    
    const message = messageList[0];
    
    // Get full message details
    const fullMessage = await browser.messages.get(message.id);
    const messageContent = await browser.messages.getFull(message.id);
    
    // Extract plain text from message
    let body = '';
    if (messageContent.parts) {
      body = getPlainTextFromParts(messageContent.parts);
    } else {
      body = messageContent.body || '';
    }
    
    return {
      id: fullMessage.id,
      author: fullMessage.author,
      subject: fullMessage.subject,
      body: body
    };
  } catch (error) {
    console.error("Error getting current message:", error);
    return null;
  }
}

// Function to insert a response into a reply
async function insertResponse(messageId, response, replyAll = false) {
  try {
    console.log("Starting to insert response into reply...");
    console.log("Response to insert:", response.substring(0, 100) + "...");
    console.log("Reply All:", replyAll);
    
    // Start a reply to the message with the appropriate reply type
    const replyType = replyAll ? "replyToAll" : "replyToSender";
    const replyTab = await browser.compose.beginReply(messageId, replyType);
    console.log(`Reply window opened with ID: ${replyTab.id} (${replyType})`);
    
    // Wait for the compose window to fully initialize
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // First, try to get the compose details to determine if we're in HTML or plain text mode
      const details = await browser.compose.getComposeDetails(replyTab.id);
      console.log("Compose details retrieved:", details);
      
      // Determine if we're in HTML mode
      const isHtml = details.isPlainText === false || (details.body && !details.plainTextBody);
      console.log("Compose mode detected:", isHtml ? "HTML" : "Plain text");
      
      // Format the response appropriately
      if (isHtml) {
        // For HTML mode, get the existing content and prepend our response
        const existingContent = details.body || "";
        
        // Format our response as HTML
        const formattedResponse = formatPlainTextAsHtml(response);
        
        // Find a good insertion point - look for a common reply separator
        let newContent;
        const separators = [
          '<div id="divRplyFwdMsg"', 
          '<div class="moz-cite-prefix"',
          '<blockquote type="cite"',
          '<hr id="stopSpelling"',
          '<div class="gmail_quote"'
        ];
        
        let insertionPoint = -1;
        for (const separator of separators) {
          const pos = existingContent.indexOf(separator);
          if (pos !== -1 && (insertionPoint === -1 || pos < insertionPoint)) {
            insertionPoint = pos;
          }
        }
        
        // Clean up any leading empty paragraphs or breaks
        let cleanedContent = existingContent;
        if (insertionPoint !== -1) {
          // Check for empty paragraphs at the beginning
          const beforeSeparator = existingContent.substring(0, insertionPoint);
          const cleanedBefore = beforeSeparator.replace(/^(\s*<p>\s*<\/p>\s*)+/, '').replace(/^(\s*<br>\s*)+/, '');
          cleanedContent = cleanedBefore + existingContent.substring(insertionPoint);
          insertionPoint = cleanedBefore.length;
        }
        
        if (insertionPoint !== -1) {
          // Insert before the separator
          newContent = cleanedContent.substring(0, insertionPoint) + 
                      formattedResponse + 
                      cleanedContent.substring(insertionPoint);
        } else {
          // No separator found, just prepend
          newContent = formattedResponse + cleanedContent;
        }
        
        await browser.compose.setComposeDetails(replyTab.id, {
          body: newContent
        });
      } else {
        // For plain text mode, get the existing content and prepend our response
        const existingContent = details.plainTextBody || "";
        
        // Find a good insertion point - look for a common reply separator
        let newContent;
        const separators = [
          '\nOn ', 
          '\n----',
          '\n-----Original Message-----',
          '\n>'
        ];
        
        let insertionPoint = -1;
        for (const separator of separators) {
          const pos = existingContent.indexOf(separator);
          if (pos !== -1 && (insertionPoint === -1 || pos < insertionPoint)) {
            insertionPoint = pos;
          }
        }
        
        // Clean up any leading empty lines
        let cleanedContent = existingContent;
        if (insertionPoint !== -1) {
          // Check for empty lines at the beginning
          const beforeSeparator = existingContent.substring(0, insertionPoint);
          const cleanedBefore = beforeSeparator.replace(/^\s+/, '');
          cleanedContent = cleanedBefore + existingContent.substring(insertionPoint);
          insertionPoint = cleanedBefore.length;
        }
        
        if (insertionPoint !== -1) {
          // Insert before the separator with a single newline
          newContent = cleanedContent.substring(0, insertionPoint) + 
                      response + 
                      cleanedContent.substring(insertionPoint);
        } else {
          // No separator found, just prepend
          newContent = response + cleanedContent;
        }
        
        await browser.compose.setComposeDetails(replyTab.id, {
          plainTextBody: newContent
        });
      }
      
      console.log("Response inserted successfully using compose API");
      return true;
    } catch (apiError) {
      console.warn("Error using compose API:", apiError);
      
      // Fallback to direct DOM manipulation if the compose API fails
      try {
        console.log("Trying direct DOM manipulation as fallback");
        
        // Use a script that preserves the original content
        const fallbackScript = `
          (function() {
            try {
              // Try to find any editable element
              const editableElements = [
                document.querySelector('textarea[name="content-plaintext"]'),
                document.querySelector('html-editor'),
                document.querySelector('[contenteditable="true"]'),
                document.querySelector('iframe')?.contentDocument?.body,
                ...Array.from(document.querySelectorAll('textarea')),
                ...Array.from(document.querySelectorAll('iframe')).map(f => {
                  try { return f.contentDocument.body; } catch(e) { return null; }
                }).filter(el => el)
              ].filter(el => el);
              
              const textToInsert = ${JSON.stringify(response)};
              
              // Try each editable element
              for (const el of editableElements) {
                try {
                  if (el.tagName === 'TEXTAREA') {
                    // For textareas, find a good insertion point
                    const content = el.value;
                    
                    // Look for common reply separators
                    const separators = [
                      '\\nOn ', 
                      '\\n----',
                      '\\n-----Original Message-----',
                      '\\n>'
                    ];
                    
                    let insertionPoint = -1;
                    for (const separator of separators) {
                      const pos = content.indexOf(separator);
                      if (pos !== -1 && (insertionPoint === -1 || pos < insertionPoint)) {
                        insertionPoint = pos;
                      }
                    }
                    
                    // Clean up any leading empty lines
                    let cleanedContent = content;
                    if (insertionPoint !== -1) {
                      // Check for empty lines at the beginning
                      const beforeSeparator = content.substring(0, insertionPoint);
                      const cleanedBefore = beforeSeparator.replace(/^\\s+/, '');
                      cleanedContent = cleanedBefore + content.substring(insertionPoint);
                      insertionPoint = cleanedBefore.length;
                    }
                    
                    if (insertionPoint !== -1) {
                      // Insert before the separator
                      el.value = cleanedContent.substring(0, insertionPoint) + 
                                textToInsert + 
                                cleanedContent.substring(insertionPoint);
                    } else {
                      // No separator found, just prepend
                      el.value = textToInsert + cleanedContent;
                    }
                    
                    // Trigger input event
                    const event = new Event('input', { bubbles: true });
                    el.dispatchEvent(event);
                    
                    // Also trigger change event
                    const changeEvent = new Event('change', { bubbles: true });
                    el.dispatchEvent(changeEvent);
                    
                    return { success: true, element: el.tagName };
                  } else if (el.contentEditable === 'true' || el.tagName === 'BODY') {
                    // For contentEditable elements or iframe body
                    const htmlContent = textToInsert
                      .replace(/&/g, '&amp;')
                      .replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;')
                      .replace(/"/g, '&quot;')
                      .replace(/'/g, '&#039;')
                      .replace(/\\n/g, '<br>');
                    
                    const content = el.innerHTML;
                    
                    // Look for common reply separators
                    const separators = [
                      '<div id="divRplyFwdMsg"', 
                      '<div class="moz-cite-prefix"',
                      '<blockquote type="cite"',
                      '<hr id="stopSpelling"',
                      '<div class="gmail_quote"'
                    ];
                    
                    let insertionPoint = -1;
                    for (const separator of separators) {
                      const pos = content.indexOf(separator);
                      if (pos !== -1 && (insertionPoint === -1 || pos < insertionPoint)) {
                        insertionPoint = pos;
                      }
                    }
                    
                    // Clean up any leading empty paragraphs or breaks
                    let cleanedContent = content;
                    if (insertionPoint !== -1) {
                      // Check for empty paragraphs at the beginning
                      const beforeSeparator = content.substring(0, insertionPoint);
                      const cleanedBefore = beforeSeparator.replace(/^(\\s*<p>\\s*<\\/p>\\s*)+/, '').replace(/^(\\s*<br>\\s*)+/, '');
                      cleanedContent = cleanedBefore + content.substring(insertionPoint);
                      insertionPoint = cleanedBefore.length;
                    }
                    
                    if (insertionPoint !== -1) {
                      // Insert before the separator
                      el.innerHTML = cleanedContent.substring(0, insertionPoint) + 
                                    htmlContent + 
                                    cleanedContent.substring(insertionPoint);
                    } else {
                      // No separator found, just prepend
                      el.innerHTML = htmlContent + cleanedContent;
                    }
                    
                    return { success: true, element: el.tagName };
                  }
                } catch (innerError) {
                  console.log("Failed with element:", el, innerError);
                  // Continue to next element
                }
              }
              
              return { success: false, error: "No suitable editable element found" };
            } catch (e) {
              return { success: false, error: e.toString() };
            }
          })();
        `;
        
        // Execute the fallback script
        const results = await browser.tabs.executeScript(replyTab.id, {
          code: fallbackScript
        });
        
        console.log("Fallback script result:", results[0]);
        
        if (results[0] && results[0].success) {
          console.log("Response inserted successfully via fallback method using", results[0].element);
          return true;
        } else {
          const errorMsg = results[0] && results[0].error ? results[0].error : "Unknown error";
          console.warn("Fallback insertion failed:", errorMsg);
          throw new Error("Could not insert response using fallback method: " + errorMsg);
        }
      } catch (fallbackError) {
        console.error("Fallback method failed:", fallbackError);
        throw new Error("All insertion methods failed");
      }
    }
  } catch (error) {
    console.error("Error inserting response:", error);
    throw error;
  }
}

// Helper function to format plain text as HTML
function formatPlainTextAsHtml(text) {
  // Convert plain text to HTML
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br>');
}

// Helper function to clear any default content in the compose window
function clearExistingContent(content, isHtml = true) {
  if (!content) return "";
  
  if (isHtml) {
    // For HTML, we want to keep the structure but clear the content
    // Look for typical empty reply structure and remove it
    return content.replace(/<div id="reply-header">[\s\S]*?<\/div>/, "")
                  .replace(/<pre[\s\S]*?<\/pre>/, "");
  } else {
    // For plain text, remove quoted original message
    return content.replace(/^>.*$/gm, "").replace(/\n{3,}/g, "\n\n");
  }
}

// Helper function to extract plain text from message parts
function getPlainTextFromParts(parts) {
  let plainText = '';
  
  for (const part of parts) {
    if (part.contentType && part.contentType.includes('text/plain') && part.body) {
      plainText += part.body;
    }
    
    if (part.parts && part.parts.length) {
      plainText += getPlainTextFromParts(part.parts);
    }
  }
  
  return plainText;
}