/*
 * @copyright: Richard Parnaby-King
 * @url: http://richard.parnaby-king.co.uk
 */

// Get all meta tags
const metaTags = document.getElementsByTagName("meta");

// Check meta tags for robots directives
for (const metaTag of metaTags) {
  if (metaTag.getAttribute("name") === "robots") {
    const content = metaTag.getAttribute("content").toLowerCase();
    let msg = "";

    if (content.includes("noindex") && content.includes("nofollow")) {
      msg =
        "It looks like this page has a noindex,nofollow. This means google will not crawl the website or index it";
    } else if (content.includes("noindex")) {
      msg =
        "It looks like this page has a noindex. This means google will not index it";
    } else if (content.includes("nofollow")) {
      msg =
        "It looks like this page has a nofollow. This means google will not crawl the website";
    }

    if (msg) {
      chrome.runtime.sendMessage(msg);
    }
  }
}
