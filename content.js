chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.text === "cat_count") {
      sendResponse(countCats());
    }
  });
  
  const countCats = () => {
    var content =
      document.body["innerText" in document.body ? "innerText" : "textContent"];
    content = removeScriptsFromContent(content);
    var regex = /(poca disponibilidad)[\s.,]/gi;
  
    var totalCats = content.match(regex)?.length;

    if(totalCats > 1) {
        alert('hay gatos');
        (
        new Audio(chrome.runtime.getURL(`call.mp3`))
      ).play();
    }

    return content.match(regex)?.length || 0;
  };
  
  const removeScriptsFromContent = (strCode) => {
    return strCode.replace(/<script.*?>.*?<\/script>/gim, "");
  };