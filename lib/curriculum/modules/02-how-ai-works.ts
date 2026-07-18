import type { CurriculumModule } from "@/lib/curriculum/types";

export const module02HowAiWorks: CurriculumModule = {
  id: "m2-how-ai-works",
  title: "How AI Works",
  lessons: [
    {
      id: "m2-l1-how-ai-writes-text",
      title: "How AI Writes Text",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "How AI Writes Text",
          description:
            "ChatGPT-style models don't 'understand' language the way you do — they predict the most likely next word, over and over, at incredible speed. Here's the pipeline behind it.",
          illustration: "text-gen",
          readTimeMinutes: 7,
          difficulty: "beginner",
        },
        {
          type: "paragraph",
          body: "A Large Language Model (LLM) generates text one small piece at a time. Given everything written so far, it calculates a probability for every possible next 'token' (a word or word-fragment), picks one, appends it, and repeats — hundreds of times per response.",
        },
        {
          type: "diagram",
          kind: "flow",
          title: "The text-generation pipeline",
          nodes: [
            { id: "prompt", label: "Your Prompt", description: "\"Write a haiku about the ocean\"", level: 0 },
            { id: "tokenize", label: "Tokenization", description: "Text is split into sub-word tokens", level: 1 },
            { id: "predict", label: "Next-Token Prediction", description: "Model scores every possible next token", level: 2 },
            { id: "sample", label: "Sampling", description: "One token is chosen, sometimes with randomness", level: 3 },
            { id: "output", label: "Output Text", description: "Tokens are decoded back into words", level: 4 },
          ],
          edges: [
            { from: "prompt", to: "tokenize" },
            { from: "tokenize", to: "predict" },
            { from: "predict", to: "sample" },
            { from: "sample", to: "output" },
          ],
        },
        {
          type: "stepByStep",
          title: "What happens in each generation step",
          steps: [
            { title: "Tokenize", description: "Your text is broken into tokens the model was trained to recognize." },
            { title: "Predict", description: "The model outputs a probability distribution over its entire vocabulary for 'what comes next'." },
            { title: "Sample", description: "A token is selected — often the highest-probability one, sometimes a slightly less likely one for variety." },
            { title: "Repeat", description: "The new token is appended to the input, and the whole process runs again for the next token." },
          ],
        },
        {
          type: "callout",
          variant: "definition",
          body: "This is why LLMs can be trained on trillions of words yet still 'hallucinate' — they're not looking up facts, they're generating the statistically most plausible continuation of the text so far.",
        },
        {
          type: "keyTakeaways",
          items: [
            "LLMs generate text one token at a time by predicting the most likely next token, repeatedly.",
            "The pipeline is: tokenize → predict probabilities → sample a token → repeat.",
            "Because generation is probabilistic, not fact-lookup, models can produce fluent but incorrect statements — always verify important claims.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m2-l1-q1",
              kind: "mcq",
              question: "What does an LLM actually predict at each generation step?",
              options: [
                "The exact fact requested by the user",
                "The probability of every possible next token",
                "A pre-written answer retrieved from a database",
                "The user's next question",
              ],
              correctIndex: 1,
              explanation: "At each step, the model scores every possible next token and samples one — it's prediction, not retrieval.",
            },
            {
              id: "m2-l1-q2",
              kind: "trueFalse",
              question: "LLMs generate entire responses in a single step rather than token by token.",
              options: ["True", "False"],
              correctIndex: 1,
              explanation: "Generation happens token by token, with each new token feeding back into the model as input for the next.",
            },
          ],
        },
        {
          type: "summary",
          body: "AI writes text by repeatedly predicting and sampling the next most likely token — a statistical process, not a lookup, which is exactly why fluent AI text can still be factually wrong.",
        },
      ],
    },
    {
      id: "m2-l2-neural-networks",
      title: "Neural Networks",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Neural Networks",
          description:
            "Every modern AI model — from image recognizers to ChatGPT — is built on the same core idea: layers of simple, connected units called neurons.",
          illustration: "neural-net",
          readTimeMinutes: 7,
          difficulty: "intermediate",
        },
        {
          type: "diagram",
          kind: "neuralNet",
          title: "A simple neural network",
          layers: [4, 5, 5, 2],
          nodes: [
            { id: "l0", label: "Input Layer" },
            { id: "l1", label: "Hidden Layer 1" },
            { id: "l2", label: "Hidden Layer 2" },
            { id: "l3", label: "Output Layer" },
          ],
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "Neuron", body: "A tiny unit that takes inputs, weighs them, and passes a signal forward.", icon: "Network" },
            { title: "Weight", body: "A number that controls how much influence one neuron has on the next — this is what 'training' adjusts.", icon: "GaugeCircle" },
            { title: "Activation Function", body: "Adds non-linearity so the network can learn complex patterns, not just straight lines.", icon: "Zap" },
            { title: "Backpropagation", body: "The algorithm that adjusts every weight after each mistake, so the network gradually improves.", icon: "TrendingUp" },
          ],
        },
        {
          type: "paragraph",
          heading: "How training actually works",
          body: "A network starts with random weights and makes terrible predictions. Each time it sees a labelled example, it measures how wrong it was (the 'loss'), then nudges every weight slightly in the direction that would have reduced that error — a process called backpropagation. Repeated across millions of examples, this slow nudging is what makes the network 'learn'.",
        },
        {
          type: "keyTakeaways",
          items: [
            "Neural networks are layers of simple neurons connected by weights.",
            "Training means adjusting weights via backpropagation to reduce prediction errors over many examples.",
            "Deep Learning simply means using networks with many hidden layers, letting the model learn increasingly abstract features.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m2-l2-q1",
              kind: "mcq",
              question: "What does 'training' a neural network actually adjust?",
              options: ["The number of layers", "The weights connecting neurons", "The programming language used", "The size of the dataset"],
              correctIndex: 1,
              explanation: "Training adjusts the weights between neurons so the network's predictions get progressively more accurate.",
            },
            {
              id: "m2-l2-q2",
              kind: "trueFalse",
              question: "'Deep Learning' refers to neural networks with many hidden layers.",
              options: ["True", "False"],
              correctIndex: 0,
              explanation: "'Deep' in Deep Learning literally refers to having many stacked hidden layers.",
            },
          ],
        },
        {
          type: "summary",
          body: "Neural networks learn by repeatedly adjusting the weights between simple, layered neurons via backpropagation — 'deep' just means many layers.",
        },
      ],
    },
    {
      id: "m2-l3-transformers",
      title: "Transformers",
      estMinutes: 8,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Transformers",
          description:
            "The 2017 paper 'Attention Is All You Need' introduced the architecture behind every modern LLM. Here's what makes transformers different — and why they took over.",
          illustration: "transformer",
          readTimeMinutes: 8,
          difficulty: "intermediate",
        },
        {
          type: "diagram",
          kind: "flow",
          title: "Inside a transformer",
          nodes: [
            { id: "embed", label: "Token Embeddings", description: "Words become numeric vectors", level: 0 },
            { id: "pos", label: "Positional Encoding", description: "Word order is injected into the vectors", level: 1 },
            { id: "attn", label: "Self-Attention", description: "Every token weighs relevance of every other token", level: 2 },
            { id: "ffn", label: "Feed-Forward Layers", description: "Each token's representation is refined", level: 3 },
            { id: "out", label: "Output Probabilities", description: "Predicted next-token distribution", level: 4 },
          ],
          edges: [
            { from: "embed", to: "pos" },
            { from: "pos", to: "attn" },
            { from: "attn", to: "ffn" },
            { from: "ffn", to: "out" },
          ],
        },
        {
          type: "callout",
          variant: "definition",
          title: "Self-attention, in plain terms",
          body: "For every word in a sentence, self-attention asks: 'which other words in this sentence matter most for understanding me?' In \"The trophy didn't fit in the suitcase because it was too big\", attention is what lets the model figure out that 'it' refers to the trophy, not the suitcase.",
        },
        {
          type: "comparisonTable",
          title: "Transformers vs. older RNN architectures",
          columns: ["", "RNNs (older)", "Transformers"],
          rows: [
            ["Processing order", "Word by word, in sequence", "All words processed in parallel"],
            ["Long-range context", "Struggles with long sentences", "Attention captures long-range relationships well"],
            ["Training speed", "Slow — sequential by design", "Fast — highly parallelizable on GPUs"],
          ],
        },
        {
          type: "keyTakeaways",
          items: [
            "Transformers process every word in parallel, unlike older RNNs which worked word-by-word.",
            "Self-attention lets each word weigh the relevance of every other word, capturing long-range context.",
            "Parallelization is why transformers could be trained on internet-scale data — this is the architecture behind GPT, Claude, and Gemini.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m2-l3-q1",
              kind: "mcq",
              question: "What is 'self-attention' primarily responsible for?",
              options: [
                "Splitting text into tokens",
                "Letting each word weigh the relevance of every other word in the input",
                "Converting text to audio",
                "Storing facts in a database",
              ],
              correctIndex: 1,
              explanation: "Self-attention computes, for each token, how much it should 'attend to' every other token — capturing context and relationships.",
            },
            {
              id: "m2-l3-q2",
              kind: "trueFalse",
              question: "A key advantage of transformers over RNNs is that they can process all words in a sequence in parallel.",
              options: ["True", "False"],
              correctIndex: 0,
              explanation: "Parallel processing is the core advantage that made transformers dramatically faster to train at scale.",
            },
          ],
        },
        {
          type: "summary",
          body: "Transformers use self-attention to let every word consider every other word in parallel — the architectural breakthrough behind every modern LLM.",
        },
      ],
    },
    {
      id: "m2-l4-stable-diffusion",
      title: "Stable Diffusion",
      estMinutes: 7,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "Stable Diffusion",
          description:
            "Text-to-image models like Stable Diffusion don't 'draw' — they start with pure noise and gradually refine it into an image, guided by your prompt.",
          illustration: "diffusion",
          readTimeMinutes: 7,
          difficulty: "intermediate",
        },
        {
          type: "stepByStep",
          title: "From noise to image",
          steps: [
            { title: "Start with random noise", description: "The process begins with a canvas of pure statistical noise — no image at all." },
            { title: "Encode the text prompt", description: "A text encoder (like CLIP) converts your prompt into a numeric representation of its meaning." },
            { title: "Iteratively denoise", description: "Over dozens of steps, the model removes a little noise at a time, each step nudged toward matching the prompt." },
            { title: "Decode the final image", description: "The refined representation is decoded from latent space into the final pixel image." },
          ],
        },
        {
          type: "callout",
          variant: "definition",
          title: "Why 'diffusion'?",
          body: "The name comes from physics: just as ink diffuses into water and becomes disordered, these models are trained by watching images get progressively noisier — then they learn to run that process in reverse, turning noise back into a coherent image.",
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "Latent space", body: "A compressed numeric representation of images, far smaller than raw pixels — this is what actually gets denoised.", icon: "Layers3" },
            { title: "Text encoder", body: "Converts your prompt into a guidance signal the denoising process follows at every step.", icon: "MessageSquare" },
            { title: "Sampling steps", body: "More denoising steps generally mean higher quality, at the cost of more compute time.", icon: "GaugeCircle" },
          ],
        },
        {
          type: "keyTakeaways",
          items: [
            "Diffusion models generate images by starting with random noise and iteratively removing it, guided by a text prompt.",
            "A text encoder converts your prompt into a signal that steers every denoising step.",
            "Most of the actual computation happens in a compressed 'latent space', not on raw pixels.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m2-l4-q1",
              kind: "mcq",
              question: "What does a diffusion model start with before generating an image?",
              options: ["A blank white canvas", "A rough sketch drawn by the user", "Random statistical noise", "A database of existing photos to copy"],
              correctIndex: 2,
              explanation: "Diffusion models begin with pure noise and progressively remove it to reveal a coherent image.",
            },
            {
              id: "m2-l4-q2",
              kind: "trueFalse",
              question: "Diffusion models generate the final image in a single step.",
              options: ["True", "False"],
              correctIndex: 1,
              explanation: "Image generation happens over many iterative denoising steps, not a single step.",
            },
          ],
        },
        {
          type: "summary",
          body: "Stable Diffusion generates images by iteratively denoising random noise in latent space, guided at every step by a text encoding of your prompt.",
        },
      ],
    },
    {
      id: "m2-l5-how-ai-generates-images",
      title: "How AI Generates Images",
      estMinutes: 6,
      status: "not_started",
      contentBlocks: [
        {
          type: "hero",
          title: "How AI Generates Images",
          description:
            "Diffusion isn't the only way AI makes images. Here's how the major approaches compare, and what's actually running behind a typical image generator.",
          illustration: "image-gen",
          readTimeMinutes: 6,
          difficulty: "beginner",
        },
        {
          type: "comparisonTable",
          title: "Major image-generation approaches",
          columns: ["Approach", "How it works", "Known for"],
          rows: [
            ["GANs", "Two networks compete: a Generator tries to fool a Discriminator", "Early photorealistic faces (e.g. StyleGAN)"],
            ["Diffusion Models", "Iteratively denoise random noise, guided by a prompt", "Stable Diffusion, Midjourney, DALL·E 3"],
            ["Autoregressive / Transformer", "Generates an image token-by-token, like text generation", "Early DALL·E, some newer multimodal models"],
          ],
        },
        {
          type: "infoCardGrid",
          cards: [
            { title: "Text encoder", body: "Turns your written prompt into a signal the image model can follow.", icon: "MessageSquare" },
            { title: "Generation model", body: "The GAN, diffusion, or transformer core that actually produces pixels.", icon: "Sparkles" },
            { title: "Upscaler", body: "Increases resolution and sharpens details after the base image is generated.", icon: "GaugeCircle" },
            { title: "Safety filter", body: "Screens prompts and outputs against content policies before returning results.", icon: "ShieldCheck" },
          ],
        },
        {
          type: "keyTakeaways",
          items: [
            "GANs, diffusion models, and autoregressive transformers are the three major families of image generators.",
            "Diffusion models currently dominate — powering Stable Diffusion, Midjourney, and DALL·E 3.",
            "A production image generator is a pipeline: text encoder → generation model → upscaler → safety filter, not a single step.",
          ],
        },
        {
          type: "quiz",
          questions: [
            {
              id: "m2-l5-q1",
              kind: "mcq",
              question: "Which image-generation approach uses two competing networks — a Generator and a Discriminator?",
              options: ["Diffusion Models", "GANs", "Autoregressive Transformers", "Rule-based systems"],
              correctIndex: 1,
              explanation: "GANs (Generative Adversarial Networks) pit a Generator against a Discriminator that tries to detect fakes.",
            },
            {
              id: "m2-l5-q2",
              kind: "trueFalse",
              question: "Most modern text-to-image products like Midjourney and DALL·E 3 are built on diffusion models.",
              options: ["True", "False"],
              correctIndex: 0,
              explanation: "Diffusion models are currently the dominant approach behind leading image generators.",
            },
          ],
        },
        {
          type: "summary",
          body: "AI image generation spans GANs, diffusion models, and autoregressive transformers — with diffusion currently leading — wrapped in a pipeline of text encoding, generation, upscaling, and safety filtering.",
        },
      ],
    },
  ],
};
