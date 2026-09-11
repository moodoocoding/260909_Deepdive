"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Copy, ExternalLink, QrCode, Smartphone, Users } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dataTypes, getCardPageUrl, isLoopbackAddress } from "@/lib/data-cards";

export function MissionFive({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [url, setUrl] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [finished, setFinished] = useState(false);
  const localOnly = Boolean(url && isLoopbackAddress(url));

  useEffect(() => {
    const cardUrl = getCardPageUrl(window.location.origin) ?? "";
    setUrl(cardUrl); setAddress(cardUrl);
  }, []);

  async function copyLink() {
    try { await navigator.clipboard.writeText(url); setMessage("참여 주소를 복사했습니다."); }
    catch { setMessage("주소를 직접 선택해 복사해 주세요."); }
  }

  return <div className="mx-auto w-full max-w-[1180px] px-5 pb-14 pt-7 sm:px-8 lg:px-10">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <button onClick={onBack} className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-bold text-slate-600 hover:text-[#0d7771] focus-visible:outline-2 focus-visible:outline-teal-700"><ArrowLeft className="size-4" /> 대시보드로 돌아가기</button>
      <span className="rounded-full bg-[#e9f5f3] px-3 py-2 text-sm font-bold text-[#0d615e]">MISSION 05 · 데이터의 유형</span>
    </div>

    {finished ? <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
      <p className="flex items-center gap-2 font-bold text-[#0d7771]"><CheckCircle2 className="size-5" /> 활동 정리</p>
      <h1 className="font-display mt-4 text-3xl font-bold leading-tight">같은 유형의 데이터를 찾았나요?</h1>
      <p className="mt-4 text-base leading-7 text-slate-600">소재가 비슷해도 문자·수치·이미지·소리 중 어떤 방식으로 표현했는지 살펴보세요.</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">{dataTypes.map(item => <article key={item.id} className="rounded-2xl border border-slate-200 p-5"><h2 className="text-lg font-bold text-[#0d615e]">{item.name}</h2><p className="mt-2 text-base leading-7 text-slate-600">{item.description}</p></article>)}</div>
      <div className="mt-6 rounded-2xl bg-[#e9f5f3] p-6 text-base leading-8">‘비’와 관련된 카드도 <strong>비 올 확률은 수치</strong>, <strong>우산 그림은 이미지</strong>, <strong>빗소리는 소리</strong>, <strong>날씨 설명 문장은 문자</strong> 데이터입니다.</div>
      <div className="mt-7 flex flex-wrap gap-3 sm:justify-end"><Button variant="outline" className="h-auto min-h-12 rounded-xl px-6 py-3 text-base" onClick={() => setFinished(false)}>QR코드 다시 보기</Button><Button className="h-auto min-h-12 whitespace-normal rounded-xl px-6 py-3 text-base" onClick={onComplete}>미션 완료하고 대시보드로 <ArrowRight className="size-4" /></Button></div>
    </section> : <>
      <header className="mb-7">
        <p className="text-sm font-bold tracking-wider text-[#0d7771]">휴대폰으로 함께하는 모둠 활동</p>
        <h1 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">데이터 할리갈리</h1>
        <p className="mt-3 text-lg leading-8 text-slate-600">같은 유형이 <strong className="text-slate-900">3장 이상</strong> 보이면, 간식을 하나 먼저 가져가세요!</p>
      </header>

      <div className="grid items-start gap-6 xl:grid-cols-[1fr_1.05fr]">
        <section className="min-w-0 rounded-[28px] border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <h2 className="flex items-center justify-center gap-2 text-xl font-bold"><Smartphone className="size-5 text-[#0d7771]" /> 휴대폰으로 참여하기</h2>
          <p className="mt-2 text-base leading-7 text-slate-500">모둠원 모두 같은 QR코드를 스캔하세요.</p>
          <div className="mx-auto my-6 flex aspect-square w-full max-w-[300px] items-center justify-center rounded-3xl border border-slate-200 bg-white p-3">
            {url && !localOnly ? <QRCodeSVG value={url} size={280} level="M" marginSize={4} title="데이터 할리갈리 휴대폰 참여 QR코드" className="h-auto w-full" /> : <div className="p-4"><QrCode className="mx-auto size-14 text-[#0d7771]" aria-hidden="true" /><p className="mt-4 text-base font-bold">{localOnly ? "휴대폰 참여 주소가 필요합니다" : "참여 주소 확인 중"}</p><p className="mt-2 text-sm leading-6 text-slate-500">{localOnly ? "배포된 사이트에서 열면 QR코드가 자동으로 표시됩니다." : "잠시만 기다려 주세요."}</p></div>}
          </div>
          {localOnly && <p className="mb-5 rounded-xl bg-amber-50 p-4 text-left text-sm leading-6 text-amber-900">현재 주소는 이 컴퓨터의 미리보기입니다. 휴대폰에서 접속하려면 배포된 사이트에서 미션 05를 열거나, 아래에 휴대폰에서 접속 가능한 사이트 주소를 입력해 주세요.</p>}
          {url && <>
            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0d7771] px-4 py-3 text-base font-bold text-white hover:bg-[#09625e]">{localOnly ? "이 컴퓨터에서 카드 보기" : "카드 화면 직접 열기"}<ExternalLink className="size-4" /></a>
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-left"><p className="min-w-0 flex-1 break-all text-sm leading-6 text-slate-600 select-all">{url}</p><button onClick={copyLink} aria-label="참여 주소 복사" className="grid size-11 shrink-0 place-items-center rounded-lg text-slate-600 hover:bg-slate-200"><Copy className="size-4" /></button></div>
          </>}
          <details className="mt-5 text-left">
            <summary className="cursor-pointer text-sm font-semibold text-slate-600">접속 주소 변경</summary>
            <form className="mt-3 space-y-3" onSubmit={event => {
              event.preventDefault();
              const nextUrl = getCardPageUrl(address);
              if (!nextUrl) { setMessage("http:// 또는 https://로 시작하는 올바른 사이트 주소를 입력해 주세요."); return; }
              if (isLoopbackAddress(nextUrl)) { setMessage("localhost 주소는 휴대폰에서 접속할 수 없습니다. 배포 주소나 같은 네트워크의 접속 주소를 입력해 주세요."); return; }
              setUrl(nextUrl); setAddress(nextUrl); setMessage("입력한 주소로 QR코드를 바꿨습니다. 해당 사이트에 미션 05가 반영되어 있어야 합니다.");
            }}>
              <label htmlFor="card-site-address" className="block text-sm font-semibold">휴대폰에서 접속할 사이트 주소</label>
              <Input id="card-site-address" value={address} onChange={event => { setAddress(event.target.value); setMessage(""); }} type="url" maxLength={512} required className="h-12 text-base md:text-base" />
              <Button type="submit" variant="outline" className="min-h-11 w-full rounded-xl text-base">QR코드에 적용</Button>
            </form>
          </details>
          <p role="status" className="mt-3 text-left text-sm leading-6 text-[#0d615e]">{message}</p>
        </section>

        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="bg-[#113f4b] p-6 text-white sm:p-8"><p className="flex items-center gap-2 text-sm font-bold text-teal-100"><Users className="size-4" /> 3명 이상 · 각자 휴대폰 1대 · 간식</p><h2 className="mt-4 text-2xl font-bold">카드를 넘기고,<br />같은 유형 3장을 찾으세요.</h2></div>
          <ol className="space-y-5 p-6 sm:p-8">{[
            ["함께 준비하기", "모둠 가운데 간식을 놓고, 서로의 휴대폰 화면이 보이게 놓습니다."],
            ["차례대로 넘기기", "자기 차례에 화면을 한 번 터치합니다. 카드 순서는 휴대폰마다 다릅니다."],
            ["간식 하나 가져가기", "현재 공개된 카드 중 같은 유형이 3장 이상이면 간식을 하나 먼저 가져갑니다."],
            ["이유를 말하고 계속하기", "같은 유형인 카드 세 장을 짚어 설명합니다. 헷갈리면 ‘유형 확인’을 누르고, 다음 사람부터 계속합니다."],
          ].map(([title, description], i) => <li key={title} className="flex gap-4"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#e9f5f3] text-sm font-bold text-[#0d615e]">{i + 1}</span><div><h3 className="text-base font-bold">{title}</h3><p className="mt-1 text-base leading-7 text-slate-600">{description}</p></div></li>)}</ol>
          <p className="mx-6 mb-6 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600 sm:mx-8 sm:mb-8">지나간 카드는 세지 않습니다. 같은 카드 조합으로는 간식을 한 번만 가져갑니다. 그림 자체보다 카드 이름에 적힌 대상의 유형을 살펴보세요.</p>
        </section>
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4"><p className="text-sm text-slate-500">문자·수치·이미지·소리 각 8장, 총 32장</p><Button variant="outline" className="h-auto min-h-12 rounded-xl px-6 py-3 text-base" onClick={() => setFinished(true)}>활동 마치고 정리하기 <ArrowRight className="size-4" /></Button></div>
    </>}
  </div>;
}
