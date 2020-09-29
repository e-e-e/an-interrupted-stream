import React, { useEffect } from 'react';
import styles from './content.module.css';
import clsx from 'clsx';

export type StreamData = {
  image: string | undefined;
};

async function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (e) => reject(e);
    image.src = src;
  });
}

function useImageLoader(src?: string) {
  const [loading, setLoading] = React.useState(true);
  const [image, setImage] = React.useState<HTMLImageElement | null>(null);
  useEffect(() => {
    if (!src) return;
    setLoading(true);
    loadImage(src).then((img) => {
      setImage(img);
      setLoading(false);
    });
  }, [src]);
  return {
    image,
    loading,
  };
}

export function Content({ data }: { data?: StreamData | null }) {
  const { image, loading } = useImageLoader(data?.image);
  return (
    <div className={styles.root}>
      <div className={clsx(styles.container)}>
        {image && <img alt="main content" src={image?.src} />}
        <div className={styles.loader} style={{ opacity: loading ? 1 : 0 }}>
          <div className={styles.fill} />
        </div>
      </div>
    </div>
  );
}
