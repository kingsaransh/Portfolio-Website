import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar, { setSmoother } from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [isSmootherReady, setIsSmootherReady] = useState<boolean>(false);

  useGSAP(() => {
    if (isDesktopView) {
      const smootherInstance = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 0.8,
        speed: 1,
        effects: true,
        autoResize: true,
        ignoreMobileResize: true,
      });
      smootherInstance.scrollTop(0);
      smootherInstance.paused(true);
      setSmoother(smootherInstance);
      setIsSmootherReady(true);

      return () => {
        smootherInstance.kill();
      };
    } else {
      setIsSmootherReady(true);
    }
  }, [isDesktopView]);

  useEffect(() => {
    let timeoutId: number;
    const resizeHandler = () => {
      clearTimeout(timeoutId);
      setIsDesktopView(window.innerWidth > 1024);
      timeoutId = window.setTimeout(() => {
        setSplitText();
        ScrollTrigger.refresh();
      }, 200);
    };

    setSplitText();
    window.addEventListener("resize", resizeHandler);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work isSmootherReady={isSmootherReady} />
            {isDesktopView && (
              <Suspense fallback={<div>Loading....</div>}>
                <TechStack />
              </Suspense>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
