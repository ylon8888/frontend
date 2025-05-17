'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MyButton from '@/components/ui/core/MyButton/MyButton';
import { PlusIcon } from 'lucide-react';
import { toast } from 'sonner';

interface Subject {
  id: string;
  name: string;
  enabled: boolean;
}

type TStepProps = {
  goNext: () => void;
  goBack: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const Step2 = ({ goNext, goBack, setCurrentStep }: TStepProps) => {
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 'math', name: 'Mathematic', enabled: true },
    { id: 'english', name: 'English Language Arts', enabled: true },
    { id: 'social', name: 'Social Studies', enabled: false },
    { id: 'science', name: 'Science', enabled: true },
    { id: 'computer', name: 'Computer Science', enabled: false },
    { id: 'biology', name: 'Biology', enabled: true },
    { id: 'physics', name: 'Physics', enabled: true },
    { id: 'chemistry', name: 'Chemistry', enabled: true },
    { id: 'art', name: 'Art', enabled: false },
  ]);

  const [newSubjectName, setNewSubjectName] = useState('');
  const [showNewSubjectInput, setShowNewSubjectInput] = useState(false);

  // Load class data from session storage
  useEffect(() => {
    const classData = sessionStorage.getItem('classData');
    if (!classData) {
      router.push('/dashboard/classes/add-class');
      setCurrentStep(1);
    }
  }, [router]);

  const toggleSubject = (id: string) => {
    setSubjects(
      subjects.map((subject) => {
        if (subject.id === id) {
          return { ...subject, enabled: !subject.enabled };
        }
        return subject;
      })
    );
  };

  const addNewSubject = () => {
    if (newSubjectName.trim()) {
      const newId = `subject-${Date.now()}`;
      setSubjects([
        ...subjects,
        { id: newId, name: newSubjectName.trim(), enabled: true },
      ]);
      setNewSubjectName('');
      setShowNewSubjectInput(false);
    }
  };

  const handleSubmit = () => {
    // Get selected subjects
    const selectedSubjects = subjects
      .filter((subject) => subject.enabled)
      .map((subject) => subject.name);

    // Get existing class data
    const classDataString = sessionStorage.getItem('classData');
    const classData = classDataString ? JSON.parse(classDataString) : {};

    const updatedClassData = {
      ...classData,
      subjects: selectedSubjects,
    };

    sessionStorage.setItem('classData', JSON.stringify(updatedClassData));
    toast.success('Subjects saved to session storage!');
    goNext();
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <h2 className="text-gray-600 font-medium mb-1">Step 02</h2>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Add Subjects
          </h1>
        </div>

        <div className="mb-6">
          <h3 className="text-gray-800 font-medium mb-4">
            Add Subjects to Class
          </h3>

          <div className="space-y-3">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="flex items-center justify-between"
              >
                <span className="text-gray-800">{subject.name}</span>
                <button
                  type="button"
                  onClick={() => toggleSubject(subject.id)}
                  className={`relative cursor-pointer inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    subject.enabled ? 'bg-teal-600' : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={subject.enabled}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      subject.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {showNewSubjectInput ? (
          <div className="mb-6 flex items-center">
            <input
              type="text"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              placeholder="Enter subject name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={addNewSubject}
              className="ml-2 px-3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setShowNewSubjectInput(false);
                setNewSubjectName('');
              }}
              className="ml-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowNewSubjectInput(true)}
            className="flex items-center text-gray-700 cursor-pointer font-medium gap-1 mb-6 hover:text-gray-900"
          >
            <PlusIcon className="w-5 h-5 text-black" />
            Add New Subject
          </button>
        )}

        <div className="flex space-x-4">
          <MyButton
            className="!bg-gray-200 !text-gray-800 !hover:bg-gray-300 transition duration-200"
            onClick={goBack}
            label="< Previous"
            fullWidth
          />
          <MyButton onClick={handleSubmit} label="Next" fullWidth />
        </div>
      </div>
    </div>
  );
};

export default Step2;
