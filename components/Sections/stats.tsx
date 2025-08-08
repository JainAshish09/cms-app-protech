import React from 'react';
import Image from 'next/image';

const CountUp = ({ end, prefix = '', suffix = '' }: { end: any, prefix?: string, suffix?: string }) => {
    const [val, setVal] = React.useState(0);
    React.useEffect(() => {
        let start = 0;
        const target = parseFloat(end);
        if (isNaN(target)) return setVal(end);
        const duration = 1200;
        const step = Math.max(target / (duration / 16), 1);
        let raf: any;
        function animate() {
            start += step;
            if (start < target) {
                setVal(Math.floor(start));
                raf = requestAnimationFrame(animate);
            } else {
                setVal(target);
            }
        }
        animate();
        return () => raf && cancelAnimationFrame(raf);
    }, [end]);
    return <span>{prefix}{val}{suffix}</span>;
};

const StatsSection = ({ section }: { section: any }) => {
    let gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4';
    if (section.layout === 'row') gridClass = `grid-cols-${section.stats.length}`;
    if (section.layout === 'grid' && section.stats.length) gridClass = `grid-cols-1 sm:grid-cols-2 md:grid-cols-${section.stats.length}`;
    return (
        <section className="w-full py-16 bg-white">
            <div className="container mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{section.title}</h2>
                <div className={`grid gap-8 ${gridClass}`}>
                    {section.stats?.map((stat: any, i: number) => (
                        <div key={i} className="flex flex-col items-center text-center p-6 bg-[#F7FAFC] rounded-xl shadow">
                            {stat.icon && <Image src={`/${stat.icon}`} alt={stat.label} width={48} height={48} className="mb-2" />}
                            <div className="text-3xl md:text-5xl font-bold text-blue-700 mb-2">
                                {section.animation === 'countUp' ? <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} /> : <>{stat.prefix}{stat.value}{stat.suffix}</>}
                            </div>
                            <div className="text-gray-700 text-lg">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
