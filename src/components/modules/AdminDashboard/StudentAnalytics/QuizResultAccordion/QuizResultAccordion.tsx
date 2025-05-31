"use client"

import { useState } from "react"

interface QuizResult {
  id: string
  question: string
  options: string[]
  selectedAnswer: number // Index of the selected answer (0-based)
}

interface QuizResultAccordionProps {
  attemptNumber: number
  rightPercentage: number
  wrongPercentage: number
  quizResults: QuizResult[]
  defaultOpen?: boolean
}

export default function QuizResultAccordion({
  attemptNumber,
  rightPercentage,
  wrongPercentage,
  quizResults,
  defaultOpen = false,
}: QuizResultAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  // Convert number to ordinal text (1 -> "First", 2 -> "Second", etc.)
  const getOrdinalText = (num: number): string => {
    const ordinals = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"]
    return num <= 10 ? ordinals[num - 1] : `${num}th`
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{getOrdinalText(attemptNumber)} Attempt Result</h2>
          <button
            onClick={toggleAccordion}
            className={`px-4 py-2 border ${
              isOpen ? "border-orange-200 text-orange-500" : "border-gray-200 text-gray-700"
            } rounded-md flex items-center space-x-2 hover:bg-gray-50 transition-colors`}
          >
            <span>See Quiz Answer</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div className="absolute left-0 top-0 h-full bg-green-500" style={{ width: `${rightPercentage}%` }}></div>
          <div className="absolute right-0 top-0 h-full bg-red-500" style={{ width: `${wrongPercentage}%` }}></div>
        </div>

        <div className="flex justify-between text-sm">
          <div>Right {rightPercentage}%</div>
          <div>Wrong {wrongPercentage}%</div>
        </div>

        {isOpen && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Review Results</h3>
            <div className="space-y-4">
              {quizResults.map((result) => (
                <div key={result.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex mb-4">
                    <div className="font-bold mr-2">Quiz -{result.id}</div>
                    <div>{result.question}</div>
                  </div>
                  <div className="space-y-3">
                    {result.options.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                            index === result.selectedAnswer
                              ? "border-red-500 text-red-500"
                              : "border-gray-300 text-transparent"
                          }`}
                        >
                          {index === result.selectedAnswer && (
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                          )}
                        </div>
                        <span className={index === result.selectedAnswer ? "text-red-500" : "text-gray-700"}>
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
