/**
 * Capte Blog Section-Anchor Link Extractor
 * 
 * Extracts heading anchors (H2, H3) from published Capte blog posts to enable
 * marketing teams to generate section-specific deep links for social posts.
 * 
 * Output Format:
 * [heading] — [URL]
 * 
 * Works as a browser console script or bookmarklet.
 * Repository: https://github.com/john-l-hansen/capte-web-operations
 */

(function extractBlogSectionAnchors() {
  const base = location.origin + location.pathname;
  
  // Query H2 and H3 headings inside article scope if available, or fall back to document body
  const articleScope = document.querySelector('article, .blog-post, .w-richtext, main') || document.body;
  const headings = [...articleScope.querySelectorAll('h2, h3')];

  if (headings.length === 0) {
    const msg = '⚠️ No H2 or H3 headings found on this page.';
    console.warn(msg);
    if (typeof alert === 'function') alert(msg);
    return;
  }

  const idCounts = {};
  const lines = [];
  let duplicateCount = 0;
  let missingIdCount = 0;

  headings.forEach(h => {
    const text = (h.textContent || '').trim().replace(/\s+/g, ' ');
    const id = h.id ? h.id.trim() : '';

    if (!id) {
      missingIdCount++;
      lines.push(`⚠️ NO ID: ${text} — (no id assigned)`);
      return;
    }

    idCounts[id] = (idCounts[id] || 0) + 1;
    let prefix = '';
    if (idCounts[id] > 1) {
      duplicateCount++;
      prefix = '⚠️ DUPLICATE: ';
    }

    // Clean format: [heading] — [URL]
    lines.push(`${prefix}${text} — ${base}#${id}`);
  });

  const fullOutput = lines.join('\n');

  // Output to DevTools console
  console.log(fullOutput);

  // Copy to clipboard with fallback
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(fullOutput)
      .then(() => {
        console.log(`✅ ${headings.length} section links copied to clipboard!`);
        showToast(`✅ Copied ${headings.length} section links to clipboard!`);
      })
      .catch(err => {
        console.error('Clipboard copy failed:', err);
        showToast('⚠️ Check console for output (clipboard permission denied)');
      });
  } else {
    showToast('✅ Links printed to console');
  }

  /**
   * Non-intrusive HUD toast notification for bookmarklet users
   */
  function showToast(message) {
    if (typeof document === 'undefined') return;
    const existing = document.getElementById('capte-anchor-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'capte-anchor-toast';
    toast.setAttribute('style', `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      background-color: #001384;
      color: #ffffff;
      padding: 12px 18px;
      border-radius: 6px;
      box-shadow: 0 4px 16px rgba(0, 19, 132, 0.25);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      font-weight: 500;
      line-height: 1.4;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: opacity 0.3s ease, transform 0.3s ease;
      opacity: 0;
      transform: translateY(8px);
      pointer-events: none;
    `);
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
})();
