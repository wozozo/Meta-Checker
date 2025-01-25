/**
 * @copyright: Richard Parnaby-King
 * @url: http://richard.parnaby-king.co.uk
 */
const notifications = {};
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  chrome.notifications.create(
    "", //create new notification id
    {
      type: "basic",
      iconUrl: "meta-fail.png",
      title: "Meta Robots Checker",
      message: msg,
      contextMessage: sender.tab.title,
      priority: 0,
      isClickable: true,
    },
    (notificationId) => {
      notifications[notificationId] = sender.tab.id;
    },
  );
  chrome.notifications.onClicked.addListener((notificationId) => {
    chrome.tabs.update(notifications[notificationId], { active: true });
  });
});
