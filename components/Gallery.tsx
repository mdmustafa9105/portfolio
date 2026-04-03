import React, { useRef, useState, useEffect, useCallback } from 'react';

interface GalleryItem {
  imageUrl: string;
  title: string;
}

interface GalleryProps {
  data: {
    gallery: {
      subheading: string;
      heading:string;
      items: GalleryItem[];
    };
    color: {
      text: string;
    };
  };
}

const Gallery: React.FC<GalleryProps> = ({ data }) => {
  const { gallery, color } = data;
  const sliderRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  if (!gallery || !gallery.items || gallery.items.length === 0) {
    return null;
  }

  // Duplicate items for a seamless loop
  const fullList = [...gallery.items, ...gallery.items];

  const animateScroll = useCallback(() => {
    if (sliderRef.current && !isDown) {
      sliderRef.current.scrollLeft += 1.5;
      if (sliderRef.current.scrollLeft >= (sliderRef.current.scrollWidth / 2)) {
        sliderRef.current.scrollLeft -= (sliderRef.current.scrollWidth / 2);
      }
    }
  }, [isDown]);

  const stopAnimateScroll = useCallback(() => {
      if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
          requestRef.current = undefined;
      }
  }, []);
  
  const startAnimateScroll = useCallback(() => {
      stopAnimateScroll();
      const loop = () => {
        animateScroll();
        requestRef.current = requestAnimationFrame(loop);
      }
      requestRef.current = requestAnimationFrame(loop);
  }, [animateScroll, stopAnimateScroll]);

  useEffect(() => {
    startAnimateScroll();
    return () => stopAnimateScroll();
  }, [startAnimateScroll, stopAnimateScroll]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDown(true);
    sliderRef.current?.classList.add('active');
    setStartX(e.pageX - (sliderRef.current?.offsetLeft ?? 0));
    setScrollLeft(sliderRef.current?.scrollLeft ?? 0);
    stopAnimateScroll();
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    sliderRef.current?.classList.remove('active');
    startAnimateScroll();
  };

  const handleMouseUp = () => {
    setIsDown(false);
    sliderRef.current?.classList.remove('active');
    startAnimateScroll();
  };
  
  const handleMouseEnter = () => {
    stopAnimateScroll();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft ?? 0);
    const walk = (x - startX) * 3; // scroll-fast multiplier
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchStart = () => {
      setIsDown(true);
      stopAnimateScroll();
  };

  const handleTouchEnd = () => {
      setIsDown(false);
      startAnimateScroll();
  };

  return (
    <section id="gallery" className="py-20 bg-[#111111] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-left mb-12">
            <p className={`${color.text} font-semibold mb-2`}>{gallery.subheading}</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">{gallery.heading}</h2>
        </div>
      </div>
      <div 
        className="w-full flex overflow-x-auto cursor-grab select-none gallery-slider"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {fullList.map((item, index) => (
           <div key={index} className="mx-4 shrink-0">
                <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="h-64 w-auto object-cover rounded-lg shadow-lg pointer-events-none" 
                />
            </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;