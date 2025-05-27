'use client';

import { useSearchParams } from 'next/navigation';
import AddLessonPage from './AddLessonPage';
import AddPodcastPage from './AddPodcastPage';
import AddQAPage from './AddQAPage';
import QuizSet from './QuizSet/QuizSet';

export default function AddTopicPageComponent() {
  const params = useSearchParams();
  const currentStep = Number(params.get("step")) || 1;


  return (
    <>
      {currentStep === 1 && <AddLessonPage currentStep={currentStep} />}
      {currentStep === 2 && <AddPodcastPage currentStep={currentStep} />}
      {currentStep === 3 && <AddLessonPage currentStep={currentStep} />}
      {currentStep === 4 && <AddLessonPage currentStep={currentStep} />}
      {currentStep === 5 && <AddQAPage currentStep={currentStep} />}
      {currentStep === 6 && <AddLessonPage currentStep={currentStep} />}
      {currentStep === 7 && <AddLessonPage currentStep={currentStep} />}
      {currentStep === 8 && <QuizSet currentStep={currentStep} />}
      {currentStep === 9 && <AddLessonPage currentStep={currentStep} />}
    </>
  );
}
