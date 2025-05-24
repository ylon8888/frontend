'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';

const AddClassPageComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStep = useMemo(() => {
    return Number(searchParams.get('step')) || 1;
  }, [searchParams]);

  const goNext = () => {
    if (currentStep >= 3) {
      toast.success('Successfully');
      router.push('/dashboard/classes');
      sessionStorage.removeItem('classId');
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', (currentStep + 1).toString());
    router.replace(`${window.location.pathname}?${params.toString()}`);
  };

  const goBack = () => {
    if (currentStep > 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('step', (currentStep - 1).toString());
      router.replace(`${window.location.pathname}?${params.toString()}`);
    }
  };

  return (
    <div>
      {currentStep === 1 && <Step1 goNext={goNext} />}
      {currentStep === 2 && <Step2 goNext={goNext} goBack={goBack} />}
      {currentStep === 3 && <Step3 goNext={goNext} goBack={goBack} />}
    </div>
  );
};

export default AddClassPageComponent;
