import React, { useEffect, useRef, useState } from "react";

interface ScrollableNavbarProps {
  items: string[];
}

const ScrollableNavbar: React.FC<ScrollableNavbarProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  // Duplicate items for infinite scroll effect
  const infiniteItems = [...items, ...items];

  // Auto scroll logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isAutoScroll) return;

    const speed = 1;
    let animationId: number;

    const scroll = () => {
      if (!container) return;
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += speed;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isAutoScroll]);

  // Manual scroll buttons
  const scrollLeft = () => {
    setIsAutoScroll(false); // Stop auto-scroll on user interaction
    containerRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    setIsAutoScroll(false); // Stop auto-scroll on user interaction
    containerRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  const handleClick = () => {
    setIsAutoScroll(false); // Stop auto-scroll on any click
  };

  return (
    <div className="bg-[#FAF3EB] py-3 px-4 shadow-md w-full flex items-center gap-2 cursor-default overflow-hidden">
      {/* Left arrow */}
      <button
        onClick={scrollLeft}
        className="text-xl font-bold px-2 hover:text-gray-600"
      >
        &lt;
      </button>

      {/* Scrollable content */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth whitespace-nowrap"
        onClick={handleClick}
      >
        {infiniteItems.map((item, index) => (
          <div
            key={index}
            className="min-w-max px-4 py-2 text-base font-semibold text-gray-800"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={scrollRight}
        className="text-xl font-bold px-2 hover:text-gray-600"
      >
        &gt;
      </button>
    </div>
  );
};

export default ScrollableNavbar;
