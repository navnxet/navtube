'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Icon } from '@/components/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useSidebarContext } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';
import YouTube from '@/public/youtube';
import { HeaderFirstSectionProps } from '@/types';
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from 'lucide-react';

export function Header() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <div className="mx-4 mb-6 flex justify-between gap-10 pt-2 lg:gap-20">
      <HeaderFirstSection hidden={showFullWidthSearch} />
      <form
        className={cn(
          'grow justify-center gap-4',
          showFullWidthSearch ? 'flex' : 'hidden md:flex',
        )}
      >
        {showFullWidthSearch && (
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setShowFullWidthSearch(false)}
            className="shrink-0 hover:bg-primary/10"
          >
            <Icon icon={ArrowLeft} />
          </Button>
        )}
        <div className="flex max-w-[600px] grow">
          <Input
            type="search"
            placeholder="Search"
            className="text-md z-10 w-full rounded-l-full border-[1.9px] border-border px-4 py-1 shadow-inner outline-none"
          />
          <Button
            variant="secondary"
            className="shrink-0 rounded-r-full border-2 border-l-0 border-border px-4 py-2 shadow-inner hover:bg-primary/10"
          >
            <Icon icon={Search} />
          </Button>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="shrink-0 hover:bg-primary/10"
        >
          <Icon icon={Mic} />
        </Button>
      </form>
      <div
        className={cn(
          'shrink-0 md:gap-2',
          showFullWidthSearch ? 'hidden' : 'flex',
        )}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          size="icon"
          variant="ghost"
          className="md:hidden"
        >
          <Icon icon={Search} />
        </Button>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Icon icon={Mic} />
        </Button>
        <ModeToggle />

        <Button size="icon" variant="ghost">
          <Icon icon={Upload} />
        </Button>
        <Button size="icon" variant="ghost">
          <Icon icon={Bell} />
        </Button>
        <Button size="icon" variant="ghost">
          <Icon icon={User} />
        </Button>
      </div>
    </div>
  );
}

export function HeaderFirstSection({
  hidden = false,
}: HeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();

  return (
    <div
      className={cn(
        'shrink-0 items-center gap-4 -ml-1.5',
        hidden ? 'hidden' : 'flex',
      )}
    >
      <Button
        onClick={toggle}
        variant="ghost"
        size="icon"
        className="h-fit w-fit"
      >
        <Icon icon={Menu} />
      </Button>
      <Link href="/">
        <YouTube />
      </Link>
    </div>
  );
}
