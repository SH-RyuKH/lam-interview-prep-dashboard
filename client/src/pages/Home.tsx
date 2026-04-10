import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage:
          "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663537051195/bkn2BdQZaWacJXdTpxzPUw/lam_dashboard_background-CCVRDzyA85RteZfqRhhwvB.webp)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-emerald-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold mb-2">📚 오늘의 문장</h1>
          <p className="text-blue-100 text-lg">
            매일 새로운 영어 표현으로 면접 준비하기
          </p>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="max-w-2xl w-full bg-white border-0 shadow-2xl">
          <div className="p-12 text-center">
            <div className="text-8xl mb-6">🎯</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              오늘의 면접 준비
            </h2>
            <p className="text-gray-600 text-lg mb-2">
              매일 5개의 랜덤 질문/답변으로
            </p>
            <p className="text-gray-600 text-lg mb-8">
              효율적인 영어 면접 대비
            </p>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
              <p className="text-sm text-gray-700">
                💡 플래시카드를 클릭하여 질문과 답변을 전환하고,
              </p>
              <p className="text-sm text-gray-700">
                발음 듣기 버튼으로 네이티브 발음을 학습하세요.
              </p>
            </div>

            <Button
              onClick={() => setLocation("/daily-flashcards")}
              className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white py-8 text-2xl font-bold"
            >
              🚀 시작하기
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
