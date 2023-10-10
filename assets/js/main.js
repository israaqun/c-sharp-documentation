async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
}

function updateButtonIcon(button, iconClass) {
  const icon = button.querySelector('i');
  icon.classList.remove('fa-copy', 'fa-check', 'fa-exclamation');
  icon.classList.add(iconClass);
}

function showSuccessMessage() {
  Swal.fire({
    title: 'Copied',
    text: 'Your text has been copied.',
    icon: 'success',
    customClass: 'center-dialog',
  });
}

async function handleCopyButtonClick(copyButton) {
  const codeBlock = copyButton.parentElement.querySelector('div.code pre code');
  const codeToCopy = codeBlock.textContent.trim();

  const isSuccess = await copyToClipboard(codeToCopy);
  if (isSuccess) {
    updateButtonIcon(copyButton, 'fa-check');
    showSuccessMessage();
    setTimeout(() => {
      updateButtonIcon(copyButton, 'fa-copy');
    }, 1000);
  } else {
    updateButtonIcon(copyButton, 'fa-exclamation');
  }
}

const copyButtons = document.querySelectorAll('.copy-btn');
copyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    handleCopyButtonClick(button);
  });
});



/*Document.execCommand('copy') (Deprecated):This is an older method for copying text to the clipboard that was commonly used in the past
. It involves creating a temporary textarea element, setting its value to the text you want to copy, selecting the text,
 and executing the copy command


function copyToClipboard(copyButton) {
  const codeBlock = copyButton.previousElementSibling;
  const codeToCopy = codeBlock.textContent.trim();

  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = codeToCopy;

  document.body.appendChild(tempTextArea);

  // Select the text in the textarea
  tempTextArea.select();

  try {
    document.execCommand('copy');
    alert('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  } finally {
    document.body.removeChild(tempTextArea);
  }
}

*/