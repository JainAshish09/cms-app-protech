// components/HeaderWrapper.tsx
import { getMenuLayoutConfig, getNavbarData } from '@/app/services/getNavbarData';
import Header from './header';

export default async function HeaderWrapper() {
    const navbarData = await getNavbarData();
    const menuLayout = await getMenuLayoutConfig();
    return <Header navbarData={navbarData} menuLayoutConfig={menuLayout} />;
}
