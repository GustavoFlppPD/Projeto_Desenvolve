import { useRef, useEffect, PropsWithChildren } from "react";
import { Box, BoxProps } from "@mui/material";
import { gsap } from "gsap";

type AnimatedBoxProps = BoxProps & {
  delay?: number;
  y?: number;
};

export default function AnimatedBox({
  children,
  delay = 0,
  y = 40,
  ...rest
}: PropsWithChildren<AnimatedBoxProps>) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay,
      }
    );
  }, [delay, y]);

  return (
    <Box ref={ref} {...rest}>
      {children}
    </Box>
  );
}
