/*
 * @copyright: Richard Parnaby-King
 * @url: http://richard.parnaby-king.co.uk
 */

const MESSAGES = {
  NOINDEX_NOFOLLOW: "It looks like this page has a noindex,nofollow. This means google will not crawl the website or index it",
  NOINDEX: "It looks like this page has a noindex. This means google will not index it",
  NOFOLLOW: "It looks like this page has a nofollow. This means google will not crawl the website"
};

// Check meta tag content and return message
function checkMetaContent(metaContent) {
  const content = metaContent.toLowerCase();

  if (content.includes("noindex") && content.includes("nofollow")) {
    return MESSAGES.NOINDEX_NOFOLLOW;
  }

  if (content.includes("noindex")) {
    return MESSAGES.NOINDEX;
  }

  if (content.includes("nofollow")) {
    return MESSAGES.NOFOLLOW;
  }

  return null;
}

// Check meta tags and send notification
function checkRobotsMetaTag() {
  const metaTags = document.getElementsByTagName("meta");

  for (const metaTag of metaTags) {
    if (metaTag.getAttribute("name") === "robots") {
      const content = metaTag.getAttribute("content");
      const message = checkMetaContent(content);

      if (message) {
        chrome.runtime.sendMessage(message);
      }
    }
  }
}

// Execute
checkRobotsMetaTag();
