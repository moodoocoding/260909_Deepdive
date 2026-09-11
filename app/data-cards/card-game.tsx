"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CircleHelp, Eye, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { dataTypes, shuffleDataCards, type DataCard } from "@/lib/data-cards";
import "./cards.css";

type Draw = { deck: DataCard[]; index: number; round: number };

export function DataCardGame() {
  const [draw, setDraw] = useState<Draw | null>(null);
  const [dialog, setDialog] = useState<"rules" | "type" | "end" | null>(null);
  const [finished, setFinished] = useState(false);
  const lastTap = useRef(0);
  const card = draw?.deck[draw.index];
  const type = dataTypes.find(item => item.id === card?.type);

  function flipCard() {
    if (dialog || finished || Date.now() - lastTap.current < 300) return;
    lastTap.current = Date.now();
    if (!draw || draw.index === draw.deck.length - 1) {
      setDraw({ deck: shuffleDataCards(card?.id), index: 0, round: (draw?.round ?? 0) + 1 });
    } else setDraw({ ...draw, index: draw.index + 1 });
  }

  function restart() {
    setDraw(null); setFinished(false); setDialog(null); lastTap.current = 0;
  }

  if (finished) return <main className="data-game-shell">
    <section className="data-game-summary">
      <span className="data-game-eyebrow">MISSION 05 · 활동 정리</span>
      <h1>어떤 데이터였나요?</h1>
      <p>소재가 같아도 표현하는 방식에 따라 데이터의 유형이 달라집니다.</p>
      <div className="data-game-summary-types">{dataTypes.map(item => <article key={item.id}><h2>{item.name}</h2><p>{item.description}</p></article>)}</div>
      <div className="data-game-example">비 올 확률은 <strong>수치</strong>, 우산 그림은 <strong>이미지</strong>, 빗소리는 <strong>소리</strong>, 날씨 설명 문장은 <strong>문자</strong> 데이터입니다.</div>
      <Button onClick={restart} className="min-h-12 w-full rounded-xl text-base"><RotateCcw className="size-4" /> 다시 시작하기</Button>
      <Link href="/" className="mt-4 flex min-h-11 items-center justify-center gap-2 text-base font-semibold text-slate-600"><ArrowLeft className="size-4" /> 대시보드로</Link>
    </section>
  </main>;

  return <main className="data-game-shell">
    <div className="data-game-table">
      <header className="data-game-toolbar">
        <span className="data-game-eyebrow">데이터 할리갈리</span>
        <div className="flex gap-1">
          <button type="button" onClick={() => setDialog("rules")} aria-label="활동 안내" className="data-game-tool"><CircleHelp className="size-5" /></button>
          <button type="button" onClick={() => setDialog("end")} className="data-game-tool">마치기</button>
        </div>
      </header>
      <button type="button" onClick={flipCard} className="data-game-card" aria-label={card ? `${card.label}. 터치하여 다음 카드로` : "화면을 터치해 카드 시작하기"}>
        <div className="data-game-card-content" key={card ? `${draw?.round}-${draw?.index}` : "start"}>
          <span className="data-game-emoji" aria-hidden="true">{card?.emoji ?? "👋"}</span>
          <h1 aria-live="polite" aria-atomic="true">{card?.label ?? <>화면을 터치해<br />카드를 넘기세요!</>}</h1>
          <span className="data-game-tap">{card ? "내 차례에 터치해서 다음 카드로" : "모두 준비되면 차례대로 시작하세요"}</span>
        </div>
        <div className="data-game-rule">같은 유형이 <strong>3장 이상</strong> 보이면<br /><strong>간식을 하나 먼저 가져가세요!</strong></div>
      </button>
      <footer className="data-game-footer">
        <span>{draw ? `${draw.round}번째 묶음 · ${draw.index + 1} / 32` : "문자 · 수치 · 이미지 · 소리"}</span>
        <button type="button" className="data-game-tool" disabled={!card} onClick={() => setDialog("type")}><Eye className="size-4" /> 유형 확인</button>
      </footer>
    </div>

    <Dialog open={dialog !== null} onOpenChange={open => { if (!open) setDialog(null); }}>
      <DialogContent showCloseButton={false} className="max-h-[90dvh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl leading-snug">{dialog === "type" ? type?.name : dialog === "end" ? "활동을 마칠까요?" : "간식을 먼저 가져가세요!"}</DialogTitle>
          <DialogDescription className="text-base leading-7">{dialog === "type" ? card?.label : dialog === "end" ? "네 가지 데이터 유형을 함께 정리합니다." : "3명 이상이 모여 서로의 휴대폰 화면이 보이도록 놓습니다."}</DialogDescription>
        </DialogHeader>
        {dialog === "type" ? <p className="rounded-2xl bg-[#e9f5f3] p-5 text-base leading-8 text-slate-700">{card?.explanation}</p> : dialog === "rules" ? <>
          <ol className="list-decimal space-y-3 pl-5 text-base leading-7 text-slate-700">
            <li>모둠 가운데 간식을 놓습니다.</li>
            <li>자기 차례에 카드를 한 번 터치합니다.</li>
            <li>현재 보이는 카드 중 같은 유형이 <strong>3장 이상</strong>이면 간식을 하나 먼저 가져갑니다.</li>
            <li>어떤 세 카드가 같은 유형인지 설명합니다. 확인이 끝나면 다음 사람부터 계속합니다.</li>
          </ol>
          <p className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">지나간 카드는 세지 않습니다. 카드의 그림은 힌트일 뿐, 이름에 적힌 대상의 유형을 판단하세요. 같은 카드 조합으로는 간식을 한 번만 가져갑니다.</p>
        </> : <p className="text-base leading-7 text-slate-600">계속하기를 누르면 현재 카드로 돌아갑니다.</p>}
        <div className="mt-2 flex flex-col gap-2">
          {dialog === "end" && <Button className="min-h-12 rounded-xl text-base" onClick={() => { setFinished(true); setDialog(null); }}><Check className="size-4" /> 마치고 정리하기</Button>}
          <DialogClose asChild><Button variant={dialog === "end" ? "outline" : "default"} className="min-h-12 rounded-xl text-base">{dialog === "type" ? "같은 카드로 돌아가기" : "계속하기"}<ArrowRight className="size-4" /></Button></DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  </main>;
}
