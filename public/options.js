// Saves options to chrome.storage
function save_options() {
  var token = document.getElementById('token').value;
  var channel = document.getElementById('channel').value;
  window.localStorage.setItem('token', token ? token.trim() : '');
  window.localStorage.setItem('channel', channel ? channel.trim() : '');
  var status = document.getElementById('status');
  status.textContent = 'Options saved.';
  setTimeout(function () {
    status.textContent = '';
  }, 750);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  const token = window.localStorage.getItem('token');
  const channel = window.localStorage.getItem('channel');
  document.getElementById('token').value = token;
  document.getElementById('channel').value = channel;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
