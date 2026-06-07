import { Composition } from "remotion";
import { LVAd } from "./compositions/LVAd";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/*
       * TikTok format: 9:16 portrait, 30 fps, 15 s = 450 frames
       * Resolution: 1080 × 1920
       */}
      <Composition
        id="LVTikTokAd"
        component={LVAd}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
