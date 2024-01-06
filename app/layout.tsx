import type { Metadata } from 'next';

import './globals.css';

import React from 'react';

import { Main } from '@/components/index';

export const metadata: Metadata = {
  title: 'YouTube',
  description: 'Share your videos with friends, family, and the world.',
  authors: [{ name: 'navnxet', url: 'https://navnxet.vercel.app' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Main>{children}</Main>;
}
