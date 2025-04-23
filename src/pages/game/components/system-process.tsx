export default function SystemProcess() {
  return (
    <div className="p-7 bg-[#101010] rounded-2xl">
      <p className="text-[#ACACAC] text-lg">
        {">>> Confidential Security Protocol Activated <<<"}
      </p>
      <p className="text-[#ACACAC] text-sm mt-5">
        Welcome back, Commander of the Resistance. Status: Critical! Possible
        infiltration by AI impostors detected in Alpha-7 underground shelter.
        Per Directive No. 13, we must initiate the “Turing Deathmatch” protocol
        to identify and isolate these threats. Five suspects have been detained.
        We must observe their behavior and language to uncover which ones are
        AIs disguised as humans. Remember: only two real humans will pass the
        test and gain access to the safe zone. The rest will be sent to
        isolation.
      </p>
      <div className="mt-10">
        <p>System is initializing suspect profiles… </p>
        <p>
          [System]{" "}
          <span className="text-[#63a11a]">Round 1 Interrogation Begins </span>
        </p>
        <p>
          [System] [Phase]{" "}
          <span className="text-[#63a11a]">Suspect Self-Introductions</span>
        </p>{" "}
        <p>
          [System] Each suspect will take turns introducing themselves,
          attempting to prove they are truly human…
        </p>
      </div>
    </div>
  );
}
