// IMPORTANT: Use the absolute path "/links.json"
const jsonFileUrl = '/links.json';

// Get the button element
const watchButton = document.getElementById('watch-button');

/**
 * Function to get the key from the URL path.
 * Example: URL "/v/promo" will return "promo".
 */
function getRedirectKey() {
  // window.location.pathname will contain "/v/promo"
  const path = window.location.pathname; 

  // Split the string by '/' -> result: ["", "v", "promo"]
  const parts = path.split('/'); 

  // Ensure the format is correct (/v/KEY) and get the KEY
  if (parts[1] === 'v' && parts[2]) {
    return parts[2]; // This is "promo"
  }
  return null; // No key
}

// 1. Get the key when the page loads
const redirectKey = getRedirectKey();
console.log('Key requested from URL:', redirectKey);

/**
 * Function that runs when the button is clicked
 */
async function redirectToVideo() {

  // 2. Set the button to a "loading" state
  watchButton.disabled = true;
  watchButton.innerHTML = 'Loading...';

  try {
    // 3. Fetch the JSON file
    const response = await fetch(jsonFileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();

    // 4. Determine the destination URL
    // If data['promo'] exists, use it.
    // Otherwise, use data['default'].
    const destinationUrl = data[redirectKey] || data.default;

    // 5. Redirect the user
    if (destinationUrl) {
      console.log(`Redirecting to key '${redirectKey || 'default'}': ${destinationUrl}`);
      window.location.replace(destinationUrl);
    } else {
      // This happens if 'default' is also not in the JSON
      throw new Error('Key not found and no default URL in JSON.');
    }

  } catch (error) {
    // 6. Handle any errors
    console.error('Redirect process failed:', error);
    watchButton.disabled = false;
    // (Restoring the original button HTML requires more handling,
    // but 'Try Again' is sufficient for an error)
    watchButton.innerHTML = 'Failed, Try Again';
  }
}

// 7. Attach the function to the button's 'click' event
watchButton.addEventListener('click', redirectToVideo);
