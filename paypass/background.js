/*var filter = { urls: ["<all_urls>"] };
var opt_extraInfoSpec = ["requestHeaders", "blocking", "extraHeaders"];

function mod_headers(header_array, p_name, p_value) {
  var did_set = false;
  for (var i in header_array) {
    var header = header_array[i];
    var name = header.name;
    var value = header.value;

    // If the header is already present, change it:
    if (name == p_name) {
      header.value = p_value;
      did_set = true;
    }
  }
  // if it is not, add it:
  if (!did_set) {
    header_array.push({ name: p_name, value: p_value });
  }
}

function injectReferer(details) {
  details.requestHeaders.push({
    name: "Referer",
    value: "https://www.drudgereport.com"
  });
}

callback = function(details) {
  let newHeaders = mod_headers(
    details.requestHeaders,
    "Referer",
    "https://drugereport.com"
  );

  return { requestHeaders: newHeaders };
};

chrome.webRequest.onBeforeSendHeaders.addListener(
  injectReferer,
  filter,
  opt_extraInfoSpec
);*/

var extraInfoSpec = ["blocking", "requestHeaders", "extraHeaders"];
if (
  chrome.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty("EXTRA_HEADERS")
)
  extraInfoSpec.push("extraHeaders");

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    var newRef = "https://www.drudgereport.com";
    var gotRef = false;
    for (var n in details.requestHeaders) {
      gotRef = details.requestHeaders[n].name.toLowerCase() == "referer";
      if (gotRef) {
        details.requestHeaders[n].value = newRef;
        break;
      }
    }
    if (!gotRef) {
      details.requestHeaders.push({ name: "Referer", value: newRef });
    }
    return { requestHeaders: details.requestHeaders };
  },
  {
    urls: ["https://www.wsj.com/*"]
  },
  extraInfoSpec
);
