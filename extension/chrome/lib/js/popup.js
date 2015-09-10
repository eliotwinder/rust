// settings
var settings = {};

chrome.storage.sync.get(['server', 'keepprivate', 'autoshow', 'showtrigger'],
  function(store) {
    settings.server = store.server;
    settings.keepprivate = store.keepprivate;
    settings.autoshow = store.autoshow;
    settings.showtrigger = store.showtrigger;
    console.log(store.server);
    console.log(settings.server);

  });

// update settings as they are changed in the chrome storage
// chrome.storage.onChanged.addListener(function(changes, namespace) {
//   for (key in changes) {
//     if (settings.hasOwnProperty(key)) {
//       var storageChange = changes[key];
//       settings[key] = storageChange.newValue;
//     }
//   }
// });


// LOGIN STRATEGIES
var googleLogin = function() {
  chrome.tabs.create({
    url: settings.server + '/api/auth/chrome/google'
  });
}

var facebookLogin = function() {
  chrome.tabs.create({
    url: settings.server + '/api/auth/chrome/facebook'
  });
}

// LOGOUT STRATEGIES 
var logout = function() {
  chrome.runtime.sendMessage({
    type: 'logout'
  }, function(response) {
    console.log(response);

    var status = document.getElementById('status');
    status.textContent = 'Logout.. done.';
    setTimeout(function() {
      // reset the status message after 2 seconds
      status.textContent = '';
    }, 2000);

  })
}

// open the options page
var options = function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    // fallback
    window.open(chrome.runtime.getURL('options.html'));
  }
}

// for debugging only..
var popup = function() {
  chrome.extension.sendMessage({
    type: 'popup'
  }, function(response) {
    console.log(response);
  })
}

// Register Events on DOM
document.querySelector('#facebook-login').addEventListener('click', facebookLogin);
document.querySelector('#google-login').addEventListener('click', googleLogin);
document.querySelector('#logout').addEventListener('click', logout);
document.querySelector('#options').addEventListener('click', options);
document.querySelector('#popup').addEventListener('click', popup);
