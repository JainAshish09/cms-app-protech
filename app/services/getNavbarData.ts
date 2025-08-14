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
}

export interface MenuLayoutConfig {
    sectionAButtons: SectionAButtons;
    sectionBCards: SectionBCards;
    sectionCCard: SectionCCard;
}

export interface SectionAButtons {
    backgroundColor: string;
    textColor: string;
    buttons: Button[];
}

export interface Button {
    label: string;
    url: string;
    buttonBgColor: string;
    buttonTextColor: string;
}

export interface SectionBCards {
    backgroundColor: string;
    cards: Card[];
}

export interface Card {
    title: string;
    content: string;
    image: string;
    buttonLabel: string;
    buttonUrl: string;
    buttonBgColor: string;
    buttonTextColor: string;
    cardBgColor: string;
    cardTextColor: string;
}

export interface SectionCCard {
    link: string;
    linkLabel: string;
    backgroundImage: string;
    logo: string;
}

export const getNavbarData = (): NavbarData => {
    const filePath = path.join(process.cwd(), 'content/navigation/navbar.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return data as NavbarData;
};

export const getMenuLayoutConfig = (): MenuLayoutConfig => {
    const filePath = path.join(process.cwd(), 'content/navigation/menu-layout.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return data as MenuLayoutConfig;
};
