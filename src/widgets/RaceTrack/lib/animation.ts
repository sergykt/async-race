export const carHeight = 36;
export const carWidth = 70;
export const carLeftPadding = 120;
export const carRightPosition = carLeftPadding + carWidth;

export const carStartPositionStyle: React.CSSProperties = {
  right: `calc(100% - ${carRightPosition}px)`,
  transition: 'right 0.3s ease',
};

export const animateWithDuration = (
  duration: number,
  callback: (newPosition: React.CSSProperties) => void,
) => {
  const startTime = performance.now();
  let animationFrameId: number | null = null;

  const animate = (time: number) => {
    let timeFraction = (time - startTime) / duration;
    if (timeFraction > 1) timeFraction = 1;

    const rightPosition = `calc((100% - ${carRightPosition}px) * (1 - ${timeFraction}))`;
    callback({ right: rightPosition });

    if (timeFraction < 1) {
      animationFrameId = requestAnimationFrame(animate);
    }
  };

  const stopAnimation = () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  };

  requestAnimationFrame(animate);

  return stopAnimation;
};
