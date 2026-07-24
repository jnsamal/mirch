import { MessageCircle, Clock, MapPin } from "lucide-react";
import Glass from "./Glass";
import { C } from "../theme";

export default function Visit({ onOrder }) {
  return (
    <section id="visit" className="relative py-20 sm:py-28 px-5 sm:px-8 md:px-14" style={{ background: C.coral }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-stretch">
        <Glass className="rounded-3xl p-8 sm:p-10 flex flex-col justify-between" style={{ color: C.ink }}>
          <div>
            <h2
              className="text-3xl sm:text-4xl mb-6"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: C.ink }}
            >
              Every order runs through WhatsApp
            </h2>
            <p className="text-sm sm:text-base mb-6" style={{ color: C.inkSoft }}>
              Tap the button, and a chat opens with your order already typed out.
              Confirm it, and we start cooking.
            </p>
          </div>
          <button
            onClick={() => onOrder("the full menu")}
            className="inline-flex w-fit items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03]"
            style={{ background: C.red, color: "#fff" }}
          >
            <MessageCircle size={18} />
            Start an order on WhatsApp
          </button>
        </Glass>

        <div className="grid grid-rows-2 gap-6">
          <Glass className="rounded-3xl p-7 flex items-start gap-4" style={{ color: C.ink }}>
            <Clock size={22} style={{ color: C.red, flexShrink: 0, marginTop: 2 }} />
            <div>
              <h3 className="font-semibold mb-1" style={{ fontFamily: "'Fraunces', serif", fontSize: 18 }}>
                Kitchen hours
              </h3>
              <p className="text-sm" style={{ color: C.inkSoft }}>
                Tue – Sun, 12:00 pm – 10:30 pm. Closed Mondays.
              </p>
            </div>
          </Glass>
          <Glass className="rounded-3xl p-7 flex items-start gap-4" style={{ color: C.ink }}>
            <MapPin size={22} style={{ color: C.red, flexShrink: 0, marginTop: 2 }} />
            <div>
              <h3 className="font-semibold mb-1" style={{ fontFamily: "'Fraunces', serif", fontSize: 18 }}>
                Where to find us
              </h3>
              <p className="text-sm" style={{ color: C.inkSoft }}>
                Civil Township Road, Rourkela, Odisha. Pickup and local delivery.
              </p>
            </div>
          </Glass>
        </div>
      </div>
    </section>
  );
}
