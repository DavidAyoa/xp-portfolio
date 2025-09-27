import React from 'react';

const MyProjects: React.FC = () => {
  return (
    <div className="p-4 h-full overflow-auto">
      <div className="font-mono text-sm">
        <h1 className="text-lg font-bold mb-4">🚀 Our Work</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-gray-300 p-3 bg-white">
            <h3 className="font-bold text-blue-600 mb-2">CodePoets Portfolio</h3>
            <p className="text-xs mb-2">Modern portfolio website with Windows XP theming</p>
            <div className="text-xs text-gray-600">
              <div>Tech: React, TypeScript, Tailwind CSS</div>
              <div>Status: ✅ Active</div>
            </div>
          </div>

          <div className="border border-gray-300 p-3 bg-white">
            <h3 className="font-bold text-blue-600 mb-2">XP Desktop Experience</h3>
            <p className="text-xs mb-2">Authentic Windows XP desktop environment in the browser</p>
            <div className="text-xs text-gray-600">
              <div>Tech: React, CSS-in-JS, Canvas API</div>
              <div>Status: 🔄 In Development</div>
            </div>
          </div>

          <div className="border border-gray-300 p-3 bg-white">
            <h3 className="font-bold text-blue-600 mb-2">Web Applications</h3>
            <p className="text-xs mb-2">Custom web applications for various industries</p>
            <div className="text-xs text-gray-600">
              <div>Tech: Full-stack development</div>
              <div>Status: 📋 Multiple projects</div>
            </div>
          </div>

          <div className="border border-gray-300 p-3 bg-white">
            <h3 className="font-bold text-blue-600 mb-2">UI/UX Design</h3>
            <p className="text-xs mb-2">Modern and retro interface designs</p>
            <div className="text-xs text-gray-600">
              <div>Tech: Figma, Adobe Creative Suite</div>
              <div>Status: 🎨 Ongoing</div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-3 bg-blue-50 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-2">📧 Want to work with us?</h3>
          <p className="text-xs">Contact us at <strong>hello@codepoets.dev</strong> for project inquiries and collaborations.</p>
        </div>
      </div>
    </div>
  );
};

export default MyProjects;