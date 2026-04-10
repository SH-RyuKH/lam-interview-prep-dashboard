import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Volume2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
} from "lucide-react";
import { getRandomFlashcards, FlashCard } from "@/lib/flashcardData";
import { useLocation } from "wouter";

const CUSTOM_CARDS_STORAGE_KEY = "customFlashcards";

export default function DailyFlashcards() {
  const [, setLocation] = useLocation();
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const isSpeakingRef = useRef(false);

  useEffect(() => {
    loadFlashcards();
  }, []);

  const loadFlashcards = () => {
    const defaultCards = getRandomFlashcards(5);
    const customCards = getCustomCards();
    const allCards = [...defaultCards, ...customCards];
    setFlashcards(allCards);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const getCustomCards = (): FlashCard[] => {
    try {
      const stored = localStorage.getItem(CUSTOM_CARDS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const saveCustomCard = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      alert("질문과 답변을 모두 입력해주세요.");
      return;
    }

    const customCard: FlashCard = {
      id: `custom-${Date.now()}`,
      question: newQuestion,
      answer: newAnswer,
      category: "Custom",
      difficulty: "medium",
    };

    const customCards = getCustomCards();
    customCards.push(customCard);
    localStorage.setItem(CUSTOM_CARDS_STORAGE_KEY, JSON.stringify(customCards));

    // 새 카드를 현재 목록에 추가
    setFlashcards([...flashcards, customCard]);
    setNewQuestion("");
    setNewAnswer("");
    setShowAddModal(false);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      stopSpeech();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      stopSpeech();
    }
  };

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      isSpeakingRef.current = false;
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      // 이미 재생 중이면 정지
      if (isSpeakingRef.current) {
        stopSpeech();
        return;
      }

      // 음성 재생
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1.0; // 정상 속도
      utterance.pitch = 1.0;
      utterance.volume = 1;

      // 음성 선택 - 우선순위: Google > Microsoft > Safari > 기본
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = null;

      // 1. Google 음성 찾기
      selectedVoice = voices.find(
        (voice) =>
          voice.lang.startsWith("en") &&
          voice.name.includes("Google") &&
          voice.name.includes("US")
      );

      // 2. 없으면 Microsoft 음성 찾기
      if (!selectedVoice) {
        selectedVoice = voices.find(
          (voice) =>
            voice.lang.startsWith("en") && voice.name.includes("Microsoft")
        );
      }

      // 3. 없으면 en-US 음성 중 첫 번째 선택
      if (!selectedVoice) {
        selectedVoice = voices.find((voice) => voice.lang === "en-US");
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        isSpeakingRef.current = true;
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        isSpeakingRef.current = false;
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        isSpeakingRef.current = false;
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  if (flashcards.length === 0) {
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
            <h1 className="text-4xl font-bold mb-2">📚 오늘의 문장</h1>
            <p className="text-blue-100">매일 새로운 영어 표현 학습</p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto bg-white border-0 shadow-lg">
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">⏳</div>
              <p className="text-gray-600 mb-6">카드를 불러오는 중입니다...</p>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];
  const progressPercentage = ((currentIndex + 1) / flashcards.length) * 100;

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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">📚 오늘의 문장</h1>
              <p className="text-blue-100">매일 새로운 영어 표현 학습</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
              >
                <Plus className="w-4 h-4" />
                추가
              </Button>
              <Button
                onClick={() => setLocation("/")}
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-700"
              >
                ← 돌아가기
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Flashcard */}
          <Card className="bg-white border-0 shadow-lg mb-8">
            <div className="p-8">
              {/* Flashcard */}
              <div
                className="relative w-full h-80 cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{
                  perspective: "1000px",
                }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-500"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front - Question */}
                  <div
                    className="absolute w-full h-full bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl border-2 border-blue-200 p-8 flex flex-col items-center justify-center"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <p className="text-sm text-gray-500 mb-4">❓ 질문</p>
                    <p className="text-2xl font-bold text-gray-900 text-center leading-relaxed">
                      {currentCard.question}
                    </p>
                    <p className="text-sm text-gray-500 mt-8">
                      💡 클릭하여 답변 보기
                    </p>
                  </div>

                  {/* Back - Answer */}
                  <div
                    className="absolute w-full h-full bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl border-2 border-emerald-200 p-8 flex flex-col items-center justify-center"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <p className="text-sm text-gray-500 mb-4">✅ 답변</p>
                    <p className="text-lg text-gray-900 text-center leading-relaxed overflow-y-auto max-h-64">
                      {currentCard.answer}
                    </p>
                    <p className="text-sm text-gray-500 mt-8">
                      💡 클릭하여 질문으로 돌아가기
                    </p>
                  </div>
                </div>
              </div>

              {/* Audio Button */}
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() =>
                    speakText(
                      isFlipped ? currentCard.answer : currentCard.question
                    )
                  }
                  className={`gap-2 ${
                    isSpeaking
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {isSpeaking ? (
                    <>
                      <span className="animate-spin">🔊</span>
                      정지
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      발음 듣기
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Progress */}
          <Card className="bg-white border-0 shadow-lg mb-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-2">
                  📊 진행률
                </p>
                <div className="bg-blue-100 rounded-full h-3 w-64">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {currentIndex + 1} / {flashcards.length}
              </p>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              variant="outline"
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              이전
            </Button>

            <Button
              onClick={loadFlashcards}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              새로운 카드 로드
            </Button>

            <Button
              onClick={handleNext}
              disabled={currentIndex === flashcards.length - 1}
              variant="outline"
              className="gap-2"
            >
              다음
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Back Button */}
          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            className="w-full"
          >
            대시보드로 돌아가기
          </Button>
        </div>
      </main>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="bg-white border-0 shadow-2xl w-full max-w-md mx-4">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  새 카드 추가
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Question Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ❓ 질문
                  </label>
                  <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="질문을 입력하세요..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                </div>

                {/* Answer Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ✅ 답변
                  </label>
                  <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="답변을 입력하세요..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={4}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setShowAddModal(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    취소
                  </Button>
                  <Button
                    onClick={saveCustomCard}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    추가
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
