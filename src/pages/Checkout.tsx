import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CircleCheck, Smartphone, CreditCard, ChevronLeft, Lock } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import CurrentPulseButton from "@/components/ui/CurrentPulseButton";
import { useCart } from "@/hooks/useCart";
import { getProductById } from "@/lib/mockProducts";
import { createOrder} from "@/lib/checkout";
import { PaymentMethod, DeliveryDetails, Order } from "@/types/marketplace";
import { cn } from "@/lib/utils";

/*
  DEMO CHECKOUT — not connected to a real payment processor.

  This mirrors the real, documented Paystack Ghana mobile money flow
  (choose network -> enter MoMo number -> phone prompt with OTP -> enter
  PIN -> confirm) closely enough to demo convincingly, but every step
  after "Pay now" is simulated locally with timeouts. No card numbers,
  MoMo numbers, or OTPs entered here are sent anywhere or stored beyond
  this session. A real integration would replace the simulated steps
  with actual Paystack Inline JS / Popup + a backend verify call.
*/

type Step = "delivery" | "payment" | "confirming" | "success";

const DELIVERY_FEE = 8;

const paymentOptions: { id: PaymentMethod; label: string; sub: string; icon: typeof Smartphone }[] = [
  { id: "mtn", label: "MTN Mobile Money", sub: "Pay with your MTN MoMo number", icon: Smartphone },
  { id: "telecel", label: "Telecel Cash", sub: "Pay with your Telecel Cash number", icon: Smartphone },
  { id: "airteltigo", label: "AirtelTigo Money", sub: "Pay with your AirtelTigo number", icon: Smartphone },
  { id: "card", label: "Card (via Paystack)", sub: "Visa, Mastercard, Verve", icon: CreditCard },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { lines, clear } = useCart();
  const [step, setStep] = useState<Step>("delivery");
  const [delivery, setDelivery] = useState<DeliveryDetails>({ fullName: "", phone: "", hall: "", notes: "" });
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [momoNumber, setMomoNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [confirmStage, setConfirmStage] = useState<"prompt" | "pin">("prompt");
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const items = useMemo(
    () =>
      lines
        .map((line) => ({ line, product: getProductById(line.productId) }))
        .filter((entry) => entry.product),
    [lines],
  );

  const subtotal = items.reduce((sum, { line, product }) => sum + line.quantity * (product?.price ?? 0), 0);
  const total = subtotal + (items.length > 0 ? DELIVERY_FEE : 0);

  const deliveryValid = delivery.fullName.trim() && delivery.phone.trim() && delivery.hall.trim();
  const paymentValid =
    method === "card" ? cardNumber.replace(/\s/g, "").length >= 12 : (momoNumber.trim().length >= 9);

  const handlePay = () => {
    if (!method) return;
    setStep("confirming");
    setConfirmStage("prompt");

    // Simulated Paystack MoMo flow: phone prompt (OTP) -> PIN entry ->
    // success. Timeouts stand in for the real round-trip to a phone.
    setTimeout(() => setConfirmStage("pin"), 1800);
  };

  const handleConfirmPin = () => {
    const order: Order = {
      id: `ord_${Date.now()}`,
      lines,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total,
      delivery,
      paymentMethod: method!,
      status: "paid",
      createdAt: new Date().toISOString(),
    };
    createOrder(lines, delivery, method!);
    setCompletedOrder(order);
    clear();
    setStep("success");
  };

  if (items.length === 0 && step !== "success") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-circuit-navy px-6 text-center">
        <p className="text-sm font-semibold text-board-white">Your cart is empty</p>
        <p className="text-sm text-foreground/50">Add something from the Marketplace first.</p>
        <CurrentPulseButton onClick={() => navigate("/marketplace")} size="sm">
          Back to Marketplace
        </CurrentPulseButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-circuit-navy px-6 pb-24">
      {step !== "success" && (
        <button
          onClick={() => (step === "delivery" ? navigate("/marketplace") : setStep("delivery"))}
          className="mb-2 flex items-center gap-1 pt-2 text-sm text-foreground/50 hover:text-aces-blue"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
      )}

      <PageHeader
        eyebrow="demo checkout"
        title={step === "success" ? "Order Confirmed" : "Checkout"}
        description={
          step === "success"
            ? "This is a demo — no real payment was processed."
            : "No real payment is processed here — this is a working demo of the flow."
        }
      />

      <AnimatePresence mode="wait">
        {step === "delivery" && (
          <motion.div key="delivery" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
            <DeliveryForm
              delivery={delivery}
              onChange={setDelivery}
              onNext={() => setStep("payment")}
              valid={!!deliveryValid}
            />
            <OrderSummary items={items} subtotal={subtotal} deliveryFee={DELIVERY_FEE} total={total} />
          </motion.div>
        )}

        {step === "payment" && (
          <motion.div key="payment" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
            <PaymentForm
              method={method}
              onSelectMethod={setMethod}
              momoNumber={momoNumber}
              onMomoChange={setMomoNumber}
              cardNumber={cardNumber}
              onCardChange={setCardNumber}
              onPay={handlePay}
              valid={!!method && paymentValid}
              total={total}
            />
          </motion.div>
        )}

        {step === "confirming" && (
          <motion.div key="confirming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <ConfirmingPanel
              stage={confirmStage}
              method={method!}
              destination={method === "card" ? cardNumber : momoNumber}
              onConfirmPin={handleConfirmPin}
            />
          </motion.div>
        )}

        {step === "success" && completedOrder && (
          <motion.div key="success" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <SuccessPanel order={completedOrder} onDone={() => navigate("/marketplace")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- Delivery step ----------

function DeliveryForm({
  delivery,
  onChange,
  onNext,
  valid,
}: {
  delivery: DeliveryDetails;
  onChange: (d: DeliveryDetails) => void;
  onNext: () => void;
  valid: boolean;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4">
      <Field
        label="Full name"
        value={delivery.fullName}
        onChange={(v) => onChange({ ...delivery, fullName: v })}
        placeholder="Kwame Mensah"
      />
      <Field
        label="Phone number"
        value={delivery.phone}
        onChange={(v) => onChange({ ...delivery, phone: v })}
        placeholder="024 XXX XXXX"
        type="tel"
      />
      <Field
        label="Hall / hostel / address"
        value={delivery.hall}
        onChange={(v) => onChange({ ...delivery, hall: v })}
        placeholder="e.g. Unity Hall, Room B12"
      />
      <Field
        label="Delivery notes (optional)"
        value={delivery.notes ?? ""}
        onChange={(v) => onChange({ ...delivery, notes: v })}
        placeholder="e.g. Call when you're at the gate"
      />

      <CurrentPulseButton onClick={onNext} disabled={!valid} className="mt-2 w-full">
        Continue to payment
      </CurrentPulseButton>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-foreground/50">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-foreground/[0.03] px-4 py-3 text-sm text-board-white outline-none transition-colors focus:border-aces-blue/50 placeholder:text-foreground/30"
      />
    </div>
  );
}

// ---------- Payment step ----------

function PaymentForm({
  method,
  onSelectMethod,
  momoNumber,
  onMomoChange,
  cardNumber,
  onCardChange,
  onPay,
  valid,
  total,
}: {
  method: PaymentMethod | null;
  onSelectMethod: (m: PaymentMethod) => void;
  momoNumber: string;
  onMomoChange: (v: string) => void;
  cardNumber: string;
  onCardChange: (v: string) => void;
  onPay: () => void;
  valid: boolean;
  total: number;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4">
      <p className="font-mono text-xs uppercase tracking-widest text-aces-blue/80">
        Choose payment method
      </p>

      <div className="flex flex-col gap-2">
        {paymentOptions.map((opt) => {
          const Icon = opt.icon;
          const active = method === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelectMethod(opt.id)}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors",
                active ? "border-aces-blue/50 bg-aces-blue/5" : "border-border hover:border-aces-blue/30",
              )}
            >
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", active ? "bg-aces-blue/15 text-aces-blue" : "bg-foreground/5 text-foreground/50")}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-board-white">{opt.label}</p>
                <p className="text-xs text-foreground/40">{opt.sub}</p>
              </div>
              <div className={cn("h-4 w-4 shrink-0 rounded-full border-2", active ? "border-aces-blue bg-aces-blue" : "border-foreground/20")} />
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {method && method !== "card" && (
          <motion.div key="momo" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
            <Field
              label={`${paymentOptions.find((o) => o.id === method)?.label} number`}
              value={momoNumber}
              onChange={onMomoChange}
              placeholder="024 XXX XXXX"
              type="tel"
            />
          </motion.div>
        )}
        {method === "card" && (
          <motion.div key="card" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
            <Field
              label="Card number"
              value={cardNumber}
              onChange={onCardChange}
              placeholder="4084 0840 8408 4081"
              type="text"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-1 flex items-center gap-1.5 text-xs text-foreground/40">
        <Lock className="h-3 w-3" />
        Demo only — nothing entered here is sent or stored beyond this session.
      </div>

      <CurrentPulseButton onClick={onPay} disabled={!valid} className="mt-2 w-full">
        Pay GHS {total.toFixed(2)}
      </CurrentPulseButton>
    </div>
  );
}

// ---------- Confirming step (simulated OTP / PIN, matches real Paystack MoMo flow) ----------

function ConfirmingPanel({
  stage,
  method,
  destination,
  onConfirmPin,
}: {
  stage: "prompt" | "pin";
  method: PaymentMethod;
  destination: string;
  onConfirmPin: () => void;
}) {
  const [pin, setPin] = useState("");
  const isMomo = method !== "card";

  return (
    <div className="flex flex-col items-center gap-5 py-10 text-center">
      {stage === "prompt" ? (
        <>
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-aces-blue/10 text-aces-blue"
          >
            <Smartphone className="h-7 w-7" />
          </motion.div>
          <div>
            <p className="text-sm font-semibold text-board-white">
              {isMomo ? "Check your phone" : "Verifying card"}
            </p>
            <p className="mt-1 max-w-xs text-sm text-foreground/50">
              {isMomo
                ? `A payment prompt was sent to ${destination || "your number"}. Approve it to continue.`
                : "Confirming your card details with Paystack..."}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-aces-blue/10 text-aces-blue">
            <Lock className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-board-white">Enter your PIN</p>
            <p className="mt-1 max-w-xs text-sm text-foreground/50">
              Confirm the payment with your {isMomo ? "mobile money" : "card"} PIN.
            </p>
          </div>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            placeholder="••••"
            className="w-32 rounded-lg border border-border bg-foreground/[0.03] px-4 py-3 text-center text-lg tracking-[0.5em] text-board-white outline-none focus:border-aces-blue/50"
          />
          <CurrentPulseButton onClick={onConfirmPin} disabled={pin.length < 4} className="w-full max-w-xs">
            Confirm
          </CurrentPulseButton>
        </>
      )}
    </div>
  );
}

// ---------- Success step ----------

function SuccessPanel({ order, onDone }: { order: Order; onDone: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 py-8 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-aces-blue/10 text-aces-blue"
      >
        <CircleCheck className="h-8 w-8" />
      </motion.div>

      <div>
        <p className="text-lg font-semibold text-board-white">Payment successful</p>
        <p className="mt-1 text-sm text-foreground/50">
          Order <span className="font-mono text-foreground/70">{order.id}</span> — GHS{" "}
          {order.total.toFixed(2)} paid via{" "}
          {paymentOptions.find((o) => o.id === order.paymentMethod)?.label}
        </p>
      </div>

      <div className="w-full rounded-lg border border-border bg-foreground/[0.03] p-4 text-left">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-foreground/40">
          Delivering to
        </p>
        <p className="text-sm text-board-white">{order.delivery.fullName}</p>
        <p className="text-sm text-foreground/60">{order.delivery.hall}</p>
        <p className="text-sm text-foreground/60">{order.delivery.phone}</p>
      </div>

      <CurrentPulseButton onClick={onDone} className="w-full">
        Back to Marketplace
      </CurrentPulseButton>
    </div>
  );
}

// ---------- Shared order summary ----------

function OrderSummary({
  items,
  subtotal,
  deliveryFee,
  total,
}: {
  items: { line: { productId: string; quantity: number }; product: ReturnType<typeof getProductById> }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}) {
  return (
    <div className="rounded-lg border border-border bg-foreground/[0.03] p-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-foreground/40">
        Order summary
      </p>
      <div className="flex flex-col gap-2">
        {items.map(({ line, product }) => (
          <div key={line.productId} className="flex items-center justify-between text-sm">
            <span className="text-foreground/70">
              {product!.title} <span className="text-foreground/30">×{line.quantity}</span>
            </span>
            <span className="text-board-white">GHS {(product!.price * line.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-col gap-1 border-t border-border pt-3">
        <div className="flex items-center justify-between text-xs text-foreground/50">
          <span>Subtotal</span>
          <span>GHS {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-foreground/50">
          <span>Delivery</span>
          <span>GHS {deliveryFee.toFixed(2)}</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-sm font-bold text-board-white">
          <span>Total</span>
          <span>GHS {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
