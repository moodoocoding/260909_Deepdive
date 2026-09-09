"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Check,
  CheckCircle2,
  CircleAlert,
  Lightbulb,
  RefreshCcw,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type Stage = "개념 이해" | "모델 이해" | "교실 적용";
type Diagnostic = "컴퓨터와 AI의 관계" | "자동화와 AI의 차이" | "데이터·학습·모델" | "모델과 서비스" | "교실 적용";

type QuizQuestion = {
  id: number;
  stage: Stage;
  diagnostic: Diagnostic;
  type: "OX" | "관계" | "선택" | "초성" | "순서" | "상황";
  prompt: string;
  context?: string;
  signal?: string;
  options: { value: string; label: string }[];
  answer: string;
  explanation: string;
  takeaway: string;
};

const questions: QuizQuestion[] = [
  {
    id: 1,
    stage: "개념 이해",
    diagnostic: "컴퓨터와 AI의 관계",
    type: "OX",
    prompt: "인공지능은 컴퓨터 없이도 작동할 수 있다.",
    signal: "AI는 어디에서 작동할까요?",
    options: [{ value: "o", label: "O, 그렇다" }, { value: "x", label: "X, 그렇지 않다" }],
    answer: "x",
    explanation: "인공지능은 데이터를 처리하고 결과를 내기 위해 컴퓨터의 하드웨어와 소프트웨어 환경에서 작동합니다.",
    takeaway: "AI는 컴퓨터 위에서 작동하는 소프트웨어 기술입니다.",
  },
  {
    id: 2,
    stage: "개념 이해",
    diagnostic: "컴퓨터와 AI의 관계",
    type: "관계",
    prompt: "컴퓨터·소프트웨어·인공지능의 관계를 가장 알맞게 표현한 것은?",
    signal: "컴퓨터 〉 소프트웨어 〉 인공지능",
    options: [
      { value: "nested", label: "컴퓨터에서 소프트웨어가 작동하고, AI는 소프트웨어 기술의 한 종류이다." },
      { value: "same", label: "컴퓨터와 인공지능은 같은 말이다." },
      { value: "outside", label: "인공지능은 컴퓨터와 관계없이 독립적으로 작동한다." },
    ],
    answer: "nested",
    explanation: "컴퓨터는 여러 소프트웨어를 실행합니다. 인공지능은 그중 학습한 패턴을 활용하는 소프트웨어 기술입니다.",
    takeaway: "모든 AI는 컴퓨터를 필요로 하지만, 모든 컴퓨터가 AI를 쓰는 것은 아닙니다.",
  },
  {
    id: 3,
    stage: "개념 이해",
    diagnostic: "컴퓨터와 AI의 관계",
    type: "초성",
    prompt: "인공지능을 컴퓨터 안에서 작동하게 하는 것은 무엇일까요?",
    context: "초성을 보고 알맞은 말을 골라 보세요.",
    signal: "ㅅ ㅍ ㅌ ㅇ ㅇ",
    options: [{ value: "software", label: "소프트웨어" }, { value: "smart", label: "스마트웨어" }, { value: "sensor", label: "센서" }],
    answer: "software",
    explanation: "인공지능은 물건 자체가 아니라 컴퓨터에서 실행되는 소프트웨어 기술로 이해하는 것이 중요합니다.",
    takeaway: "AI의 정체는 ‘생각하는 물건’이 아니라 소프트웨어입니다.",
  },
  {
    id: 4,
    stage: "개념 이해",
    diagnostic: "자동화와 AI의 차이",
    type: "선택",
    prompt: "일반 계산기가 답을 내는 방법에 가장 가까운 설명은?",
    signal: "입력한 식 → 정해진 계산 규칙 → 답",
    options: [
      { value: "rule", label: "사람이 미리 정한 계산 규칙을 정확히 따른다." },
      { value: "learn", label: "수많은 계산을 스스로 학습한 뒤 답을 추측한다." },
      { value: "mind", label: "계산기의 판단과 감정으로 답을 고른다." },
    ],
    answer: "rule",
    explanation: "일반 계산기는 사람이 작성한 명확한 계산 규칙에 따라 같은 입력에 같은 답을 냅니다.",
    takeaway: "복잡한 계산을 빠르게 한다고 해서 모두 AI인 것은 아닙니다.",
  },
  {
    id: 5,
    stage: "개념 이해",
    diagnostic: "자동화와 AI의 차이",
    type: "OX",
    prompt: "사람이 다가오면 열리는 자동문은 자동으로 작동하므로 반드시 인공지능이다.",
    signal: "센서 감지 → 문 열기",
    options: [{ value: "o", label: "O, 반드시 AI다" }, { value: "x", label: "X, 반드시 AI는 아니다" }],
    answer: "x",
    explanation: "센서가 움직임을 감지하면 문을 여는 고정 규칙만으로도 자동문을 만들 수 있습니다. 자동화와 AI는 같은 뜻이 아닙니다.",
    takeaway: "자동으로 움직인다는 사실만으로 AI라고 판단할 수 없습니다.",
  },
  {
    id: 6,
    stage: "모델 이해",
    diagnostic: "자동화와 AI의 차이",
    type: "선택",
    prompt: "다음 중 인공지능을 사용했을 가능성이 더 높은 출입 방식은?",
    context: "두 장치 모두 문을 자동으로 열 수 있습니다.",
    signal: "움직임 감지  vs  얼굴 특징 비교",
    options: [
      { value: "motion", label: "움직임 센서가 반응하면 누구에게나 문을 연다." },
      { value: "face", label: "카메라 영상에서 얼굴 특징을 찾아 등록된 사람인지 판단한다." },
    ],
    answer: "face",
    explanation: "얼굴 인식은 많은 얼굴 데이터에서 학습한 패턴을 이용해 새로운 얼굴을 판단하는 방식이 일반적입니다.",
    takeaway: "핵심은 자동 작동 여부가 아니라 학습한 패턴을 활용하는지입니다.",
  },
  {
    id: 7,
    stage: "모델 이해",
    diagnostic: "데이터·학습·모델",
    type: "순서",
    prompt: "인공지능이 만들어지고 새 결과를 내는 과정을 바르게 배열한 것은?",
    signal: "데이터 · 학습 · 모델 · 새 결과",
    options: [
      { value: "correct", label: "데이터 → 학습 → 인공지능 모델 → 새로운 입력의 결과" },
      { value: "reverse", label: "인공지능 모델 → 결과 → 데이터 → 학습" },
      { value: "skip", label: "학습 → 새로운 결과 → 데이터 → 인공지능 모델" },
    ],
    answer: "correct",
    explanation: "데이터에서 패턴을 학습한 결과가 인공지능 모델입니다. 이 모델이 새로운 입력을 받아 예측이나 생성을 수행합니다.",
    takeaway: "데이터 → 학습 → 모델 → 결과의 흐름을 기억하세요.",
  },
  {
    id: 8,
    stage: "모델 이해",
    diagnostic: "데이터·학습·모델",
    type: "초성",
    prompt: "데이터를 학습해 찾은 패턴으로 새로운 입력에 결과를 내는 소프트웨어는?",
    signal: "ㅇ ㄱ ㅈ ㄴ   ㅁ ㄷ",
    options: [{ value: "model", label: "인공지능 모델" }, { value: "device", label: "인공지능 기기" }, { value: "network", label: "인공 신경망" }],
    answer: "model",
    explanation: "학습을 마치고 실제 판단이나 생성을 수행하는 핵심 소프트웨어를 인공지능 모델이라고 부릅니다.",
    takeaway: "인공지능 모델은 학습한 패턴을 담고 작동하는 소프트웨어입니다.",
  },
  {
    id: 9,
    stage: "모델 이해",
    diagnostic: "데이터·학습·모델",
    type: "OX",
    prompt: "인공지능 모델은 모든 질문의 정답을 그대로 저장해 둔 거대한 답안지다.",
    signal: "저장된 정답?  또는  학습한 패턴?",
    options: [{ value: "o", label: "O, 답안지에 가깝다" }, { value: "x", label: "X, 패턴을 활용한다" }],
    answer: "x",
    explanation: "모델은 모든 정답을 저장하는 대신 데이터에서 배운 패턴을 이용해 새로운 입력에 알맞아 보이는 결과를 냅니다.",
    takeaway: "모델의 출력은 ‘꺼낸 정답’이 아니라 학습한 패턴을 이용한 결과입니다.",
  },
  {
    id: 10,
    stage: "모델 이해",
    diagnostic: "모델과 서비스",
    type: "관계",
    prompt: "GPT와 ChatGPT의 관계를 가장 알맞게 설명한 것은?",
    signal: "인공지능 모델 → 사용자가 이용하는 서비스",
    options: [
      { value: "model-service", label: "GPT는 인공지능 모델이고, ChatGPT는 그 모델을 활용해 대화하는 서비스이다." },
      { value: "same", label: "GPT와 ChatGPT는 이름만 다른 완전히 같은 개념이다." },
      { value: "computer", label: "GPT는 컴퓨터 기기이고, ChatGPT는 그 기기의 운영체제이다." },
    ],
    answer: "model-service",
    explanation: "모델은 결과를 만들어 내는 핵심 소프트웨어이고, 서비스는 사용자가 그 모델을 편리하게 이용하도록 만든 제품입니다.",
    takeaway: "모델은 ‘엔진’, 서비스는 그 엔진을 이용하는 ‘완성된 도구’에 가깝습니다.",
  },
  {
    id: 11,
    stage: "교실 적용",
    diagnostic: "데이터·학습·모델",
    type: "상황",
    prompt: "광고에 ‘AI 냉장고’라고 적혀 있습니다. AI 사용 여부를 판단하기 위해 가장 먼저 물어볼 질문은?",
    signal: "AI라는 이름보다 작동 방식을 확인하기",
    options: [
      { value: "mechanism", label: "어떤 데이터를 바탕으로 무엇을 학습·예측하는가?" },
      { value: "automatic", label: "문이 자동으로 닫히는가?" },
      { value: "electric", label: "전기를 사용하고 화면이 있는가?" },
    ],
    answer: "mechanism",
    explanation: "제품 이름이나 자동 기능만으로는 부족합니다. 데이터, 학습된 모델, 예측·추천 기능이 실제로 쓰이는지 확인해야 합니다.",
    takeaway: "‘AI’라는 표시보다 데이터와 판단 방식을 질문하세요.",
  },
  {
    id: 12,
    stage: "교실 적용",
    diagnostic: "모델과 서비스",
    type: "선택",
    prompt: "학생에게 컴퓨터와 인공지능의 관계를 설명한 문장으로 가장 적절한 것은?",
    signal: "컴퓨터 ≠ 인공지능",
    options: [
      { value: "good", label: "인공지능은 컴퓨터에서 작동하는 소프트웨어 기술이며, 모든 컴퓨터가 인공지능을 쓰는 것은 아니야." },
      { value: "all", label: "전기로 움직이고 자동으로 작동하면 모두 인공지능이야." },
      { value: "human", label: "인공지능은 컴퓨터 안에 들어 있는 사람과 같은 생각이야." },
    ],
    answer: "good",
    explanation: "AI를 사람처럼 표현하기보다 컴퓨터에서 작동하는 소프트웨어 기술로 설명하면 관계와 한계를 함께 드러낼 수 있습니다.",
    takeaway: "AI를 의인화하지 않고 작동 기반과 범위를 분명히 설명하세요.",
  },
  {
    id: 13,
    stage: "교실 적용",
    diagnostic: "교실 적용",
    type: "상황",
    prompt: "한 스마트폰의 두 기능을 비교했습니다. 인공지능을 사용했을 가능성이 더 높은 기능은?",
    signal: "타이머  vs  얼굴 잠금 해제",
    options: [
      { value: "timer", label: "설정한 시간이 지나면 알림을 울리는 타이머" },
      { value: "face", label: "카메라로 사용자의 얼굴을 구별하는 잠금 해제" },
      { value: "both", label: "스마트폰 안의 기능이므로 둘 다 반드시 AI" },
    ],
    answer: "face",
    explanation: "타이머는 정해진 규칙으로 충분하지만 얼굴 구별은 학습한 얼굴 패턴을 활용합니다. 기기 전체보다 개별 기능을 살펴봐야 합니다.",
    takeaway: "‘이 기기는 AI인가?’보다 ‘이 기능은 어떻게 판단하는가?’를 물으세요.",
  },
  {
    id: 14,
    stage: "교실 적용",
    diagnostic: "교실 적용",
    type: "OX",
    prompt: "AI가 강아지 사진을 고양이로 분류했다면 컴퓨터가 고장 난 것이다.",
    signal: "정상 작동 중에도 틀릴 수 있을까요?",
    options: [{ value: "o", label: "O, 컴퓨터 고장이다" }, { value: "x", label: "X, 모델의 오판일 수 있다" }],
    answer: "x",
    explanation: "컴퓨터는 정상적으로 작동해도 모델이 학습 데이터나 패턴의 한계 때문에 틀린 결과를 낼 수 있습니다.",
    takeaway: "AI 결과는 정답이 아니라 검토가 필요한 판단 또는 생성 결과입니다.",
  },
  {
    id: 15,
    stage: "교실 적용",
    diagnostic: "교실 적용",
    type: "상황",
    prompt: "두 읽기 학습 프로그램 중 인공지능을 사용했을 가능성이 더 높은 것은?",
    context: "A와 B의 다음 학습 추천 방식을 비교해 보세요.",
    signal: "A: 80점 이상이면 다음 단계  |  B: 반응 시간·오답 패턴으로 어려움 예측",
    options: [
      { value: "a", label: "A — 80점 이상이면 다음 단계로 이동하는 고정 규칙" },
      { value: "b", label: "B — 여러 학습자의 반응 시간과 오답 패턴을 분석해 다음 어려움을 예측" },
      { value: "both", label: "A와 B 모두 화면에서 자동 추천하므로 반드시 AI" },
    ],
    answer: "b",
    explanation: "B는 학습 데이터의 패턴으로 새로운 학습자의 어려움을 예측합니다. A는 사람이 정한 조건에 따라 움직이는 규칙 기반 프로그램입니다.",
    takeaway: "교실 도구도 자동화인지, 학습한 패턴을 이용한 예측인지 구분해 보세요.",
  },
];

