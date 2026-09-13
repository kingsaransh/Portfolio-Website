import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import gsap from "gsap";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social");
    if (!social) return;

    const cleanupFns: (() => void)[] = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      const xQuick = gsap.quickTo(link, "x", { duration: 0.25, ease: "power2.out" });
      const yQuick = gsap.quickTo(link, "y", { duration: 0.25, ease: "power2.out" });

      const onMouseMove = (e: MouseEvent) => {
        const rect = elem.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.5;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.5;
        xQuick(x);
        yQuick(y);
      };

      const onMouseLeave = () => {
        gsap.to(link, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      };

      elem.addEventListener("mousemove", onMouseMove);
      elem.addEventListener("mouseleave", onMouseLeave);

      cleanupFns.push(() => {
        elem.removeEventListener("mousemove", onMouseMove);
        elem.removeEventListener("mouseleave", onMouseLeave);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/kingsaransh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/saranshsaini635/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter />
          </a>
        </span>
        <span>
          <a
            href="https://www.instagram.com/itz_saransh006/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
