'use client';
import React, { useState } from 'react';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import { useRouter, useSearchParams } from 'next/navigation';

const AddClassPageComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedStep = searchParams.get('step');
  const [currentStep, setCurrentStep] = useState(Number(preSelectedStep) || 1);

  const goNext = () => {
    setCurrentStep((prev) => {
      const nextStep = prev + 1;
      const params = new URLSearchParams(searchParams.toString());
      params.set('step', nextStep.toString());
      router.replace(`${window.location.pathname}?${params.toString()}`);

      return nextStep;
    });
  };
  const goBack = () => {
    setCurrentStep((prev) => {
      const nextStep = prev - 1;
      const params = new URLSearchParams(searchParams.toString());
      params.set('step', nextStep.toString());
      router.replace(`${window.location.pathname}?${params.toString()}`);

      return nextStep;
    });
  };

  return (
    <div>
      {/* add class */}
      {currentStep === 1 && <Step1 goNext={goNext} />}
      {/* add subjects */}
      {currentStep === 2 && <Step2 goNext={goNext} goBack={goBack} setCurrentStep={setCurrentStep} />}
    </div>
  );
};

export default AddClassPageComponent;
