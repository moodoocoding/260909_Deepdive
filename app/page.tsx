"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  AirVent,
  Blender,
  Bot,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Coffee,
  CookingPot,
  Cpu,
  Drill,
  Fan,
  Gauge,
  GitBranch,
  GripVertical,
  Home,
  LampDesk,
  Lightbulb,
  ListChecks,
  type LucideIcon,
  Menu,
  MousePointer2,
  Navigation,
  PartyPopper,
  RotateCcw,
  Speaker,
  Smartphone,
  Sparkles,
  Thermometer,
  Undo2,
  Utensils,
  WashingMachine,
  Wind,
  X,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { MissionTwo } from "./mission-two";
import { MissionThree } from "./mission-three";
import { MissionFour } from "./mission-four";

type Category = "computer" | "not-computer";

type MissionItem = {
  id: string;
  name: string;
  answer: Category;
  reason: string;
  icon: LucideIcon;
  tone: string;
};

const missionItems: MissionItem[] = [
  { id: "toaster", name: "다이얼식 토스터기", answer: "not-computer", reason: "전기를 쓰지만 단순 타이머와 열선으로 작동하며, 프로그램으로 정보를 처리하지 않습니다.", icon: CookingPot, tone: "bg-orange-50 text-orange-700" },
  { id: "robot-vacuum", name: "로봇청소기", answer: "computer", reason: "센서 입력을 프로그램으로 처리해 이동 경로와 청소 동작을 결정합니다.", icon: Bot, tone: "bg-violet-50 text-violet-700" },
  { id: "dishwasher", name: "디지털 식기세척기", answer: "computer", reason: "버튼과 센서의 입력을 받아 세척 프로그램에 따라 물·온도·모터를 제어합니다.", icon: Utensils, tone: "bg-sky-50 text-sky-700" },
  { id: "smartphone", name: "스마트폰", answer: "computer", reason: "터치와 센서로 입력받고, 앱으로 처리해 화면과 소리로 출력합니다.", icon: Smartphone, tone: "bg-cyan-50 text-cyan-700" },
  { id: "hair-dryer", name: "스위치식 헤어드라이어", answer: "not-computer", reason: "스위치가 전기 회로를 직접 바꾸는 일반형으로, 프로그램에 따른 정보 처리가 없습니다.", icon: Wind, tone: "bg-rose-50 text-rose-700" },
  { id: "drill", name: "버튼식 전동 드릴", answer: "not-computer", reason: "버튼의 힘을 전기 신호로 전달해 모터를 돌리지만, 프로그램으로 정보를 처리하지 않습니다.", icon: Drill, tone: "bg-amber-50 text-amber-700" },
  { id: "navigation", name: "자동차 내비게이션", answer: "computer", reason: "위치와 목적지를 입력받아 프로그램으로 경로를 계산하고 화면과 음성으로 출력합니다.", icon: Navigation, tone: "bg-blue-50 text-blue-700" },
  { id: "blender", name: "다이얼식 믹서기", answer: "not-computer", reason: "다이얼이 모터 속도를 직접 조절하는 일반형으로, 정보를 프로그램으로 처리하지 않습니다.", icon: Blender, tone: "bg-lime-50 text-lime-700" },
  { id: "hair-iron", name: "스위치식 고데기", answer: "not-computer", reason: "전기 저항으로 열을 내는 일반형이며, 입력 정보를 프로그램으로 처리하지 않습니다.", icon: Thermometer, tone: "bg-pink-50 text-pink-700" },
  { id: "washer", name: "디지털 세탁기", answer: "computer", reason: "버튼과 무게·수위 센서 입력을 세탁 프로그램으로 처리해 모터와 급수를 제어합니다.", icon: WashingMachine, tone: "bg-indigo-50 text-indigo-700" },
  { id: "kettle", name: "자동 차단 전기주전자", answer: "not-computer", reason: "끓으면 스위치가 물리적으로 꺼지는 일반형으로, 프로그램에 따른 정보 처리는 없습니다.", icon: Coffee, tone: "bg-teal-50 text-teal-700" },
  { id: "rice-cooker", name: "디지털 전기밥솥", answer: "computer", reason: "버튼과 온도 센서 입력을 취사 프로그램으로 처리해 가열 시간과 온도를 조절합니다.", icon: CookingPot, tone: "bg-red-50 text-red-700" },
  { id: "fan", name: "버튼식 선풍기", answer: "not-computer", reason: "버튼으로 회로와 모터 세기를 직접 바꾸는 일반형으로 가정합니다.", icon: Fan, tone: "bg-sky-50 text-sky-700" },
  { id: "smart-speaker", name: "스마트 스피커", answer: "computer", reason: "음성을 입력받아 프로그램으로 명령을 처리하고 소리로 결과를 출력합니다.", icon: Speaker, tone: "bg-purple-50 text-purple-700" },
  { id: "desk-lamp", name: "스위치식 전기 스탠드", answer: "not-computer", reason: "스위치로 전구를 켜고 끄는 단순 전기 장치이며 정보 처리 프로그램이 없습니다.", icon: LampDesk, tone: "bg-yellow-50 text-yellow-700" },
  { id: "air-conditioner", name: "디지털 에어컨", answer: "computer", reason: "설정값과 온도 센서를 입력받아 제어 프로그램이 냉방 동작을 결정합니다.", icon: AirVent, tone: "bg-emerald-50 text-emerald-700" },
];

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-10 place-items-center rounded-2xl bg-[#113f4b] text-white shadow-sm"><Sparkles className="size-5" aria-hidden="true" /></div>
      <div><p className="font-display text-[1.05rem] font-bold leading-tight text-slate-950">생각깨움</p><p className="text-xs font-medium text-slate-500">교원 디지털 연수</p></div>
    </div>
  );
}

