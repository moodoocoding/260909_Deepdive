"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Clock3, CloudRain, DoorOpen, Gift, Lightbulb, PartyPopper, RotateCcw, Vote, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Question = { prompt: string; options: string[]; answer: string; explanation: string; hint: string };
type Situation = {
  title: string; icon: LucideIcon; context: string; dataTitle: string;
  columns: [string, string]; rows: [string, string][]; note: string;
  meaning: Question; use: Question; unit?: string;
  card: string; data: string; decision: string;
};

const situations: Situation[] = [
  {
    title: "간식 준비하기", icon: Gift,
    context: "내일 축제에 참가하는 학생에게 간식 꾸러미를 하나씩 나눠 주려고 합니다. 준비실에는 간식 200개가 도착했습니다.",
    dataTitle: "학년별 축제 참가 인원", columns: ["학년", "참가 인원"],
    rows: [["1학년", "38명"], ["2학년", "42명"], ["3학년", "39명"], ["4학년", "41명"], ["5학년", "37명"], ["6학년", "43명"], ["합계", "240명"]],
    note: "배부 기준: 참가 학생 1명당 간식 꾸러미 1개",
    meaning: { prompt: "간식을 준비하는 지금, ‘참가 학생 240명’은 무엇을 알려 주나요?", options: ["학생들이 좋아하는 간식 종류", "준비해야 할 간식 꾸러미 수", "간식을 나눠 줄 시간"], answer: "준비해야 할 간식 꾸러미 수", explanation: "한 명에게 하나씩 나눠 주므로, 참가 인원 240명은 필요한 간식 240개와 연결됩니다.", hint: "간식의 종류보다, 모든 학생에게 하나씩 돌아가려면 몇 개가 필요한지 생각해 보세요." },
    use: { prompt: "이미 준비한 200개에 몇 개를 더 준비해야 할까요?", options: [], answer: "40", explanation: "240 − 200 = 40. 간식 40개를 더 준비하면 참가 학생 모두에게 하나씩 줄 수 있습니다.", hint: "필요한 전체 수량에서 이미 준비한 200개를 빼 보세요." }, unit: "개",
    card: "준비 수량", data: "참가 학생 240명", decision: "간식 40개 추가 준비",
  },
  {
    title: "체험 부스 정하기", icon: Vote,
    context: "간식 준비를 마쳤습니다. 이제 학생들이 가장 원하는 체험 부스를 우선 개설하려고 합니다. 참가 학생 전원이 한 가지씩 선택한 설문 결과를 확인하세요.",
    dataTitle: "체험 부스 선호도 조사", columns: ["체험", "투표 수"],
    rows: [["방 탈출", "92표"], ["공예", "68표"], ["과학 실험", "51표"], ["보드게임", "29표"]],
    note: "응답 학생 240명 · 1인 1표",
    meaning: { prompt: "부스를 정할 때, ‘투표 수’는 어떤 의미가 있나요?", options: ["각 부스에 들어갈 수 있는 인원", "부스 운영에 필요한 비용", "학생들이 체험을 선호하는 정도"], answer: "학생들이 체험을 선호하는 정도", explanation: "투표 수는 각 체험을 원하는 학생이 얼마나 되는지 보여 줍니다. 부스를 정하는 데 학생들의 선호도를 반영할 수 있습니다.", hint: "이 설문은 ‘어떤 체험을 하고 싶은지’를 물었습니다. 응답이 무엇을 나타내는지 확인해 보세요." },
    use: { prompt: "설문 결과에 따라 어떤 부스를 우선 준비할까요?", options: ["공예", "과학 실험", "방 탈출", "보드게임"], answer: "방 탈출", explanation: "방 탈출이 92표로 가장 많은 선택을 받았습니다. 우선 개설할 부스는 방 탈출로 정합니다.", hint: "표에서 투표 수가 가장 많은 체험을 찾아보세요." },
    card: "선호도", data: "체험별 투표 수", decision: "방 탈출 부스 우선 개설",
  },
  {
    title: "체험 공간 확보하기", icon: DoorOpen,
    context: "선호도가 가장 높았던 방 탈출 부스를 세 곳 운영하기로 했습니다. 부스마다 방 한 개가 필요합니다. 학생 수용 인원과 시설 조건을 확인한 아래 공간 중 세 곳을 확보하세요.",
    dataTitle: "축제 당일 공간 사용 현황", columns: ["공간", "사용 현황"],
    rows: [["빈 교실", "2개 사용 가능"], ["음악실", "사용 가능"], ["과학실", "사용 불가"]],
    note: "사용 가능한 교실과 음악실은 각각 부스 1곳을 운영할 수 있습니다.",
    meaning: { prompt: "방 탈출을 준비할 때, 이 공간 현황은 무엇을 알려 주나요?", options: ["부스를 운영할 수 있는 장소", "학생들이 원하는 체험의 순위", "부스마다 필요한 운영 시간"], answer: "부스를 운영할 수 있는 장소", explanation: "공간의 개수와 사용 가능 여부를 보면, 부스를 실제로 배치할 수 있는 장소를 알 수 있습니다.", hint: "부스 세 곳을 어디에 배치할지 결정하는 데 필요한 정보를 찾아보세요." },
    use: { prompt: "빈 교실 두 개 외에 어느 공간을 추가로 확보할까요?", options: ["과학실", "음악실", "빈 교실 두 개만 사용"], answer: "음악실", explanation: "빈 교실 2개와 음악실 1개를 사용하면 방 탈출 부스 세 곳을 운영할 수 있습니다.", hint: "추가로 필요한 방은 한 개입니다. ‘사용 가능’한 공간을 확인해 보세요." },
    card: "운영 공간", data: "공간 수와 사용 가능 여부", decision: "빈 교실 2개 + 음악실 확보",
  },
  {
    title: "야외 공연 장소 바꾸기", icon: CloudRain,
    context: "체험 부스 배치를 마쳤습니다. 오후 공연은 운동장에서 열 예정인데, 비 예보가 나왔습니다. 관람 인원을 수용할 수 있는 강당도 확인해 두었습니다.",
    dataTitle: "축제 당일 예보와 공연 공간", columns: ["항목", "확인 내용"],
    rows: [["오전 강수 확률", "20%"], ["오후 강수 확률", "80%"], ["강당", "오후 사용 가능"]],
    note: "비가 올 경우를 대비해 사용할 공연 장소를 결정합니다.",
    meaning: { prompt: "오후 공연을 준비하는 지금, 이 자료는 어떤 의미가 있나요?", options: ["공연이 취소될 확률을 알려 줌", "공연 장소 변경을 검토할 근거", "공연을 관람할 학생 수를 알려 줌"], answer: "공연 장소 변경을 검토할 근거", explanation: "비가 올 가능성과 실내 공간의 사용 여부를 함께 살펴보면, 공연 장소를 바꿀 경우에 대비할 수 있습니다. 강수 확률이 공연 취소 확률을 뜻하는 것은 아닙니다.", hint: "예보가 공연 취소를 결정해 주는 것은 아닙니다. 비에 대비해 준비할 수 있는 것을 생각해 보세요." },
    use: { prompt: "비에 대비해 오후 공연 장소로 어디를 확보할까요?", options: ["오후 사용 가능한 강당", "운동장만 확보", "사용 불가인 과학실"], answer: "오후 사용 가능한 강당", explanation: "오후에 사용할 수 있는 강당을 확보해 두면 비가 와도 실내에서 공연을 진행할 수 있습니다.", hint: "야외 공간 대신 사용할 수 있는 실내 공간과 사용 시간을 함께 확인해 보세요." },
    card: "장소 변경 근거", data: "강수 확률과 공간 사용 시간", decision: "오후 공연을 위한 강당 확보",
  },
  {
    title: "공연 순서 정하기", icon: Clock3,
    context: "마지막으로 오전 공연의 진행표를 완성합니다. 합창 → 연극 → 댄스 순서로 쉬는 시간 없이 진행하고, 마지막 정리까지 11시에 끝나야 합니다.",
    dataTitle: "오전 공연 진행 자료", columns: ["항목", "시간"],
    rows: [["공연 시작", "10:00"], ["합창", "15분"], ["연극", "25분"], ["댄스", "15분"], ["마지막 정리", "5분"]],
    note: "공연별 시간에는 무대 준비와 전환 시간이 포함되어 있습니다.",
    meaning: { prompt: "진행표를 만들 때, ‘공연별 소요 시간’은 무엇을 알려 주나요?", options: ["각 공연에 대한 학생들의 선호도", "공연장에 필요한 좌석 수", "다음 공연의 시작 시각을 정하는 기준"], answer: "다음 공연의 시작 시각을 정하는 기준", explanation: "시작 시각에 앞 공연의 소요 시간을 더하면 다음 공연의 시작 시각을 정할 수 있습니다. 전체 일정이 끝나는 시각도 확인할 수 있습니다.", hint: "앞 공연이 끝난 뒤 다음 공연이 시작됩니다. 15분, 25분 같은 자료를 어디에 활용할 수 있을까요?" },
    use: { prompt: "합창 다음 순서인 연극은 몇 시에 시작하나요?", options: ["10:25", "10:15", "10:40"], answer: "10:15", explanation: "10:00에 시작한 합창이 15분 후 끝나므로 연극은 10:15에 시작합니다. 댄스는 10:40, 마지막 정리는 10:55에 시작해 11:00에 마칩니다.", hint: "전체 공연 시작 시각 10:00에 첫 순서인 합창의 15분을 더해 보세요." },
    card: "운영 시간", data: "시작 시각과 공연별 소요 시간", decision: "연극 10:15 시작 · 11:00 정리 완료",
  },
];

