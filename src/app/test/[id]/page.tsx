import { Metadata } from "next";
import Test1Page from "@/page-compositions/test1/ui/Test1Page";
import Test2Page from "@/page-compositions/test2/ui/Test2Page";
import Test3Page from "@/page-compositions/test3/ui/Test3Page";
import Test4Page from "@/page-compositions/test4/ui/Test4Page";
import Test5Page from "@/page-compositions/test5/ui/Test5Page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const titles: Record<string, string> = {
    "1": "클래식 스플릿",
    "2": "카드 중심",
    "3": "미니멀",
    "4": "그리드 대시보드",
    "5": "애니메이션 메인",
  };

  const title = titles[id] || "테스트 페이지";

  return {
    title: `테스트 ${id} - ${title} | 동물병원 찾기`,
    description: `동물병원 찾기 서비스 테스트 페이지 ${id} - ${title} 레이아웃`,
  };
}

export default async function TestPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  if (id === "1") return <Test1Page />;
  if (id === "2") return <Test2Page />;
  if (id === "3") return <Test3Page />;
  if (id === "4") return <Test4Page />;
  if (id === "5") return <Test5Page />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-hospital-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-hospital-foreground mb-4">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-hospital-muted mb-8">
          유효한 테스트 페이지는 /test/1 부터 /test/5 까지입니다.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-hospital-primary text-white rounded-lg hover:bg-hospital-primary/90 transition-colors"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
}
