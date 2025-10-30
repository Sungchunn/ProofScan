import { useState } from 'react';

const styles = {
  container: {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    color: '#0f172a',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    width: '100vw',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mainContent: {
    width: '100%',
    maxWidth: '100%',
    padding: '40px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
  },
  uploadSection: {
    width: '100%',
    maxWidth: 700,
    margin: '0 0 40px 0',
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    padding: '48px 40px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
  },
  dragDropZone: {
    border: '3px dashed #cbd5e1',
    borderRadius: 16,
    padding: '48px 24px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
  },
  dragDropZoneActive: {
    border: '3px dashed #667eea',
    background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
    transform: 'scale(1.02)',
  },
  dragDropIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  dragDropText: {
    fontSize: 18,
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: 8,
  },
  dragDropSubtext: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  fileInfo: {
    marginTop: 16,
    padding: '12px 16px',
    background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    border: '2px solid #86efac',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
  },
  fileName: {
    fontSize: 14,
    fontWeight: 600,
    color: '#166534',
  },
  removeFile: {
    background: 'none',
    border: 'none',
    fontSize: 20,
    cursor: 'pointer',
    color: '#dc2626',
    padding: 4,
  },
  resultsSection: {
    width: '100%',
    maxWidth: 1200,
  },
  h1: {
    fontSize: 42,
    fontWeight: 800,
    margin: '0 0 12px 0',
    color: '#fff',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    lineHeight: 1.2,
  },
  sub: {
    marginTop: 0,
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontWeight: 600,
  },
  formRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginTop: 0,
    alignItems: 'stretch',
  },
  input: {
    padding: '16px 20px',
    borderRadius: 12,
    border: '2px solid #e2e8f0',
    background: '#fff',
    fontSize: 15,
    fontWeight: 500,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    width: '100%',
  },
  btn: {
    padding: '16px 32px',
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: 16,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    width: '100%',
  },
  btnDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  error: {
    marginTop: 16,
    color: '#dc2626',
    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
    border: '2px solid #fca5a5',
    borderRadius: 12,
    padding: '14px 18px',
    fontSize: 14,
    fontWeight: 600,
    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.15)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 24,
    marginTop: 32,
  },
  card: {
    background: '#fff',
    border: '2px solid #e2e8f0',
    borderRadius: 18,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  cardHeader: {
    padding: '16px 20px',
    borderBottom: '2px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: '#0f172a',
    letterSpacing: '-0.02em',
  },
  cardBody: { padding: 20 },
  kpis: { display: 'flex', gap: 16, flexWrap: 'wrap' },
  kpi: {
    background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
    border: '2px solid #e0e7ff',
    borderRadius: 14,
    padding: '16px 20px',
    minWidth: 160,
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.1)',
  },
  kpiLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  kpiValue: {
    fontSize: 28,
    fontWeight: 800,
    marginTop: 6,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  mono: {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    border: '2px solid #e2e8f0',
    borderRadius: 14,
    padding: 16,
    maxHeight: 300,
    overflowY: 'auto',
    fontSize: 13,
    lineHeight: 1.6,
    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    fontSize: 14,
  },
  th: {
    textAlign: 'left',
    padding: '14px 16px',
    background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
    borderBottom: '2px solid #e0e7ff',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    fontWeight: 700,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#475569',
  },
  td: {
    padding: '14px 16px',
    borderBottom: '1px solid #f1f5f9',
    verticalAlign: 'top',
  },
  badge: (type) => ({
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    background:
      type === 'Spelling' ? 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)' :
      type === 'Grammar' ? 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)' :
      type === 'Consistency' ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' :
      'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    color:
      type === 'Spelling' ? '#3730a3' :
      type === 'Grammar' ? '#155e75' :
      type === 'Consistency' ? '#92400e' : '#334155',
    border:
      type === 'Spelling' ? '2px solid #c7d2fe' :
      type === 'Grammar' ? '2px solid #a5f3fc' :
      type === 'Consistency' ? '2px solid #fcd34d' : '2px solid #cbd5e1',
    boxShadow:
      type === 'Spelling' ? '0 2px 8px rgba(99, 102, 241, 0.2)' :
      type === 'Grammar' ? '0 2px 8px rgba(6, 182, 212, 0.2)' :
      type === 'Consistency' ? '0 2px 8px rgba(251, 191, 36, 0.2)' :
      '0 2px 8px rgba(148, 163, 184, 0.15)',
  }),
  highlightWrong: {
    background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
    border: '2px dashed #fda4af',
    borderRadius: 10,
    padding: 10,
    fontWeight: 600,
    boxShadow: '0 2px 8px rgba(244, 63, 94, 0.15)',
  },
  highlightRight: {
    background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    border: '2px dashed #86efac',
    borderRadius: 10,
    padding: 10,
    fontWeight: 600,
    boxShadow: '0 2px 8px rgba(34, 197, 94, 0.15)',
  },
  small: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: 600,
  },
  footerNote: {
    marginTop: 12,
    fontSize: 13,
    color: '#64748b',
    fontStyle: 'italic',
  },
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
  const [isDragging, setIsDragging] = useState(false);

  const n8nWebhookURL = 'https://flexscale.app.n8n.cloud/webhook/009f42dc-b706-4eb7-988d-c59cc8ca4e3f';

  const validateFileType = (file) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    return validTypes.includes(file.type.toLowerCase());
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!validateFileType(selectedFile)) {
        setError('Invalid file type. Please upload only PNG or JPEG images.');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setResponse(null);
      setError(null);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (!validateFileType(droppedFile)) {
        setError('Invalid file type. Please upload only PNG or JPEG images.');
        setFile(null);
        return;
      }
      setFile(droppedFile);
      setResponse(null);
      setError(null);
    }
  };

  const removeFile = () => {
    setFile(null);
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
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.h1}>Product OCR Misspelling Scanner</h1>
          <div style={styles.sub}>Upload PNG or JPEG images to detect and correct spelling errors</div>
        </div>

        {/* Upload Section */}
        <div style={styles.uploadSection}>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                ...styles.dragDropZone,
                ...(isDragging ? styles.dragDropZoneActive : {}),
              }}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <div style={styles.dragDropIcon}>📁</div>
              <div style={styles.dragDropText}>
                {file ? file.name : 'Drop your file here'}
              </div>
              <div style={styles.dragDropSubtext}>
                {file ? 'File ready to analyze' : 'or click to browse'}
              </div>
              <div style={styles.dragDropSubtext}>
                Supports: PNG and JPEG images only
              </div>
              <input
                id="fileInput"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>

            {file && (
              <div style={styles.fileInfo}>
                <div>
                  <span style={styles.fileName}>✓ {file.name}</span>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                    {(file.size / 1024).toFixed(2)} KB
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  style={styles.removeFile}
                  title="Remove file"
                >
                  ✕
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !file}
              style={{
                ...styles.btn,
                ...(loading || !file ? styles.btnDisabled : {}),
                marginTop: 24,
              }}
              onMouseOver={(e) => !loading && file && (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
            >
              {loading ? '⏳ Analyzing...' : '🚀 Analyze Document'}
            </button>
          </form>

          {error && <div style={styles.error}>{error}</div>}
        </div>

        {/* Results Section */}
        {response && (
          <div style={styles.resultsSection}>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default OCRDemo;
