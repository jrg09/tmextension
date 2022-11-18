const maxMeows = 6;

// The extension listens to the onUpdated event, and executes when the page is loaded
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    detectCats(tabId);
  }
});

// It executes the cat detection as well when we switch tabs on the active tab
chrome.tabs.onActivated.addListener((activeTab) => detectCats(activeTab.tabId));

const detectCats = (tabId) => {
  // Here we clear the badge
  chrome.browserAction.setBadgeText({ text: "" });
  // Then we send a message to the content script, together with a callback
  chrome.tabs.sendMessage(tabId, { text: "cat_count" }, onCatCount);
};

// This is the callback called by the content script
const onCatCount = (catNumber) => {
  if (!catNumber) {
    deactivateIcon();
  } else {
    // When cats are detected, show an animation on the badge
    animateBadge(catNumber);
  }
};

const deactivateIcon = () => {
  // Here we detect what the active tab is and disable the action
  chrome.tabs.query({ active: true, currentWindow: true }, (activeTab) => {
    chrome.browserAction.disable(activeTab[0].id);
  });
};

const animateBadge = (catNumber) => {
  // Limit meows, we don't want 1000 sounds to be played
  let i = catNumber - maxMeows > 0 ? catNumber - maxMeows : 1;
  let j = 0;
  // Cats will meow at random times
  for (; i <= catNumber - 1; i++, j++) {
    updateBadge(i, j * Math.random() * 400);
  }
  // Last cat should come last, let's give it the highest delay
  updateBadge(catNumber, j * 500);
};

const updateBadge = (catIndex, delay) => {
    // After some specified delay display a number on the badge and play a meow sound
    setTimeout(() => {
      
      chrome.browserAction.setBadgeText({ text: catIndex.toString() });
    }, delay);
  };