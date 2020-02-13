function main() {
  let btn = document.getElementById("btn");
  chrome.browsingData.remove(
    {
      origins: ["https://www.nytimes.com"]
    },
    {
      cacheStorage: true,
      cookies: true,
      fileSystems: true,
      indexedDB: true,
      localStorage: true,
      pluginData: true,
      serviceWorkers: true,
      webSQL: true
    }
  );
  chrome.tabs.query({ active: true, currentWindow: true }, function(
    arrayOfTabs
  ) {
    chrome.tabs.reload(arrayOfTabs[0].id);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  chrome.tabs.getSelected(null, function(tab) {
    if (tab.url.includes("wsj.com")) {
      let btn = document.getElementById("btn");
      btn.style.display = "block";
      btn.capability = "wsj";
      document.getElementById("main-heading").innerHTML =
        "You should be able to read the Wall Street Journal article, but if not, try clicking the button and see if that helps.";
    } else if (tab.url.includes("nytimes.com")) {
      let btn = document.getElementById("btn");
      btn.style.display = "block";
      btn.capability = "nyt";
      document.getElementById("main-heading").innerHTML =
        "Click this button to get a the NYT article you're on for free";
    } else {
      let btn = document.getElementById("btn");
      btn.style.display = "none";
      btn.capability = "none";
      document.getElementById("main-heading").innerHTML =
        "We don't currently support this article. Tweet at me and I'll probably implement it.";
    }
  });
  // onClick's logic below:
  btn.addEventListener("click", function() {
    main();
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {});
