import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { interviewData } from "@/lib/interviewData";

interface MockInterviewResult {
  questionId: string;
  questionText: string;
  userAnswer: string;
  timeSpent: number;
  isComplete: boolean;
}

interface MockInterviewState {
  isStarted: boolean;
  currentQuestionIndex: number;
  timeLeft: number;
  userAnswer: string;
  isAnswering: boolean;
  results: MockInterviewResult[];
}

const ANSWER_TIME_LIMIT = 120;

export default function MockInterview() {
  const [state, setState] = useState<MockInterviewState>({
    isStarted: false,
    currentQuestionIndex: 0,
    timeLeft: ANSWER_TIME_LIMIT,
    userAnswer: "",
    isAnswering: false,
    results: [],
  });

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState<any[]>([]);

  const allQuestions = interviewData.flatMap((week) => week.questions);

  const startMockInterview = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setRandomQuestions(shuffled);
    setState({
      isStarted: true,
      currentQuestionIndex: 0,
      timeLeft: ANSWER_TIME_LIMIT,
      userAnswer: "",
      isAnswering: true,
      results: [],
    });
  };

  useEffect(() => {
    if (!state.isAnswering || !state.isStarted) return;

    const timer = setInterval(() => {
      setState((prev) => {
        if (prev.timeLeft <= 1) {
          handleSubmitAnswer();
          return prev;
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.isAnswering, state.isStarted]);

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmitAnswer = () => {
    if (!randomQuestions[state.currentQuestionIndex]) return;

    const currentQuestion = randomQuestions[state.currentQuestionIndex];
    const newResult: MockInterviewResult = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.title,
      userAnswer: state.userAnswer,
      timeSpent: ANSWER_TIME_LIMIT - state.timeLeft,
      isComplete: state.userAnswer.trim().length > 0,
    };

    setState((prev) => ({
      ...prev,
      results: [...prev.results, newResult],
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      timeLeft: ANSWER_TIME_LIMIT,
      userAnswer: "",
      isAnswering: prev.currentQuestionIndex + 1 < randomQuestions.length,
    }));
  };

  const handleEndInterview = () => {
    setState({
      isStarted: false,
      currentQuestionIndex: 0,
      timeLeft: ANSWER_TIME_LIMIT,
      userAnswer: "",
      isAnswering: false,
      results: [],
    });
  };

  const currentQuestion = randomQuestions[state.currentQuestionIndex];
  const progressPercentage =
    randomQuestions.length > 0
      ? ((state.currentQuestionIndex + 1) / randomQuestions.length) * 100
      : 0;
  const completedAnswers = state.results.filter((r) => r.isComplete).length;

  if (!state.isStarted) {
    return (
      <div
        className="min-h-screen"
        style={{
          backgroundImage:
            "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663537051195/bkn2BdQZaWacJXdTpxzPUw/lam_dashboard_background-CCVRDzyA85RteZfqRhhwvB.webp)",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-emerald-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-2">🌟 모의 면접 시나리오</h1>
            <p className="text-blue-100">랜덤 질문으로 실전 면접 연습</p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto bg-white border-0 shadow-lg">
            <div className="p-8 text-center">
              <div className="mb-8">
                <div className="text-6xl mb-4">🎤</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  모의 면접을 시작하실 건가요?
                </h2>
                <p className="text-gray-600 mb-2">
                  랜덤으로 선택된 9개의 질문이 나옵니다.
                </p>
                <p className="text-gray-600 mb-6">
                  각 질문당 2분의 시간이 주어집니다.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-700">
                    💡 팁: 답변을 말로 말하면서 동시에 답변을 입력하면 더
                    실전적으로 떨쳐집니다.
                  </p>
                </div>
                <Button
                  onClick={startMockInterview}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white py-6 text-lg font-bold"
                >
                  🚀 모의 면접 시작
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  if (state.isAnswering && currentQuestion) {
    const timePercentage = (state.timeLeft / ANSWER_TIME_LIMIT) * 100;
    const isTimeWarning = state.timeLeft < 30;

    return (
      <div
        className="min-h-screen"
        style={{
          backgroundImage:
            "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663537051195/bkn2BdQZaWacJXdTpxzPUw/lam_dashboard_background-CCVRDzyA85RteZfqRhhwvB.webp)",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-emerald-600 text-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">🌟 모의 면접</h1>
              </div>
              <div className="text-right">
                <div
                  className={`text-3xl font-bold ${
                    isTimeWarning ? "text-red-300" : "text-amber-300"
                  }`}
                >
                  {Math.floor(state.timeLeft / 60)}:
                  {String(state.timeLeft % 60).padStart(2, "0")}
                </div>
                <p className="text-blue-100 text-sm">
                  {isTimeWarning ? "⏰ 시간 부족!" : "남은 시간"}
                </p>
              </div>
            </div>
            <Progress value={timePercentage} className="h-2" />
            <p className="text-blue-100 text-sm mt-2">
              질문 {state.currentQuestionIndex + 1} / {randomQuestions.length}
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-white border-0 shadow-lg mb-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-emerald-50 border-b border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="inline-block bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        Q{currentQuestion.number}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded">
                      {currentQuestion.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentQuestion.title}
                  </h2>
                </div>
              </Card>

              <Card className="bg-white border-0 shadow-lg mb-6">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    📍 핵심 포인트
                  </h3>
                  <ul className="space-y-2">
                    {currentQuestion.keyPoints.map(
                      (point: string, idx: number) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-700 flex items-start gap-2"
                        >
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </Card>

              <Card className="bg-white border-0 shadow-lg mb-6">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      🇬🇧 영문 답변 처마다
                    </h3>
                    <Button
                      onClick={() => speakText(currentQuestion.englishAnswer)}
                      size="sm"
                      variant="outline"
                      className={`gap-2 ${
                        isSpeaking
                          ? "bg-blue-100 border-blue-500"
                          : "border-blue-200"
                      }`}
                    >
                      {isSpeaking ? (
                        <>
                          <Pause className="w-4 h-4" />
                          재생 중...
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4" />
                          발음 듣기
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {currentQuestion.englishAnswer}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="bg-white border-0 shadow-lg sticky top-32">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    🗣 답변 입력
                  </h3>
                  <Textarea
                    placeholder="영어로 답변을 입력하세요. (말로 말하면서 동시에 입력하면 더 실전적으로 떨쳐집니다.)"
                    value={state.userAnswer}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        userAnswer: e.target.value,
                      }))
                    }
                    className="mb-4 min-h-32 resize-none"
                  />
                  <div className="space-y-2">
                    <Button
                      onClick={handleSubmitAnswer}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      ✅ 다음 질문
                    </Button>
                    <Button
                      onClick={handleEndInterview}
                      variant="outline"
                      className="w-full"
                    >
                      ❌ 면접 종료
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage:
          "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663537051195/bkn2BdQZaWacJXdTpxzPUw/lam_dashboard_background-CCVRDzyA85RteZfqRhhwvB.webp)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-emerald-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">🌟 모의 면접 결과</h1>
          <p className="text-blue-100">당신의 면접 실력을 분석했습니다</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white border-0 shadow-lg">
            <div className="p-6 text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">
                {randomQuestions.length}
              </div>
              <p className="text-gray-600">총 질문 수</p>
            </div>
          </Card>
          <Card className="bg-white border-0 shadow-lg">
            <div className="p-6 text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                {completedAnswers}
              </div>
              <p className="text-gray-600">답변한 질문</p>
            </div>
          </Card>
          <Card className="bg-white border-0 shadow-lg">
            <div className="p-6 text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">
                {Math.round((completedAnswers / randomQuestions.length) * 100)}%
              </div>
              <p className="text-gray-600">완료율</p>
            </div>
          </Card>
        </div>

        <div className="space-y-4 mb-8">
          {state.results.map((result, idx) => (
            <Card key={idx} className="bg-white border-0 shadow-lg">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {result.isComplete ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-500" />
                    )}
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {result.questionText}
                      </h4>
                      <p className="text-sm text-gray-600">
                        <Clock className="inline w-4 h-4 mr-1" />
                        {Math.floor(result.timeSpent / 60)}:
                        {String(result.timeSpent % 60).padStart(2, "0")}
                      </p>
                    </div>
                  </div>
                </div>
                {result.userAnswer && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-800">{result.userAnswer}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={handleEndInterview}
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3"
          >
            🌟 대시보드로 돌아가기
          </Button>
          <Button
            onClick={startMockInterview}
            variant="outline"
            className="px-8 py-3"
          >
            😄 다시 시도
          </Button>
        </div>
      </main>
    </div>
  );
}
