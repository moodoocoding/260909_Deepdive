"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleHelp,
  GitBranch,
  RefreshCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type PseudocodeSlot = "owns" | "notOwns";
type FlowchartSlot = "condition" | "owns";

const pseudocodeChoices = [
  { id: "not-give", text: "금도끼를 주지 않는다." },
  { id: "give", text: "금도끼를 준다." },
];

const conditionChoices = [
  { id: "owns", text: "금도끼가 나무꾼의 것이라 대답하였는가?" },
  { id: "not-owns", text: "금도끼가 나무꾼의 것이 아니라고 대답하였는가?" },
  { id: "asked", text: "산신령이 나무꾼에게 물었는가?" },
];

const actionChoices = [
  { id: "not-give", text: "금도끼를 주지 않는다." },
  { id: "give", text: "금도끼를 준다." },
  { id: "silver", text: "은도끼를 준다." },
];

function StoryScene({
  number,
  description,
}: {
  number: number;
  description: string;
}) {
  const cropLeft = ["-16.5%", "-129.5%", "-242.5%"][number - 1];
  return (
    <article className="overflow-hidden rounded-[22px] border border-sky-100 bg-white shadow-sm">
      <div className="relative aspect-[1.57] overflow-hidden bg-sky-50">
        <Image
          src="/algorithm-reference.png"
          alt={`${number}번째 금도끼 이야기 장면`}
          width={648}
          height={595}
          className="absolute max-w-none"
          style={{ width: "368%", height: "531%", left: cropLeft, top: "-49%" }}
          priority={number === 1}
        />
      </div>
      <div className="flex gap-3 p-4"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#1faaa1] text-xs font-bold text-white">{number}</span><p className="text-sm font-semibold leading-relaxed text-slate-700">{description}</p></div>
    </article>
  );
}

function ChoiceButton({
  text,
  selected,
  disabled,
  onClick,
}: {
  text: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} className={cn("flex min-h-12 w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-bold leading-relaxed transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-600/15", selected ? "border-[#27a69c] bg-[#eaf8f5] text-[#0d615e] ring-2 ring-teal-600/10" : "border-slate-200 bg-white text-slate-700 hover:border-[#70c8c0] hover:bg-slate-50", disabled ? "cursor-default opacity-60" : "")}>
      <span className={cn("grid size-5 shrink-0 place-items-center rounded-full border", selected ? "border-[#0d7771] bg-[#0d7771] text-white" : "border-slate-300")}>{selected ? <Check className="size-3" /> : null}</span>
      {text}
    </button>
  );
}

function PseudocodeBlank({
  label,
  value,
  active,
  submitted,
  correct,
  onClick,
}: {
  label: string;
  value?: string;
  active: boolean;
  submitted: boolean;
  correct?: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" disabled={submitted} onClick={onClick} className={cn("min-h-12 w-full rounded-xl border-2 border-dashed px-4 py-3 text-sm font-bold leading-relaxed transition-all", !submitted && active ? "border-violet-500 bg-violet-50 text-violet-900 ring-4 ring-violet-500/10" : "border-violet-200 bg-violet-100/70 text-violet-800", submitted && correct ? "border-emerald-400 bg-emerald-50 text-emerald-800" : "", submitted && correct === false ? "border-rose-400 bg-rose-50 text-rose-800" : "")}>
      {value ?? label}
    </button>
  );
}

function FlowArrow() {
  return <div className="mx-auto h-7 w-0.5 bg-rose-400 after:block after:-translate-x-[3px] after:translate-y-5 after:border-x-4 after:border-t-[7px] after:border-x-transparent after:border-t-rose-400" aria-hidden="true" />;
}

