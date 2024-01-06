'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { VideoGridItemProps } from '@/types';
import { formatDuration } from '@/utils/formatDuration';
import { formatTimeAgo } from '@/utils/formatTimeAgo';

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: 'compact',
});

export function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current == null) return;

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <Link href={`/watch?v=${id}`} className="relative aspect-video">
        <Image
          src={thumbnailUrl}
          alt="thumbnailUrl"
          height={1000}
          width={1000}
          priority
          className={`block h-full w-full object-cover transition-[border-radius] duration-200 ${
            isVideoPlaying ? 'rounded-none' : 'rounded-xl'
          }`}
        />
        <div className="absolute bottom-1 right-1 rounded bg-black px-0.5 text-sm font-semibold text-white">
          {formatDuration(duration)}
        </div>
        <video
          className={`absolute inset-0 block h-full object-cover transition-opacity duration-200 ${
            isVideoPlaying ? 'opacity-100 delay-200' : 'opacity-0'
          }`}
          ref={videoRef}
          playsInline
          muted
          src={videoUrl}
        />
      </Link>
      <div className="flex items-start gap-2">
        <Link href={`/@${channel.id}`} className="shrink-0">
          <Image
            alt="profileUrl"
            width={32}
            height={32}
            className="mt-1 h-8 w-8 rounded-full"
            src={channel.profileUrl}
          />
        </Link>
        <div className="flex flex-col">
          <Link href={`/watch?v=${id}`} className="font-semibold">
            {title}
          </Link>
          <Link
            href={`/@${channel.id}`}
            className="text-sm text-foreground/65 hover:text-foreground"
          >
            {channel.name}
          </Link>
          <div className="cursor-pointer text-sm text-foreground/60">
            {VIEW_FORMATTER.format(views)} Views{' '}
            <span className="text-xs">•</span> {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