const actionClass = "h-auto min-h-12 whitespace-normal rounded-xl px-6 py-3 text-base font-bold";

function MeaningCards({ earned }: { earned: number }) {
  return <section className="mt-7" aria-label="데이터 의미 카드 수집함">
    <div className="mb-3 flex items-center justify-between gap-3"><h2 className="text-base font-bold">데이터 의미 카드</h2><span className="text-sm font-semibold text-[#0d7771]">획득 {earned} / 5</span></div>
    <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
      {situations.map((item, index) => { const Icon = item.icon; const unlocked = index < earned;
        return <li key={item.title} className={cn("rounded-2xl border p-4", unlocked ? "border-teal-200 bg-white shadow-sm" : "border-dashed border-slate-300 bg-slate-50")}>
          <div className="flex items-center justify-between"><Icon aria-hidden="true" className={cn("size-5", unlocked ? "text-[#0d7771]" : "text-slate-400")} />{unlocked && <CheckCircle2 aria-hidden="true" className="size-4 text-[#0d7771]" />}</div>
          <p className="mt-3 text-sm font-bold text-slate-700">{unlocked ? item.card : `상황 ${index + 1}`}</p>
          <p className="mt-1 text-sm text-slate-500">{unlocked ? "획득 완료" : item.title}</p>
        </li>;
      })}
    </ol>
  </section>;
}

