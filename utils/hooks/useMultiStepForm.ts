import { useState } from "react";

export default function useMultiStepForm(steps: JSX.Element[]) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function next() {
    setCurrentIndex((i) => (i < steps.length ? i + 1 : i));
  }

  function back() {
    setCurrentIndex((i) => (i > 0 ? i - 1 : i));
  }

  return {
    step: steps[currentIndex],
    isFirstStep: currentIndex === 0,
    isLastStep: currentIndex === steps.length - 1,
    next,
    back,
  };
}
