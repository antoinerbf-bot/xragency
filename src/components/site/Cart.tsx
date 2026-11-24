import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { X, Trash2, MessageCircle, ShoppingBag, Check, Send, CheckCircle2 } from "lucide-react";
import { useCart, type CartItem } from "@/hooks/useCart";
import { CONTACT } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const CART_COPY = {
  fr: {
    emptyCount: "Aucune prestation choisie",
    empty: "Votre sélection est vide",
    choose: "Ajoutez des prestations depuis nos pages services ou le configurateur.",
    total: "Total ponctuel",
    monthly: "Total mensuel",
    annual: "Total annuel",
    request: "Demander un devis WhatsApp",
    send: "Envoyer ma sélection sur WhatsApp",
    requestQuoteCrm: "Recevoir mon devis officiel par email",
    clear: "Vider",
    terms: "Tarifs de référence en EUR · Périmètre et conditions confirmés sur devis avant engagement.",
    selected: "Ma sélection",
    add: "Ajouter à ma sélection",
    added: "Dans ma sélection",
    close: "Fermer",
    open: "Ouvrir ma sélection",
    remove: "Retirer",
    quote: "Bonjour XR Agency, je souhaite obtenir un devis personnalisé.",
    intro: "Bonjour XR Agency, je suis intéressé par les services suivants :",
    finish: "Pouvons-nous planifier un échange ?",
    formName: "Nom / Société *",
    formEmail: "E-mail *",
    formPhone: "Téléphone / WhatsApp",
    formSubmit: "Envoyer ma sélection à XR Agency",
    formSending: "Envoi...",
    formSuccess: "Sélection transmise ! Référence :",
    formError: "Erreur lors de l'envoi. Essayez WhatsApp.",
  },
  en: {
    emptyCount: "No services selected",
    empty: "Your selection is empty",
    choose: "Add services from our service pages or the 3-step configurator.",
    total: "One-time total",
    monthly: "Monthly total",
    annual: "Annual total",
    request: "Request a quote on WhatsApp",
    send: "Send my selection on WhatsApp",
    requestQuoteCrm: "Receive my official quote by email",
    clear: "Clear",
    terms: "Reference pricing in EUR · Scope and terms confirmed in writing before commitment.",
    selected: "My selection",
    add: "Add to my selection",
    added: "In my selection",
    close: "Close",
    open: "Open my selection",
    remove: "Remove",
    quote: "Hello XR Agency, I'd like a personalised quote.",
    intro: "Hello XR Agency, I'm interested in the following services:",
    finish: "Can we schedule a call?",
    formName: "Name / Company *",
    formEmail: "Email *",
    formPhone: "Phone / WhatsApp",
    formSubmit: "Send selection to XR Agency",
    formSending: "Sending...",
    formSuccess: "Selection received! Reference:",
    formError: "Could not send right now. Try WhatsApp.",
  },
  vi: {
    emptyCount: "Chưa chọn dịch vụ nào",
    empty: "Danh sách lựa chọn đang trống",
    choose: "Thêm dịch vụ từ trang dịch vụ hoặc công cụ báo giá.",
    total: "Tổng một lần",
    monthly: "Tổng hàng tháng",
    annual: "Tổng hàng năm",
    request: "Yêu cầu báo giá qua WhatsApp",
    send: "Gửi lựa chọn qua WhatsApp",
    requestQuoteCrm: "Nhận báo giá chính thức qua email",
    clear: "Xóa tất cả",
    terms: "Giá tham chiếu EUR · Phạm vi và điều khoản xác nhận trước khi ký.",
    selected: "Lựa chọn của tôi",
    add: "Thêm vào lựa chọn",
    added: "Đã chọn",
    close: "Đóng",
    open: "Mở danh sách lựa chọn",
    remove: "Xóa",
    quote: "Xin chào XR Agency, tôi muốn nhận báo giá tùy chỉnh.",
    intro: "Xin chào XR Agency, tôi quan tâm đến các dịch vụ sau:",
    finish: "Chúng ta có thể lên lịch trao đổi không?",
    formName: "Tên / Công ty *",
    formEmail: "Email *",
    formPhone: "Điện thoại / WhatsApp",
    formSubmit: "Gửi lựa chọn tới XR Agency",
    formSending: "Đang gửi...",
    formSuccess: "Đã tiếp nhận! Mã tham chiếu:",
    formError: "Chưa thể gửi lúc này. Hãy thử WhatsApp.",
  },
  ar: {
    emptyCount: "لم يتم اختيار أي خدمة",
    empty: "قائمة اختياراتك فارغة",
    choose: "أضف خدمات من صفحات الخدمات أو من مُهيّئ العرض.",
    total: "الإجمالي لمرة واحدة",
    monthly: "الإجمالي الشهري",
    annual: "الإجمالي السنوي",
    request: "طلب عرض سعر عبر واتساب",
    send: "إرسال اختياراتي عبر واتساب",
    requestQuoteCrm: "استلام عرض رسمي عبر البريد",
    clear: "تفريغ",
    terms: "أسعار مرجعية باليورو · يُؤكد النطاق والشروط كتابياً قبل الالتزام.",
    selected: "اختياراتي",
    add: "أضف إلى اختياراتي",
    added: "في اختياراتي",
    close: "إغلاق",
    open: "فتح اختياراتي",
    remove: "إزالة",
    quote: "مرحباً XR Agency، أود الحصول على عرض سعر مخصص.",
    intro: "مرحباً XR Agency، أنا مهتم بالخدمات التالية:",
    finish: "هل يمكننا تحديد موعد للتواصل؟",
    formName: "الاسم / الشركة *",
    formEmail: "البريد الإلكتروني *",
    formPhone: "الهاتف / واتساب",
    formSubmit: "إرسال اختياراتي إلى XR Agency",
    formSending: "جارٍ الإرسال...",
    formSuccess: "تم استلام اختياراتك! المرجع:",
    formError: "تعذر الإرسال حالياً. جرّب واتساب.",
  },
  ru: {
    emptyCount: "Услуги не выбраны",
    empty: "Список выбранных услуг пуст",
    choose: "Добавьте услуги со страниц каталога или в конфигураторе сметы.",
    total: "Разовая сумма",
    monthly: "В месяц",
    annual: "В год",
    request: "Запросить смету в WhatsApp",
    send: "Отправить выбор в WhatsApp",
    requestQuoteCrm: "Получить официальную смету на email",
    clear: "Очистить",
    terms: "Тарифы в EUR · Финальный объём и условия подтверждаются в смете.",
    selected: "Мой выбор",
    add: "Добавить в мой выбор",
    added: "В корзине",
    close: "Закрыть",
    open: "Открыть мой выбор",
    remove: "Удалить",
    quote: "Здравствуйте, XR Agency! Хочу получить индивидуальную смету.",
    intro: "Здравствуйте, XR Agency! Меня интересуют следующие услуги:",
    finish: "Можем ли мы договориться о звонке?",
    formName: "Имя / Компания *",
    formEmail: "Email *",
    formPhone: "Телефон / WhatsApp",
    formSubmit: "Отправить выбор в XR Agency",
    formSending: "Отправка...",
    formSuccess: "Заявка принята! Номер:",
    formError: "Не удалось отправить. Попробуйте WhatsApp.",
  },
} as const;

