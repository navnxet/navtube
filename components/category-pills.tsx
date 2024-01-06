'use client';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { categories } from '@/data/categories';
import { CategoryPillProps } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const translateAmount = 200;

export function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current == null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;

      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth,
      );
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);

  return (
    <div ref={containerRef} className="relative overflow-x-hidden">
      <div
        className="flex w-[max-content] gap-3 whitespace-nowrap transition-transform"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onSelect(category)}
            variant={selectedCategory === category ? 'default' : 'secondary'}
            className="-py-2 whitespace-nowrap rounded-lg px-2"
          >
            {category}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 h-full w-24 -translate-y-1/2 bg-gradient-to-r from-background from-50% to-transparent">
          <Button
            variant="ghost"
            size="icon"
            className="aspect-square h-full w-auto p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = translate - translateAmount;
                if (newTranslate <= 0) return 0;
                return newTranslate;
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 flex h-full w-24 -translate-y-1/2 justify-end bg-gradient-to-l from-background from-50% to-transparent">
          <Button
            variant="ghost"
            size="icon"
            className="aspect-square h-full w-auto p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current == null) {
                  return translate;
                }
                const newTranslate = translate + translateAmount;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                if (newTranslate + width >= edge) {
                  return edge - width;
                }
                return newTranslate;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="sticky top-0 z-10 bg-background pb-4">
      <CategoryPills
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />
    </div>
  );
}
