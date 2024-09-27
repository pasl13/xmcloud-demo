'use client';
import React, { useEffect} from 'react';
import ReactPlayer from 'react-player';
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
  console.log("HeroVideoProps", props);
  const fields = props.fields.data.HeroVideoData.fields;
  const heroVideoSource = fields.find(f => f.name === "HeroVideoSource")?.jsonValue.value.href || "";
  // const heroVideoSource = fields.HeroVideoSource?.jsonValue.value || "";
  console.log("heroVideoSource", heroVideoSource);
  

  const heroVideoTitle = fields.find(f => f.name === "HeroVideoTitle")?.jsonValue.value || "";
  const heroVideoAlt = fields.find(f => f.name === "HeroVideoAlt")?.jsonValue.value || "";
  const heroVideoAutoplay = fields.find(f => f.name === "HeroVideoAutoplay")?.jsonValue.value || false;
  const heroVideoLoop = fields.find(f => f.name === "HeroVideoLoop")?.jsonValue.value || false;
  const heroVideoMute = fields.find(f => f.name === "HeroVideoMute")?.jsonValue.value || false;
  const heroVideoOverlay = fields.find(f => f.name === "HeroVideoOverlay")?.jsonValue.value || false;
  const heroVideoFallbackImage = fields.find(f => f.name === "HeroVideoFallbackImage")?.jsonValue.value || {};
  console.log("fields", fields);

  return (
    <>
     <div className="relative w-full h-0 pb-[56.25%]">
      {heroVideoOverlay && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      )}
      <ReactPlayer
        className="absolute inset-0 w-full h-full"
        url={heroVideoSource}
        playing={heroVideoAutoplay}
        loop={heroVideoLoop}
        muted={heroVideoMute}
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
    </>
  );
};
