"use client";

import { Intro } from "@/components/content/Intro";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

type Question = {
  question: string,
  options?: string[],
  answer: string,
  type: "mcq" | "integer"
}

const quizQuestions: Question[] = [
  {
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    answer: "Mercury",
    type: "mcq",
  },
  {
    question:
      "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
    type: "mcq",
  },
  {
    question:
      "Which of the following is primarily used for structuring web pages?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML",
    type: "mcq",
  },
  {
    question: "Which chemical symbol stands for Gold?",
    options: ["Au", "Gd", "Ag", "Pt"],
    answer: "Au",
    type: "mcq",
  },
  {
    question:
      "Which of these processes is not typically involved in refining petroleum?",
    options: [
      "Fractional distillation",
      "Cracking",
      "Polymerization",
      "Filtration",
    ],
    answer: "Filtration",
    type: "mcq",
  },
  { question: "What is the value of 12 + 28?", answer: "40", type: "integer" },
  {
    question: "How many states are there in the United States?",
    answer: "50",
    type: "integer",
  },
  {
    question: "In which year was the Declaration of Independence signed?",
    answer: "1776",
    type: "integer",
  },
  {
    question: "What is the value of pi rounded to the nearest integer?",
    answer: "3",
    type: "integer",
  },
  {
    question:
      "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    answer: "120",
    type: "integer",
  },
];

export default function Home() {
  const [content, setContent] = useState("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState("")
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);

  function handleAnswer(selectedAnswer : string) {
    const correctAnswer = quizQuestions[currentQuestion].answer
    if(selectedAnswer === correctAnswer) {
      setScore(prev => prev + 1)
      setFeedback("Correct");
    } else {
      setFeedback("Incorrect")
    }
    setTimeout(() => {
      setFeedback("")
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer("")
      setTimeLeft(30)
    }, 1000)
  }

  useEffect(() => {
    if (content !== "quiz") return;
  
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setFeedback("Time's up!");
          setTimeout(() => {
            setFeedback("");
            setCurrentQuestion((prev) => prev + 1);
            setSelectedAnswer("");
            setTimeLeft(30);
          }, 1000);
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => clearInterval(timer); // Cleanup on unmount or question change
  }, [currentQuestion, content]);
  

  function handlePlay() {
    setContent("quiz");
  }

  function handleSelected(option: string) {
    setSelectedAnswer(option)
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        {content === "intro" && <Intro onPlay={handlePlay} />}
        {content === "quiz" && (
          <Card className="max-w-[600px]">
          <CardHeader>
            <CardTitle>Question {currentQuestion + 1}</CardTitle>
            <p className="text-red-500">Time Left: {timeLeft}</p>
          </CardHeader>
          <CardContent>
            <p className="text-center md:text-2xl ">
              {quizQuestions[currentQuestion].question}
            </p>
            <div className="flex flex-col items-center gap-4 mt-4">
              {quizQuestions[currentQuestion].type === "mcq" ? (
                quizQuestions[currentQuestion].options?.map(
                  (elem: string, index: number) => (
                    <Button
                      key={index}
                      variant={selectedAnswer !== elem ? "secondary" : "default"}
                      onClick={() => handleSelected(elem)}
                      className="min-w-48"
                    >
                      {elem}
                    </Button>
                  )
                )
              ) : (
                <Input
                  value={selectedAnswer}
                  onChange={(e) => handleSelected(e.target.value)}
                />
              )}
            </div>
            <div className="flex justify-center mt-4">
              <Button
                disabled={!selectedAnswer}
                onClick={() => handleAnswer(selectedAnswer)}
              >
                Submit
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col items-center w-full">
              {feedback && (
                <p
                  className={`text-2xl font-bold text-center ${
                    feedback === "Correct" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {feedback}
                </p>
              )}
              <p className="self-start">{`Score is ${score}/10`}</p>
            </div>
          </CardFooter>
        </Card>
        )}
      </div>
    </>
  );
}
