import React from 'react';

// App Components (simple implementations)
const OurComputer: React.FC<any> = () => (
  <div style={{ padding: '8px', height: '100%', backgroundColor: 'white' }}>
    <div style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 'bold' }}>System Tasks</div>
    <div style={{ marginLeft: '16px' }}>
      <div style={{ color: '#0066cc', cursor: 'pointer', marginBottom: '4px' }}>View system information</div>
      <div style={{ color: '#0066cc', cursor: 'pointer', marginBottom: '4px' }}>Add or remove programs</div>
      <div style={{ color: '#0066cc', cursor: 'pointer', marginBottom: '4px' }}>Change a setting</div>
    </div>
    <hr style={{ margin: '16px 0' }} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '16px' }}>
      <div style={{ textAlign: 'center', cursor: 'pointer' }}>
        <div style={{ width: '48px', height: '48px', backgroundColor: '#ffd700', margin: '0 auto 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💾</div>
        <div style={{ fontSize: '11px' }}>3½ Floppy (A:)</div>
      </div>
      <div style={{ textAlign: 'center', cursor: 'pointer' }}>
        <div style={{ width: '48px', height: '48px', backgroundColor: '#4169e1', margin: '0 auto 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💿</div>
        <div style={{ fontSize: '11px' }}>Local Disk (C:)</div>
      </div>
      <div style={{ textAlign: 'center', cursor: 'pointer' }}>
        <div style={{ width: '48px', height: '48px', backgroundColor: '#ff8c00', margin: '0 auto 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💽</div>
        <div style={{ fontSize: '11px' }}>CD Drive (D:)</div>
      </div>
    </div>
  </div>
);

const Paint: React.FC<any> = () => (
  <div style={{ height: '100%', backgroundColor: 'white' }}>
    <div style={{ height: '28px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', padding: '4px', backgroundColor: 'white', border: '1px solid #999' }}>
        {['⬜', '✏️', '🖌️', '🪣'].map((tool, i) => (
          <button key={i} style={{ width: '24px', height: '24px', border: '1px solid #999', backgroundColor: 'white', cursor: 'pointer' }}>{tool}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '1px', padding: '4px', backgroundColor: 'white', border: '1px solid #999' }}>
        {['#000000', '#ffffff', '#ff0000', '#0000ff', '#00ff00', '#ffff00', '#ff00ff', '#00ffff'].map((color, i) => (
          <div key={i} style={{ width: '16px', height: '16px', backgroundColor: color, border: '1px solid #999', cursor: 'pointer' }} />
        ))}
      </div>
    </div>
    <div style={{ flex: 1, height: 'calc(100% - 28px)', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>🎨 Canvas Area</div>
  </div>
);

const ContactDetails: React.FC<any> = () => (
  <div style={{ height: '100%', backgroundColor: 'white', fontFamily: 'monospace' }}>
    <div style={{ height: '24px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc', padding: '2px 8px', fontSize: '11px' }}>
      <span style={{ cursor: 'pointer', padding: '2px 8px' }}>File</span>
      <span style={{ cursor: 'pointer', padding: '2px 8px' }}>Edit</span>
      <span style={{ cursor: 'pointer', padding: '2px 8px' }}>Format</span>
      <span style={{ cursor: 'pointer', padding: '2px 8px' }}>View</span>
      <span style={{ cursor: 'pointer', padding: '2px 8px' }}>Help</span>
    </div>
    <div style={{ padding: '16px', height: 'calc(100% - 24px)', overflow: 'auto' }}>
      <div style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>📧 Contact Information</div>
      <div style={{ borderBottom: '1px solid #ccc', marginBottom: '16px' }}></div>
      <div style={{ lineHeight: '1.8' }}>
        <div><strong>Company:</strong> CodePoets</div>
        <div><strong>Email:</strong> hello@codepoets.dev</div>
        <div><strong>Website:</strong> https://codepoets.dev</div>
        <div><strong>Phone:</strong> +1 (555) 123-4567</div>
        <div style={{ marginTop: '16px' }}><strong>Address:</strong><br />123 Developer Street<br />Tech City, TC 12345<br />United States</div>
        <div style={{ marginTop: '16px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>💼 Services:</div>
          <div style={{ marginLeft: '16px' }}>• Web Development<br />• Mobile Applications<br />• UI/UX Design<br />• Cloud Solutions<br />• Technical Consulting</div>
        </div>
      </div>
    </div>
  </div>
);

const InternetExplorer: React.FC<any> = () => (
  <div style={{ height: '100%', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
    <div style={{ height: '32px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
      <button style={{ marginRight: '4px', padding: '2px 8px', border: '1px solid #999', backgroundColor: 'white', cursor: 'pointer' }}>Back</button>
      <button style={{ marginRight: '4px', padding: '2px 8px', border: '1px solid #999', backgroundColor: 'white', cursor: 'pointer' }}>Forward</button>
      <button style={{ marginRight: '8px', padding: '2px 8px', border: '1px solid #999', backgroundColor: 'white', cursor: 'pointer' }}>Refresh</button>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px' }}>Address:</span>
        <input type="text" style={{ flex: 1, padding: '2px 4px', border: '1px solid #999' }} defaultValue="https://codepoets.dev" />
      </div>
    </div>
    <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: '#0066cc', marginBottom: '16px' }}>Welcome to CodePoets</h1>
        <div style={{ fontSize: '18px', marginBottom: '16px' }}>Professional Web Development Services</div>
        <div style={{ marginBottom: '32px' }}>We create modern, responsive web applications using the latest technologies.</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <div style={{ padding: '16px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ color: '#0066cc', marginBottom: '12px' }}>Web Development</h3>
          <p>Full-stack development using React, Node.js, and modern frameworks.</p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ color: '#0066cc', marginBottom: '12px' }}>UI/UX Design</h3>
          <p>Beautiful, user-friendly interfaces that enhance user experience.</p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ color: '#0066cc', marginBottom: '12px' }}>Consulting</h3>
          <p>Technical consulting and architecture planning for your projects.</p>
        </div>
      </div>
    </div>
  </div>
);

// App Settings - like winXP-example
export const appSettings = {
  OurComputer: {
    title: 'My Computer',
    component: OurComputer,
    defaultSize: { width: 660, height: 500 },
    defaultOffset: { x: 50, y: 50 },
    resizable: true,
  },
  Paint: {
    title: 'Paint',
    component: Paint,
    defaultSize: { width: 640, height: 480 },
    defaultOffset: { x: 80, y: 80 },
    resizable: true,
  },
  ContactDetails: {
    title: 'Notepad - Contact Info',
    component: ContactDetails,
    defaultSize: { width: 600, height: 400 },
    defaultOffset: { x: 110, y: 110 },
    resizable: true,
  },
  InternetExplorer: {
    title: 'Internet Explorer',
    component: InternetExplorer,
    defaultSize: { width: 800, height: 600 },
    defaultOffset: { x: 20, y: 20 },
    resizable: true,
  },
};

// Default icon state - like winXP-example
export const defaultIconState = [
  {
    id: '0',
    title: 'My Computer',
    imgSrc: '/img/icons/computer.png',
    component: 'OurComputer',
    isFocus: false,
  },
  {
    id: '1',
    title: 'Paint',
    imgSrc: '/img/icons/paint.png',
    component: 'Paint',
    isFocus: false,
  },
  {
    id: '2',
    title: 'Notepad',
    imgSrc: '/img/icons/notepad.png',
    component: 'ContactDetails',
    isFocus: false,
  },
  {
    id: '3',
    title: 'Internet Explorer',
    imgSrc: '/img/icons/internet.png',
    component: 'InternetExplorer',
    isFocus: false,
  },
];

export { OurComputer, Paint, ContactDetails, InternetExplorer };