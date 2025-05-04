<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a frontend overlay project built with AngularJS.
The application runs with a transparent background to integrate seamlessly as an overlay in streaming software (e.g., OBS).
In this WebSocket, the first two responses must be ignored.
From there onward, data is received every second from a WebSocket endpoint and bound directly to the view using AngularJS—no page reloads should occur.
Ensure any new features follow this architecture pattern.