function useCountUpTo(target: number, duration = 350) {
  const [val, setVal] = useState(target);
  const prevRef = useRef(target);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const from = prevRef.current;
    if (from === target) return;
    prevRef.current = target;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return val;
}

export function Cart() {
  const { items, isOpen, close, removeItem, clearCart, total, totalMonthly, totalAnnual, count } =
    useCart();
  const { lang, price } = useLang();
  const copy = CART_COPY[lang] ?? CART_COPY.fr;
  const isRtl = lang === "ar";
  const animatedTotal = useCountUpTo(total, 350);

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const periodShort: Record<string, string> = {
    once: "",
    month:
      lang === "en"
        ? "/mo"
        : lang === "vi"
          ? "/tháng"
          : lang === "ar"
            ? "/شهر"
            : lang === "ru"
              ? "/мес."
              : "/mois",
    year:
      lang === "en"
        ? "/yr"
        : lang === "vi"
          ? "/năm"
          : lang === "ar"
            ? "/سنة"
            : lang === "ru"
              ? "/год"
              : "/an",
  };

  const waMessage = encodeURIComponent(
    items.length === 0
      ? copy.quote
      : `${copy.intro}\n\n${items
          .map(
            (i) =>
              `• ${i.serviceName} — ${i.planName} : ${price(i.priceEur)}${periodShort[i.period]}${i.commitment ? ` (${i.commitment})` : ""}`,
          )
          .join("\n")}\n\n${total > 0 ? `${copy.total} : ${price(total)}` : ""}${
          totalMonthly ? `\n${copy.monthly} : ${price(totalMonthly)}${periodShort.month}` : ""
        }${totalAnnual ? `\n${copy.annual} : ${price(totalAnnual)}${periodShort.year}` : ""}\n\n${copy.finish}`,
  );

  const handleSubmitCartQuote = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim() || items.length === 0) return;
    setSending(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "send_quote",
          client: {
            name: name.trim(),
            company: name.trim(),
            email: email.trim(),
            whatsapp: phone.trim(),
          },
          summary: {
            services: items.map((item) => ({
              label: `${item.serviceName} — ${item.planName}`,
              detail: item.commitment || item.periodLabel || "Prestation sélectionnée",
              price: item.priceEur,
              period: item.period,
            })),
            once: total,
            monthly: totalMonthly,
            annual: totalAnnual,
          },
        }),
      });
      const data = (await res.json()) as { sent?: boolean; quoteId?: string; error?: string };
      if (!res.ok || !data.sent) throw new Error(data.error || copy.formError);
      setQuoteId(data.quoteId || "XR");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : copy.formError);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={close}
        className={cn(
          "fixed inset-0 z-[80] bg-[#171613]/45 backdrop-blur-[2px] transition-opacity duration-300",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Editorial Drawer */}
      <div
        id="cart-panel"
        role="dialog"
        dir={isRtl ? "rtl" : "ltr"}
        aria-label={copy.selected}
        aria-modal="true"
        className={cn(
          "fixed top-0 z-[90] flex h-full w-full max-w-md flex-col border-[#171613]/12 bg-[#F7F4EE] text-[#171613] shadow-2xl transition-transform duration-300 ease-out",
          isRtl ? "left-0 border-r" : "right-0 border-l",
          isOpen ? "translate-x-0" : isRtl ? "-translate-x-full" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#171613]/10 bg-white px-6 py-5">
          <div>
            <h2 className="font-serif text-xl font-medium text-[#171613]">{copy.selected}</h2>
            <p className="mt-0.5 font-mono text-[11px] text-[#57534B]">
              {count === 0
                ? copy.emptyCount
                : `${count} ${
                    lang === "en"
                      ? "service(s) selected"
                      : lang === "vi"
                        ? "dịch vụ đã chọn"
                        : lang === "ar"
                          ? "خدمة محددة"
                          : lang === "ru"
                            ? "услуг выбрано"
                            : `prestation${count > 1 ? "s" : ""} sélectionnée${count > 1 ? "s" : ""}`
                  }`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="rounded-full border border-[#171613]/15 px-3 py-1.5 text-[11px] font-medium text-[#57534B] transition hover:border-[#171613] hover:text-[#171613]"
              >
                {copy.clear}
              </button>
            )}
            <button
              type="button"
              onClick={close}
              aria-label={copy.close}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#171613]/15 bg-[#FAF8F4] text-[#171613] transition hover:border-[#9E7F5A]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-[#171613]/20 bg-white">
                <ShoppingBag className="h-6 w-6 text-[#7D6445]" />
              </div>
              <div>
                <p className="font-serif text-lg text-[#171613]">{copy.empty}</p>
                <p className="mt-1 max-w-xs text-xs text-[#57534B]">{copy.choose}</p>
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-[#171613]/10 bg-white px-4 py-4 shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7D6445]">
                      {item.serviceName}
                    </p>
                    <p className="mt-0.5 font-serif text-base font-medium text-[#171613]">
                      {item.planName}
                    </p>
                    <p className="mt-1 font-mono text-xs font-semibold text-[#171613]">
                      {price(item.priceEur)}
                      {periodShort[item.period]}
                    </p>
                    {item.commitment ? (
                      <p className="mt-1 text-[11px] text-[#7D6445]">{item.commitment}</p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`${copy.remove} ${item.planName}`}
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#171613]/10 bg-[#FAF8F4] text-[#57534B] transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Optional Direct CRM Quote Request inside Cart */}
          {items.length > 0 && showEmailForm && (
            <div className="mt-4 rounded-2xl border border-[#9E7F5A]/35 bg-white p-4">
              {quoteId ? (
                <div className="flex items-start gap-2.5 text-xs text-[#171613]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7D6445]" />
                  <span>
                    {copy.formSuccess} <strong className="font-mono">{quoteId}</strong>
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmitCartQuote} className="space-y-2.5">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={copy.formName}
                    className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] px-3 py-2 text-xs text-[#171613] focus:border-[#9E7F5A] focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={copy.formEmail}
                    className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] px-3 py-2 text-xs text-[#171613] focus:border-[#9E7F5A] focus:outline-none"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={copy.formPhone}
                    className="w-full rounded-xl border border-[#171613]/15 bg-[#FAF8F4] px-3 py-2 text-xs text-[#171613] focus:border-[#9E7F5A] focus:outline-none"
                  />
                  {errorMsg && <p className="text-[11px] text-red-600">{errorMsg}</p>}
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#12110E] py-2.5 text-xs font-semibold text-white transition hover:bg-[#2B2925] disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5 text-white" />
                    {sending ? copy.formSending : copy.formSubmit}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#171613]/10 bg-white px-6 py-5">
          {items.length > 0 && (
            <div className="mb-4 space-y-2">
              {total > 0 ? (
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-[#57534B]">{copy.total}</span>
                  <span key={animatedTotal} className="font-serif text-2xl font-semibold text-[#171613]">
                    {price(animatedTotal)}
                  </span>
                </div>
              ) : null}
              {totalMonthly > 0 ? (
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-[#57534B]">{copy.monthly}</span>
                  <span className="font-serif text-lg font-semibold text-[#7D6445]">
                    {price(totalMonthly)}
                    {periodShort.month}
                  </span>
                </div>
              ) : null}
              {totalAnnual > 0 ? (
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-[#57534B]">{copy.annual}</span>
                  <span className="font-serif text-lg font-semibold text-[#171613]">
                    {price(totalAnnual)}
                    {periodShort.year}
                  </span>
                </div>
              ) : null}
            </div>
          )}

          <div className="space-y-2.5">
            {items.length > 0 && !showEmailForm && (
              <button
                type="button"
                onClick={() => {
                  setShowEmailForm(true);
                  setQuoteId(null);
                  setErrorMsg(null);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#12110E] py-3 text-xs font-semibold text-white transition hover:bg-[#2B2925]"
              >
                <Send className="h-3.5 w-3.5 text-white" />
                {copy.requestQuoteCrm}
              </button>
            )}

            <a
              href={`${CONTACT.whatsapp}?text=${waMessage}`}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#171613]/20 bg-[#FAF8F4] py-3 text-xs font-semibold text-[#171613] transition hover:border-[#9E7F5A] hover:bg-white"
            >
              <MessageCircle className="h-4 w-4 text-[#7D6445]" />
              {items.length === 0 ? copy.request : copy.send}
            </a>
          </div>

          <p className="mt-3 text-center text-[10px] leading-relaxed text-[#57534B]">{copy.terms}</p>
        </div>
      </div>
    </>
  );
}

/* ── Floating Cart Button (shown in Nav) ── */
export function CartFloatingButton() {
  const { count, toggle, isOpen } = useCart();
  const { lang } = useLang();
  const copy = CART_COPY[lang] ?? CART_COPY.fr;
  const [justAdded, setJustAdded] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count > prevCount.current) {
      setJustAdded(true);
      const t = setTimeout(() => setJustAdded(false), 600);
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`${copy.selected} (${count})`}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200",
        isOpen
          ? "border-[#171613] bg-[#171613] text-[#F7F4EE]"
          : "border-[#171613]/15 bg-white text-[#171613] hover:border-[#9E7F5A]",
      )}
    >
      <ShoppingBag className="h-4 w-4" />
      {count > 0 && (
        <span
          className={cn(
            "absolute -right-1.5 -top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#9E7F5A] text-[9px] font-bold text-white transition-all duration-200",
            justAdded && "scale-110",
          )}
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}

/* ── "Add to cart" button for pricing cards ── */
interface AddToCartBtnProps {
  item: Omit<CartItem, "id"> & { id?: string };
  popular?: boolean;
  className?: string;
}

export function AddToCartBtn({ item, popular, className }: AddToCartBtnProps) {
  const { addItem, items } = useCart();
  const { lang } = useLang();
  const copy = CART_COPY[lang] ?? CART_COPY.fr;
  const [added, setAdded] = useState(false);
  const id = item.id ?? `${item.serviceId}-${item.planName}`;
  const isInCart = items.some((i) => i.id === id);

  const handleAdd = () => {
    addItem({ ...item, id });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={cn(
        "flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold transition-all duration-200 active:scale-[0.98]",
        isInCart || added
          ? "border border-[#12110E] bg-[#12110E] text-white"
          : popular
            ? "bg-[#12110E] text-white shadow-md hover:bg-[#2B2925] hover:scale-[1.01]"
            : "border border-[#D5D5CF] bg-white text-[#12110E] hover:border-[#12110E] hover:bg-[#F5F5F0]",
        className,
      )}
    >
      {added || isInCart ? (
        <>
          <Check className="h-4 w-4" />
          {copy.added}
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" />
          {copy.add}
        </>
      )}
    </button>
  );
}
