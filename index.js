// hashUrl func
const generateHashValue = () => {
  let hash = '';
  let charMap = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < 3; i++) {
    let valueToAdd = charMap[Math.floor(Math.random() * 62)];
    hash += valueToAdd;
  }

  return hash;
}

const createHashUrl = (url) => {
  const localStorageHash = window.localStorage.getItem(url)
  if (localStorageHash) {
    return localStorageHash;
  } else {
    let newHash = generateHashValue();
    while (window.localStorage.getItem(newHash)) {
      newHash = generateHashValue();
    }
    // set both url and hashed value on local storage to allow O(1) lookup both ways
    window.localStorage.setItem(url, newHash);
    window.localStorage.setItem(newHash, url);
    return newHash;
  }
}

// submitButton onClick func
const submitButton = document.getElementById('submitBtn');

const submitUrl = (evt) => {
  evt.preventDefault();
  const value = document.getElementById('urlInput').value;

  if (!value) return;

  let newUrl = createHashUrl(value);
  let shortUrl = document.getElementById('shortUrl');
  if (!shortUrl) {
    shortUrl = document.createElement('label');
    shortUrl.setAttribute('id', 'shortUrl');
    document.getElementById('urlDisplay').appendChild(shortUrl);
  }
  shortUrl.innerHTML = newUrl;
}

// add function to submit button
submitButton.addEventListener('click', submitUrl);

