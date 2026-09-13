import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let hover = false;
    const xQuick = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yQuick = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      if (!hover) {
        xQuick(e.clientX);
        yQuick(e.clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const items = document.querySelectorAll("[data-cursor]");
    const handlers: { element: HTMLElement; over: (e: MouseEvent) => void; out: () => void }[] = [];

    items.forEach((item) => {
      const element = item as HTMLElement;
      const over = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          xQuick(rect.left);
          yQuick(rect.top);
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };

      const out = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };

      element.addEventListener("mouseover", over);
      element.addEventListener("mouseout", out);
      handlers.push({ element, over, out });
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      handlers.forEach(({ element, over, out }) => {
        element.removeEventListener("mouseover", over);
        element.removeEventListener("mouseout", out);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
