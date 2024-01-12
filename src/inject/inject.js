function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}

function injectModule(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'module');
    s.setAttribute('src', file);
    th.appendChild(s);
}

function injectStyle(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('link');
    s.setAttribute('rel', 'stylesheet');
    s.setAttribute('type', 'text/css');
    s.setAttribute('href', file);
    th.appendChild(s);
}

function add_base_url(url, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('base_ext');
    s.setAttribute('url', url);
    s.setAttribute('ext_id', chrome.runtime.id)
    th.appendChild(s);
}

var base_url = chrome.runtime.getURL('');
//injectStyle(chrome.runtime.getURL('src/bootstrap/css/bootstrap.css'), 'head');
injectStyle(chrome.runtime.getURL('src/bootstrap/css/bootstrap-dark.css'), 'head');
injectStyle(chrome.runtime.getURL('src/bootstrap/css/bootstrap-vue.css'), 'head');
injectScript(chrome.runtime.getURL('js/jquery/jquery.js'), 'head');
injectScript(chrome.runtime.getURL('js/vue/vue.js'), 'head');
injectScript(chrome.runtime.getURL('src/bootstrap/js/bootstrap-vue.js'), 'head');
injectScript(chrome.runtime.getURL('js/polyfill.js'), 'head');
injectScript(chrome.runtime.getURL('js/stocktwits.js'), 'head');
add_base_url(base_url, 'body');
injectModule(chrome.runtime.getURL('js/firebase/firebase_config.js'), 'body');
injectScript(chrome.runtime.getURL('src/inject/append.js'), 'body');