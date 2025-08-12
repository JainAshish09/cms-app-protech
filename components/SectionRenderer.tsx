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

// Widget renderers
const WidgetRenderer = ({ widget }: { widget: any }) => {
  switch (widget.type) {
    case 'video':
      if (widget.provider === 'youtube') {
        return <iframe src={`https://www.youtube.com/embed/${widget.videoId}`} title="YouTube video" className="w-full aspect-video rounded-xl" allowFullScreen />;
      }
      if (widget.provider === 'vimeo') {
        return <iframe src={`https://player.vimeo.com/video/${widget.videoId}`} title="Vimeo video" className="w-full aspect-video rounded-xl" allowFullScreen />;
      }
      return <video src={widget.src} controls className="w-full rounded-xl" poster={widget.poster} />;
    case 'audio':
      return <audio src={widget.src} controls className="w-full" />;
    case 'gallery':
      return (
        <div className={`grid gap-4 ${widget.layout === 'masonry' ? 'md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
          {widget.images?.map((img: any, i: number) => (
            <div key={i} className="relative w-full h-40 rounded-xl overflow-hidden">
              <Image src={`/${img.src}`} alt={img.alt || ''} layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
      );
    case 'tabs':
      const [tab, setTab] = React.useState(0);
      return (
        <div>
          <div className="flex gap-2 mb-4">
            {widget.tabs?.map((t: any, i: number) => (
              <button key={i} className={`px-4 py-2 rounded-t ${i === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setTab(i)}>{t.label}</button>
            ))}
          </div>
          <div className="p-4 bg-white rounded-b shadow" dangerouslySetInnerHTML={{ __html: widget.tabs?.[tab]?.content || '' }} />
        </div>
      );
    case 'accordion':
      return (
        <div className="space-y-2">
          {widget.items?.map((item: any, i: number) => (
            <details key={i} className="bg-white rounded shadow p-4">
              <summary className="font-semibold cursor-pointer">{item.label}</summary>
              <div className="mt-2" dangerouslySetInnerHTML={{ __html: item.content }} />
            </details>
          ))}
        </div>
      );
    case 'progressBar':
      return (
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${widget.value || 0}%` }} />
        </div>
      );
    case 'countdown': {
      const [time, setTime] = React.useState(widget.target - Date.now());
      React.useEffect(() => {
        const interval = setInterval(() => setTime(widget.target - Date.now()), 1000);
        return () => clearInterval(interval);
      }, [widget.target]);
      const seconds = Math.max(0, Math.floor(time / 1000));
      const d = Math.floor(seconds / 86400), h = Math.floor((seconds % 86400) / 3600), m = Math.floor((seconds % 3600) / 60), s = seconds % 60;
      return <div className="font-mono text-2xl">{d}d {h}h {m}m {s}s</div>;
    }
    case 'form':
      return (
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('Form submitted!'); }}>
          {widget.fields?.map((f: any, i: number) => (
            <div key={i}>
              <label className="block font-semibold mb-1">{f.label}</label>
              <input type={f.type || 'text'} name={f.name} required={f.required} className="w-full border rounded px-3 py-2" />
            </div>
          ))}
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">{widget.buttonText || 'Submit'}</button>
        </form>
      );
    case 'map':
      if (widget.provider === 'google') {
        return <iframe src={`https://www.google.com/maps?q=${encodeURIComponent(widget.query)}&output=embed`} className="w-full h-64 rounded-xl" />;
      }
      return <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-xl">Map</div>;
    case 'code':
      return <pre className="bg-gray-900 text-green-200 rounded p-4 overflow-x-auto"><code>{widget.code}</code></pre>;
    case 'socialEmbed':
      if (widget.platform === 'twitter') {
        return <iframe src={`https://twitframe.com/show?url=${encodeURIComponent(widget.url)}`} className="w-full h-64 rounded-xl" />;
      }
      if (widget.platform === 'youtube') {
        return <iframe src={`https://www.youtube.com/embed/${widget.videoId}`} className="w-full aspect-video rounded-xl" allowFullScreen />;
      }
      // Add more platforms as needed
      return null;
    case 'newsletter':
      return (
        <form className="flex gap-2" onSubmit={e => { e.preventDefault(); alert('Subscribed!'); }}>
          <input type="email" required placeholder="Your email" className="border rounded px-3 py-2" />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">{widget.buttonText || 'Subscribe'}</button>
        </form>
      );
    case 'html':
      return <div dangerouslySetInnerHTML={{ __html: widget.html }} />;
    case 'lottie':
      return widget.src ? <iframe src={widget.src} className="w-full h-64" /> : null;
    case 'icon':
      return <span className={`inline-block ${widget.className || ''}`}>{widget.icon || '★'}</span>;
    case 'badge':
      return <span className={`inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs`}>{widget.text}</span>;
    case 'rating':
      return <div className="text-yellow-400">{'★'.repeat(widget.value || 5)}</div>;
    case 'timeline':
      return (
        <div className="flex flex-col gap-4">
          {widget.events?.map((e: any, i: number) => (
            <div key={i} className="flex items-center gap-4">
              {e.icon && <span className="text-2xl">{e.icon}</span>}
              <div>
                <div className="font-bold">{e.title}</div>
                <div className="text-gray-600 text-sm">{e.date}</div>
                <div>{e.content}</div>
              </div>
            </div>
          ))}
        </div>
      );
    case 'stepper':
      return (
        <div className="flex gap-4 items-center">
          {widget.steps?.map((s: any, i: number) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i <= (widget.activeStep || 0) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>{i + 1}</div>
              <div className="text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      );
    case 'carousel':
      return (
        <SimpleSlider>
          {widget.items?.map((item: any, i: number) => (
            <div key={i}>{item.content}</div>
          ))}
        </SimpleSlider>
      );
    case 'modal':
      const [open, setOpen] = React.useState(false);
      return (
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setOpen(true)}>{widget.buttonText || 'Open'}</button>
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded p-8 shadow-lg relative">
                <button className="absolute top-2 right-2" onClick={() => setOpen(false)}>✕</button>
                <div>{widget.content}</div>
              </div>
            </div>
          )}
        </div>
      );
    case 'tooltip':
      return <span className="relative group cursor-pointer">{widget.text}<span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">{widget.tooltip}</span></span>;
    case 'popover':
      const [show, setShow] = React.useState(false);
      return (
        <span className="relative">
          <button onClick={() => setShow(!show)} className="underline text-blue-600">{widget.text}</button>
          {show && <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white border shadow rounded px-4 py-2 z-50">{widget.popover}</span>}
        </span>
      );
    case 'chart':
      // Placeholder: use a chart lib for real charts
      return <div className="w-full h-40 bg-gradient-to-r from-blue-200 to-blue-400 rounded flex items-center justify-center text-blue-900 font-bold">Chart: {widget.chartType}</div>;
    case 'table':
      return (
        <table className="min-w-full border rounded">
          <thead><tr>{widget.columns?.map((c: any, i: number) => <th key={i} className="border px-2 py-1 bg-gray-100">{c}</th>)}</tr></thead>
          <tbody>{widget.rows?.map((row: any, i: number) => <tr key={i}>{row.map((cell: any, j: number) => <td key={j} className="border px-2 py-1">{cell}</td>)}</tr>)}</tbody>
        </table>
      );
    case 'list':
      return <ul className="list-disc pl-6">{widget.items?.map((item: any, i: number) => <li key={i}>{item}</li>)}</ul>;
    case 'fileDownload':
      return <a href={widget.url} download className="bg-blue-600 text-white px-4 py-2 rounded">{widget.text || 'Download'}</a>;
    case 'qr':
      return <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(widget.data)}`} alt="QR Code" className="w-32 h-32" />;
    default:
      return null;
  }
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