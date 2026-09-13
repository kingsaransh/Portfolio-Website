import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;
export const setSmoother = (s: ScrollSmoother) => {
  smoother = s;
};

const Navbar = () => {
  useEffect(() => {
    const clickHandlers: { element: HTMLAnchorElement; handler: (e: MouseEvent) => void }[] = [];
    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      const handler = (e: MouseEvent) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const target = e.currentTarget as HTMLAnchorElement;
          const section = target.getAttribute("data-href");
          if (section && smoother) {
            smoother.scrollTo(section, true, "top top");
          }
        }
      };
      element.addEventListener("click", handler);
      clickHandlers.push({ element, handler });
    });

    let resizeTimer: number;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        ScrollSmoother.refresh(true);
      }, 150);
    };

    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      clickHandlers.forEach(({ element, handler }) => {
        element.removeEventListener("click", handler);
      });
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Saransh Saini
        </a>
        <a
          href="mailto:saranshsaini635@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          saranshsaini635@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
