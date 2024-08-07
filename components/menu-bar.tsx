import { useRouter } from 'next/navigation';
import { MenuBarProps } from '@/app/models/menu-item';

const MenuBar: React.FC<MenuBarProps> = ({ items }) => {
    const router = useRouter();

    const handleNavigation = (url: string) => {
        router.push(url);
    };

    return (
        <div className="px-2 pt-2 pb-3 space-y-1">
            {items.map((item) => (
                <button
                    type='button'
                    key={item.name}
                    onClick={() => handleNavigation(item.url)}
                    className="block text-gray-700 px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                    {item.name}
                </button>
            ))}
        </div>
    );
};

export default MenuBar;
