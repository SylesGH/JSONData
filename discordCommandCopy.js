var content = document.querySelector(".scroller-kQBbkU")
var commands = document.querySelectorAll(".commandName-1KhvGm.clickable-31pE3P")
var tooltip =  document.querySelector(".tooltip-1T4pLi")
var tooltipItem = document.querySelectorAll(".text-md-normal-2rFCH3")

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function setTooltip() {
    commands = document.querySelectorAll(".commandName-1KhvGm.clickable-31pE3P")
    waitForElm('.text-md-normal-2rFCH3').then(() => {
        tooltip =  document.querySelector(".tooltip-1T4pLi")
        tooltipItem = document.querySelectorAll(".text-md-normal-2rFCH3")
                
        if (tooltipItem[0].innerText == "/makeimg") {
            tooltipItem[0].style.cursor = "pointer"
            
            tooltipItem[0].addEventListener("mouseover", () => {
                tooltipItem.forEach(itm => {
                    itm.style.textDecoration = "underline"
                })
            })
        
            tooltipItem[0].addEventListener("mouseout", () => {
                tooltipItem.forEach(itm => {
                    itm.style.textDecoration = ""
                })
            })
        
            tooltipItem[0].addEventListener("click", () => {
                copyToClipboard(tooltip.innerText)
            })
        
            //prompt
            tooltipItem[2].style.cursor = "pointer"
        
            tooltipItem[2].addEventListener("mouseover", () => {
                tooltipItem[2].style.textDecoration = "underline"
            })
        
            tooltipItem[2].addEventListener("mouseout", () => {
                tooltipItem[2].style.textDecoration = ""
            })
        
            tooltipItem[2].addEventListener("click", () => {
                copyToClipboard(tooltipItem[2].innerText)
            })
        
            //negative
            if (tooltipItem[4]) {
                tooltipItem[4].style.cursor = "pointer"
        
                tooltipItem[4].addEventListener("mouseover", () => {
                    tooltipItem[4].style.textDecoration = "underline"
                })
            
                tooltipItem[4].addEventListener("mouseout", () => {
                    tooltipItem[4].style.textDecoration = ""
                })
                tooltipItem[4].addEventListener("click", () => {
                    copyToClipboard(tooltipItem[4].innerText)
                })
            }
            
        }

    }
    );
}

const copyToClipboard = (function initClipboardText() {
  const textarea = document.createElement('textarea');

  // Move it off-screen.
  textarea.style.cssText = 'position: absolute; left: -99999em';

  // Set to readonly to prevent mobile devices opening a keyboard when
  // text is .select()'ed.
  textarea.setAttribute('readonly', true);

  document.body.appendChild(textarea);

  return function setClipboardText(text) {
    textarea.value = text;

    // Check if there is any content selected previously.
    const selected = document.getSelection().rangeCount > 0 ?
      document.getSelection().getRangeAt(0) : false;

    // iOS Safari blocks programmatic execCommand copying normally, without this hack.
    // https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      const editable = textarea.contentEditable;
      textarea.contentEditable = true;
      const range = document.createRange();
      range.selectNodeContents(textarea);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      textarea.setSelectionRange(0, 999999);
      textarea.contentEditable = editable;
    }
    else {
      textarea.select();
    }

    try {
      const result = document.execCommand('copy');

      // Restore previous selection.
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }

      return result;
    }
    catch (err) {
      console.error(err);
      return false;
    }
  };
})();

function setCommands() {
    commands = document.querySelectorAll(".commandName-1KhvGm.clickable-31pE3P")
    commands.forEach((cmnd) => {
        cmnd.onclick = () => {
            setTooltip()
        }
    })
}

content.addEventListener("scroll", setCommands())