export function MissionFour({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [screen, setScreen] = useState<"intro" | "activity" | "result">("intro");
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"meaning" | "use">("meaning");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "retry" | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const item = situations[index];
  const question = item[phase];
  const isCorrect = feedback === "correct";
  const earned = screen === "result" ? situations.length : index + (phase === "use" && isCorrect ? 1 : 0);
  const Icon = item.icon;

  useEffect(() => {
    if (screen !== "intro") headingRef.current?.focus({ preventScroll: true });
  }, [screen, index, phase]);

  const next = () => {
    if (!isCorrect) return;
    if (phase === "meaning") setPhase("use");
    else if (index === situations.length - 1) setScreen("result");
    else { setIndex(index + 1); setPhase("meaning"); }
    setAnswer(""); setFeedback(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const restart = () => {
    setIndex(0); setPhase("meaning"); setAnswer(""); setFeedback(null); setScreen("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return <div className="mx-auto w-full max-w-[1180px] px-5 pb-14 pt-7 sm:px-8 lg:px-10">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <button onClick={onBack} className="inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-bold text-slate-600 hover:text-[#0d7771] focus-visible:outline-2 focus-visible:outline-teal-700"><ArrowLeft className="size-4" /> 대시보드로 돌아가기</button>
      <span className="rounded-full bg-[#e9f5f3] px-3 py-2 text-sm font-bold text-[#0d615e]">MISSION 04 · 데이터가 주는 의미</span>
    </div>

    {screen === "intro" ? <>
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="bg-[#113f4b] p-7 text-white sm:p-10">
          <div className="mb-5 flex items-center gap-3 text-teal-100"><PartyPopper className="size-6" /><span className="text-sm font-bold">축제 준비 D−1</span></div>
          <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">학교 축제 하루 전,<br />준비를 마쳐라!</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">선생님은 학교 축제 준비 담당자입니다. 참가 인원부터 공연 시간까지, 모아 둔 자료로 아직 남은 다섯 가지 준비를 마쳐 주세요.</p>
        </div>
        <div className="p-7 sm:p-9">
          <p className="text-lg font-bold text-slate-900">이 데이터는 지금 어떤 의미일까요?</p>
          <p className="mt-2 text-base leading-7 text-slate-600">데이터의 의미를 찾고, 준비 문제를 해결할 때마다 의미 카드를 한 장씩 모읍니다.</p>
          <div className="mt-7 flex flex-wrap items-center gap-4"><Button className={actionClass} onClick={() => setScreen("activity")}>축제 준비 시작하기 <ArrowRight className="size-4" /></Button><span className="flex items-center gap-2 text-sm text-slate-500"><Clock3 className="size-4" /> 5개 상황 · 약 10분</span></div>
        </div>
      </section>
      <MeaningCards earned={0} />
    </> : screen === "result" ? <>
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
        <div className="flex items-center gap-3 text-[#0d7771]"><CheckCircle2 className="size-7" /><span className="font-bold">다섯 가지 준비 완료</span></div>
        <h1 ref={headingRef} tabIndex={-1} className="font-display mt-4 text-3xl font-bold leading-tight outline-none">학교 축제 준비를 마쳤습니다!</h1>
        <p className="mt-3 text-base leading-7 text-slate-600">각 데이터가 축제 준비에서 무엇을 알려 주었는지 돌아보세요.</p>
        <div className="mt-7 space-y-3">{situations.map((situation, i) => { const CardIcon = situation.icon; return <article key={situation.title} className="grid gap-4 rounded-2xl border border-slate-200 p-5 sm:grid-cols-[1fr_1fr]">
          <div><p className="flex items-center gap-2 text-sm font-bold text-[#0d7771]"><CardIcon className="size-4" /> {i + 1}. {situation.title}</p><p className="mt-2 text-base text-slate-700">{situation.data}</p></div>
          <div><p className="text-base font-bold text-slate-900">{situation.card}</p><p className="mt-2 text-base text-slate-600">{situation.decision}</p></div>
        </article>; })}</div>
        <div className="mt-7 rounded-2xl bg-[#e9f5f3] p-6"><p className="flex items-center gap-2 font-bold text-[#0d615e]"><Lightbulb className="size-5" /> 수업으로 가져갈 한 문장</p><p className="mt-3 text-lg font-semibold leading-8 text-slate-800">데이터가 어떤 상황에서 무엇을 알려 주는지 살펴보면, 필요한 결정을 내리는 데 활용할 수 있습니다.</p></div>
        <div className="mt-7 flex flex-wrap gap-3 sm:justify-end"><Button variant="outline" className={actionClass} onClick={restart}><RotateCcw className="size-4" /> 다시 체험하기</Button><Button className={actionClass} onClick={onComplete}>미션 완료하고 대시보드로 <ArrowRight className="size-4" /></Button></div>
      </section>
      <MeaningCards earned={earned} />
    </> : <>
      <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-bold text-[#0d615e]">학교 축제 준비 <span className="ml-2 text-slate-500">상황 {index + 1} / 5</span></p><span className="text-sm text-slate-600">{phase === "meaning" ? "1. 의미 찾기" : "2. 활용하기"}</span></div>
        <Progress value={earned / situations.length * 100} aria-label="축제 준비 완료율" className="mt-4 h-2" />
      </section>
      <section className="mb-5 rounded-2xl bg-[#113f4b] p-6 text-white sm:p-7">
        <div className="flex items-center gap-3"><Icon className="size-6 shrink-0 text-[#f5c85d]" /><h1 className="font-display text-2xl font-bold">{item.title}</h1></div>
        <p className="mt-3 text-base leading-8 text-slate-100">{item.context}</p>
      </section>
      <div className="grid items-start gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="min-w-0 rounded-[24px] border border-slate-200 bg-white p-5 sm:p-6">
          <p className="text-sm font-bold tracking-wide text-[#0d7771]">데이터 카드</p><h2 className="mt-2 text-lg font-bold">{item.dataTitle}</h2>
          <Table className="mt-4 text-base"><TableHeader><TableRow className="bg-[#e9f5f3]">{item.columns.map(column => <TableHead key={column} scope="col" className="px-3 py-3 font-bold text-[#0d615e]">{column}</TableHead>)}</TableRow></TableHeader><TableBody>{item.rows.map(([label, value]) => <TableRow key={label} className={label === "합계" ? "bg-teal-50 font-bold" : ""}><TableHead scope="row" className="whitespace-normal px-3 py-3 text-slate-700">{label}</TableHead><TableCell className="whitespace-normal px-3 py-3 font-semibold">{value}</TableCell></TableRow>)}</TableBody></Table>
          <p className="mt-4 text-sm leading-6 text-slate-500">{item.note}</p>
        </section>
        <section className="min-w-0 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {phase === "use" && <p className="mb-5 flex items-start gap-2 rounded-xl bg-teal-50 p-4 text-sm font-semibold leading-6 text-teal-800"><CheckCircle2 className="mt-0.5 size-4 shrink-0" /> 의미 확인: {item.meaning.answer}</p>}
          <p className="text-sm font-bold text-[#0d7771]">{phase === "meaning" ? "데이터의 의미 찾기" : "활용 문제"}</p>
          <h2 ref={headingRef} tabIndex={-1} id="festival-question" className="mt-3 text-xl font-bold leading-8 outline-none">{question.prompt}</h2>
          <form onSubmit={event => { event.preventDefault(); if (!answer.trim() || isCorrect) return; setFeedback(answer.trim() === question.answer ? "correct" : "retry"); }}>
            {question.options.length ? <RadioGroup aria-labelledby="festival-question" value={answer} disabled={isCorrect} onValueChange={value => { setAnswer(value); setFeedback(null); }} className="mt-5">
              {question.options.map((option, optionIndex) => <label key={`${index}-${phase}-${option}`} htmlFor={`festival-${index}-${phase}-${optionIndex}`} className={cn("flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-base leading-7 transition-colors", answer === option ? "border-teal-500 bg-teal-50 text-teal-950" : "border-slate-200 hover:bg-slate-50", isCorrect && "cursor-default")}>
                <RadioGroupItem className="mt-1 size-5" value={option} id={`festival-${index}-${phase}-${optionIndex}`} /><span>{option}</span>
              </label>)}
            </RadioGroup> : <div className="mt-5"><label htmlFor="festival-number" className="text-sm font-semibold text-slate-600">추가로 준비할 간식 수</label><div className="mt-2 flex items-center gap-3"><Input id="festival-number" type="number" inputMode="numeric" min={0} step={1} required value={answer} disabled={isCorrect} onChange={event => { setAnswer(event.target.value); setFeedback(null); }} className="h-12 max-w-48 text-lg md:text-lg" /><span>{item.unit}</span></div></div>}
            <div aria-live="polite" aria-atomic="true">{feedback && <div className={cn("mt-5 rounded-xl border p-5", isCorrect ? "border-teal-200 bg-teal-50" : "border-amber-200 bg-amber-50")}><p className="flex items-center gap-2 font-bold">{isCorrect ? <Check className="size-5 text-teal-700" /> : <Lightbulb className="size-5 text-amber-700" />}{isCorrect ? phase === "meaning" ? "데이터의 의미를 찾았습니다." : `‘${item.card}’ 카드 획득!` : "데이터를 다시 살펴보세요."}</p><p className="mt-2 text-base leading-7 text-slate-700">{isCorrect ? question.explanation : question.hint}</p></div>}</div>
            <div className="mt-6 flex justify-end">{isCorrect ? <Button type="button" onClick={next} className={actionClass}>{phase === "meaning" ? "활용 문제 풀기" : index === situations.length - 1 ? "축제 준비 결과 보기" : "다음 상황으로"}<ArrowRight className="size-4" /></Button> : <Button type="submit" disabled={!answer.trim()} className={actionClass}>답 확인하기 <Check className="size-4" /></Button>}</div>
          </form>
        </section>
      </div>
      <MeaningCards earned={earned} />
    </>}
    <p className="mt-6 text-sm leading-6 text-slate-500">자료의 인원·시간·공간은 연수 활동을 위한 가상 설정입니다.</p>
  </div>;
}
