export type DataType = "text" | "number" | "image" | "sound";
export type DataCard = { id: string; label: string; emoji: string; type: DataType; explanation: string };

export const dataTypes: { id: DataType; name: string; description: string }[] = [
  { id: "text", name: "문자 데이터", description: "글자와 문장으로 내용을 전합니다." },
  { id: "number", name: "수치 데이터", description: "개수나 크기, 정도를 수로 나타냅니다." },
  { id: "image", name: "이미지 데이터", description: "사진이나 그림으로 모습을 나타냅니다." },
  { id: "sound", name: "소리 데이터", description: "목소리나 주변 소리를 기록합니다." },
];

export const dataCards: DataCard[] = [
  { id: "diary", label: "오늘의 일기", emoji: "📝", type: "text", explanation: "오늘 있었던 일을 글로 쓴 일기는 문자 데이터입니다." },
  { id: "message", label: "친구의 카톡 글 메시지", emoji: "💬", type: "text", explanation: "카톡으로 보낸 글 메시지는 문자 데이터입니다. 사진이나 음성 메시지와 구분해 보세요." },
  { id: "notice", label: "알림장의 안내 문장", emoji: "📒", type: "text", explanation: "준비물이나 일정을 글로 안내한 문장은 문자 데이터입니다." },
  { id: "lyrics", label: "노래 가사", emoji: "🎵", type: "text", explanation: "노랫말을 글로 적은 가사는 문자 데이터입니다. 녹음한 노래와는 유형이 다릅니다." },
  { id: "letter", label: "감사 편지의 글", emoji: "✉️", type: "text", explanation: "감사하는 마음을 문장으로 쓴 편지의 글은 문자 데이터입니다." },
  { id: "caption", label: "영상의 자막 문장", emoji: "🎬", type: "text", explanation: "영상 속 말을 글로 표시한 자막 문장은 문자 데이터입니다. 영상 전체를 묻는 카드가 아닙니다." },
  { id: "review", label: "책을 읽고 쓴 감상문", emoji: "📖", type: "text", explanation: "책에 대한 생각을 문장으로 쓴 감상문은 문자 데이터입니다." },
  { id: "forecast", label: "날씨 예보의 설명 문장", emoji: "☔", type: "text", explanation: "‘오후에 비가 내리겠습니다’처럼 글로 설명한 내용은 문자 데이터입니다." },
  { id: "price", label: "물건의 가격", emoji: "💰", type: "number", explanation: "물건의 가격은 금액을 수로 나타낸 수치 데이터입니다." },
  { id: "steps", label: "어제 걸음 수", emoji: "👣", type: "number", explanation: "걸은 횟수를 센 값은 수치 데이터입니다." },
  { id: "rain-chance", label: "비 올 확률 (%)", emoji: "☔", type: "number", explanation: "비가 올 가능성을 백분율로 나타낸 값은 수치 데이터입니다. 빗소리와 구분해 보세요." },
  { id: "temperature", label: "교실 온도 (℃)", emoji: "🌡️", type: "number", explanation: "교실의 온도를 측정한 값은 수치 데이터입니다." },
  { id: "height", label: "학생의 키 (cm)", emoji: "📏", type: "number", explanation: "키를 센티미터 단위로 측정한 값은 수치 데이터입니다." },
  { id: "headcount", label: "체험학습 참가 인원", emoji: "🚌", type: "number", explanation: "참가하는 사람의 수를 센 값은 수치 데이터입니다." },
  { id: "loans", label: "이번 달 도서 대출 횟수", emoji: "📚", type: "number", explanation: "대출이 일어난 횟수를 센 값은 수치 데이터입니다. 책의 내용과는 다릅니다." },
  { id: "running", label: "50m 달리기 기록 (초)", emoji: "⏱️", type: "number", explanation: "달리는 데 걸린 시간을 초로 측정한 값은 수치 데이터입니다." },
  { id: "cat", label: "고양이 그림", emoji: "🎨", type: "image", explanation: "고양이의 모습을 그린 그림은 이미지 데이터입니다." },
  { id: "apple", label: "사과 사진", emoji: "🍎", type: "image", explanation: "사과를 촬영한 사진은 이미지 데이터입니다." },
  { id: "galaxy", label: "은하수 사진", emoji: "🌌", type: "image", explanation: "은하수의 모습을 촬영한 사진은 이미지 데이터입니다." },
  { id: "playground", label: "운동장 사진", emoji: "🏫", type: "image", explanation: "운동장의 모습을 찍은 사진은 이미지 데이터입니다." },
  { id: "umbrella", label: "우산 그림", emoji: "☔", type: "image", explanation: "우산을 그린 그림은 이미지 데이터입니다. 비 올 확률이나 빗소리와 구분해 보세요." },
  { id: "dog-photo", label: "강아지 사진", emoji: "🐕", type: "image", explanation: "강아지의 모습을 촬영한 사진은 이미지 데이터입니다. 강아지가 짖는 소리와는 다릅니다." },
  { id: "flower", label: "꽃 관찰 그림", emoji: "🌷", type: "image", explanation: "관찰한 꽃의 모습을 그린 그림은 이미지 데이터입니다." },
  { id: "lunch", label: "오늘 급식 사진", emoji: "🍱", type: "image", explanation: "급식의 모습을 찍은 사진은 이미지 데이터입니다. 글로 쓴 식단표를 뜻하지 않습니다." },
  { id: "wave", label: "파도 소리", emoji: "🌊", type: "sound", explanation: "파도가 치는 소리를 녹음하면 소리 데이터가 됩니다." },
  { id: "bird", label: "산새 소리", emoji: "🐦", type: "sound", explanation: "새가 지저귀는 소리를 녹음한 자료는 소리 데이터입니다." },
  { id: "rain-sound", label: "빗소리", emoji: "☔", type: "sound", explanation: "비가 내리는 소리를 녹음한 자료는 소리 데이터입니다." },
  { id: "bark", label: "강아지 짖는 소리", emoji: "🐕", type: "sound", explanation: "강아지가 짖는 소리를 기록한 자료는 소리 데이터입니다." },
  { id: "clap", label: "박수 소리", emoji: "👏", type: "sound", explanation: "손뼉 치는 소리를 녹음한 자료는 소리 데이터입니다." },
  { id: "horn", label: "자동차 경적 소리", emoji: "🚗", type: "sound", explanation: "자동차 경적을 녹음한 자료는 소리 데이터입니다." },
  { id: "school-sound", label: "학교 종소리", emoji: "🏫", type: "sound", explanation: "수업의 시작을 알리는 종소리를 녹음하면 소리 데이터가 됩니다." },
  { id: "song", label: "녹음한 노래", emoji: "🎵", type: "sound", explanation: "노래를 녹음한 자료는 소리 데이터입니다. 글로 적힌 가사와는 유형이 다릅니다." },
];

/** Each device shuffles locally; keep every card once per deck and avoid a boundary repeat. */
export function shuffleDataCards(previousId?: string, random: () => number = Math.random): DataCard[] {
  const deck = [...dataCards];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  if (deck[0].id === previousId) [deck[0], deck[1]] = [deck[1], deck[0]];
  return deck;
}

export function getCardPageUrl(siteAddress: string): string | null {
  try {
    const url = new URL(siteAddress.trim());
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) return null;
    return new URL("/data-cards", url.origin).href;
  } catch { return null; }
}

export function isLoopbackAddress(address: string): boolean {
  try {
    const host = new URL(address).hostname;
    return host === "localhost" || host.endsWith(".localhost") || host === "[::1]" || host.startsWith("127.") || host === "0.0.0.0";
  } catch { return false; }
}
