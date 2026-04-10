import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, CheckCircle2, Circle } from "lucide-react";
import { interviewData } from "@/lib/interviewData";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  const [currentWeek, setCurrentWeek] = useState(0);
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const week = interviewData[currentWeek];
  const totalTasks = interviewData.reduce((acc, w) => acc + w.tasks.length, 0);
  const completedTasksCount = completedTasks.size;
  const progressPercentage = (completedTasksCount / totalTasks) * 100;

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663537051195/bkn2BdQZaWacJXdTpxzPUw/lam_dashboard_background-CCVRDzyA85RteZfqRhhwvB.webp)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-emerald-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">🎯 Lam Research KTC 면접 준비</h1>
              <p className="text-blue-100">4주 집중 영어 면접 대비 대시보드</p>
            </div>
            <div className="text-right flex flex-col items-end gap-3">
              <div>
                <div className="text-3xl font-bold text-amber-300">{Math.round(progressPercentage)}%</div>
                <p className="text-blue-100 text-sm">전체 진행률</p>
              </div>
              <Button
                onClick={() => setLocation("/mock-interview")}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold gap-2"
              >
                🎤 모의 면접 시작
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full">
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-blue-100 text-sm mt-2">{completedTasksCount} / {totalTasks} 작업 완료</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Quick Access Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button
            onClick={() => setLocation("/daily-flashcards")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-bold gap-2"
          >
            📚 오늘의 문장
          </Button>
          <Button
            onClick={() => setLocation("/mock-interview")}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-6 text-lg font-bold gap-2"
          >
            🎤 모의 면접
          </Button>
        </div>

        {/* Week Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {interviewData.map((w, index) => (
            <Button
              key={w.weekNumber}
              onClick={() => setCurrentWeek(index)}
              variant={currentWeek === index ? "default" : "outline"}
              className={`whitespace-nowrap ${
                currentWeek === index
                  ? "bg-blue-700 text-white"
                  : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
              }`}
            >
              Week {w.weekNumber}
            </Button>
          ))}
        </div>

        {/* Week Header */}
        <Card className="mb-8 bg-white border-0 shadow-lg">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-emerald-50 border-b border-blue-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">📌 {week.title}</h2>
            <p className="text-gray-700"><strong>목표:</strong> {week.goal}</p>
          </div>
        </Card>

        {/* Tasks Section */}
        <Card className="mb-8 bg-white border-0 shadow-lg">
          <div className="p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">✅ 이번 주 학습 과제</h3>
            <div className="space-y-3">
              {week.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <Checkbox
                    checked={completedTasks.has(task.id)}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className={`font-semibold ${
                      completedTasks.has(task.id)
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }`}>
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                  {completedTasks.has(task.id) && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Questions Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-blue-900 mb-4">💡 핵심 질문 및 답변</h3>
          {week.questions.map((question) => (
            <Card key={question.id} className="bg-white border-0 shadow-lg overflow-hidden">
              <button
                onClick={() => toggleQuestion(question.id)}
                className="w-full p-6 text-left hover:bg-blue-50 transition-colors flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-block bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      Q{question.number}
                    </span>
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                      {question.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">{question.title}</h4>
                </div>
                {expandedQuestions.includes(question.id) ? (
                  <ChevronUp className="w-5 h-5 text-blue-700 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-700 flex-shrink-0" />
                )}
              </button>

              {expandedQuestions.includes(question.id) && (
                <div className="px-6 pb-6 border-t border-blue-100 space-y-4">
                  {/* Key Points */}
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">📍 핵심 포인트</h5>
                    <ul className="space-y-1">
                      {question.keyPoints.map((point, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* English Answer */}
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">🇬🇧 영문 답변</h5>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm text-gray-800 leading-relaxed">{question.englishAnswer}</p>
                    </div>
                  </div>

                  {/* Korean Answer */}
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">🇰🇷 한글 번역</h5>
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                      <p className="text-sm text-gray-800 leading-relaxed">{question.koreanAnswer}</p>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">🔑 핵심 키워드</h5>
                    <div className="flex flex-wrap gap-2">
                      {question.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">🚀 4주 집중 학습으로 램리서치 KTC 합격을 노립니다!</p>
          <p className="text-gray-500 text-sm mt-2">마지막 업데이트: {new Date().toLocaleDateString('ko-KR')}</p>
        </div>
      </footer>
    </div>
  );
}
