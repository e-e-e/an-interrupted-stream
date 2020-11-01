import React, { useEffect } from 'react';
import styles from './content.module.css';
import clsx from 'clsx';
import { ChannelApiType, BlockApiType } from 'arena-ts';
import { FitContent } from './FitContent';

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

  return (
    <img
      alt="main content"
      src={image.src}
      style={style}
      className={clsx(styles.image, display && styles.show)}
    />
  );
}

function Channel({ data }: { data: ChannelApiType }) {
  return (
    <Container href={`https://are.na/${data.user_id}/${data.slug}`}>
      <h1>{data.title}</h1>;
    </Container>
  );
}

function Block({ data }: { data: BlockApiType }) {
  const imageSrc = data?.image?.large.url;
  console.log(data);
  const { image, loading } = useImageLoader(imageSrc || undefined);
  const link = data.class === 'Link' ? data.source?.url : undefined;
  return (
    <Container href={link}>
      {image && <ImageElement image={image} />}
      <div className={styles.loader} style={{ opacity: loading ? 1 : 0 }}>
        <div className={styles.fill} />
      </div>
    </Container>
  );
}

function AttachmentBlock({ data }: { data: BlockApiType }) {
  const imageSrc = data?.image?.large.url;
  console.log(data);
  const { image, loading } = useImageLoader(imageSrc || undefined);
  return (
    <Container href={data.attachment?.url}>
      {image && <ImageElement image={image} />}
      {image && (
        <div className={styles.loader} style={{ opacity: loading ? 1 : 0 }}>
          <div className={styles.fill} />
        </div>
      )}
      <div className={styles.attachmentOverlay}>
        {!image && <h1>{data.title}</h1>}

        <h1 className={styles.pill}>{data.attachment?.extension}</h1>
      </div>
    </Container>
  );
}

function TextBlock({ data }: { data: BlockApiType }) {
  if (!data.content_html) return null;

  return (
    <Container>
      <FitContent>
        <div
          className={styles.textBlock}
          dangerouslySetInnerHTML={{ __html: data.content_html }}
        />
      </FitContent>
    </Container>
  );
}

function ChannelOrBlock({ data }: { data: BlockApiType | ChannelApiType }) {
  switch (data.base_class) {
    case 'Block':
      switch (data.class) {
        case 'Attachment':
          return <AttachmentBlock data={data} />;
        case 'Text':
          return <TextBlock data={data} />;
        default:
          return <Block data={data} />;
      }
    case 'Channel':
      return <Channel data={data} />;
    default:
      return null;
  }
}

function Container({
  children,
  href,
}: React.PropsWithChildren<{ href?: string }>) {
  return (
    <div className={styles.root}>
      <div className={styles.outerContainer}>
        <a className={styles.container} href={href}>
          <div className={styles.innerContainer}>{children}</div>
        </a>
      </div>
    </div>
  );
}

export function Content({
  data,
}: {
  data: BlockApiType | ChannelApiType | null;
}) {
  if (!data) return <Container />;
  return <ChannelOrBlock data={data} />;
}
