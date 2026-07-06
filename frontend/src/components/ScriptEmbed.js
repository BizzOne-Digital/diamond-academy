import React, { useEffect, useRef } from 'react';

// Renders an admin-pasted embed snippet (HTML that may contain <script> tags, e.g. from a
// 360° product-viewer provider like Sirv 360 / Magic360 / WebRotate360 — the same pattern as
// the GIA 4Cs scripts on the Resources page). Scripts inserted via innerHTML never execute in
// the browser for security reasons, so each one is recreated as a real <script> element and
// re-inserted in place, which does execute — the standard trick for this.
export default function ScriptEmbed({ html, style }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !html) return;
    container.innerHTML = html;

    const oldScripts = Array.from(container.querySelectorAll('script'));
    oldScripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
      newScript.text = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });

    return () => { container.innerHTML = ''; };
  }, [html]);

  return <div ref={containerRef} style={style} />;
}
