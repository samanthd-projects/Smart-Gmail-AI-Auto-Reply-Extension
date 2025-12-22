console.log("loaded successfully");
function createAIButton() {
    const button = document.createElement('button');
    button.innerHTML = 'AI Reply';
    button.className = 'ai-reply-button';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'AI Reply');

    // Inline styles in case CSS doesn't load
    button.style.padding = '8px 12px';
    button.style.marginRight = '8px';
    button.style.backgroundColor = '#1a73e8';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
    button.style.fontSize = '14px';
    button.style.fontWeight = '500';
    button.style.display = 'inline-block';
    button.style.visibility = 'visible';

    return button;
}

function getEmailContent()
{
 const selectors=[
'.h7',
'.a3s.aiL',
'.gmail_quote',
'[role="presentation"]'
 ];

 for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
        return content.innerText.trim();
    }
    return ''; 
}
return null;
}
function findSendButtonContainer() {
    const sendButton = document.querySelector('div.T-I.J-J5-Ji.aoO.v7.T-I-atl.L3');
    if (sendButton && sendButton.parentElement) {
        return sendButton.parentElement;
    }
    return null;
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    // Find the container that holds the "Send" button
    const sendButton = document.querySelector('div[role="button"][data-tooltip^="Send"]');
    if (!sendButton) {
        console.log("Send button not found");
        return;
    }

    // Get the parent of the Send button (likely a flex container)
    const buttonContainer = sendButton.parentElement;
    if (!buttonContainer) {
        console.log("Button container not found");
        return;
    }

    const button = createAIButton();
    button.classList.add('ai-reply-button');

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;

            const emailContent = getEmailContent();
            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"
                })
            });

            if (!response.ok) {
                throw new Error('API Request Failed');
            }

            const generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
            if (composeBox) {   
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.log("Compose box not found");
            }
        } catch (error) {
            console.error('Error generating AI reply:', error);
        } finally {
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }
    });

    // Insert AI button BEFORE the Send button (or AFTER if preferred)
    buttonContainer.insertBefore(button, sendButton);
}



const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasCompose = addedNodes.some(node =>
      node.nodeType === Node.ELEMENT_NODE &&
      node.querySelector?.('[aria-label="Message Body"], [role="textbox"]')
    );

    if (hasCompose) {
      console.log("Compose window detected");
      setTimeout(injectButton, 500); // slight delay to ensure Gmail loads
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

