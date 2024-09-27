'use client';
import React, { useEffect, useState } from 'react';
// import ReactPlayer from 'react-player';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

interface HeroVideoProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: HeroVideoFields;
}

interface Field {
  name: string;
  jsonValue: {
    value: string | boolean | { src: string; alt: string };
  };
}

interface HeroVideoFields {
  data: {
    HeroVideoData: {
      fields: Field[];
    };
  };
}

export const Default = (props: HeroVideoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [fields, setFields] = useState<any[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFields(props.fields.data.HeroVideoData.fields);
    setHydrated(true);
  }, [props.fields.data.HeroVideoData.fields]);

  if (!hydrated) {
    return null;
  }

  const heroVideoSource = fields.find(f => f.name === "HeroVideoSource")?.jsonValue.value.href || "";
  const heroVideoTitle = fields.find(f => f.name === "HeroVideoTitle")?.jsonValue.value || "";
  const heroVideoAlt = fields.find(f => f.name === "HeroVideoAlt")?.jsonValue.value || "";
  const heroVideoAutoplay = fields.find(f => f.name === "HeroVideoAutoplay")?.jsonValue.value || false;
  const heroVideoLoop = fields.find(f => f.name === "HeroVideoLoop")?.jsonValue.value || false;
  const heroVideoMute = fields.find(f => f.name === "HeroVideoMute")?.jsonValue.value || false;
  const heroVideoOverlay = fields.find(f => f.name === "HeroVideoOverlay")?.jsonValue.value || false;
  const heroVideoFallbackImage = fields.find(f => f.name === "HeroVideoFallbackImage")?.jsonValue.value || {};

  return (
    <>
      <div className="relative w-full h-0 pb-[56.25%]">
        {heroVideoOverlay && (
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        )}
        {heroVideoSource ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={heroVideoSource}
            title={heroVideoTitle}
            aria-label={heroVideoAlt}
            autoPlay={heroVideoAutoplay}
            loop={heroVideoLoop}
            muted={heroVideoMute}
            poster={heroVideoFallbackImage?.src}
          />
        ) : (
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={heroVideoFallbackImage.src}
            alt={heroVideoFallbackImage.alt || 'Video fallback'}
          />
        )}
      </div>
    </>
  );
};
