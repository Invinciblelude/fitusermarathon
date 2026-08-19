import { CASH_APP_QR, CASH_APP_TAG, CASH_APP_URL } from "@/lib/pay";
import Image from "next/image";

interface PayQrProps {
  compact?: boolean;
}

export function PayQr({ compact = false }: PayQrProps) {
  if (compact) {
    return (
      <a
        href={CASH_APP_URL}
        className="flex items-center gap-4 bg-black p-3 sm:p-4"
      >
        <Image
          src={CASH_APP_QR}
          alt={`Cash App ${CASH_APP_TAG} payment QR`}
          width={656}
          height={656}
          className="h-[5.5rem] w-[5.5rem] shrink-0 bg-white p-1.5 sm:h-24 sm:w-24"
        />
        <div>
          <p className="fu-kicker">Pay</p>
          <p className="fu-display mt-1 text-lg font-semibold sm:text-xl">
            Cash App {CASH_APP_TAG}
          </p>
          <p className="mt-1 text-xs text-white/65">
            $100 shirt · $10 a run. Cash at the park works too.
          </p>
        </div>
      </a>
    );
  }

  return (
    <div id="pay" className="fu-card overflow-hidden">
      <div className="grid items-center gap-6 p-6 sm:grid-cols-[auto_1fr] sm:p-8">
        <a href={CASH_APP_URL} className="mx-auto block bg-white p-3">
          <Image
            src={CASH_APP_QR}
            alt={`Cash App ${CASH_APP_TAG} payment QR`}
            width={656}
            height={656}
            className="h-40 w-40 sm:h-44 sm:w-44"
            priority
          />
        </a>
        <div>
          <p className="fu-kicker">Pay Fit User</p>
          <h2 className="fu-display mt-2 text-2xl font-semibold">
            Cash App {CASH_APP_TAG}
          </h2>
          <p className="mt-3 text-muted">
            Scan for the $100 shirt and $10 each group run. Under 16 is free.
            Cash at the park is fine if the phone is dead.
          </p>
          <a href={CASH_APP_URL} className="fu-btn-sm mt-5 inline-flex">
            Open Cash App
          </a>
        </div>
      </div>
    </div>
  );
}
