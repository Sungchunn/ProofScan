import { useState } from 'react';

const styles = {
  container: {
    padding: 24,
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    color: '#0f172a',
    background: '#f8fafc',
    minHeight: '100vh',
  },
  h1: { fontSize: 22, fontWeight: 700, margin: 0, color: '#0f172a' },
  sub: { marginTop: 6, color: '#475569', fontSize: 14 },
  formRow: { display: 'flex', gap: 12, marginTop: 16, alignItems: 'center' },
  input: {
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    background: '#fff',
  },
  btn: {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #1e293b',
    background: '#0f172a',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
  },
  btnDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  error: {
    marginTop: 12,
    color: '#b91c1c',
    background: '#fee2e2',
    border: '1px solid #fecaca',
    borderRadius: 8,
    padding: '10px 12px',
    fontSize: 14,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 16,
    marginTop: 20,
  },
  card: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 14,
    boxShadow: '0 1px 2px rgba(2, 6, 23, 0.04)',
  },
  cardHeader: {
    padding: '12px 16px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: { fontSize: 16, fontWeight: 700, color: '#0f172a' },
  cardBody: { padding: 16 },
  kpis: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  kpi: {
    background: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: 10,
    padding: '10px 12px',
    minWidth: 140,
  },
  kpiLabel: { fontSize: 12, color: '#475569' },
  kpiValue: { fontSize: 16, fontWeight: 700, marginTop: 2, color: '#0f172a' },
  mono: {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 10,
    padding: 12,
    maxHeight: 300,
    overflowY: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    fontSize: 14,
  },
  th: {
    textAlign: 'left',
    padding: '10px 12px',
    background: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  td: { padding: '10px 12px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'top' },
  badge: (type) => ({
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    background:
      type === 'Spelling' ? '#eef2ff' :
      type === 'Grammar' ? '#ecfeff' :
      type === 'Consistency' ? '#fef3c7' : '#f1f5f9',
    color:
      type === 'Spelling' ? '#3730a3' :
      type === 'Grammar' ? '#155e75' :
      type === 'Consistency' ? '#92400e' : '#334155',
    border:
      type === 'Spelling' ? '1px solid #e0e7ff' :
      type === 'Grammar' ? '1px solid #cffafe' :
      type === 'Consistency' ? '1px solid #fde68a' : '1px solid #e2e8f0',
  }),
  highlightWrong: { background: '#fff1f2', border: '1px dashed #fecdd3', borderRadius: 8, padding: 8 },
  highlightRight: { background: '#ecfdf5', border: '1px dashed #bbf7d0', borderRadius: 8, padding: 8 },
  small: { fontSize: 12, color: '#64748b' },
  footerNote: { marginTop: 10, fontSize: 12, color: '#64748b' },
};

function normalizePayload(res) {
  // Your sample is an array with one object
  const first = Array.isArray(res) ? res[0] : res || {};
  const extracted =
    first.extractedText ||
    first.extracted_text ||
    first.content?.extractedText ||
    '';
  const errors =
    first.errorsAndCorrections ||
    first.errors_and_corrections ||
    [];

  // Convert a long string into a readable block; keep as-is to avoid losing text
  const extractedBlock =
    Array.isArray(extracted) ? extracted.join('\n') : String(extracted || '');

  return { extractedBlock, errors: Array.isArray(errors) ? errors : [] };
}

const OCRDemo = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const n8nWebhookURL = 'https://flexscale.app.n8n.cloud/webhook-test/009f42dc-b706-4eb7-988d-c59cc8ca4e3f'; // Replace with your n8n webhook URL

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload an image file.');
      return;
    }
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(n8nWebhookURL, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('Failed to fetch results. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const normalized = response ? normalizePayload(response) : { extractedBlock: '', errors: [] };
  const totalErrors = normalized.errors.length;

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <h1 style={styles.h1}>Image OCR & Spelling Correction</h1>
        <div style={styles.sub}>Clean layout • Readable errors • Copy-friendly</div>
      </div>

      <form onSubmit={handleSubmit} style={styles.formRow}>
        <input type="file" accept="image/*,.pdf" onChange={handleFileChange} style={styles.input} />
        <button type="submit" disabled={loading} style={{ ...styles.btn, ...(loading ? styles.btnDisabled : {}) }}>
          {loading ? 'Processing…' : 'Upload & Analyze'}
        </button>
      </form>

      {error && <div style={styles.error}>{error}</div>}

      {response && (
        <div style={styles.grid}>
          {/* KPIs */}
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitle}>Summary</div>
            </div>
            <div style={{ ...styles.cardBody, ...styles.kpis }}>
              <div style={styles.kpi}>
                <div style={styles.kpiLabel}>Errors Detected</div>
                <div style={styles.kpiValue}>{totalErrors}</div>
              </div>
              <div style={styles.kpi}>
                <div style={styles.kpiLabel}>Payload Items</div>
                <div style={styles.kpiValue}>
                  {Array.isArray(response) ? response.length : 1}
                </div>
              </div>
            </div>
          </section>

          {/* Extracted Text */}
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitle}>Extracted Text (Clean)</div>
              <button
                onClick={() => navigator.clipboard.writeText(normalized.extractedBlock || '')}
                style={{ ...styles.btn, padding: '8px 12px' }}
                type="button"
              >
                Copy
              </button>
            </div>
            <div style={styles.cardBody}>
              <div style={styles.mono}>
                {normalized.extractedBlock || 'No text extracted.'}
              </div>
              <div style={styles.footerNote}>
                Tip: "Copy" puts the entire extracted text on your clipboard for QA.
              </div>
            </div>
          </section>

          {/* Errors Table */}
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitle}>Errors & Corrections</div>
              <div style={styles.small}>{totalErrors} total</div>
            </div>
            <div style={styles.cardBody}>
              {totalErrors === 0 ? (
                <div style={styles.small}>No issues found.</div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>#</th>
                        <th style={styles.th}>Type</th>
                        <th style={styles.th}>Found Text</th>
                        <th style={styles.th}>Correction</th>
                        <th style={styles.th}>Issue</th>
                        <th style={styles.th}>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {normalized.errors.map((e, idx) => (
                        <tr key={idx}>
                          <td style={styles.td}>{e.error_id ?? idx + 1}</td>
                          <td style={styles.td}>
                            <span style={styles.badge(e.error_type)}>{e.error_type || '—'}</span>
                          </td>
                          <td style={styles.td}>
                            <div style={styles.highlightWrong}>{e.found_text || '—'}</div>
                          </td>
                          <td style={styles.td}>
                            <div style={styles.highlightRight}>{e.corrected_text || '—'}</div>
                          </td>
                          <td style={styles.td} title={e.issue_description || ''}>
                            {e.issue_description || '—'}
                          </td>
                          <td style={styles.td}>{e.location_hint || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          {/* Raw JSON (collapsible feel via maxHeight) */}
          <section style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.cardTitle}>Raw JSON</div>
              <button
                onClick={() => navigator.clipboard.writeText(JSON.stringify(response, null, 2))}
                style={{ ...styles.btn, padding: '8px 12px' }}
                type="button"
              >
                Copy JSON
              </button>
            </div>
            <div style={styles.cardBody}>
              <pre style={styles.mono}>{JSON.stringify(response, null, 2)}</pre>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default OCRDemo;
