import React, { ReactNode } from 'react';
import SiteHeaderTemplate from '@/templates/layouts/Headers/SiteHeader.template';
import SiteFooterTemplate from '@/templates/layouts/Footers/SiteFooter.template';

const SiteLayout = async ({ children }: { children: ReactNode }) => {
    return (    
        <>
            <SiteHeaderTemplate />
            <main className="flex-1">
                {children}
            </main>
            <SiteFooterTemplate />
        </>
    );
};

export default SiteLayout;