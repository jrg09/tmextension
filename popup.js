window.onload = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (activeTab) => {
      const tabId = activeTab[0].id;
      chrome.tabs.sendMessage(tabId, { text: "cat_count" }, onCatCount);
    });
  };
  
  const onCatCount = (catNumber) => {
    console.log('onCatCount en popup');
  };