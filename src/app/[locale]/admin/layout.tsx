import React, { ReactNode } from 'react';
import AsideRouter from '@/components/router/AsideRouter';
import HeaderRouter from '@/components/router/HeaderRouter';
import FooterRouter from '@/components/router/FooterRouter';
import Wrapper from '@/components/layouts/Wrapper/Wrapper';

const AdminLayout = async ({ children }: { children: ReactNode }) => {
    return (
        <>
            <AsideRouter />
            <Wrapper>
                <HeaderRouter />
                {children}
                <FooterRouter />
            </Wrapper>
        </>
    );
};

export default AdminLayout;
