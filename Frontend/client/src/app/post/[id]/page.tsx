'use client';

import { useState, useEffect } from 'react';

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [id, setId] = useState<string | null>(null);

  // Using React.use to handle async params
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;  // Unwrap the promise
      setId(resolvedParams.id); // Set the id after resolving
    };

    getParams();
  }, [params]);

  // Show loading state while id is not resolved
  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Post ID: {id}</h1>
    </>
  );
};

export default Page;
