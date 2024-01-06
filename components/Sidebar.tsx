'use client';

import { Children, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { HeaderFirstSection } from '@/components/index';
import { Button, buttonVariants } from '@/components/ui/button';
import { useSidebarContext } from '@/contexts/SidebarContext';
import { playlists, subscriptions } from '@/data/sidebar';
import { cn } from '@/lib/utils';
import {
  LargeSidebarItemProps,
  LargeSidebarSectionProps,
  SmallSidebarItemProps,
} from '@/types';
import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music2,
  Newspaper,
  PlayCircle,
  PlaySquare,
  Podcast,
  Radio,
  Shirt,
  ShoppingBag,
  Trophy,
} from 'lucide-react';

export function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

  return (
    <>
      <aside
        className={cn(
          'scrollbar-hidden sticky top-0 ml-1 flex flex-col overflow-y-auto pb-4',
          isLargeOpen ? 'lg:hidden' : 'lg:flex',
        )}
      >
        <SmallSidebarItem Icon={Home} title="Home" isActive url="/" />
        <SmallSidebarItem Icon={PlayCircle} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="fixed inset-0 z-[999] bg-black opacity-50 lg:hidden"
        />
      )}
      <aside
        className={cn(
          'scrollbar-hidden absolute top-0 w-56 flex-col gap-2 overflow-y-auto px-2 pb-4 lg:sticky',
          isLargeOpen ? 'lg:flex' : 'lg:hidden',
          isSmallOpen ? 'z-[999] flex max-h-screen bg-background' : 'hidden',
        )}
      >
        <div className="sticky top-0 px-2 pb-4 pt-2 lg:hidden">
          <HeaderFirstSection />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
          <LargeSidebarItem
            IconOrImgUrl={PlayCircle}
            title="Shorts"
            url="/shorts"
          />
          <LargeSidebarItem
            IconOrImgUrl={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImgUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            IconOrImgUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconOrImgUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              IconOrImgUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions">
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSidebarItem
            IconOrImgUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" />
          <LargeSidebarItem
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSidebarItem
            IconOrImgUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItem
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSidebarItem
            IconOrImgUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
}

function SmallSidebarItem({
  Icon,
  title,
  url,
  isActive = false,
}: SmallSidebarItemProps) {
  return (
    <Link href={url}>
      <div
        className={cn(
          'hidden py-4 px-1 md:flex flex-col items-center rounded-lg gap-1 hover:bg-accent w-[calc(100%-8px)]',
          isActive ? 'bg-accent' : undefined,
        )}
      >
        <Icon className="h-6 w-6" />
        <div className="text-[.6rem]">{title}</div>
      </div>
    </Link>
  );
}

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && (
        <div className="mb-1 ml-4 mt-2 text-lg font-semibold">{title}</div>
      )}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          variant="ghost"
          className="flex w-full items-center justify-start gap-4 rounded-lg p-3"
        >
          <ButtonIcon className="h-6 w-6" />
          <div>{isExpanded ? 'Show Less' : 'Show More'}</div>
        </Button>
      )}
    </div>
  );
}

function LargeSidebarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <Link
      href={url}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'w-full flex items-center justify-start rounded-lg gap-4 p-3',
        isActive ? 'bg-accent' : undefined,
      )}
    >
      {typeof IconOrImgUrl === 'string' ? (
        <Image
          alt="icon"
          width={24}
          height={24}
          src={IconOrImgUrl}
          className="h-6 w-6 rounded-full"
        />
      ) : (
        <IconOrImgUrl className="h-6 w-6" />
      )}
      <div className="truncate">{title}</div>
    </Link>
  );
}
