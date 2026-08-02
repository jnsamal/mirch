import Glass from "./Glass";
import Eyebrow from "./Eyebrow";
import { C, display, mono } from "../theme";
import { TEAM } from "../data/team";

// Cycled per card so the row isn't monotone — same palette used
// everywhere else on the site, not arbitrary colours.
const AVATAR_BG = [C.peach, C.coral, C.cream, C.coral, C.peach, C.cream];

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TeamCard({ member, index }) {
  return (
    <Glass className="rounded-2xl p-6 flex flex-col items-center text-center" style={{ color: C.ink }}>
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
        style={{ background: AVATAR_BG[index % AVATAR_BG.length] }}
      >
        <span className="text-xl" style={display(700, { color: C.ink })}>
          {initials(member.name)}
        </span>
      </div>
      <h3 style={display(600, { fontSize: 17 })}>{member.name}</h3>
      <p className="text-xs uppercase tracking-wide mt-1 mb-3" style={mono({ color: C.red })}>
        {member.role}
      </p>
      <p className="text-sm" style={{ color: C.inkSoft }}>
        {member.blurb}
      </p>
    </Glass>
  );
}

export default function TeamSection() {
  return (
    <section className="relative py-20 sm:py-28 px-5 sm:px-8 md:px-14" style={{ background: C.peach }}>
      <div className="max-w-6xl mx-auto">
        <Eyebrow color={C.ink} opacity={0.6}>
          Who's cooking
        </Eyebrow>
        <h2 className="text-3xl sm:text-4xl mb-10 max-w-xl leading-tight" style={display(600, { color: C.ink })}>
          The people behind the pass
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, idx) => (
            <TeamCard key={member.name} member={member} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
