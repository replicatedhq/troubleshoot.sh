import React from 'react';
import ReplicatedBanner from '../components/ReplicatedBanner';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReplicatedBanner />
      {children}
    </>
  );
}