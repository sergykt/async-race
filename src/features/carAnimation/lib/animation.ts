export const animateWithDuration = (
  duration: number,
  startPosition: number,
  callback: (newPosition: React.CSSProperties) => void,
) => {
  const startTime = performance.now();
  let animationFrameId: number | null = null;

  const animate = (time: number) => {
    let timeFraction = (time - startTime) / duration;
    if (timeFraction > 1) timeFraction = 1;

    const rightPosition = `calc((100% - ${startPosition}px) * (1 - ${timeFraction}))`;
    callback({ right: rightPosition });

    if (timeFraction < 1) {
      animationFrameId = requestAnimationFrame(animate);
    }
  };

  const stopAnimation = () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = null;
  };

  requestAnimationFrame(animate);

  return stopAnimation;
};
