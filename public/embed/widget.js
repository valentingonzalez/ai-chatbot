(function() {
  window.ezaichat = window.ezaichat || {};
  let c = document.createElement('div');
  c.id = 'ezAiChatContainer';
  Object.assign(c.style, {
    pointerEvents: 'none',
    zIndex: '2147483639',
    position: 'fixed',
    overflow: 'hidden',
    right: '20px',
    bottom: '20px',
    borderRadius: '12px',
    maxHeight: '100%',
    width: 'calc(100% - 40px)',
    transition: 'all .2s',
    maxWidth: '50px',
    height: '50px'
  });
  c.classList.add('minimized');

  const scriptURL = new URL(document.currentScript.src);
  let frameHost;
  if ( scriptURL.hostname.match(/^[a-z0-9-]+\.app\.ezai\.io$/) ) {
    frameHost = scriptURL.hostname;
  } else {
    frameHost = 'default.app.ezai.io';
  }

  let ch = document.createElement('iframe');
  //ch.src = 'http://localhost:8080?deploy=420';
  ch.src = `https://${frameHost}`;
  ch.id = 'ezAiChatWindow';
  ch.allow = 'autoplay; camera; microphone';
  Object.assign(ch.style, {
    pointerEvents: 'all',
    position: 'absolute',
    minHeight: '0px',
    transition: 'all .2s',
    height: '0',
    width: '100%',
    maxWidth: '380px',
    border: 'none'
  });
  c.appendChild(ch);
  document.querySelector('body').appendChild(c);

  let o = document.createElement('button');
  let m = document.createElement('button');
  m.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 1L1 13" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 1L13 13" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  o.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" width="30px"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>'
  Object.assign(o.style, {
    pointerEvents: 'all',
      border: 'none',
      background: '#dc2631',
      width: '100%',
      maxWidth: '50px',
      height: '50px',
      borderRadius: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  });
  Object.assign(m.style, {
    display: 'none',
    pointerEvents: 'all',
    position: 'absolute',
    border: 'none',
    background: 'none',
    padding: '0',
    zIndex: '1000000',
    top: '8px',
    right: '12px',
  });
  c.appendChild(o);
  c.appendChild(m);

  o.addEventListener('click', () => {
    Object.assign(ch.style, { height: '500px', maxWidth: '380px' });
    Object.assign(c.style, { height: '500px', maxWidth: '380px', boxShadow: '0 0 2px rgba(0,0,0,.3)' });
    Object.assign(m.style, { display: 'block' });
  });
  m.addEventListener('click', () => {
    Object.assign(ch.style, { height: '0', maxWidth: '0' });
    Object.assign(c.style, { height: '50px', maxWidth: '50px', boxShadow: 'none' });
    Object.assign(m.style, { display: 'none' });
  });
})();