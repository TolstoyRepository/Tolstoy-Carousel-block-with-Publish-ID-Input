// Mapping of variant IDs to their corresponding publish IDs
// Left value is variant Id 
// right value is publish ID that wanted to be rendered when the variant ID was selected
      const variantToPublishIdMap = {
        '41078121758825': 'bpkwrqkz2sf90',
        '41078121726057': 'bpkwrqkz2sf90',
        '41078121791593': 'bpkwrqkz2sf90',
        '41784025251945': 'bpkwrqkz2sf90',
        '41078121857129': 'vblzactm0on23',
        '41078121824361': 'vblzactm0on23',
        '41078121889897': 'vblzactm0on23',
        '41078122053737': 'n91fqbb1gms1f',
        '41078121955433': 'dcbcu0qrsrgmr',
        '41174459089001': 'dcbcu0qrsrgmr',
        // Add more variant-publishId pairs here
      };
      
      // Keep track of the currently displayed publish ID
      let currentPublishId = null;
      
      // Function to create and render Tolstoy element based on variant ID
      function renderTolstoyForVariant() {
        console.log("Function Started");
        
        // Get the current URL 
        const url = window.location.href;
        console.log("Current URL:", url);
        
        // Try multiple methods to find variant ID
        let variantId = null;
        
        // Method 1: Check URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('variant')) {
          variantId = urlParams.get('variant');
          console.log("Found variant in URL params:", variantId);
        }
        
        // Method 2: Check the URL path for variant ID
        if (!variantId) {
          // Loop through all our known variant IDs and check if any appear in the URL
          for (const knownVariantId in variantToPublishIdMap) {
            if (url.includes(knownVariantId)) {
              variantId = knownVariantId;
              console.log("Found variant in URL path by matching known ID:", variantId);
              break;
            }
          }
        }
        
        // If we still don't have a variant, log failure and return
        if (!variantId) {
          console.log("Could not find any variant ID in the URL");
          return;
        }
        
        // Check if we have a publish ID for this variant
        if (!variantToPublishIdMap[variantId]) {
          console.log("Found variant ID", variantId, "but no matching publish ID in our map");
          return;
        }
        
        // Get the publish ID for this variant
        const publishId = variantToPublishIdMap[variantId];
        console.log("Using variant", variantId, "with publish ID", publishId);
        
        // Check if we're already displaying this publish ID
        if (publishId === currentPublishId) {
          console.log("Already displaying content for publish ID:", publishId, "- No need to re-render");
          
          // Update the data-variant attribute only
          const existingTolstoy = document.querySelector('tolstoy-stories');
          if (existingTolstoy) {
            existingTolstoy.setAttribute('data-variant', variantId);
            console.log("Updated variant ID on existing tolstoy-stories element");
          }
          
          return;
        }
        
        // Get the parent container
        const container = document.querySelector('.tolstoy-container');
        if (!container) {
          console.log("Tolstoy container not found");
          return;
        }
        
        console.log("Found container, clearing contents");
        // Clear the container
        container.innerHTML = '';
        
        // Create new tolstoy-stories element
        const tolstoyElement = document.createElement('tolstoy-stories');
        tolstoyElement.className = 'tolstoy-stories';
        tolstoyElement.setAttribute('data-publish-id', publishId);
        tolstoyElement.setAttribute('data-product-id', document.querySelector('[data-product-id]')?.getAttribute('data-product-id') || '');
        tolstoyElement.setAttribute('data-variant', variantId);
        
        // Append to container
        container.appendChild(tolstoyElement);
        console.log("Added new tolstoy-stories element with publish ID:", publishId);
        
        // Update the current publish ID
        currentPublishId = publishId;
      }
      
      // Run on page load
      document.addEventListener('DOMContentLoaded', renderTolstoyForVariant);
      
      // Check for URL changes (for when variant changes without page reload)
      let lastUrl = location.href;
      new MutationObserver(() => {
        if (location.href !== lastUrl) {
          console.log("URL changed from", lastUrl, "to", location.href);
          lastUrl = location.href;
          renderTolstoyForVariant();
        }
      }).observe(document, {subtree: true, childList: true});
      
      // Log that script was loaded
      console.log("Tolstoy variant switcher script loaded");


// SAMPLE SITE: https://dudewipes.com/products/dude-wipes