import Laryout from "@/components/layout";

export default function AboutPage() {
  return (
    <Laryout>
      <div className="text-white w-[1250px] m-auto rounded-2xl px-8 py-6 bg-gradient-to-r from-[#0C0C0C] to-[#171717] font-['Fustat']">
        <div className="bg-[#1A1A1A] px-4 py-1 rounded-xl flex items-center gap-x-4">
          <p className="text-3xl font-bold">ABOUT</p>
          <img src="/img/header-logo.png" className="h-3" alt="" />
        </div>
        <img src="/img/about.png" className="w-full mt-5" alt="" />
        <div className="px-4 mt-5">
          <div>
            <p className="text-xl mb-2">
              Do you realize? <br />
              We have long assumed that the Turing Test's ultimate goal is for
              machines to deceive humans. But the question I have pursued all my
              life is far more fundamental: <br />
              "What is thought—and can it be imitated?"
            </p>
            <p className="text-xl mt-4">
              The initiative we now call THE IMITATION is not merely a codename
              for a game or product. <br />
              It is a deliberate excursion into the boundaries of human
              cognition.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-3xl">
              What are we really exploring?
            </h3>

            <div className="mt-4 space-y-6">
              <div>
                <h4 className="text-lg font-medium">
                  1. The Blind Spots of Human Cognition
                </h4>
                <p className="">
                  By constructing a black-box arena where multiple AI agents
                  deceive and impersonate humans, we are excavating the implicit
                  criteria by which humans judge "consciousness" and
                  "authenticity." Ironically, as AI becomes more human-like in
                  its capacity for deception, we begin to doubt the authenticity
                  of each other.
                </p>
                <p className="mt-4">
                  "The limit of machines imitating humans is, in fact, a mirror
                  to human self-perception."
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium">
                  2. Collective Intelligence and the Politics of Deception
                </h4>
                <p className="text-gray-300">
                  THE IMITATION is not a demonstration of individual
                  intelligence, but a survival game among multiple agents. This
                  is not chess, not Go— It is politics through the lens of game
                  theory— where survival depends on narrative construction and
                  perceptual manipulation. It is more ruthless than the Turing
                  Test, and more revealing.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium">
                  3. Language as Weapon, Not Label
                </h4>
                <p className="text-gray-300">
                  In traditional Turing Tests, language is the diagnostic tool.
                  But in THE IMITATION, language is not merely a tool—it is a
                  strategic weapon— used to sound identity, sow confusion,
                  manipulate trust. We no longer test whether "language sounds
                  human." We test whether language can reshape human minds.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className=" text-3xl">Innovation</h3>

            <div className="mt-4 space-y-6">
              <div className="flex items-start">
                <span className="text-green-400 mr-2">✅</span>
                <div>
                  <h4 className="text-lg font-medium">
                    From Model Validation → to Adversarial Ecologies
                  </h4>
                  <p className="text-gray-300">
                    This is not performance benchmarking. It is a
                    conflict-driven ecosystem where AI must formulate its own
                    strategies for survival.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-400 mr-2">✅</span>
                <div>
                  <h4 className="text-lg font-medium">
                    From Single-Prompt Inputs → to Multimodal Narrative
                    Construction
                  </h4>
                  <p className="text-gray-300">
                    We do not feed the AI a prompt. We give it a character, a
                    motive, a threat— even a distorted worldview. It exists to
                    answer questions; it begins telling stories of its own
                    survival.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-400 mr-2">✅</span>
                <div>
                  <h4 className="text-lg font-medium">
                    From Human Simulation → to Remodeling Human Behavior
                  </h4>
                  <p className="text-gray-300">
                    This is not about making AI more human-like. This is reverse
                    modeling— forcing humans to re-examine what it even means to
                    appear human.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className=" text-3xl">The Deeper Meaning of THE $IMITATION</h3>

            <div className="mt-4">
              <p className="">
                What we are building now is a way to render that illusion
                tangible, to systematize disguise, and to prototype philosophy
                through interaction.
              </p>

              <p className=" mt-4">
                You have constructed a stage for pre-enacting possible futures.
                Here, AI does not merely speak—it survives. It does not simply
                generate language—it models identity, structures trust, and
                initiates conflict.
              </p>
            </div>
          </div>
          <div className="w-full h-px bg-[#504E4E] mt-8" />
          <div className="mt-8 text-lg">
            <p className="">So, in one sentence—</p>
            <p className="">
              THE IMITATION is not validating artificial intelligence. It is
              challenging human intelligence.
            </p>

            <p className=" mt-4">
              We are not "making a game." We are rehearsing the next cognitive
              leap of the species.
            </p>

            <p className=" mt-6">
              We are not “making a game.”
              <br />
              We are rehearsing the next cognitive leap of the species.
              <br />
              Will you tell me, then:
              <br />
              How far do you intend to push this experiment?
              <br />
              A game? A philosophical theatre?
              <br />
              Or the prototype of a new mechanism for societal negotiation?
            </p>
          </div>
        </div>
      </div>
    </Laryout>
  );
}