type SidebarItem = "dashboard" | "missions";

function Sidebar({
  open,
  activeItem,
  onClose,
  onNavigateDashboard,
  onNavigateMissions,
}: {
  open: boolean;
  activeItem: SidebarItem;
  onClose: () => void;
  onNavigateDashboard: () => void;
  onNavigateMissions: () => void;
}) {
  const nav = [
    { id: "dashboard" as const, label: "대시보드", icon: Home, onClick: onNavigateDashboard },
    { id: "missions" as const, label: "나의 미션", icon: ListChecks, onClick: onNavigateMissions },
  ];

  return (
    <>
      {open && <button className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-[2px] lg:hidden" aria-label="메뉴 닫기" onClick={onClose} />}
      <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-[268px] flex-col border-r border-slate-200 bg-white px-5 py-6 transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex items-center justify-between px-2">
          <Brand />
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose} aria-label="메뉴 닫기"><X /></Button>
        </div>
        <nav className="mt-10 space-y-2" aria-label="주요 메뉴">
          {nav.map(({ id, label, icon: Icon, onClick }) => (
            <button key={id} onClick={onClick} aria-current={activeItem === id ? "page" : undefined} className={cn("flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[0.95rem] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-600/15", activeItem === id ? "bg-[#e9f5f3] text-[#0d615e]" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800")}>
              <Icon className="size-[18px]" aria-hidden="true" />{label}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-[#f2f7f6] p-4">
          <div className="mb-3 grid size-9 place-items-center rounded-xl bg-white text-[#0d615e] shadow-sm"><CircleHelp className="size-[18px]" aria-hidden="true" /></div>
          <p className="text-sm font-bold text-slate-800">활동 진행이 어렵나요?</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">각 미션의 안내와 해설을 확인해 보세요.</p>
        </div>
        <div className="mt-5 flex items-center gap-3 border-t border-slate-100 px-2 pt-5">
          <div className="grid size-10 place-items-center rounded-full bg-[#113f4b] text-sm font-bold text-white">김</div>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-slate-800">김선생님</p><p className="truncate text-xs text-slate-500">초등 교원 연수</p></div>
          <ChevronRight className="size-4 text-slate-400" aria-hidden="true" />
        </div>
      </aside>
    </>
  );
}

function Dashboard({
  onStartMission1,
  onStartMission2,
  onStartMission3,
  onStartMission4,
  completedMissions,
}: {
  onStartMission1: () => void;
  onStartMission2: () => void;
  onStartMission3: () => void;
  onStartMission4: () => void;
  completedMissions: Set<number>;
}) {
  const completedCount = completedMissions.size;
  const mission1Completed = completedMissions.has(1);
  const mission2Completed = completedMissions.has(2);
  const mission3Completed = completedMissions.has(3);
  const mission4Completed = completedMissions.has(4);
  const overallProgress = Math.round((completedCount / 4) * 100);
  return (
    <div id="dashboard-top" tabIndex={-1} className="mx-auto w-full max-w-[1180px] scroll-mt-24 px-5 pb-12 pt-8 outline-none sm:px-8 lg:px-10 lg:pt-12">
      <section className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-bold text-[#0d7771]">DIGITAL LITERACY LAB</p>
          <h1 className="font-display text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-[2.45rem]">오늘도 생각을 깨워 볼까요?</h1>
          <p className="mt-3 text-base text-slate-500">직접 해 보고, 이야기하며 디지털 개념을 발견해 보세요.</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="grid size-10 place-items-center rounded-xl bg-amber-50 text-amber-600"><Zap className="size-5" aria-hidden="true" /></div>
          <div><p className="text-xs font-semibold text-slate-500">연속 참여</p><p className="text-sm font-bold text-slate-900">오늘부터 1일째</p></div>
        </div>
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-[1.45fr_0.75fr]">
        <article className="relative overflow-hidden rounded-[28px] bg-[#113f4b] p-7 text-white shadow-[0_18px_50px_rgba(15,57,68,0.18)] sm:p-9">
          <div className="absolute -right-12 -top-20 size-64 rounded-full border-[42px] border-white/5" />
          <div className="absolute -bottom-20 right-24 size-44 rounded-full bg-[#48b6a9]/10" />
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-teal-100"><Sparkles className="size-3.5" aria-hidden="true" /> 첫 번째 미션</span>
            <h2 className="font-display mt-5 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">컴퓨터를 찾아라!</h2>
            <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-slate-200">여러 사물을 살펴보고 ‘컴퓨터’와 ‘컴퓨터가 아닌 것’으로 분류해 보세요.</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button size="lg" className="h-12 rounded-xl bg-[#f5c85d] px-5 font-bold text-[#183c42] shadow-lg shadow-slate-950/20 hover:bg-[#ffda78]" onClick={onStartMission1}>{mission1Completed ? "다시 도전하기" : "미션 시작하기"} <ArrowRight className="size-4" /></Button>
              <span className="flex items-center gap-2 text-sm font-medium text-slate-300"><Clock3 className="size-4" aria-hidden="true" /> 약 8분</span>
            </div>
          </div>
        </article>

        <article className="flex flex-col rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex items-start justify-between">
            <div><p className="text-sm font-bold text-slate-500">나의 연수 진행률</p><p className="font-display mt-2 text-4xl font-bold tracking-tight text-slate-950">{overallProgress}%</p></div>
            <div className="grid size-11 place-items-center rounded-2xl bg-[#e9f5f3] text-[#0d7771]"><Gauge className="size-5" aria-hidden="true" /></div>
          </div>
          <Progress value={overallProgress} className="mt-7 h-2.5 bg-slate-100 [&_[data-slot=progress-indicator]]:bg-[#27a69c]" />
          <div className="mt-auto grid grid-cols-2 gap-3 pt-7">
            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-2xl font-bold text-slate-900">{completedCount}</p><p className="mt-1 text-xs font-semibold text-slate-500">완료한 미션</p></div>
            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-2xl font-bold text-slate-900">4</p><p className="mt-1 text-xs font-semibold text-slate-500">진행 가능</p></div>
          </div>
        </article>
      </section>

      <section id="mission-list" tabIndex={-1} className="mt-11 scroll-mt-24 outline-none">
        <div className="mb-5 flex items-end justify-between">
          <div><h2 className="font-display text-2xl font-bold tracking-tight text-slate-950">미션 목록</h2><p className="mt-1 text-sm text-slate-500">하나씩 경험하며 수업 아이디어를 모아 보세요.</p></div>
          <span className="hidden text-sm font-semibold text-slate-400 sm:block">4개의 미션</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <button onClick={onStartMission1} className="group rounded-[24px] border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-[#70c8c0] hover:shadow-xl hover:shadow-slate-200/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-600/20">
            <div className="flex items-start justify-between">
              <div className="grid size-12 place-items-center rounded-2xl bg-[#e9f5f3] text-[#0d7771]"><Cpu className="size-6" aria-hidden="true" /></div>
              <span className={cn("rounded-full px-3 py-1.5 text-xs font-bold", mission1Completed ? "bg-emerald-50 text-emerald-700" : "bg-[#eaf8f5] text-[#0d7771]")}>{mission1Completed ? "완료" : "진행 가능"}</span>
            </div>
            <p className="mt-6 text-xs font-bold tracking-wider text-slate-400">MISSION 01</p>
            <h3 className="font-display mt-1 text-xl font-bold text-slate-950">컴퓨터를 찾아라!</h3>
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-sm">
              <span className="flex items-center gap-2 font-medium text-slate-500"><Clock3 className="size-4" /> 8분</span>
              <span className="flex items-center gap-1 font-bold text-[#0d7771]">{mission1Completed ? "다시 하기" : "시작하기"} <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </button>

          <button onClick={onStartMission2} className="group rounded-[24px] border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-[#70c8c0] hover:shadow-xl hover:shadow-slate-200/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-600/20">
            <div className="flex items-start justify-between">
              <div className="grid size-12 place-items-center rounded-2xl bg-amber-50 text-amber-700"><GitBranch className="size-6" aria-hidden="true" /></div>
              <span className={cn("rounded-full px-3 py-1.5 text-xs font-bold", mission2Completed ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")}>{mission2Completed ? "완료" : "진행 가능"}</span>
            </div>
            <p className="mt-6 text-xs font-bold tracking-wider text-slate-400">MISSION 02</p>
            <h3 className="font-display mt-1 text-xl font-bold text-slate-950">알고리즘을 표현하라</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">금도끼 이야기를 의사코드와 순서도로 나타냅니다.</p>
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-sm">
              <span className="flex items-center gap-2 font-medium text-slate-500"><Clock3 className="size-4" /> 8분</span>
              <span className="flex items-center gap-1 font-bold text-[#0d7771]">{mission2Completed ? "다시 하기" : "시작하기"} <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </button>

          <button onClick={onStartMission3} className="group rounded-[24px] border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-[#70c8c0] hover:shadow-xl hover:shadow-slate-200/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-600/20">
            <div className="flex items-start justify-between">
              <div className="grid size-12 place-items-center rounded-2xl bg-violet-50 text-violet-700"><BrainCircuit className="size-6" aria-hidden="true" /></div>
              <span className={cn("rounded-full px-3 py-1.5 text-xs font-bold", mission3Completed ? "bg-emerald-50 text-emerald-700" : "bg-violet-50 text-violet-700")}>{mission3Completed ? "완료" : "진행 가능"}</span>
            </div>
            <p className="mt-6 text-xs font-bold tracking-wider text-slate-400">MISSION 03</p>
            <h3 className="font-display mt-1 text-xl font-bold text-slate-950">컴퓨터 안의 인공지능</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">15개의 질문으로 AI·모델·서비스의 관계를 점검합니다.</p>
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-sm">
              <span className="flex items-center gap-2 font-medium text-slate-500"><Clock3 className="size-4" /> 10분</span>
              <span className="flex items-center gap-1 font-bold text-[#0d7771]">{mission3Completed ? "다시 하기" : "시작하기"} <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </button>
          <button onClick={onStartMission4} className="group rounded-[24px] border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-[#70c8c0] hover:shadow-xl hover:shadow-slate-200/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-600/20">
            <div className="flex items-start justify-between">
              <div className="grid size-12 place-items-center rounded-2xl bg-sky-50 text-sky-700"><PartyPopper className="size-6" aria-hidden="true" /></div>
              <span className={cn("rounded-full px-3 py-1.5 text-xs font-bold", mission4Completed ? "bg-emerald-50 text-emerald-700" : "bg-sky-50 text-sky-700")}>{mission4Completed ? "완료" : "진행 가능"}</span>
            </div>
            <p className="mt-6 text-xs font-bold tracking-wider text-slate-400">MISSION 04</p>
            <h3 className="font-display mt-1 text-xl font-bold text-slate-950">학교 축제 준비를 마쳐라!</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">다섯 가지 축제 준비 상황에서 데이터의 의미를 발견합니다.</p>
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-sm">
              <span className="flex items-center gap-2 font-medium text-slate-500"><Clock3 className="size-4" /> 10분</span>
              <span className="flex items-center gap-1 font-bold text-[#0d7771]">{mission4Completed ? "다시 하기" : "시작하기"} <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}

function Mission({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [answers, setAnswers] = useState<Record<string, Category>>({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<Category | null>(null);
  const answeredCount = Object.keys(answers).length;
  const correctCount = useMemo(() => missionItems.filter((item) => answers[item.id] === item.answer).length, [answers]);
  const progress = (answeredCount / missionItems.length) * 100;
  const remainingItems = missionItems.filter((item) => !answers[item.id]);
  const choose = (id: string, category: Category) => {
    if (submitted) return;
    setAnswers((current) => ({ ...current, [id]: category }));
    setSelectedId(null);
    setDraggedId(null);
    setDragOver(null);
  };
  const removeChoice = (id: string) => {
    setAnswers((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  };
  const reset = () => { setAnswers({}); setSubmitted(false); setSelectedId(null); setDraggedId(null); setDragOver(null); };

  useEffect(() => {
    const modelContext = (document as Document & {
      modelContext?: {
        registerTool: (tool: unknown, options?: { signal?: AbortSignal }) => void | Promise<void>;
      };
    }).modelContext;
    if (!modelContext?.registerTool) return;

    const lifecycle = new AbortController();
    const allowedIds = new Set(missionItems.map((item) => item.id));
    const register = modelContext.registerTool(
      {
        name: "complete_computer_classification",
        title: "컴퓨터 분류 미션 완료",
        description: "16개 사물을 컴퓨터 또는 컴퓨터 아님으로 한 번에 분류하고 결과 화면을 엽니다.",
        inputSchema: {
          type: "object",
          properties: {
            answers: {
              type: "object",
              properties: Object.fromEntries(missionItems.map((item) => [item.id, { type: "string", enum: ["computer", "not-computer"] }])),
              required: missionItems.map((item) => item.id),
              additionalProperties: false,
            },
          },
          required: ["answers"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input: unknown) {
          const candidate = input as { answers?: Record<string, unknown> };
          if (!candidate?.answers || Object.keys(candidate.answers).length !== missionItems.length) throw new Error("16개 사물의 분류가 모두 필요합니다.");
          for (const [id, value] of Object.entries(candidate.answers)) {
            if (!allowedIds.has(id) || (value !== "computer" && value !== "not-computer")) throw new Error("분류 값이 올바르지 않습니다.");
          }
          const nextAnswers = candidate.answers as Record<string, Category>;
          setAnswers(nextAnswers);
          setSubmitted(true);
          return { completed: true, correct: missionItems.filter((item) => nextAnswers[item.id] === item.answer).length, total: missionItems.length };
        },
      },
      { signal: lifecycle.signal },
    );
    void Promise.resolve(register).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-4xl items-center px-5 py-12 sm:px-8">
        <section className="w-full overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <div className="bg-[#113f4b] px-7 py-10 text-center text-white sm:px-12">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#f5c85d] text-[#173f48] shadow-lg">{correctCount === missionItems.length ? <Check className="size-8" strokeWidth={3} /> : <ListChecks className="size-8" />}</div>
            <p className="mt-5 text-sm font-bold text-teal-200">MISSION 01 · 결과</p>
            <h1 className="font-display mt-2 text-3xl font-bold">{correctCount === missionItems.length ? "모두 정확하게 분류했어요!" : `${missionItems.length}개 중 ${correctCount}개를 찾았어요`}</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300">컴퓨터는 생김새보다 ‘입력 → 처리 → 출력’의 구조로 판단하는 것이 핵심입니다.</p>
          </div>
          <div className="p-6 sm:p-9">
            <h2 className="text-lg font-bold text-slate-900">분류 해설</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {missionItems.map((item) => {
                const isCorrect = answers[item.id] === item.answer;
                const Icon = item.icon;
                return (
                  <div key={item.id} className={cn("rounded-2xl border p-4", isCorrect ? "border-emerald-100 bg-emerald-50/60" : "border-rose-100 bg-rose-50/60")}>
                    <div className="flex items-center gap-3">
                      <span className={cn("grid size-9 place-items-center rounded-xl bg-white", isCorrect ? "text-emerald-600" : "text-rose-500")}><Icon className="size-5" /></span>
                      <div className="flex-1"><p className="font-bold text-slate-900">{item.name}</p><p className={cn("text-xs font-bold", isCorrect ? "text-emerald-700" : "text-rose-600")}>{isCorrect ? "정답" : `정답: ${item.answer === "computer" ? "컴퓨터" : "컴퓨터 아님"}`}</p></div>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">{item.reason}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <Button variant="outline" size="lg" className="h-12 rounded-xl" onClick={reset}><RotateCcw /> 다시 해보기</Button>
              <Button size="lg" className="h-12 rounded-xl bg-[#0d7771] hover:bg-[#09625e]" onClick={onComplete}>대시보드로 돌아가기 <ArrowRight /></Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1380px] px-5 pb-12 pt-7 sm:px-8 lg:px-10 lg:pt-9">
      <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-slate-900"><ArrowLeft className="size-4" /> 대시보드로</button>
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div>
            <div className="flex items-center gap-3"><span className="rounded-full bg-[#eaf8f5] px-3 py-1.5 text-xs font-bold text-[#0d7771]">MISSION 01</span><span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400"><Clock3 className="size-3.5" /> 약 8분</span></div>
            <h1 className="font-display mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">컴퓨터를 찾아라!</h1>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-slate-500">카드를 아래의 알맞은 분류 영역으로 옮겨 보세요.</p>
          </div>
          <div className="w-full rounded-2xl bg-slate-50 p-4 lg:w-72">
            <div className="mb-2 flex items-center justify-between text-sm"><span className="font-bold text-slate-700">분류 진행</span><span className="font-bold text-[#0d7771]">{answeredCount} / {missionItems.length}</span></div>
            <Progress value={progress} className="h-2.5 bg-slate-200 [&_[data-slot=progress-indicator]]:bg-[#27a69c]" />
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-amber-900"><strong>생각 열쇠</strong> · 전기를 사용하는 것과 컴퓨터는 같지 않습니다. <strong>입력 → 처리 → 출력</strong>이 있는지 살펴보세요.</p>
          </div>
          <span className="flex shrink-0 items-center gap-2 text-xs font-bold text-amber-700"><MousePointer2 className="size-4" /> 모바일에서는 카드 선택 후 영역 누르기</span>
        </div>

        <section className="mt-8" aria-labelledby="card-tray-title">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="card-tray-title" className="text-sm font-bold text-slate-700">분류할 카드</h2>
            <span className="text-xs font-semibold text-slate-400">남은 카드 {remainingItems.length}개</span>
          </div>
          <div className={cn("rounded-[24px] border border-slate-200 bg-slate-50/80 p-3 sm:p-4", remainingItems.length === 0 && "grid min-h-28 place-items-center")}>
            {remainingItems.length === 0 ? (
              <div className="text-center"><CheckCircle2 className="mx-auto size-7 text-[#0d7771]" /><p className="mt-2 text-sm font-bold text-slate-600">모든 카드를 옮겼어요</p></div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8">
                {remainingItems.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedId === item.id;
                  return (
                    <button
                      key={item.id}
                      draggable
                      onDragStart={(event) => { setDraggedId(item.id); event.dataTransfer.effectAllowed = "move"; event.dataTransfer.setData("text/plain", item.id); }}
                      onDragEnd={() => { setDraggedId(null); setDragOver(null); }}
                      onClick={() => setSelectedId(isSelected ? null : item.id)}
                      aria-pressed={isSelected}
                      className={cn("group relative rounded-2xl border bg-white p-2.5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-600/20", isSelected ? "border-[#0d7771] ring-2 ring-[#0d7771]/15" : "border-slate-200", draggedId === item.id && "opacity-40")}
                    >
                      <GripVertical className="absolute right-2 top-2 size-4 text-slate-300 transition-colors group-hover:text-slate-500" aria-hidden="true" />
                      <div className={cn("grid aspect-[1.35] place-items-center rounded-xl", item.tone)}><Icon className="size-10 sm:size-11" strokeWidth={1.55} aria-hidden="true" /></div>
                      <span className="mt-2.5 block min-h-10 text-[0.82rem] font-bold leading-snug text-slate-800">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <div className="my-5 flex items-center justify-center gap-2 text-xs font-bold text-slate-400"><span className="h-px w-10 bg-slate-200" />카드를 아래로 옮기세요<span className="h-px w-10 bg-slate-200" /></div>

        <div className="grid gap-4 lg:grid-cols-2">
          {([
            { category: "computer" as Category, title: "컴퓨터인 것", caption: "프로그램에 따라 정보를 처리해요", icon: Cpu, accent: "teal" },
            { category: "not-computer" as Category, title: "컴퓨터가 아닌 것", caption: "전기를 써도 정보 처리는 하지 않아요", icon: Zap, accent: "slate" },
          ]).map((zone) => {
            const ZoneIcon = zone.icon;
            const placedItems = missionItems.filter((item) => answers[item.id] === zone.category);
            const active = dragOver === zone.category || Boolean(selectedId);
            return (
              <section
                key={zone.category}
                role="button"
                tabIndex={0}
                aria-label={`${zone.title} 분류 영역`}
                onClick={() => selectedId && choose(selectedId, zone.category)}
                onKeyDown={(event) => { if ((event.key === "Enter" || event.key === " ") && selectedId) { event.preventDefault(); choose(selectedId, zone.category); } }}
                onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = "move"; setDragOver(zone.category); }}
                onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setDragOver(null); }}
                onDrop={(event) => { event.preventDefault(); const id = draggedId || event.dataTransfer.getData("text/plain"); if (id) choose(id, zone.category); }}
                className={cn("min-h-[250px] rounded-[24px] border-2 border-dashed p-4 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-600/20 sm:p-5", zone.accent === "teal" ? "border-teal-200 bg-teal-50/45" : "border-slate-300 bg-slate-50/70", active && (zone.accent === "teal" ? "border-[#0d7771] bg-teal-50 shadow-lg shadow-teal-100/60" : "border-slate-600 bg-slate-100 shadow-lg shadow-slate-200/70"))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={cn("grid size-10 place-items-center rounded-xl", zone.accent === "teal" ? "bg-[#0d7771] text-white" : "bg-slate-700 text-white")}><ZoneIcon className="size-5" /></span>
                    <div><h2 className="text-base font-bold text-slate-900">{zone.title}</h2><p className="text-xs text-slate-500">{zone.caption}</p></div>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">{placedItems.length}개</span>
                </div>

                {placedItems.length === 0 ? (
                  <div className="grid min-h-36 place-items-center text-center"><div><GripVertical className="mx-auto size-7 text-slate-300" /><p className="mt-2 text-sm font-bold text-slate-400">{selectedId ? "여기를 눌러 넣기" : "카드를 끌어다 놓으세요"}</p></div></div>
                ) : (
                  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                    {placedItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.id} className="flex items-center gap-2 rounded-xl border border-white bg-white/90 p-2 shadow-sm">
                          <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", item.tone)}><Icon className="size-5" /></span>
                          <span className="min-w-0 flex-1 text-xs font-bold leading-snug text-slate-700">{item.name}</span>
                          <button onClick={(event) => { event.stopPropagation(); removeChoice(item.id); }} className="grid size-7 shrink-0 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label={`${item.name} 다시 분류하기`}><Undo2 className="size-3.5" /></button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">{selectedId ? "선택한 카드를 넣을 영역을 눌러 주세요." : "모든 사물을 분류하면 결과를 확인할 수 있어요."}</p>
          <Button size="lg" disabled={answeredCount !== missionItems.length} onClick={() => setSubmitted(true)} className="h-12 rounded-xl bg-[#0d7771] px-6 font-bold hover:bg-[#09625e]">분류 결과 확인하기 <CheckCircle2 /></Button>
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [screen, setScreen] = useState<"dashboard" | "mission1" | "mission2" | "mission3" | "mission4">("dashboard");
  const [dashboardSection, setDashboardSection] = useState<SidebarItem>("dashboard");
  const [completedMissions, setCompletedMissions] = useState<Set<number>>(() => new Set());
  const navigateToDashboard = (section: SidebarItem) => {
    setScreen("dashboard");
    setDashboardSection(section);
    setSidebarOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const target = document.getElementById(section === "missions" ? "mission-list" : "dashboard-top");
        target?.focus({ preventScroll: true });
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };
  const startMission = (mission: 1 | 2 | 3 | 4) => {
    setDashboardSection("missions");
    setScreen(`mission${mission}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const completeMission = (mission: 1 | 2 | 3 | 4) => {
    setCompletedMissions((current) => new Set(current).add(mission));
    navigateToDashboard("dashboard");
  };

  return (
    <main className="min-h-screen bg-[#f6f8f9] text-slate-900">
      <Sidebar
        open={sidebarOpen}
        activeItem={screen === "dashboard" ? dashboardSection : "missions"}
        onClose={() => setSidebarOpen(false)}
        onNavigateDashboard={() => navigateToDashboard("dashboard")}
        onNavigateMissions={() => navigateToDashboard("missions")}
      />
      <div className="min-h-screen lg:pl-[268px]">
        <header className="sticky top-0 z-30 flex h-[73px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-md sm:px-8 lg:px-10">
          <div className="flex items-center gap-3 lg:hidden"><Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} aria-label="메뉴 열기"><Menu /></Button><Brand /></div>
          <div className="hidden items-center gap-2 text-sm font-semibold text-slate-400 lg:flex">
            <button onClick={() => navigateToDashboard("dashboard")} className="inline-flex min-h-10 items-center gap-2 rounded-md hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-teal-700"><Home className="size-4" /> 대시보드</button>
            {screen !== "dashboard" && <><ChevronRight className="size-4" /><span className="text-slate-700">{screen === "mission1" ? "컴퓨터를 찾아라!" : screen === "mission2" ? "알고리즘을 표현하라" : screen === "mission3" ? "컴퓨터 안의 인공지능" : "학교 축제 준비를 마쳐라!"}</span></>}
          </div>
          <div className="ml-auto flex items-center gap-3">{completedMissions.size > 0 && <span className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 sm:flex"><CheckCircle2 className="size-3.5" /> 미션 {completedMissions.size}개 완료</span>}<div className="grid size-9 place-items-center rounded-full bg-[#e9f5f3] text-sm font-bold text-[#0d615e]">김</div></div>
        </header>
        {screen === "dashboard" && <Dashboard onStartMission1={() => startMission(1)} onStartMission2={() => startMission(2)} onStartMission3={() => startMission(3)} onStartMission4={() => startMission(4)} completedMissions={completedMissions} />}
        {screen === "mission1" && <Mission onBack={() => navigateToDashboard("missions")} onComplete={() => completeMission(1)} />}
        {screen === "mission2" && <MissionTwo onBack={() => navigateToDashboard("missions")} onComplete={() => completeMission(2)} />}
        {screen === "mission3" && <MissionThree onBack={() => navigateToDashboard("missions")} onComplete={() => completeMission(3)} />}
        {screen === "mission4" && <MissionFour onBack={() => navigateToDashboard("missions")} onComplete={() => completeMission(4)} />}
      </div>
    </main>
  );
}
