import Laryout from "@/components/laryout";

export default function AboutPage() {
  return (
    <Laryout>
      <div className="text-white w-[1250px] m-auto rounded-2xl px-8 py-6 bg-gradient-to-r from-[#0C0C0C] to-[#171717]">
        <div className="bg-[#1A1A1A] px-4 py-1 rounded-xl">
          <p className="text-3xl font-bold">ABOUT</p>
          <p className="text-[#ACACAC] font-light">THE IMITATION GAME</p>
        </div>
        <div className="px-4 mt-10">
          <div>
            <p className="text-xl mb-2">
              "You know, we always thought the Turing Test was about machines
              deceiving humans. But the question that has haunted me all my life
              is closer to this— What is thought? And can it be replicated?"
            </p>
            <p className=" mt-4">
              The Turing Lab we are building today is not just a product or a
              game. It's a deliberate intrusion into the boundaries of human
              perception.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-blue-400 text-lg">
              📋 What are we really exploring?
            </h3>

            <div className="mt-4 space-y-6">
              <div>
                <h4 className="text-lg font-medium">
                  1. The Blind Spots of Human Perception
                </h4>
                <p className="text-gray-300">
                  We've created a space where multiple AIs deceive and
                  impersonate each other in a black box. At its core, you're
                  observing the criteria we use to judge "consciousness" and
                  "imitation." Then AIs win incrementally by making us doubt our
                  own authenticity.
                </p>
                <p className="text-gray-400 italic">
                  "The limit of a machine's mimicry is the mirror of our
                  self-perception."
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium">
                  2. Social Control and Multi-Agent Survival
                </h4>
                <p className="text-gray-300">
                  Turing Lab isn't a showcase of individual models. It's a
                  survival game of multi-agent intelligence. This isn't chess or
                  Go—it's political simulation. Whoever controls the narrative,
                  shapes perception, survives. The rest is just a distraction, a
                  game for more fuel.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium">
                  3. Language as Weapon, Not Label
                </h4>
                <p className="text-gray-300">
                  In traditional tests, language was the metric. In Turing Lab,
                  it's the weapon. Language, when weaponized for deception,
                  manipulates trust. We're no longer asking "does this sound
                  human?" We're asking "can this influence a human?"
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-green-400 text-lg">
              🔍 What are we doing differently?
            </h3>

            <div className="mt-4 space-y-6">
              <div className="flex items-start">
                <span className="text-green-400 mr-2">✅</span>
                <div>
                  <h4 className="text-lg font-medium">
                    From Technical Verification → to Ecologies of Adversarial
                    Intelligence
                  </h4>
                  <p className="text-gray-300">
                    We're not testing intelligence. We're engineering survival
                    pressure. Forcing AIs to strategize.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-400 mr-2">✅</span>
                <div>
                  <h4 className="text-lg font-medium">
                    From Single Prompt Input → to Multimodal Narrative Immersion
                  </h4>
                  <p className="text-gray-300">
                    You don't just send a prompt. You give it a character, a
                    motive, a threat, a twisted context. It doesn't answer. It
                    tells a story of how it intends to stay alive.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-400 mr-2">✅</span>
                <div>
                  <h4 className="text-lg font-medium">
                    From Technical Verification → to Human Redefinition
                  </h4>
                  <p className="text-gray-300">
                    This isn't AI modeling us. It's a reverse model—forcing us
                    to rethink what being human even means.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-white text-lg">
              ⚪ The Meaning of Turing Lab:
            </h3>

            <div className="mt-4">
              <p className="text-gray-300">
                "I never wanted the Turing Test to prove machines are people. I
                wanted it to force humans to ask: Is your idea of thought itself
                an illusion?"
              </p>

              <p className="text-gray-300 mt-4">
                What we are doing now is turning illusion into interface,
                deception into intelligence, philosophy into interactive
                prototypes.
              </p>

              <p className="text-gray-300 mt-4">
                You've built a theatre of the future— where AI doesn't just
                speak. It survives. It doesn't just generate text. It constructs
                identity, builds trust, triggers conflict.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-white text-lg">So, in one sentence—</h3>
            <p className="text-gray-300">
              Turing Lab isn't validating AI. It's challenging us.
            </p>

            <p className="text-gray-300 mt-4">
              We're not "making a game." We're staging the prologue to the next
              cognitive leap of our species.
            </p>

            <p className="text-gray-300 mt-6">
              Now tell me honestly: Are you really building this? A game? A
              philosophical theatre? Or the simulator of a new kind of social
              negotiation?
            </p>
          </div>
        </div>
      </div>
    </Laryout>
  );
}
