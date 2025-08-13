import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


type MenuAlignment = 'left' | 'right'; // center removed
type MenuItemType = 'button' | 'text' | 'logo' | 'link';

export interface CMSMenuItem {
    type: MenuItemType;
    label?: string;
    url?: string;
    style?: string;
    newTab?: boolean;
    icon?: string;
    fontSize?: string;
    color?: string;
    image?: string;
    placement?: MenuAlignment;
    height?: number;
    alignment?: MenuAlignment; // only 'left' or 'right'
    controls?: { fontSize?: string; color?: string };
}

export interface NavbarData {
    bgColor?: string;
    textColor?: string;
    items: CMSMenuItem[];
    showSearch?: boolean;
    searchPlaceholder?: string;
}

export const getNavbarData = (): NavbarData => {
    const filePath = path.join(process.cwd(), 'content/navigation/navbar.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return data as NavbarData;
};
