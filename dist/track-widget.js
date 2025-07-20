(function() {
  'use strict';

  // Widget React component (minified version)
  const TrackButtonWidget = function(props) {
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState(null);
    const [error, setError] = React.useState(null);

    const handleClick = async () => {
      setLoading(true);
      setError(null);
      setResult(null);
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        if (!res.ok) throw new Error("Error en la consulta");
        const data = await res.json();
        setResult(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    return React.createElement('div', {
      className: `track-button-widget track-button-widget--${props.size}`,
      style: { textAlign: 'center', margin: 16 }
    }, [
      React.createElement('button', {
        key: 'btn',
        className: `track-button track-button--${props.size}`,
        onClick: handleClick,
        disabled: loading,
        style: {
          padding: props.size === 'large' ? '12px 32px' : '8px 20px',
          fontSize: props.size === 'large' ? 20 : 14,
          borderRadius: 8,
          background: '#22243a',
          color: '#fff',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
          transition: 'background 0.2s, opacity 0.2s'
        }
      }, loading ? 'Consultando...' : 'Consultar Tracking'),
      React.createElement('div', {
        key: 'result',
        style: { marginTop: 16, minHeight: 40 }
      }, [
        error && React.createElement('div', { key: 'error', style: { color: 'red' } }, error),
        result && React.createElement('pre', {
          key: 'data',
          style: { textAlign: 'left', background: '#f4f4f4', padding: 12, borderRadius: 6 }
        }, JSON.stringify(result, null, 2))
      ])
    ]);
  };

  // CSS styles
  const styles = `
    .track-button-widget { display: inline-block; }
    .track-button { transition: background 0.2s, opacity 0.2s; }
    .track-button--large { font-weight: bold; }
    .track-button--small { font-weight: normal; }
  `;

  // Inject CSS
  if (!document.getElementById('track-widget-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'track-widget-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  // Load React from CDN if not already loaded
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (window.React && window.ReactDOM) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Initialize widget
  async function initWidget() {
    try {
      // Load React from CDN
      await loadScript('https://unpkg.com/react@18/umd/react.production.min.js');
      await loadScript('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js');
      
      // Find all track buttons
      const buttons = document.querySelectorAll('.track-button');
      
      buttons.forEach(button => {
        const size = button.getAttribute('data-size') || 'large';
        const container = document.createElement('div');
        button.parentNode.insertBefore(container, button);
        button.style.display = 'none';
        
        // Render React component
        const root = ReactDOM.createRoot(container);
        root.render(React.createElement(TrackButtonWidget, { size }));
      });
    } catch (error) {
      console.error('Error loading track widget:', error);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})(); 