const stageLabels: Stage[] = ["개념 이해", "모델 이해", "교실 적용"];
const diagnostics: Diagnostic[] = ["컴퓨터와 AI의 관계", "자동화와 AI의 차이", "데이터·학습·모델", "모델과 서비스", "교실 적용"];

function QuestionSignal({ question }: { question: QuizQuestion }) {
  if (!question.signal) return null;
  return (
    <div className={cn(
      "mt-6 rounded-2xl border px-5 py-5 text-center font-bold leading-relaxed",
      question.type === "초성" ? "border-amber-200 bg-amber-50 text-2xl tracking-[0.3em] text-amber-900 sm:text-3xl" : "border-teal-100 bg-[#f0f9f7] text-base text-[#145e5b]",
    )}>
      {question.signal}
    </div>
  );
}

export function MissionTwo({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [finished, setFinished] = useState(false);
  const question = questions[questionIndex];
  const answeredCount = Object.keys(results).length;
  const score = Object.values(results).filter(Boolean).length;
  const progress = finished ? 100 : ((questionIndex + 1) / questions.length) * 100;

  const diagnosticScores = useMemo(() => diagnostics.map((name) => {
    const items = questions.filter((item) => item.diagnostic === name);
    return {
      name,
      correct: items.filter((item) => results[item.id]).length,
      total: items.length,
    };
  }), [results]);

  const confirmAnswer = () => {
    if (!selected || revealed) return;
    setResults((current) => ({ ...current, [question.id]: selected === question.answer }));
    setRevealed(true);
  };

  const goNext = () => {
    if (questionIndex === questions.length - 1) {
      setFinished(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setQuestionIndex((current) => current + 1);
    setSelected(null);
    setRevealed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restart = () => {
    setQuestionIndex(0);
    setSelected(null);
    setRevealed(false);
    setResults({});
    setFinished(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (finished) {
    const weakAreas = diagnosticScores.filter((item) => item.correct < item.total);
    return (
      <div className="mx-auto w-full max-w-[1050px] px-5 pb-16 pt-8 sm:px-8 lg:px-10 lg:pt-12">
        <button onClick={onBack} className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900"><ArrowLeft className="size-4" /> 대시보드로 돌아가기</button>
        <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
          <div className="bg-[#113f4b] px-7 py-9 text-white sm:px-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-teal-100"><CheckCircle2 className="size-3.5" /> 개념 점검 완료</span>
                <h1 className="font-display mt-5 text-3xl font-bold tracking-tight sm:text-4xl">컴퓨터와 인공지능의 관계를 정리했습니다.</h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200">문항별 판단을 바탕으로, 수업에서 다시 확인하면 좋은 개념을 살펴보세요.</p>
              </div>
              <div className="shrink-0 rounded-3xl bg-white/10 px-7 py-5 text-center">
                <p className="text-xs font-bold text-teal-100">정답</p>
                <p className="font-display mt-1 text-4xl font-bold"><span>{score}</span><span className="text-xl text-slate-300"> / 15</span></p>
              </div>
            </div>
          </div>

          <div className="p-7 sm:p-10">
            <h2 className="font-display text-xl font-bold text-slate-950">영역별 이해도</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {diagnosticScores.map((item) => {
                const complete = item.correct === item.total;
                return (
                  <div key={item.name} className={cn("rounded-2xl border p-4", complete ? "border-emerald-100 bg-emerald-50/60" : "border-amber-200 bg-amber-50/70")}>
                    <div className="flex items-center justify-between">
                      {complete ? <CheckCircle2 className="size-4 text-emerald-600" /> : <CircleAlert className="size-4 text-amber-600" />}
                      <span className={cn("text-xs font-bold", complete ? "text-emerald-700" : "text-amber-700")}>{item.correct}/{item.total}</span>
                    </div>
                    <p className="mt-3 text-sm font-bold leading-snug text-slate-800">{item.name}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl bg-[#f2f7f6] p-6">
              <div className="flex items-start gap-4">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-[#0d7771] shadow-sm"><Lightbulb className="size-5" /></div>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">수업으로 가져갈 핵심 문장</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                    <li>• 인공지능은 컴퓨터에서 작동하는 소프트웨어 기술이며, 모든 컴퓨터가 AI를 쓰는 것은 아닙니다.</li>
                    <li>• 자동화 여부보다 데이터에서 학습한 패턴으로 판단·예측하는지를 살펴봅니다.</li>
                    <li>• 인공지능 모델의 결과는 틀릴 수 있으므로 사용자가 검토해야 합니다.</li>
                  </ul>
                  {weakAreas.length > 0 && <p className="mt-4 text-sm font-bold text-amber-800">다시 확인할 영역: {weakAreas.map((item) => item.name).join(", ")}</p>}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button variant="outline" size="lg" onClick={restart} className="h-12 rounded-xl px-6 font-bold"><RefreshCcw className="size-4" /> 다시 풀기</Button>
              <Button size="lg" onClick={onComplete} className="h-12 rounded-xl bg-[#0d7771] px-6 font-bold hover:bg-[#09625e]">미션 완료하고 대시보드로 <ArrowRight className="size-4" /></Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const isCorrect = selected === question.answer;
  const currentStageIndex = stageLabels.indexOf(question.stage);

  return (
    <div className="mx-auto w-full max-w-[1050px] px-5 pb-16 pt-8 sm:px-8 lg:px-10 lg:pt-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900"><ArrowLeft className="size-4" /> 대시보드로 돌아가기</button>
        <span className="rounded-full bg-[#e9f5f3] px-3 py-1.5 text-xs font-bold text-[#0d7771]">MISSION 02 · 컴퓨터 안의 인공지능</span>
      </div>

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-wider text-[#0d7771]">{question.stage}</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">문항 {questionIndex + 1} / {questions.length}</p>
          </div>
          <div className="grid size-11 place-items-center rounded-2xl bg-[#e9f5f3] text-[#0d7771]"><BrainCircuit className="size-5" /></div>
        </div>
        <Progress value={progress} className="mt-5 h-2 bg-slate-100 [&_[data-slot=progress-indicator]]:bg-[#27a69c]" />
        <div className="mt-4 grid grid-cols-3 gap-2" aria-label="미션 단계">
          {stageLabels.map((stage, index) => (
            <div key={stage} className={cn("rounded-xl px-3 py-2 text-center text-xs font-bold", index < currentStageIndex ? "bg-emerald-50 text-emerald-700" : index === currentStageIndex ? "bg-[#113f4b] text-white" : "bg-slate-100 text-slate-400")}>{index < currentStageIndex && <Check className="mr-1 inline size-3" />}{stage}</div>
          ))}
        </div>
      </section>

      <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{question.type}</span>
          <span className="text-xs font-semibold text-slate-400">하나를 선택하세요</span>
        </div>
        <h1 className="font-display mt-5 text-2xl font-bold leading-snug tracking-[-0.02em] text-slate-950 sm:text-[1.8rem]">{question.prompt}</h1>
        {question.context && <p className="mt-3 text-sm leading-relaxed text-slate-500">{question.context}</p>}
        <QuestionSignal question={question} />

        <RadioGroup value={selected ?? ""} onValueChange={setSelected} disabled={revealed} className="mt-7" aria-label={`${question.id}번 문항 답안`}>
          {question.options.map((option, index) => {
            const optionIsAnswer = option.value === question.answer;
            const optionIsSelected = option.value === selected;
            return (
              <label
                key={option.value}
                htmlFor={`q${question.id}-${option.value}`}
                className={cn(
                  "flex cursor-pointer items-start gap-4 rounded-2xl border p-4 text-sm font-semibold leading-relaxed transition-colors sm:p-5",
                  !revealed && optionIsSelected && "border-[#27a69c] bg-[#eff9f7] text-[#124f4c] ring-2 ring-[#27a69c]/15",
                  !revealed && !optionIsSelected && "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                  revealed && optionIsAnswer && "border-emerald-300 bg-emerald-50 text-emerald-900",
                  revealed && optionIsSelected && !optionIsAnswer && "border-rose-300 bg-rose-50 text-rose-900",
                  revealed && !optionIsAnswer && !optionIsSelected && "cursor-default border-slate-100 text-slate-400",
                )}
              >
                <RadioGroupItem id={`q${question.id}-${option.value}`} value={option.value} className="mt-0.5 size-5" />
                <span className="flex-1"><span className="mr-2 text-xs font-bold text-slate-400">{String.fromCharCode(65 + index)}.</span>{option.label}</span>
                {revealed && optionIsAnswer && <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />}
                {revealed && optionIsSelected && !optionIsAnswer && <X className="mt-0.5 size-5 shrink-0 text-rose-600" />}
              </label>
            );
          })}
        </RadioGroup>

        {revealed && (
          <div className={cn("mt-6 rounded-2xl border p-5", isCorrect ? "border-emerald-200 bg-emerald-50/70" : "border-amber-200 bg-amber-50/70")} aria-live="polite">
            <div className="flex items-start gap-3">
              <div className={cn("grid size-8 shrink-0 place-items-center rounded-full text-white", isCorrect ? "bg-emerald-600" : "bg-amber-600")}>{isCorrect ? <Check className="size-4" /> : <Lightbulb className="size-4" />}</div>
              <div>
                <p className={cn("font-bold", isCorrect ? "text-emerald-900" : "text-amber-900")}>{isCorrect ? "개념을 정확히 짚었습니다." : "이 관점을 다시 살펴보세요."}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{question.explanation}</p>
                <p className="mt-3 border-t border-black/5 pt-3 text-sm font-bold text-slate-900"><Sparkles className="mr-1.5 inline size-4 text-[#0d7771]" />{question.takeaway}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-7 flex justify-end border-t border-slate-100 pt-6">
          {!revealed ? (
            <Button size="lg" disabled={!selected} onClick={confirmAnswer} className="h-12 rounded-xl bg-[#0d7771] px-6 font-bold hover:bg-[#09625e]">정답 확인하기 <Check className="size-4" /></Button>
          ) : (
            <Button size="lg" onClick={goNext} className="h-12 rounded-xl bg-[#113f4b] px-6 font-bold hover:bg-[#0b3039]">{questionIndex === questions.length - 1 ? "결과 보기" : "다음 문항"} <ArrowRight className="size-4" /></Button>
          )}
        </div>
      </section>

      {questionIndex === 0 && (
        <p className="mt-5 text-center text-xs leading-relaxed text-slate-400">연수용 정의: 인공지능은 컴퓨터가 사람의 지능이 필요한 문제를 해결하도록 만드는 소프트웨어 기술입니다.</p>
      )}
      <span className="sr-only" aria-live="polite">{answeredCount}개 문항 응답 완료</span>
    </div>
  );
}
