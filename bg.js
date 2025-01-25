/**
 * @copyright: Richard Parnaby-King
 * @url: http://richard.parnaby-king.co.uk
 */
const notifications = {};

// Register click handler for notifications once
chrome.notifications.onClicked.addListener((notificationId) => {
  chrome.tabs.update(notifications[notificationId], { active: true });
});

// Function to create notification
function createMetaCheckNotification(message, sender) {
  chrome.notifications.create(
    "", //create new notification id
    {
      type: "basic",
      iconUrl: "meta-fail.png",
      title: "Meta Robots Checker",
      message: message,
      contextMessage: sender.tab.title,
      priority: 0,
      isClickable: true,
    },
    (notificationId) => {
      notifications[notificationId] = sender.tab.id;
    },
  );
}

// Message listener
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  createMetaCheckNotification(msg, sender);
});
