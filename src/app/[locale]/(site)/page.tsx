import React from 'react';

const SitePage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to Fyr
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Your React NextJS TypeScript Tailwind Admin & AI Chat Template
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">Modern Design</h3>
                        <p className="text-gray-600">Built with Tailwind CSS for beautiful, responsive designs</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">TypeScript</h3>
                        <p className="text-gray-600">Full TypeScript support for better development experience</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">Next.js 14</h3>
                        <p className="text-gray-600">Latest Next.js features with App Router</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SitePage;