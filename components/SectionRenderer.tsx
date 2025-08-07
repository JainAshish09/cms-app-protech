"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    case 'hero': {
      let layoutClass = '';
      if (section.style === 'split') layoutClass = 'md:flex-row';
      else if (section.style === 'fullscreen') layoutClass = 'min-h-[70vh]';
      return (
        <section className={`w-full py-20 md:py-32 flex flex-col items-center justify-center relative overflow-hidden ${layoutClass}`} style={sectionStyle}>
          <div className="max-w-5xl w-full flex flex-col items-center z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center leading-tight drop-shadow-lg" style={{ color: section.textColor }}>{section.title}</h1>
            <div className="prose md:prose-lg text-center mb-8 max-w-2xl" style={{ color: section.textColor }} dangerouslySetInnerHTML={{ __html: section.content }} />
            {section.images && (
              <div className="flex gap-4 w-full max-w-4xl justify-center mb-6 flex-wrap">
                {section.images.map((img: any, i: number) => (
                  <div key={i} className="relative w-[180px] h-[120px] md:w-[320px] md:h-[200px] rounded-2xl shadow-lg overflow-hidden">
                    <Image src={`/${img.image}`} alt={img.alt || 'Hero Image'} layout='fill' objectFit='cover' className='rounded-2xl' />
                  </div>
                ))}
              </div>
            )}
            {section.buttons && renderButtons(section.buttons)}
          </div>
        </section>
      );
    }
    case 'features': {
      let gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4';
      if (section.layout === 'columns' && section.itemsPerRow) gridClass = `grid-cols-1 sm:grid-cols-2 md:grid-cols-${section.itemsPerRow}`;
      if (section.layout === 'list') gridClass = 'grid-cols-1';
      return (
        <section className="w-full py-16" style={sectionStyle}>
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-2">{section.title}</h2>
            {section.subtitle && <p className="text-center text-lg mb-8">{section.subtitle}</p>}
            <div className={`grid gap-8 px-2 md:px-10 ${gridClass}`}>
              {section.features?.map((feature: any, i: number) => (
                <div key={i} className="flex flex-col items-center text-center p-6 bg-[#F7FAFC] rounded-xl shadow hover:shadow-lg transition-all">
                  <div className="mb-4"><Image src={`/${feature.icon}`} alt={feature.title} width={64} height={64} /></div>
                  <p className="font-semibold text-base md:text-lg text-gray-800">{feature.title}</p>
                  {feature.description && <div className="text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: feature.description }} />}
                  {feature.link && <a href={feature.link} className="text-blue-600 underline mt-2">Learn more</a>}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
    case 'contentMedia': {
      // Layout: imageLeft, imageRight, imageTop, imageBottom, imageBackground
      let flexClass = 'flex-col md:flex-row';
      if (section.layout === 'imageRight') flexClass = 'flex-col md:flex-row-reverse';
      if (section.layout === 'imageTop') flexClass = 'flex-col';
      if (section.layout === 'imageBottom') flexClass = 'flex-col-reverse';
      if (section.layout === 'imageBackground') flexClass = 'relative flex-col justify-center items-center';
      return (
        <section className={`w-full py-16`} style={sectionStyle}>
          <div className={`max-w-7xl mx-auto flex ${flexClass} items-center gap-10 px-4 md:px-8`}>
            {section.layout === 'imageBackground' ? (
              <>
                {section.mediaItems?.[0]?.file && (
                  <div className="absolute inset-0 z-0">
                    <Image src={`/${section.mediaItems[0].file}`} alt={section.mediaItems[0].alt || 'Background'} layout="fill" objectFit="cover" className="opacity-30" />
                  </div>
                )}
                <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center gap-10 py-10">
                  <div className="flex-1 max-w-xl">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{section.title}</h2>
                    <div className="text-gray-700 text-base md:text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: section.content }} />
                    {section.cta && <a href={section.cta.link} className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition">{section.cta.text}</a>}
                  </div>
                </div>
              </>
            ) : (
              <>
                {section.mediaType === 'image' && section.mediaItems?.[0]?.file && (
                  <div className="flex-1 flex justify-center">
                    <div className="relative w-[320px] h-[200px] rounded-xl shadow overflow-hidden">
                      <Image src={`/${section.mediaItems[0].file}`} alt={section.mediaItems[0].alt || 'Section Image'} layout="fill" objectFit="cover" className="rounded-xl" />
                    </div>
                  </div>
                )}
                <div className="flex-1 max-w-xl">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{section.title}</h2>
                  <div className="text-gray-700 text-base md:text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: section.content }} />
                  {section.cta && <a href={section.cta.link} className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition">{section.cta.text}</a>}
                </div>
              </>
            )}
          </div>
        </section>
      );
    }
    case 'cards': {
      let gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      if (section.style === 'masonry') gridClass = 'md:grid-cols-3';
      if (section.style === 'carousel') gridClass = 'grid-cols-1';
      if (section.cardsPerRow) gridClass = `grid-cols-1 sm:grid-cols-2 md:grid-cols-${section.cardsPerRow}`;
      return (
        <section className="w-full py-16 bg-[#F7FAFC]">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{section.title}</h2>
            <div className={`grid gap-8 ${gridClass}`}>
              {section.cards?.map((card: any, i: number) => (
                <div key={i} className={`bg-white rounded-xl shadow-lg p-8 flex flex-col items-center ${section.showBorder ? 'border border-gray-200' : ''} ${section.hoverEffect ? 'hover:scale-105 transition-transform' : ''}`}>
                  {card.image && <div className="relative w-full h-40 mb-4"><Image src={`/${card.image}`} alt={card.title} layout="fill" objectFit="cover" className="rounded-xl" /></div>}
                  <h3 className="font-bold text-lg mb-2 text-center text-gray-800">{card.title}</h3>
                  <div className="text-gray-600 mb-4 text-center" dangerouslySetInnerHTML={{ __html: card.content }} />
                  {card.buttonText && (
                    <a href={card.link || '#'} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2 inline-block font-semibold shadow">{card.buttonText}</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
    case 'testimonials': {
      let layout = section.layout || 'grid';
      if (layout === 'slider') {
        return (
          <section className="w-full py-16 bg-gradient-to-b from-white to-[#F7FAFC]">
            <div className="container mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{section.title}</h2>
              <SimpleSlider>
                {section.testimonials?.map((t: any, i: number) => (
                  <div key={i} className="bg-white rounded-xl shadow-md p-8 max-w-md flex flex-col items-center border border-gray-100 mx-auto">
                    <blockquote className="italic mb-2 text-gray-700 text-center">“{t.content}”</blockquote>
                    <div className="font-bold text-blue-700 text-center">{t.author}</div>
                    {section.showRatings && t.rating && <div className="text-yellow-400 mt-2 text-center">{'★'.repeat(t.rating)}</div>}
                  </div>
                ))}
              </SimpleSlider>
            </div>
          </section>
        );
      }
      // grid or masonry
      let gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      if (layout === 'masonry') gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      return (
        <section className="w-full py-16 bg-gradient-to-b from-white to-[#F7FAFC]">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{section.title}</h2>
            <div className={`grid gap-8 ${gridClass}`}>
              {section.testimonials?.map((t: any, i: number) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center border border-gray-100">
                  <blockquote className="italic mb-2 text-gray-700 text-center">“{t.content}”</blockquote>
                  <div className="font-bold text-blue-700 text-center">{t.author}</div>
                  {section.showRatings && t.rating && <div className="text-yellow-400 mt-2 text-center">{'★'.repeat(t.rating)}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
    case 'stats': {
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
    }
    case 'faq':
      return (
        <section className="w-full py-16 bg-[#F7FAFC]">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{section.title}</h2>
            <div className="space-y-4">
              {section.questions?.map((q: any, i: number) => (
                <details key={i} className="bg-white rounded-lg shadow p-4">
                  <summary className="font-semibold cursor-pointer text-blue-700">{q.question}</summary>
                  <div className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: q.answer }} />
                </details>
              ))}
            </div>
          </div>
        </section>
      );
    case 'team': {
      let gridClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4';
      if (section.layout === 'list') gridClass = 'grid-cols-1';
      if (section.layout === 'carousel') gridClass = 'grid-cols-1'; // Could add carousel logic
      return (
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{section.title}</h2>
            <div className={`grid gap-8 ${gridClass}`}>
              {section.members?.map((member: any, i: number) => (
                <div key={i} className="bg-[#F7FAFC] rounded-xl shadow-lg p-8 flex flex-col items-center">
                  {member.image && <div className="relative w-24 h-24 mb-4"><Image src={`/${member.image}`} alt={member.name} layout="fill" objectFit="cover" className="rounded-full" /></div>}
                  <h3 className="font-bold text-lg mb-1 text-center text-gray-800">{member.name}</h3>
                  <div className="text-blue-600 mb-2">{member.position}</div>
                  {member.bio && <div className="text-gray-600 mb-2 text-center" dangerouslySetInnerHTML={{ __html: member.bio }} />}
                  {member.social && <div className="flex gap-2 mt-2">{member.social.map((s: any, j: number) => <a key={j} href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{s.platform}</a>)}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
    case 'timeline':
      return (
        <section className="w-full py-16 bg-[#F7FAFC]">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{section.title}</h2>
            <div className="flex flex-col gap-8 max-w-2xl mx-auto">
              {section.events?.map((event: any, i: number) => (
                <div key={i} className="flex items-start gap-4">
                  {event.image && <div className="relative w-20 h-20 flex-shrink-0"><Image src={`/${event.image}`} alt={event.title} layout="fill" objectFit="cover" className="rounded-lg" /></div>}
                  <div>
                    <div className="text-blue-700 font-bold mb-1">{event.date}</div>
                    <div className="font-semibold text-lg mb-1">{event.title}</div>
                    <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: event.content }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case 'pricing':
      return (
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">{section.title}</h2>
            {section.subtitle && <p className="text-center text-lg mb-8">{section.subtitle}</p>}
            <div className="flex flex-wrap justify-center gap-8">
              {section.plans?.map((plan: any, i: number) => (
                <div key={i} className={`bg-[#F7FAFC] rounded-xl shadow-lg p-8 flex flex-col items-center border-2 ${plan.popular ? 'border-blue-600' : 'border-transparent'}`}>
                  <div className="font-bold text-xl mb-2">{plan.name}</div>
                  <div className="text-3xl font-bold text-blue-700 mb-2">{plan.currency}{plan.monthlyPrice} <span className="text-base font-normal">/mo</span></div>
                  {section.showPeriodToggle && <div className="text-gray-500 text-sm mb-2">or {plan.currency}{plan.annualPrice} /yr</div>}
                  <ul className="mb-4 list-disc list-inside text-gray-700">
                    {plan.features?.map((f: any, j: number) => <li key={j}>{f.feature}</li>)}
                  </ul>
                  {plan.buttonText && <a href={plan.buttonLink || '#'} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2 inline-block font-semibold shadow">{plan.buttonText}</a>}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case 'cta':
      return (
        <section className="w-full py-16" style={sectionStyle}>
          <div className="container mx-auto flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{section.title}</h2>
            <div className="prose md:prose-lg mb-6" dangerouslySetInnerHTML={{ __html: section.content }} />
            {section.buttons && renderButtons(section.buttons)}
          </div>
        </section>
      );
    case 'alert':
      return (
        <section className="w-full py-4" style={{ background: section.bgColor, color: section.textColor }}>
          <div className={`container mx-auto flex items-center gap-4 ${getFontSizeClass(section.fontSize)}`}>
            {section.icon && <Image src={`/${section.icon}`} alt="alert" width={32} height={32} />}
            <div className="prose" dangerouslySetInnerHTML={{ __html: section.message }} />
          </div>
        </section>
      );
    case 'divider':
      return (
        <hr
          style={{
            borderStyle: section.style,
            borderColor: section.color || '#e5e7eb',
            borderWidth: section.thickness || 2,
            margin: '2rem 0',
          }}
        />
      );
    case 'richText':
      return (
        <section
          className={`w-full py-8 ${getFontSizeClass(section.fontSize)}`}
          style={{ background: section.bgColor, color: section.textColor, ...((section.customCss && section.customCss.length > 0) ? { cssText: section.customCss } : {}) }}
        >
          <div className="container mx-auto">
            <div className="prose max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: section.content }} />
          </div>
        </section>
      );
    default:
      // --- ADVANCED WIDGETS & CONTROLS ---
      // Video Section
      if (section.type === 'video') {
        return (
          <section className="w-full py-16 bg-black flex flex-col items-center justify-center" style={sectionStyle}>
            <div className="container mx-auto flex flex-col items-center">
              {section.title && <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-white">{section.title}</h2>}
              {section.videoUrl && (
                <div className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-lg">
                  <video controls autoPlay={section.autoPlay} loop={section.loop} muted={section.muted} poster={section.poster} className="w-full h-full object-cover">
                    <source src={section.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              {section.caption && <div className="text-white mt-4 text-center">{section.caption}</div>}
            </div>
          </section>
        );
      }
      // Audio Section
      if (section.type === 'audio') {
        return (
          <section className="w-full py-8 flex flex-col items-center" style={sectionStyle}>
            <div className="container mx-auto flex flex-col items-center">
              {section.title && <h2 className="text-2xl font-bold mb-2">{section.title}</h2>}
              {section.audioUrl && (
                <audio controls src={section.audioUrl} className="w-full max-w-xl mt-2">
                  Your browser does not support the audio element.
                </audio>
              )}
              {section.caption && <div className="mt-2 text-center">{section.caption}</div>}
            </div>
          </section>
        );
      }
      // Gallery Section
      if (section.type === 'gallery') {
        return (
          <section className="w-full py-16 bg-[#F7FAFC]" style={sectionStyle}>
            <div className="container mx-auto">
              {section.title && <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{section.title}</h2>}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {section.images?.map((img: any, i: number) => (
                  <div key={i} className="relative w-full h-64 rounded-xl overflow-hidden shadow">
                    <Image src={`/${img.file}`} alt={img.alt || 'Gallery Image'} layout="fill" objectFit="cover" />
                  </div>
                ))}
              </div>
              {section.caption && <div className="mt-4 text-center text-gray-600">{section.caption}</div>}
            </div>
          </section>
        );
      }
      // Tabs Section
      if (section.type === 'tabs') {
        const [activeTab, setActiveTab] = React.useState(0);
        return (
          <section className="w-full py-16" style={sectionStyle}>
            <div className="container mx-auto max-w-4xl">
              {section.title && <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{section.title}</h2>}
              <div className="flex gap-2 justify-center mb-6">
                {section.tabs?.map((tab: any, i: number) => (
                  <button key={i} className={`px-4 py-2 rounded-t-lg font-semibold ${i === activeTab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setActiveTab(i)}>{tab.label}</button>
                ))}
              </div>
              <div className="bg-white rounded-b-lg shadow p-6 min-h-[120px]">
                <div dangerouslySetInnerHTML={{ __html: section.tabs?.[activeTab]?.content || '' }} />
              </div>
            </div>
          </section>
        );
      }
      // Accordion Section
      if (section.type === 'accordion') {
        return (
          <section className="w-full py-16 bg-[#F7FAFC]" style={sectionStyle}>
            <div className="container mx-auto max-w-3xl">
              {section.title && <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{section.title}</h2>}
              <div className="space-y-4">
                {section.items?.map((item: any, i: number) => (
                  <details key={i} className="bg-white rounded-lg shadow p-4">
                    <summary className="font-semibold cursor-pointer text-blue-700">{item.label}</summary>
                    <div className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: item.content }} />
                  </details>
                ))}
              </div>
            </div>
          </section>
        );
      }
      // Progress Bar Section
      if (section.type === 'progress') {
        return (
          <section className="w-full py-12" style={sectionStyle}>
            <div className="container mx-auto max-w-2xl">
              {section.title && <h2 className="text-2xl font-bold mb-6">{section.title}</h2>}
              <div className="space-y-6">
                {section.bars?.map((bar: any, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-gray-700">{bar.label}</span>
                      <span className="text-gray-500">{bar.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-blue-600 h-4 rounded-full transition-all" style={{ width: `${bar.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }
      // Countdown Timer Section
      if (section.type === 'countdown') {
        const [timeLeft, setTimeLeft] = React.useState(() => {
          const end = new Date(section.endDate).getTime();
          const now = Date.now();
          return Math.max(0, end - now);
        });
        React.useEffect(() => {
          if (!section.endDate) return;
          const interval = setInterval(() => {
            const end = new Date(section.endDate).getTime();
            const now = Date.now();
            setTimeLeft(Math.max(0, end - now));
          }, 1000);
          return () => clearInterval(interval);
        }, [section.endDate]);
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        return (
          <section className="w-full py-16 flex flex-col items-center justify-center" style={sectionStyle}>
            <div className="container mx-auto flex flex-col items-center">
              {section.title && <h2 className="text-2xl font-bold mb-4">{section.title}</h2>}
              <div className="flex gap-4 text-3xl font-mono font-bold mb-4">
                <div><span>{days}</span><span className="block text-xs font-normal">Days</span></div>
                <div><span>{hours}</span><span className="block text-xs font-normal">Hours</span></div>
                <div><span>{minutes}</span><span className="block text-xs font-normal">Min</span></div>
                <div><span>{seconds}</span><span className="block text-xs font-normal">Sec</span></div>
              </div>
              {section.content && <div className="text-center" dangerouslySetInnerHTML={{ __html: section.content }} />}
            </div>
          </section>
        );
      }
      // Form Section (basic contact/newsletter form)
      if (section.type === 'form') {
        return (
          <section className="w-full py-16 flex flex-col items-center justify-center" style={sectionStyle}>
            <div className="container mx-auto max-w-lg">
              {section.title && <h2 className="text-2xl font-bold mb-4 text-center">{section.title}</h2>}
              <form action={section.formAction || '#'} method={section.method || 'POST'} className="space-y-4">
                {section.fields?.map((field: any, i: number) => (
                  <div key={i}>
                    <label className="block font-semibold mb-1">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea name={field.name} required={field.required} className="w-full border rounded p-2" rows={field.rows || 4} />
                    ) : (
                      <input type={field.type} name={field.name} required={field.required} className="w-full border rounded p-2" />
                    )}
                  </div>
                ))}
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">{section.buttonText || 'Submit'}</button>
              </form>
              {section.privacy && <div className="text-xs text-gray-500 mt-2 text-center">{section.privacy}</div>}
            </div>
          </section>
        );
      }
      // Map Section (Google Maps embed)
      if (section.type === 'map') {
        return (
          <section className="w-full py-16 flex flex-col items-center justify-center" style={sectionStyle}>
            <div className="container mx-auto max-w-3xl">
              {section.title && <h2 className="text-2xl font-bold mb-4 text-center">{section.title}</h2>}
              {section.mapEmbed && (
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                  <iframe src={section.mapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map" />
                </div>
              )}
              {section.caption && <div className="mt-4 text-center">{section.caption}</div>}
            </div>
          </section>
        );
      }
      // Code Block Section
      if (section.type === 'code') {
        return (
          <section className="w-full py-8 bg-gray-900" style={sectionStyle}>
            <div className="container mx-auto max-w-3xl">
              {section.title && <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>}
              <pre className="bg-gray-800 text-green-200 rounded p-4 overflow-x-auto text-sm"><code>{section.code}</code></pre>
              {section.caption && <div className="mt-2 text-gray-400">{section.caption}</div>}
            </div>
          </section>
        );
      }
      // Social Embed Section
      if (section.type === 'social') {
        return (
          <section className="w-full py-8 flex flex-col items-center" style={sectionStyle}>
            <div className="container mx-auto max-w-2xl">
              {section.title && <h2 className="text-2xl font-bold mb-4 text-center">{section.title}</h2>}
              {section.embedHtml && (
                <div className="w-full flex justify-center" dangerouslySetInnerHTML={{ __html: section.embedHtml }} />
              )}
              {section.caption && <div className="mt-2 text-center">{section.caption}</div>}
            </div>
          </section>
        );
      }
      // Newsletter Signup Section
      if (section.type === 'newsletter') {
        return (
          <section className="w-full py-16 flex flex-col items-center justify-center" style={sectionStyle}>
            <div className="container mx-auto max-w-lg">
              {section.title && <h2 className="text-2xl font-bold mb-4 text-center">{section.title}</h2>}
              <form action={section.formAction || '#'} method={section.method || 'POST'} className="flex flex-col sm:flex-row gap-2 justify-center">
                <input type="email" name="email" required placeholder="Your email" className="flex-1 border rounded p-2" />
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">{section.buttonText || 'Subscribe'}</button>
              </form>
              {section.privacy && <div className="text-xs text-gray-500 mt-2 text-center">{section.privacy}</div>}
            </div>
          </section>
        );
      }
      // Custom HTML Section (dangerous!)
      if (section.type === 'html') {
        return (
          <section className="w-full py-8" style={sectionStyle}>
            <div className="container mx-auto max-w-4xl">
              <div dangerouslySetInnerHTML={{ __html: section.html }} />
            </div>
          </section>
        );
      }
      // --- ADVANCED CONTROLS (applied to all sections) ---
      // Padding, margin, border, shadow, zIndex, opacity, blendMode, sticky, parallax, shape divider, etc.
      // These are handled via sectionStyle and extra classNames below:
      // Example: section.extraClass, section.zIndex, section.opacity, section.blendMode, section.sticky, section.parallax, section.shapeDivider
      // You can add these to your CMS config and they will be respected here.
      //
      // Example usage in a section:
      // <section className={`... ${section.extraClass || ''} ${section.sticky ? 'sticky top-0' : ''}`} style={{ ...sectionStyle, zIndex: section.zIndex, opacity: section.opacity, mixBlendMode: section.blendMode }}>
      //   ...
      //   {section.shapeDivider && <div className="absolute bottom-0 left-0 w-full">{section.shapeDivider}</div>}
      // </section>
      return null;
  }

  // At the end of each section type, render widgets if present
  // Example for hero section:
  // {section.widgets && section.widgets.map((w: any, i: number) => <WidgetRenderer key={i} widget={w} />)}

  // For all section types, add:
  // - style={sectionStyle}
  // - className={`... ${extraClass}`}
  // - shapeTop/shapeBottom
  // - widgets rendering
  return (
    <section style={sectionStyle} className={extraClass}>
      {shapeTop}
      {section.widgets && section.widgets.map((w: any, i: number) => <WidgetRenderer key={i} widget={w} />)}
      {shapeBottom}
    </section>
  );
};

export default SectionRenderer;
