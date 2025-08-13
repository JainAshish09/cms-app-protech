// components/HeaderWrapper.tsx
import { getNavbarData } from '@/app/services/getNavbarData';
import Header from './header';

export default async function HeaderWrapper() {
    const navbarData = await getNavbarData();
    console.log('Navbar Data:', navbarData); // Debugging line to check data
    return <Header navbarData={navbarData} />;
}
