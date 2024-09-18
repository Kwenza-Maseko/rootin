import React, { useEffect, useState } from 'react';
import { createClient, PhotosWithTotalResults, ErrorResponse, Photo } from 'pexels';
import Image from 'next/image';
import Link from 'next/link';

const RecentsRoutines = () => {
  const [photo, setPhoto] = useState<Photo | null>(null); // Set initial state to null, and Photo type

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      const client = createClient("hhNyarSkAfpmF2siadKjbAIK2MVbkYbDB3kPPyVJxq3zlqMWAon50CWL");
      const query = 'Routine';

      try {
        const response: PhotosWithTotalResults | ErrorResponse = await client.photos.search({
          query,
          per_page: 1,
        });

        if ('photos' in response) {
          setPhoto(response.photos[0]); // Update with the first photo from the response
        } else {
          setError('No photos found');
        }
      } catch (error) {
        setError('Failed to fetch data');
      }
    };

    fetchPhoto();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {photo && (
        <div>
          <Image src={photo.src.original} alt={photo.alt || 'No description'} width={200} height={200}/>
          <p>{photo.photographer}</p>
          <p>{photo.src.original}</p>
        </div>
      )}
    </div>
  );
};

export default RecentsRoutines;
