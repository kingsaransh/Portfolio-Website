import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    name: "CampusGuard",
    category: "AI Security & CCTV (Oct 2025 - Present)",
    tools: "Python, Flask, Firebase, OpenCV, YOLOv8",
    description:
      "AI-powered real-time student safety and CCTV monitoring system with automated alerts.",
  },
  {
    name: "Online Voting System",
    category: "Web & Security (Nov 2025 - Jan 2026)",
    tools: "HTML, CSS, JavaScript, Flask, Firebase",
    description:
      "Secure web-based platform for online voting and election management.",
  },
  {
    name: "Travel Chatbot",
    category: "Conversational AI (Jan 2025 - Feb 2025)",
    tools: "Python, Flask, Teleport API",
    description:
      "Dynamic chatbot providing real-time travel recommendations using external APIs.",
  },
  {
    name: "Gesture Control",
    category: "HCI & Computer Vision (Mar - Apr 2025)",
    tools: "Python, OpenCV, MediaPipe, UDP",
    description:
      "Real-time gesture recognition application with Socket/UDP communication.",
  },
  {
    name: "Eco-Barrier Paper",
    category: "Research (COER University)",
    tools: "Data Modeling, Environmental AI",
    description:
      "Research on carbon emission management using small-scale vertical plantations.",
  },
];

interface WorkProps {
  isSmootherReady?: boolean;
}

const Work = ({ isSmootherReady }: WorkProps) => {
  useGSAP(
    () => {
      if (window.innerWidth <= 1024) return;
      if (!isSmootherReady && !ScrollSmoother.get()) return;

      function getTranslateX() {
        const box = document.getElementsByClassName("work-box");
        if (!box || box.length === 0) return 0;
        const workContainer = document.querySelector(".work-container") as HTMLElement;
        const workFlex = document.querySelector(".work-flex") as HTMLElement;
        if (!workContainer || !workFlex) return 0;

        const firstBox = box[0] as HTMLElement;
        const lastBox = box[box.length - 1] as HTMLElement;

        const firstToLastLeft = lastBox.offsetLeft - firstBox.offsetLeft;
        const centerPadding = Math.max(
          (workContainer.clientWidth - lastBox.offsetWidth) / 2,
          80
        );

        return firstToLastLeft + centerPadding;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${getTranslateX()}`,
          scrub: 1,
          pin: true,
          pinType: ScrollSmoother.get() ? "transform" : "fixed",
          id: "work",
          invalidateOnRefresh: true,
        },
      });

      timeline.to(".work-flex", {
        x: () => -getTranslateX(),
        ease: "none",
      });

      return () => {
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      };
    },
    { dependencies: [isSmootherReady] }
  );

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Projects</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools: {project.tools}</h4>
                <p>{project.description}</p>
              </div>
              <WorkImage image={`${import.meta.env.BASE_URL}images/placeholder.webp`} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
