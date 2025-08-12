"use client"
import React from 'react';
import Image from 'next/image';
import HeroSection from './Sections/hero';
import FeaturesSection from './Sections/features';
import ContentMediaSection from './Sections/contentMedia';
import CardsSection from './Sections/cards';
import TestimonialsSection from './Sections/testimonials';
import StatsSection from './Sections/stats';
import FaqSection from './Sections/faq';
import TeamSection from './Sections/team';
import TimelineSection from './Sections/timeline';
import PricingSection from './Sections/pricing';
import CTASection from './Sections/cta';
import AlertSection from './Sections/alert';
import DividerSection from './Sections/divider';
import RichTextSection from './Sections/richText';

interface SectionRendererProps {
  section: any;
}

// Simple count up animation for stats
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

// Simple slider for testimonials (no external lib)
const SimpleSlider = ({ children }: { children: React.ReactNode }) => {
  const [idx, setIdx] = React.useState(0);
  const count = React.Children.count(children);
  if (count <= 1) return children;
  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="w-full flex justify-center">{React.Children.toArray(children)[idx]}</div>
      <div className="flex gap-2 mt-4">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${i === idx ? 'bg-blue-600' : 'bg-gray-300'}`}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const getFontSizeClass = (fontSize: string | undefined) => fontSize || '';

// Helper to apply advanced controls/styles from section.controls
const getAdvancedStyle = (controls: any = {}) => ({
  padding: controls.padding,
  margin: controls.margin,
  border: controls.border,
  borderRadius: controls.borderRadius,
  boxShadow: controls.boxShadow,
  zIndex: controls.zIndex,
  opacity: controls.opacity,
  mixBlendMode: controls.blendMode,
  filter: controls.filter,
  position: controls.sticky ? 'sticky' : undefined,
  top: controls.sticky ? controls.stickyTop : undefined,
  minWidth: controls.minWidth,
  maxWidth: controls.maxWidth,
  minHeight: controls.minHeight,
  maxHeight: controls.maxHeight,
  pointerEvents: controls.pointerEvents,
  cursor: controls.cursor,
  order: controls.order,
  gap: controls.gap,
  display: controls.display,
  flexDirection: controls.flexDirection,
  flexWrap: controls.flexWrap,
  alignItems: controls.alignItems,
  justifyContent: controls.justifyContent,
  transition: controls.transition,
  background: controls.background,
  backgroundImage: controls.backgroundImage,
  backgroundSize: controls.backgroundSize,
  backgroundPosition: controls.backgroundPosition,
  backgroundRepeat: controls.backgroundRepeat,
  overflow: controls.overflow,
  ...((controls.customCss && controls.customCss.length > 0) ? { cssText: controls.customCss } : {}),
});

// Helper for shape divider
const ShapeDivider = ({ type, color, flip }: any) => {
  if (!type) return null;
  // Example: simple wave divider
  if (type === 'wave') {
    return (
      <svg viewBox="0 0 1440 100" className={`w-full h-12 ${flip ? 'rotate-180' : ''}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z" fill={color || '#fff'} />
      </svg>
    );
  }
  // Add more divider types as needed
  return null;
};

// Helper to render buttons
const renderButtons = (buttons: any[] = []) => (
  <div className="flex gap-3 mt-4">
    {buttons.map((btn, i) => (
      <a
        key={i}
        href={btn.href || '#'}
        className={`inline-block px-6 py-2 rounded font-semibold transition ${btn.variant === 'outline' ? 'border border-blue-600 text-blue-600 bg-white hover:bg-blue-50' : 'bg-blue-600 text-white hover:bg-blue-700'} ${btn.extraClass || ''}`}
        style={btn.style || {}}
        target={btn.target || '_self'}
        rel={btn.target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {btn.icon && <span className="mr-2">{btn.icon}</span>}
        {btn.text}
      </a>
    ))}
  </div>
);

const SectionRenderer: React.FC<SectionRendererProps> = ({ section }) => {
  // Helper for background and text color
  // Only set background properties once, with controls taking precedence
  const controls = section.controls || {};
  const sectionStyle = {
    color: section.textColor || controls.textColor || undefined,
    ...getAdvancedStyle(controls),
  } as React.CSSProperties;
  if (controls.background || controls.backgroundImage) {
    sectionStyle.background = controls.background;
    sectionStyle.backgroundImage = controls.backgroundImage;
    sectionStyle.backgroundSize = controls.backgroundSize;
    sectionStyle.backgroundPosition = controls.backgroundPosition;
    sectionStyle.backgroundRepeat = controls.backgroundRepeat;
  } else if (section.bgColor || section.bgImage) {
    sectionStyle.background = section.bgColor;
    if (section.bgImage) {
      sectionStyle.backgroundImage = `url(/${section.bgImage})`;
      sectionStyle.backgroundSize = 'cover';
      sectionStyle.backgroundPosition = 'center';
    }
  }
  const extraClass = section.extraClass || '';

  // Shape divider (top)
  const shapeTop = section.shapeDividerTop ? <ShapeDivider {...section.shapeDividerTop} /> : null;
  // Shape divider (bottom)
  const shapeBottom = section.shapeDividerBottom ? <ShapeDivider {...section.shapeDividerBottom} /> : null;

  switch (section.type) {
    case 'hero':
      return <HeroSection section={section} />;
    case 'features':
      return <FeaturesSection section={section} />;
    case 'contentMedia':
      return <ContentMediaSection section={section} />;
    case 'cards':
      return <CardsSection section={section} />;
    case 'testimonials':
      return <TestimonialsSection section={section} />;
    case 'stats':
      return <StatsSection section={section} />;
    case 'faq':
      return <FaqSection section={section} />;
    case 'team':
      return <TeamSection section={section} />;
    case 'timeline':
      return <TimelineSection section={section} />;
    case 'pricing':
      return <PricingSection section={section} />;
    case 'cta':
      return <CTASection section={section} renderButtons={renderButtons} />;
    case 'alert':
      return <AlertSection section={section} />;
    case 'divider':
      return <DividerSection section={section} />;
    case 'richText':
      return <RichTextSection section={section} />;
    default:
      return null;
  }
};

export default SectionRenderer;