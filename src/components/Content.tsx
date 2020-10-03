import React, { useEffect } from 'react';
import styles from './content.module.css';
import clsx from 'clsx';
import {StreamData} from "../services/content";

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

function ImageElement({ image }: { image: HTMLImageElement }) {
  const [display, setDisplay] = React.useState(false);
  React.useEffect(() => {
    const timeout = setTimeout(() => setDisplay(true), 0);
    return () => clearTimeout(timeout);
  }, []);
  if (image.height === 0) return null;
  const ratio = image.width / image.height;
  const style =
    ratio > 1
      ? { maxWidth: '100%', width: image.width }
      : { maxHeight: '100%', height: image.height };

  return <img alt="main content" src={image.src} style={style} className={clsx(styles.image, display && styles.show) }/>;
}

export function Content({ data }: { data?: StreamData | null }) {
  const { image, loading } = useImageLoader(data?.image);
  return (
    <div className={styles.root}>
      <div className={styles.outerContainer}>
        <div className={clsx(styles.container)}>
          <div className={styles.innerContainer}>
            {image && <ImageElement image={image} />}
            <div className={styles.loader} style={{ opacity: loading ? 1 : 0 }}>
              <div className={styles.fill} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
