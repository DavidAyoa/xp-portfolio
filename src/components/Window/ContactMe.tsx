import React from 'react';

const ContactMe: React.FC = () => {
  return (
    <div className="p-4 h-full bg-white">
      <div className="max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Contact CodePoets</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" className="w-full border border-gray-300 px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full border border-gray-300 px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea className="w-full border border-gray-300 px-3 py-2 rounded h-24" rows={4}></textarea>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactMe;