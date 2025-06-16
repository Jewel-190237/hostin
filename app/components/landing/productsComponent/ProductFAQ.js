"use client"

import  React from "react"

import { useState } from "react"

import { initialQuestions } from "./data"
import { Pagination } from "antd"

export default function QAForum() {
  const [questions, setQuestions] = useState(initialQuestions)
  const [questionText, setQuestionText] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const questionsPerPage = 4

  // Get current questions for pagination
  const indexOfLastQuestion = currentPage * questionsPerPage
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion)

  // Handle question submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate input
    if (!questionText.trim()) {
      setError("Please enter your question")
      return
    }

    // Check for email, phone, or URLs
    const regex =
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)|(\d{10,})|((https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~]*)*(#[\w-]*)?(\?[^\s]*)?)/i
    if (regex.test(questionText)) {
      setError("Your question should not contain email, phone number or external web link")
      return
    }

    setError("")
    setIsSubmitting(true)

    // Simulate API call with timeout
    setTimeout(() => {
      const newQuestion = {
        id: questions.length + 1,
        text: questionText,
        author: "Anonymous User",
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      }

      setQuestions([newQuestion, ...questions])
      setQuestionText("")
      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    }, 1000)
  }


  return (
    <div className="border border-gray-300">
      <div className="py-6 bg-[#D9D9D9]"></div>
      {/* Question Input Box */}
      <div className="bg-white border border-textMain px-[19px] pb-[19px] m-4 font-roboto">
        <form onSubmit={handleSubmit}>
          <textarea
            className={`w-full p-2 mb-2 h-32 focus:outline-none`}
            placeholder="Enter your question(s) here"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          ></textarea>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {submitSuccess && (
            <p className="text-green-500 text-sm mb-2">Your question has been submitted successfully!</p>
          )}

          <div className="border-t border-gray-300 pt-4">
            <p className="text-sm text-black mb-2">
              Your question should not content information such as email, phone number or external web link.
            </p>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-textMain font-semibold font-roboto text-primary px-5 py-[1px] border border-textBody"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Ask Question"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Q&A Entries */}
      <div className="my-5">
        {currentQuestions.map((question) => (
        <div key={question.id} className="border-t border-gray-300 py-4 font-roboto">
          <div className="flex items-start mx-2.5">
            <div className="bg-textMain text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-primary font-normal">?</span>
            </div>
            <div>
              <h3 className="text-textMain font-medium">{question.text}</h3>
              <p className="text-gray-600 text-sm mt-1">
                {question.author}- {question.date}
              </p>

              {question.answer && (
                <div className="flex items-start mt-3">
                  <div className="bg-textMain text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-xs text-primary font-normal">✓</span>
                  </div>
                  <div>
                    <h3 className="text-textMain font-medium">{question.answer.text}</h3>
                    <p className="text-gray-600 text-sm mt-1">{question.answer.author}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-3 mb-6 border-t ant_pagi">
        <Pagination defaultCurrent={1} total={30} pageSize={10} />
      </div>
    </div>
  )
}