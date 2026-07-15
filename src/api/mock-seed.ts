import type { MobileModelDto } from '~/schemas/model';

/**
 * Snapshot of the mobile app's `MODELS` array (declarative fields only).
 * Regenerate manually when the mobile catalog changes and the mock needs
 * to reflect the current state. Runtime-only fields (status/path/progress
 * /mmprojLocalPath) are intentionally omitted — they are never edited via
 * the admin panel.
 */
export const SEED_MODELS: MobileModelDto[] = [
  {
    id: 'LiquidAI/LFM2.5-VL-1.6B-GGUF/LFM2.5-VL-1.6B-Q4_0.gguf',
    name: 'LFM 2.5 VL (1.6B)',
    size: 695_752_480,
    description:
      'An updated vision-language model with enhanced multilingual vision understanding.',
    iconUrl: 'liquid',
    engine: 'llama',
    mmprojRemoteId:
      'LiquidAI/LFM2.5-VL-1.6B-GGUF/mmproj-LFM2.5-VL-1.6b-Q8_0.gguf',
    mmprojSize: 583_109_888,
    badges: [{ label: 'vision', tone: 'blue' }],
    platforms: ['ios', 'android'],
    isOnboarding: false,
  },
  {
    id: 'LiquidAI/LFM2.5-1.2B-Thinking-GGUF/LFM2.5-1.2B-Thinking-Q4_K_M.gguf',
    name: 'LFM 2.5 Thinking (1.2B)',
    supportsThinking: true,
    size: 730_895_360,
    description:
      'A reasoning model optimized for math, programming, and complex problem-solving.',
    iconUrl: 'liquid',
    engine: 'llama',
    mmprojRemoteId: null,
    badges: [{ label: 'thinking', tone: 'purple' }],
    platforms: ['ios', 'android'],
    isOnboarding: false,
  },
  {
    id: 'LiquidAI/LFM2-700M-GGUF/LFM2-700M-Q4_K_M.gguf',
    name: 'LFM 2 (700M)',
    size: 468_624_320,
    description:
      'Hybrid model for fast everyday chat and lightweight tasks. Onboarding default.',
    iconUrl: 'liquid',
    engine: 'llama',
    mmprojRemoteId: null,
    badges: [
      { label: 'fast', tone: 'green' },
      { label: 'everyday', tone: 'orange' },
    ],
    platforms: ['ios', 'android'],
    isOnboarding: true,
  },
  {
    id: 'unsloth/gemma-4-E2B-it-GGUF/gemma-4-E2B-it-Q4_K_M.gguf',
    name: 'Gemma 4 E2B IT',
    supportsThinking: true,
    size: 3_106_736_256,
    description:
      'A smaller, faster Gemma 4. Same multimodal abilities — text, photos, audio.',
    iconUrl: 'google',
    engine: 'llama',
    mmprojRemoteId: 'unsloth/gemma-4-E2B-it-GGUF/mmproj-F16.gguf',
    mmprojSize: 985_654_080,
    badges: [
      { label: 'vision', tone: 'blue' },
      { label: 'fast', tone: 'green' },
      { label: 'thinking', tone: 'purple' },
    ],
    platforms: ['ios', 'android'],
    isOnboarding: false,
  },
  {
    id: 'unsloth/gemma-4-E4B-it-qat-mobile-GGUF/gemma-4-E4B-it-qat-UD-Q2_K_XL.gguf',
    name: 'Gemma 4 E4B IT (QAT)',
    supportsThinking: true,
    size: 3_219_530_176,
    description:
      'The most powerful on-device Gemma 4. Quantization-aware, mobile-tuned build with multimodal vision.',
    iconUrl: 'google',
    engine: 'llama',
    mmprojRemoteId: 'unsloth/gemma-4-E4B-it-qat-mobile-GGUF/mmproj-F16.gguf',
    mmprojSize: 990_372_672,
    forceCpu: true,
    badges: [
      { label: 'vision', tone: 'blue' },
      { label: 'thinking', tone: 'purple' },
    ],
    platforms: ['ios', 'android'],
    isOnboarding: false,
  },
  {
    id: 'unsloth/gemma-4-E2B-it-qat-mobile-GGUF/gemma-4-E2B-it-qat-UD-Q2_K_XL.gguf',
    name: 'Gemma 4 E2B IT (QAT)',
    supportsThinking: true,
    size: 2_186_184_768,
    description:
      'A smaller, faster Gemma 4. Quantization-aware, mobile-tuned build with multimodal vision.',
    iconUrl: 'google',
    engine: 'llama',
    mmprojRemoteId: 'unsloth/gemma-4-E2B-it-qat-mobile-GGUF/mmproj-F16.gguf',
    mmprojSize: 985_654_080,
    forceCpu: true,
    badges: [
      { label: 'vision', tone: 'blue' },
      { label: 'fast', tone: 'green' },
      { label: 'thinking', tone: 'purple' },
    ],
    platforms: ['ios', 'android'],
    isOnboarding: false,
  },
  {
    id: 'ggml-org/gemma-3-1b-it-GGUF/gemma-3-1b-it-Q4_K_M.gguf',
    name: 'Gemma 3 (1B)',
    size: 806_058_240,
    description:
      'A fast model with improved memory consumption. Optimized for basic dialogue tasks. Onboarding default.',
    iconUrl: 'google',
    engine: 'llama',
    mmprojRemoteId: null,
    badges: [
      { label: 'fast', tone: 'green' },
      { label: 'everyday', tone: 'orange' },
    ],
    platforms: ['ios', 'android'],
    isOnboarding: true,
  },
  {
    id: 'unsloth/Qwen3.5-4B-GGUF/Qwen3.5-4B-Q4_K_M.gguf',
    name: 'Qwen 3.5 (4B)',
    supportsThinking: true,
    size: 2_740_937_888,
    description:
      'Powerful hybrid reasoning with vision. Best Qwen for demanding tasks.',
    iconUrl: 'qwen',
    engine: 'llama',
    mmprojRemoteId: 'unsloth/Qwen3.5-4B-GGUF/mmproj-F16.gguf',
    mmprojSize: 672_423_616,
    badges: [
      { label: 'thinking', tone: 'purple' },
      { label: 'vision', tone: 'blue' },
    ],
    platforms: ['ios', 'android'],
    isOnboarding: false,
  },
  {
    id: 'unsloth/Qwen3.5-2B-GGUF/Qwen3.5-2B-Q4_K_M.gguf',
    name: 'Qwen 3.5 (2B)',
    supportsThinking: true,
    size: 1_280_835_840,
    description:
      'Lightweight model with strong vision and hybrid reasoning. Great for general-purpose conversation.',
    iconUrl: 'qwen',
    engine: 'llama',
    mmprojRemoteId: 'unsloth/Qwen3.5-2B-GGUF/mmproj-F16.gguf',
    mmprojSize: 668_227_264,
    badges: [
      { label: 'thinking', tone: 'purple' },
      { label: 'vision', tone: 'blue' },
    ],
    platforms: ['ios', 'android'],
    isOnboarding: false,
  },
  {
    id: 'unsloth/Qwen3.5-0.8B-GGUF/Qwen3.5-0.8B-Q4_K_M.gguf',
    name: 'Qwen 3.5 (0.8B)',
    supportsThinking: true,
    size: 532_517_120,
    description:
      'Small model with good vision and hybrid reasoning. Great for simple conversation and fast answers.',
    iconUrl: 'qwen',
    engine: 'llama',
    mmprojRemoteId: 'unsloth/Qwen3.5-0.8B-GGUF/mmproj-F16.gguf',
    mmprojSize: 204_987_232,
    badges: [
      { label: 'thinking', tone: 'purple' },
      { label: 'vision', tone: 'blue' },
    ],
    platforms: ['ios', 'android'],
    isOnboarding: true,
  },
  {
    id: 'ggml-org/SmolLM3-3B-GGUF/SmolLM3-Q4_K_M.gguf',
    name: 'SmolLM 3 (3B)',
    supportsThinking: true,
    size: 1_915_305_312,
    description:
      'Great for complex reasoning, long conversations, and use in English, French, Spanish, German, Italian, and Portuguese.',
    iconUrl: 'huggingface',
    engine: 'llama',
    mmprojRemoteId: null,
    badges: [
      { label: 'thinking', tone: 'purple' },
      { label: 'multilingual', tone: 'green' },
    ],
    platforms: ['ios', 'android'],
    isOnboarding: false,
  },
  {
    id: 'prism-ml/Ternary-Bonsai-8B-gguf/Ternary-Bonsai-8B-Q2_0.gguf',
    name: 'Ternary Bonsai (8B)',
    size: 2_182_184_672,
    description:
      'Ternary-weight 8B model. Compact 8B-class reasoning at a fraction of the memory.',
    iconUrl: 'bonsai',
    engine: 'llama',
    mmprojRemoteId: null,
    badges: [{ label: 'efficient', tone: 'green' }],
    platforms: ['ios', 'android'],
    isOnboarding: false,
  },
  {
    id: 'prism-ml/Bonsai-8B-gguf/Bonsai-8B-Q1_0.gguf',
    name: 'Bonsai (8B)',
    size: 1_158_654_496,
    description:
      '1-bit quantized 8B model. Extremely lightweight for an 8B-class network.',
    iconUrl: 'bonsai',
    engine: 'llama',
    mmprojRemoteId: null,
    badges: [
      { label: 'fast', tone: 'green' },
      { label: 'everyday', tone: 'orange' },
    ],
    platforms: ['ios', 'android'],
    isOnboarding: false,
  },
  {
    id: 'prism-ml/Bonsai-27B-gguf/Bonsai-27B-Q1_0.gguf',
    name: 'Bonsai (27B)',
    supportsThinking: true,
    size: 3_803_452_480,
    description:
      '1-bit quantized 27B model with vision. Full 27B-class reasoning in under 4 GB.',
    iconUrl: 'bonsai',
    engine: 'llama',
    mmprojRemoteId: 'prism-ml/Bonsai-27B-gguf/Bonsai-27B-mmproj-Q8_0.gguf',
    mmprojSize: 629_246_880,
    badges: [
      { label: 'vision', tone: 'blue' },
      { label: 'thinking', tone: 'purple' },
      { label: 'efficient', tone: 'green' },
    ],
    platforms: ['ios', 'android'],
    isOnboarding: false,
  },
  {
    id: 'belgrat/realistic-vision-v5.1-coreml/realistic-vision-v5.1-coreml.zip',
    name: 'Realistic Vision v5.1',
    size: 1_904_935_657,
    description:
      'Photoreal SD 1.5 fine-tune. Great for portraits, faces, and product shots.',
    iconUrl: 'realisticVision',
    engine: 'coreml-diffusion',
    mmprojRemoteId: null,
    badges: [{ label: 'image', tone: 'purple' }],
    platforms: ['ios'],
    isOnboarding: false,
  },
  {
    id: 'Gatchamn/coreml-dreamshaper-8-8bit',
    name: 'DreamShaper v8',
    size: 1_161_814_548,
    description:
      'Stylized SD 1.5 fine-tune. Strong illustrative, fantasy, and concept-art output.',
    iconUrl: 'dreamshaper',
    engine: 'coreml-diffusion',
    mmprojRemoteId: null,
    badges: [{ label: 'image', tone: 'purple' }],
    platforms: ['ios'],
    isOnboarding: false,
  },
];
