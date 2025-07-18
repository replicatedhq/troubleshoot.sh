import React from 'react';
import ReplicatedBanner from '../components/ReplicatedBanner';

export default function Root({ children }) {
  return (
    <>
      <ReplicatedBanner />
      {children}
    </>
  );
}