function FlowProcess({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto grid min-h-14 max-w-[260px] place-items-center border-2 border-sky-400 bg-white px-4 py-2 text-center text-sm font-bold leading-snug text-slate-800">{children}</div>;
}

export function MissionTwo({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [phase, setPhase] = useState<"pseudocode" | "flowchart" | "result">("pseudocode");
  const [activePseudoSlot, setActivePseudoSlot] = useState<PseudocodeSlot>("owns");
  const [pseudoAnswers, setPseudoAnswers] = useState<Partial<Record<PseudocodeSlot, string>>>({});
  const [pseudoSubmitted, setPseudoSubmitted] = useState(false);
  const [activeFlowSlot, setActiveFlowSlot] = useState<FlowchartSlot>("condition");
  const [flowAnswers, setFlowAnswers] = useState<Partial<Record<FlowchartSlot, string>>>({});
  const [flowSubmitted, setFlowSubmitted] = useState(false);

  const pseudoCorrect = pseudoAnswers.owns === "not-give" && pseudoAnswers.notOwns === "give";
  const flowCorrect = flowAnswers.condition === "owns" && flowAnswers.owns === "not-give";
  const progress = phase === "pseudocode" ? 45 : phase === "flowchart" ? 75 : 100;

  const selectPseudoChoice = (choiceId: string) => {
    if (pseudoSubmitted) return;
    setPseudoAnswers((current) => ({ ...current, [activePseudoSlot]: choiceId }));
    setActivePseudoSlot(activePseudoSlot === "owns" ? "notOwns" : "owns");
  };

  const selectFlowChoice = (choiceId: string) => {
    if (flowSubmitted) return;
    setFlowAnswers((current) => ({ ...current, [activeFlowSlot]: choiceId }));
    setActiveFlowSlot(activeFlowSlot === "condition" ? "owns" : "condition");
  };

  const restart = () => {
    setPhase("pseudocode");
    setActivePseudoSlot("owns");
    setPseudoAnswers({});
    setPseudoSubmitted(false);
    setActiveFlowSlot("condition");
    setFlowAnswers({});
    setFlowSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (phase === "result") {
    return (
      <div className="mx-auto w-full max-w-[980px] px-5 pb-16 pt-8 sm:px-8 lg:px-10 lg:pt-12">
        <button onClick={onBack} className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900"><ArrowLeft className="size-4" /> 미션 목록으로 돌아가기</button>
        <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
          <div className="bg-[#113f4b] px-7 py-9 text-white sm:px-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-teal-100"><CheckCircle2 className="size-3.5" /> 활동 완료</span>
            <h1 className="font-display mt-5 text-3xl font-bold tracking-tight sm:text-4xl">같은 알고리즘을 두 가지 방법으로 나타냈습니다.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200">의사코드의 조건과 명령이 순서도의 판단 기호와 분기 결과에 어떻게 대응하는지 확인했습니다.</p>
          </div>
          <div className="p-7 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-violet-50 p-5"><p className="font-bold text-violet-900">의사코드</p><p className="mt-2 text-sm leading-relaxed text-slate-700">만약 금도끼가 나무꾼의 것이라 대답하면 금도끼를 주지 않고, 아니라면 금도끼를 줍니다.</p></div><div className="rounded-2xl bg-sky-50 p-5"><p className="font-bold text-sky-900">순서도</p><p className="mt-2 text-sm leading-relaxed text-slate-700">같은 조건을 마름모에 넣고 ‘예’와 ‘아니요’ 화살표 끝에 각각의 행동을 놓습니다.</p></div></div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end"><Button variant="outline" size="lg" onClick={restart} className="h-12 rounded-xl px-6 font-bold"><RefreshCcw className="size-4" /> 다시 해 보기</Button><Button size="lg" onClick={onComplete} className="h-12 rounded-xl bg-[#0d7771] px-6 font-bold hover:bg-[#09625e]">미션 완료하고 대시보드로 <ArrowRight className="size-4" /></Button></div>
          </div>
        </section>
      </div>
    );
  }

  const ownsText = pseudocodeChoices.find((choice) => choice.id === pseudoAnswers.owns)?.text;
  const notOwnsText = pseudocodeChoices.find((choice) => choice.id === pseudoAnswers.notOwns)?.text;
  const conditionText = conditionChoices.find((choice) => choice.id === flowAnswers.condition)?.text;
  const flowOwnsText = actionChoices.find((choice) => choice.id === flowAnswers.owns)?.text;

  return (
    <div className="mx-auto w-full max-w-[1180px] px-5 pb-16 pt-8 sm:px-8 lg:px-10 lg:pt-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4"><button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900"><ArrowLeft className="size-4" /> 미션 목록으로 돌아가기</button><span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">MISSION 02 · 알고리즘을 표현하라</span></div>
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-bold tracking-wider text-[#0d7771]">자연어 → 의사코드 → 순서도</p><h1 className="font-display mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">금도끼 이야기의 알고리즘 나타내기</h1><p className="mt-2 text-sm leading-relaxed text-slate-500">상황을 읽고 빈칸을 완성하여 같은 알고리즘을 두 가지 방법으로 표현해 보세요.</p></div><div className="rounded-2xl bg-[#f2f7f6] px-4 py-3 text-sm font-bold text-[#0d615e]">{phase === "pseudocode" ? "1단계 · 의사코드" : "2단계 · 순서도"}</div></div>
        <Progress value={progress} className="mt-5 h-2 bg-slate-100 [&_[data-slot=progress-indicator]]:bg-[#27a69c]" />
      </section>
      <section className="mt-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-2"><CircleHelp className="size-5 text-[#0d7771]" /><h2 className="font-display text-lg font-bold text-slate-950">자연어로 표현한 상황</h2></div>
        <div className="mt-5 grid gap-4 lg:grid-cols-3"><StoryScene number={1} description="산신령이 나무꾼에게 묻는다." /><StoryScene number={2} description="나무꾼이 자기 것이라고 대답하면 산신령은 나무꾼에게 금도끼를 주지 않는다." /><StoryScene number={3} description="나무꾼이 자기 것이 아니라고 대답하면 산신령은 나무꾼에게 금도끼를 준다." /></div>
      </section>
      <div className="mt-5 grid gap-5 xl:grid-cols-2">
        <section className={cn("rounded-[28px] border bg-white p-6 shadow-sm transition-opacity sm:p-8", phase === "flowchart" ? "border-slate-200 opacity-70" : "border-amber-300")} aria-labelledby="pseudo-heading">
          <div className="flex items-center justify-between gap-3"><h2 id="pseudo-heading" className="font-display text-xl font-bold text-amber-900">의사코드로 나타내기</h2>{pseudoCorrect && pseudoSubmitted ? <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">완성</span> : null}</div>
          <div className="mt-5 space-y-3 text-sm font-semibold leading-relaxed text-slate-700"><p className="rounded-xl bg-violet-100 px-4 py-3 text-violet-900">산신령이 나무꾼에게 묻는다.</p><p className="rounded-xl bg-sky-100 px-4 py-3 text-sky-950">만약에 금도끼가 나무꾼의 것이라 대답하면</p><div className="pl-7"><PseudocodeBlank label="실행할 명령을 선택하세요" value={ownsText} active={activePseudoSlot === "owns"} submitted={pseudoSubmitted} correct={pseudoSubmitted ? pseudoAnswers.owns === "not-give" : undefined} onClick={() => setActivePseudoSlot("owns")} /></div><p className="rounded-xl bg-sky-100 px-4 py-3 text-sky-950">금도끼가 나무꾼의 것이 아니라고 대답하면</p><div className="pl-7"><PseudocodeBlank label="실행할 명령을 선택하세요" value={notOwnsText} active={activePseudoSlot === "notOwns"} submitted={pseudoSubmitted} correct={pseudoSubmitted ? pseudoAnswers.notOwns === "give" : undefined} onClick={() => setActivePseudoSlot("notOwns")} /></div></div>
          {phase === "pseudocode" && !pseudoSubmitted ? <div className="mt-6 space-y-2"><p className="text-xs font-bold text-slate-500">선택한 빈칸에 넣을 문장</p>{pseudocodeChoices.map((choice) => <ChoiceButton key={choice.id} text={choice.text} selected={pseudoAnswers[activePseudoSlot] === choice.id} disabled={Object.values(pseudoAnswers).includes(choice.id) && pseudoAnswers[activePseudoSlot] !== choice.id} onClick={() => selectPseudoChoice(choice.id)} />)}</div> : null}
          {phase === "pseudocode" && pseudoSubmitted ? <div className={cn("mt-6 rounded-2xl border p-4 text-sm leading-relaxed", pseudoCorrect ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-900")} aria-live="polite">{pseudoCorrect ? "정확합니다. 이제 같은 알고리즘을 순서도로 옮겨 보세요." : "두 경우의 행동이 바뀌었습니다. ‘자기 것’이라고 답했을 때는 금도끼를 주지 않습니다."}</div> : null}
          {phase === "pseudocode" ? <div className="mt-6 flex justify-end">{!pseudoSubmitted ? <Button disabled={!pseudoAnswers.owns || !pseudoAnswers.notOwns} onClick={() => setPseudoSubmitted(true)} className="rounded-xl bg-[#0d7771] font-bold hover:bg-[#09625e]">의사코드 확인하기 <Check className="size-4" /></Button> : pseudoCorrect ? <Button onClick={() => setPhase("flowchart")} className="rounded-xl bg-[#113f4b] font-bold hover:bg-[#0b3039]">순서도 완성하기 <ArrowRight className="size-4" /></Button> : <Button variant="outline" onClick={() => { setPseudoAnswers({}); setPseudoSubmitted(false); setActivePseudoSlot("owns"); }} className="rounded-xl font-bold"><RefreshCcw className="size-4" /> 다시 선택하기</Button>}</div> : null}
        </section>
        <section className={cn("rounded-[28px] border bg-white p-6 shadow-sm transition-opacity sm:p-8", phase === "flowchart" ? "border-sky-300" : "border-slate-200 opacity-55")} aria-labelledby="flow-heading">
          <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><GitBranch className="size-5 text-sky-700" /><h2 id="flow-heading" className="font-display text-xl font-bold text-sky-900">순서도로 나타내기</h2></div>{phase === "pseudocode" ? <span className="text-xs font-bold text-slate-400">의사코드 완성 후 진행</span> : null}</div>
          <div className="mt-6"><div className="mx-auto grid h-11 w-20 place-items-center rounded-full border-2 border-rose-400 bg-rose-50 text-sm font-bold text-rose-800">시작</div><FlowArrow /><FlowProcess>산신령이 나무꾼에게 묻는다.</FlowProcess><FlowArrow /><div className="mx-auto my-7 grid size-40 rotate-45 place-items-center border-2 border-emerald-500 bg-emerald-50 shadow-sm"><button type="button" disabled={phase !== "flowchart" || flowSubmitted} onClick={() => setActiveFlowSlot("condition")} className={cn("grid size-28 -rotate-45 place-items-center rounded-xl border-2 border-dashed p-2 text-center text-xs font-bold leading-snug", activeFlowSlot === "condition" && phase === "flowchart" ? "border-emerald-600 bg-white text-emerald-900" : "border-emerald-300 text-emerald-800", flowSubmitted && flowAnswers.condition === "owns" ? "border-emerald-500 bg-emerald-100" : "", flowSubmitted && flowAnswers.condition !== "owns" ? "border-rose-500 bg-rose-50 text-rose-800" : "")}>{conditionText ?? "판단 조건"}</button></div><div className="grid grid-cols-2 gap-4"><div><p className="mb-2 text-center text-xs font-bold text-emerald-700">예</p><FlowProcess><button type="button" disabled={phase !== "flowchart" || flowSubmitted} onClick={() => setActiveFlowSlot("owns")} className={cn("w-full rounded-lg border-2 border-dashed p-2 text-xs font-bold", activeFlowSlot === "owns" && phase === "flowchart" ? "border-sky-600 bg-sky-50 text-sky-900" : "border-sky-200 text-slate-500", flowSubmitted && flowAnswers.owns === "not-give" ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "", flowSubmitted && flowAnswers.owns !== "not-give" ? "border-rose-500 bg-rose-50 text-rose-800" : "")}>{flowOwnsText ?? "실행할 명령"}</button></FlowProcess></div><div><p className="mb-2 text-center text-xs font-bold text-rose-700">아니요</p><FlowProcess>금도끼를 준다.</FlowProcess></div></div><FlowArrow /><div className="mx-auto grid h-11 w-20 place-items-center rounded-full border-2 border-rose-400 bg-rose-50 text-sm font-bold text-rose-800">끝</div></div>
          {phase === "flowchart" && !flowSubmitted ? <div className="mt-7 space-y-2"><p className="text-xs font-bold text-slate-500">{activeFlowSlot === "condition" ? "마름모에 넣을 판단 조건" : "‘예’일 때 실행할 명령"}</p>{(activeFlowSlot === "condition" ? conditionChoices : actionChoices).map((choice) => <ChoiceButton key={choice.id} text={choice.text} selected={flowAnswers[activeFlowSlot] === choice.id} onClick={() => selectFlowChoice(choice.id)} />)}</div> : null}
          {phase === "flowchart" && flowSubmitted ? <div className={cn("mt-6 rounded-2xl border p-4 text-sm leading-relaxed", flowCorrect ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-900")} aria-live="polite">{flowCorrect ? "정확합니다. 의사코드의 조건과 명령이 순서도의 판단과 분기에 알맞게 대응합니다." : "마름모에는 ‘예/아니요’로 답할 수 있는 조건이 들어가며, ‘예’ 경로에서는 금도끼를 주지 않습니다."}</div> : null}
          {phase === "flowchart" ? <div className="mt-6 flex justify-end">{!flowSubmitted ? <Button disabled={!flowAnswers.condition || !flowAnswers.owns} onClick={() => setFlowSubmitted(true)} className="rounded-xl bg-[#0d7771] font-bold hover:bg-[#09625e]">순서도 확인하기 <Check className="size-4" /></Button> : flowCorrect ? <Button onClick={() => { setPhase("result"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="rounded-xl bg-[#113f4b] font-bold hover:bg-[#0b3039]">결과 보기 <ArrowRight className="size-4" /></Button> : <Button variant="outline" onClick={() => { setFlowAnswers({}); setFlowSubmitted(false); setActiveFlowSlot("condition"); }} className="rounded-xl font-bold"><RefreshCcw className="size-4" /> 다시 선택하기</Button>}</div> : null}
        </section>
      </div>
    </div>
  );
}
