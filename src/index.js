import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

function parseAccessToken() {
  try {
    return window.location.href.match('access_token=([^&]*)')[1];
  } catch (error) {
    return '';
  }
}

function renderIndex() {
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <App accessToken={parseAccessToken()} />
    </div>
  );
}

ReactDOM.render(renderIndex(), document.getElementById('root'));
registerServiceWorker();
