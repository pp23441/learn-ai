'use strict';

/* ════════════════════════════════════════════════
   ANIMATED BACKGROUND
════════════════════════════════════════════════ */
const cv = document.getElementById('bgc');
const cx = cv.getContext('2d');
let W, H, pts = [];
function rsz() { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; }
rsz(); window.addEventListener('resize', rsz);
for (let i = 0; i < 70; i++) pts.push({ x: Math.random() * 2000, y: Math.random() * 1500, r: Math.random() * 1.3 + .2, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, a: Math.random() * 6, c: ['0,255,209', '191,95,255', '255,77,109', '0,180,255', '255,214,0'][Math.floor(Math.random() * 5)] });
const scans = Array.from({ length: 10 }, () => ({ y: Math.random() * 1500, v: .2 + Math.random() * .4 }));
let reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function drawBG() {
  cx.clearRect(0, 0, W, H); cx.fillStyle = '#060816'; cx.fillRect(0, 0, W, H);
  cx.strokeStyle = 'rgba(0,255,209,.035)'; cx.lineWidth = 1;
  const gs = 48;
  for (let x = 0; x < W; x += gs) { cx.beginPath(); cx.moveTo(x, 0); cx.lineTo(x, H); cx.stroke(); }
  for (let y = 0; y < H; y += gs) { cx.beginPath(); cx.moveTo(0, y); cx.lineTo(W, y); cx.stroke(); }
  if (!reduceMotion) {
    scans.forEach(s => { s.y += s.v; if (s.y > H) s.y = -20; const g = cx.createLinearGradient(0, s.y, 0, s.y + 50); g.addColorStop(0, 'rgba(0,255,209,0)'); g.addColorStop(.4, 'rgba(0,255,209,.05)'); g.addColorStop(1, 'rgba(0,255,209,0)'); cx.fillStyle = g; cx.fillRect(0, s.y, W, 50); });
    pts.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0; p.a += .012; const al = .25 + .3 * Math.sin(p.a); cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, Math.PI * 2); cx.fillStyle = `rgba(${p.c},${al})`; cx.fill(); });
  } else {
    pts.forEach(p => { cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, Math.PI * 2); cx.fillStyle = `rgba(${p.c},.4)`; cx.fill(); });
  }
  requestAnimationFrame(drawBG);
}
drawBG();

/* ════════════════════════════════════════════════
   CURRICULUM — 15 TRACKS, 90+ CHALLENGES
════════════════════════════════════════════════ */
const TRACKS = [
  { id: 'flutter', label: 'Flutter' }, { id: 'ml', label: 'ML' }, { id: 'dl', label: 'Deep Learning' },
  { id: 'rl', label: 'Reinforcement' }, { id: 'nlp', label: 'NLP' }, { id: 'llm', label: 'LLMs' },
  { id: 'rag', label: 'RAG' }, { id: 'cv', label: 'Computer Vision' }, { id: 'ops', label: 'MLOps' }
];

const LESSONS = [
  { id: 1, track: 'flutter', icon: '🚀', name: 'Hello Flutter', sub: 'runApp & Widgets', c: 0, qs: [
    { theory: '<strong>runApp()</strong> is Flutter\'s entry point. It inflates the root widget and attaches it to the screen. Every Flutter app has exactly one call to <code>runApp()</code>.', deeper: 'Flutter compiles to native ARM code for iOS and Android via the Dart AOT compiler — this is why apps are fast. The widget tree is a declarative description; Flutter diffs it against the previous state to minimise redraws.', desc: 'Fill in the blank to launch a Flutter app:', tpl: ['void main() {\n  ', { b: 0 }, '(MyApp());\n}'], blanks: [{ ans: 'runApp', opts: ['runApp', 'startApp', 'launch', 'main'], exp: '<strong>runApp()</strong> bootstraps the app. The widget passed in becomes the root of the widget tree. Flutter then calls <code>build()</code> and renders to screen.' }] },
    { theory: 'Everything in Flutter is a <strong>Widget</strong> — immutable descriptions of part of the UI. Flutter rebuilds them efficiently when state changes.', deeper: 'Flutter uses a 3-tree architecture: Widget Tree (your code), Element Tree (the reconciler), and Render Tree (actual painting). This separation makes Flutter both expressive and fast.', desc: 'Which base class creates a widget with no mutable state?', tpl: ['class MyCard extends ', { b: 0 }, ' {\n  @override\n  Widget build(BuildContext ctx) => Card();\n}'], blanks: [{ ans: 'StatelessWidget', opts: ['StatelessWidget', 'StatefulWidget', 'State', 'Widget'], exp: '<strong>StatelessWidget</strong> rebuilds only when its parent passes new config. For internal mutable state, use <strong>StatefulWidget</strong> + a State class.' }] }
  ]},
  { id: 2, track: 'flutter', icon: '📐', name: 'Layouts', sub: 'Column, Row, Stack', c: 1, qs: [
    { theory: '<strong>Column</strong> and <strong>Row</strong> are the bread and butter of Flutter layouts. Column stacks vertically; Row horizontally. Both accept <code>mainAxisAlignment</code> and <code>crossAxisAlignment</code>.', deeper: 'Flutter\'s layout algorithm is a single-pass constraint propagation: parent passes constraints down, child returns its size. This O(n) pass is faster than HTML\'s multi-pass recalculation.', desc: 'Arrange widgets top-to-bottom:', tpl: ['return ', { b: 0 }, '(\n  children: [Icon(Icons.star), Text("Hi")],\n);'], blanks: [{ ans: 'Column', opts: ['Column', 'Row', 'Stack', 'ListView'], exp: '<strong>Column</strong> = vertical. <strong>Row</strong> = horizontal. <strong>Stack</strong> = overlapping. <strong>ListView</strong> = scrollable column.' }] },
    { theory: '<strong>Expanded</strong> and <strong>Flexible</strong> control how children share space. Expanded forces a child to fill; Flexible allows shrinking.', deeper: 'These use the <strong>Flex</strong> RenderObject — Flutter\'s implementation of Flexbox. Flutter predates wide CSS Flexbox adoption and inspired some APIs.', desc: 'Make a widget fill all remaining space in a Row:', tpl: ['Row(children: [\n  Text("Label"),\n  ', { b: 0 }, '(child: TextField()),\n])'], blanks: [{ ans: 'Expanded', opts: ['Expanded', 'Flexible', 'Spacer', 'SizedBox'], exp: '<strong>Expanded</strong> is like <code>flex: 1</code> in CSS. <strong>Spacer()</strong> is shorthand for <code>Expanded(child: SizedBox())</code>.' }] }
  ]},
  { id: 3, track: 'ml', icon: '📊', name: 'ML Fundamentals', sub: 'Supervised learning & gradient descent', c: 2, qs: [
    { theory: '<strong>Supervised learning</strong> trains a model on labelled (X, y) pairs. The model learns f(X) ≈ y by minimising a loss function.', deeper: 'The bias-variance tradeoff is central: too simple underfits (high bias); too complex overfits (high variance). Regularisation, dropout and cross-validation help navigate it.', desc: 'The algorithm that moves parameters toward lower loss is:', tpl: ['# Update weights to reduce loss\nweights -= learning_rate * ', { b: 0 }], blanks: [{ ans: 'gradient', opts: ['gradient', 'loss', 'error', 'output'], exp: '<strong>Gradient descent</strong> computes the gradient of the loss w.r.t. each weight and moves weights downhill on the loss surface.' }] },
    { theory: '<strong>Overfitting</strong> happens when a model memorises training data and fails to generalise. Regularisation adds a penalty to discourage large weights.', deeper: 'L2 (Ridge) penalises the sum of squared weights — shrinks all but rarely to zero. L1 (Lasso) penalises absolute values — produces sparse weights (feature selection).', desc: 'L2 regularisation adds which term to the loss?', tpl: ['# L2 loss = original_loss + lambda *\nloss += lambda * ', { b: 0 }, '(weights**2)'], blanks: [{ ans: 'sum', opts: ['sum', 'mean', 'max', 'log'], exp: 'L2 = original_loss + λ·Σ(w²). The λ hyperparameter controls strength. Large λ shrinks weights toward zero (underfitting risk).' }] },
    { theory: 'A <strong>train/val/test split</strong> measures generalisation. Never tune hyperparameters on the test set — that leaks information.', deeper: '<strong>k-Fold cross-validation</strong> trains k models, each leaving one fold out, then averages metrics. More reliable on small data but costs k× compute.', desc: 'Cross-validation reduces which type of error in evaluation?', tpl: ['# k-Fold CV reduces\nevaluation_error = "', { b: 0 }, '"'], blanks: [{ ans: 'variance', opts: ['variance', 'bias', 'gradient', 'entropy'], exp: 'CV reduces <strong>evaluation variance</strong> — the error in your estimate of model performance. It gives a more reliable measure.' }] }
  ]},
  { id: 4, track: 'dl', icon: '🧠', name: 'Neural Networks', sub: 'Layers, activations & backprop', c: 3, qs: [
    { theory: 'A <strong>neural network</strong> is a composition of linear transforms and non-linear activations: y = σ(Wx + b). Stacking layers learns hierarchical features.', deeper: 'Universal approximation: one hidden layer with enough neurons can approximate any continuous function. In practice, depth is far more efficient than width for compositional features (edges → shapes → objects).', desc: 'Which activation introduces non-linearity between layers?', tpl: ['import torch.nn as nn\nlayer = nn.Sequential(\n  nn.Linear(128, 64),\n  nn.', { b: 0 }, '()\n)'], blanks: [{ ans: 'ReLU', opts: ['ReLU', 'Linear', 'Softmax', 'Sigmoid'], exp: '<strong>ReLU(x) = max(0,x)</strong> avoids vanishing gradients and is cheap. Variants: LeakyReLU, GELU (used in Transformers).' }] },
    { theory: '<strong>Backpropagation</strong> computes gradients via the chain rule, flowing error from output back through every layer to update weights.', deeper: 'Backprop is reverse-mode automatic differentiation. PyTorch builds a computation graph on the forward pass and traverses it in reverse during <code>.backward()</code>. This is why you call <code>optimizer.zero_grad()</code> — gradients accumulate by default.', desc: 'Call this after computing loss to compute all gradients:', tpl: ['loss = criterion(output, target)\nloss.', { b: 0 }, '()\noptimizer.step()'], blanks: [{ ans: 'backward', opts: ['backward', 'step', 'update', 'compute'], exp: '<code>loss.backward()</code> triggers autodiff, computing ∂loss/∂w for every parameter. <code>optimizer.step()</code> applies the update.' }] },
    { theory: '<strong>Batch Normalisation</strong> normalises layer inputs to zero mean and unit variance, with learnable scale (γ) and shift (β). It stabilises training.', deeper: 'BatchNorm reduces internal covariate shift. At inference it uses running statistics. <strong>LayerNorm</strong> (over features, not batch) is preferred in Transformers for variable-length sequences.', desc: 'Normalise a layer\'s output in PyTorch:', tpl: ['nn.Sequential(\n  nn.Linear(256, 128),\n  nn.', { b: 0 }, '(128),\n  nn.ReLU()\n)'], blanks: [{ ans: 'BatchNorm1d', opts: ['BatchNorm1d', 'LayerNorm', 'Dropout', 'Softmax'], exp: '<strong>BatchNorm1d</strong> for 1D features; <strong>BatchNorm2d</strong> for images. Common order: Linear → BN → ReLU.' }] }
  ]},
  { id: 5, track: 'rl', icon: '🎮', name: 'Reinforcement Learning', sub: 'MDP, Q-learning & policy gradient', c: 0, qs: [
    { theory: 'RL frames learning as a <strong>Markov Decision Process (MDP)</strong>: an agent observes state s, takes action a, gets reward r, transitions to s\'. Goal: maximise cumulative reward.', deeper: 'The Bellman equation underlies RL: V(s) = max_a [R(s,a) + γ·V(s\')]. The discount factor γ < 1 ensures convergence. Deep RL replaces the value table with a neural net.', desc: 'Which function estimates total reward from a state-action pair?', tpl: ['# Bellman equation\nQ(s,a) = r + gamma * max(', { b: 0 }, "(s'))"], blanks: [{ ans: 'Q', opts: ['Q', 'V', 'R', 'pi'], exp: 'The <strong>Q-function</strong> Q(s,a) estimates expected reward from taking a in s. DQN approximates Q with a neural net — how game-playing AIs work.' }] },
    { theory: '<strong>Policy gradient</strong> methods directly optimise the policy π(a|s). REINFORCE updates weights toward high-reward trajectories.', deeper: 'Policy gradient theorem: ∇J(θ) = E[∇log π(a|s)·Q(s,a)]. PPO clips the update to prevent collapse — it\'s the algorithm used to train ChatGPT with RLHF.', desc: 'PPO clips updates. Its key hyperparameter is:', tpl: ['# PPO clipped objective\nratio = new_prob / old_prob\nloss = min(ratio*adv, clip(ratio, 1-', { b: 0 }, ', 1+eps)*adv)'], blanks: [{ ans: 'eps', opts: ['eps', 'alpha', 'gamma', 'lambda'], exp: 'The <strong>clip epsilon (ε)</strong> (~0.1–0.2) constrains how far the new policy can deviate per update, giving PPO stability.' }] }
  ]},
  { id: 6, track: 'nlp', icon: '💬', name: 'NLP Fundamentals', sub: 'Tokenisation, embeddings & attention', c: 1, qs: [
    { theory: '<strong>Tokenisation</strong> converts text into integer IDs. Modern LLMs use <strong>BPE (Byte-Pair Encoding)</strong> — a vocabulary of subword units balancing size with coverage.', deeper: 'GPT-4 uses ~100k BPE tokens. "unbelievable" might be ["un","believ","able"] — 3 tokens. Token count directly affects LLM cost and context limits.', desc: 'Tokenisation converts text into:', tpl: ['tokens = tokenizer.encode("Hello world")\nprint(tokens.', { b: 0 }, ')  # [15496, 995]'], blanks: [{ ans: 'ids', opts: ['ids', 'words', 'chars', 'bytes'], exp: 'Tokens are integer <strong>IDs</strong> indexing a vocabulary. The embedding layer maps each ID to a dense vector.' }] },
    { theory: '<strong>Word embeddings</strong> map tokens to dense vectors in a semantic space where similar words are nearby. Word2Vec, GloVe and BERT all capture relationships.', deeper: 'Famous property: king − man + woman ≈ queen. BERT\'s contextual embeddings differ for "bank" (river) vs "bank" (finance) — that\'s what makes them powerful.', desc: 'Similar words have which cosine similarity?', tpl: ['sim = cosine(embed("king"), embed("queen"))\n# sim is ', { b: 0 }, ' (similar words)'], blanks: [{ ans: 'high', opts: ['high', 'low', 'zero', 'negative'], exp: 'Similar words have <strong>high cosine similarity</strong> (near 1). Antonyms can also score high (similar contexts) — a known limitation.' }] },
    { theory: '<strong>Attention</strong> lets each token look at every other token. Self-attention computes Query, Key, Value matrices and produces a weighted sum of values.', deeper: 'score = softmax(QKᵀ / √d_k)·V. The √d_k scaling prevents vanishing gradients. Multi-head attention runs h parallel heads learning different relationships.', desc: 'The attention score scaling factor is:', tpl: ['scores = (Q @ K.T) / ', { b: 0 }, '(d_k)\nweights = softmax(scores)\noutput = weights @ V'], blanks: [{ ans: 'sqrt', opts: ['sqrt', 'log', 'exp', 'len'], exp: '<strong>√d_k scaling</strong> keeps dot products from saturating softmax in high dimensions — key to stable Transformer training.' }] }
  ]},
  { id: 7, track: 'llm', icon: '🤖', name: 'LLMs Deep Dive', sub: 'Transformers, RLHF & prompting', c: 2, qs: [
    { theory: '<strong>Transformers</strong> power all modern LLMs: token embeddings → positional encoding → N× (multi-head attention + feed-forward) → output projection.', deeper: 'GPT uses <strong>decoder-only</strong> Transformers with causal masking (each token sees only past tokens). BERT is encoder-only (sees all, used for classification). T5/BART are encoder-decoder.', desc: 'GPT-style models use which attention masking?', tpl: ['mask = torch.tril(torch.ones(T, T))\n# This is called ', { b: 0 }, ' masking'], blanks: [{ ans: 'causal', opts: ['causal', 'bidirectional', 'cross', 'sparse'], exp: '<strong>Causal (autoregressive) masking</strong> lets each token attend only to previous tokens — enabling next-token generation.' }] },
    { theory: '<strong>RLHF</strong> fine-tunes LLMs to follow instructions and be helpful, harmless and honest. Used by ChatGPT, Claude and Gemini.', deeper: 'Pipeline: (1) supervised fine-tuning, (2) train a reward model on human preference pairs, (3) PPO to optimise the policy. Anthropic\'s Constitutional AI extends this with AI feedback.', desc: 'RLHF uses this RL algorithm to optimise the policy:', tpl: ['for batch in prompts:\n  response = policy(batch)\n  reward = reward_model(response)\n  loss = ', { b: 0 }, '_loss(policy, reward)'], blanks: [{ ans: 'ppo', opts: ['ppo', 'dqn', 'reinforce', 'sac'], exp: '<strong>PPO</strong>\'s clipped objective prevents catastrophic policy degradation — critical when fine-tuning billion-parameter LLMs.' }] },
    { theory: '<strong>Prompt engineering</strong> shapes LLM output. Techniques: zero-shot, few-shot, chain-of-thought (CoT), system prompts, structured output.', deeper: 'Chain-of-thought improves reasoning by asking the model to "think step by step". It works because Transformers generate left-to-right — reasoning tokens give more computation before the answer.', desc: 'Which technique improves multi-step reasoning?', tpl: ['prompt = """\nSolve step by step.\nProblem: {problem}\n', { b: 0 }, ': Let me think...\n"""'], blanks: [{ ans: 'Chain-of-thought', opts: ['Chain-of-thought', 'Zero-shot', 'Temperature', 'Fine-tuning'], exp: '<strong>Chain-of-thought</strong> prompting improves math, logic and multi-hop QA. Tree-of-thought and ReAct extend it further.' }] }
  ]},
  { id: 8, track: 'rag', icon: '📚', name: 'RAG Systems', sub: 'Retrieval-Augmented Generation', c: 3, qs: [
    { theory: '<strong>RAG</strong> gives LLMs external knowledge by retrieving relevant documents and adding them to the prompt context at inference time.', deeper: 'RAG fixes two LLM limits: knowledge cutoff and hallucination. It grounds answers in real retrieved documents with sources. Used in Bing AI, Perplexity and enterprise search.', desc: 'RAG retrieves documents and adds them to the:', tpl: ['docs = retriever.search(query)\ncontext = format_docs(docs)\nresponse = llm(', { b: 0 }, ' + context + query)'], blanks: [{ ans: 'prompt', opts: ['prompt', 'weights', 'embeddings', 'database'], exp: 'RAG adds context to the <strong>prompt</strong> — no weight updates. Easy to update (just change the docs) and interpretable (show sources).' }] },
    { theory: '<strong>Vector databases</strong> store document embeddings and enable fast semantic search via approximate nearest-neighbour (ANN) algorithms like HNSW or FAISS.', deeper: 'HNSW achieves O(log n) search vs O(n) brute force via a multi-layer graph. Pinecone, Weaviate, Chroma and pgvector are popular. OpenAI\'s text-embedding-3-large is 3072-dim.', desc: 'RAG stores documents as dense vectors in a:', tpl: ['import chromadb\nclient = chromadb.Client()\ncol = client.create_collection("docs")\n# This is a ', { b: 0 }, ' database'], blanks: [{ ans: 'vector', opts: ['vector', 'SQL', 'graph', 'key-value'], exp: '<strong>Vector databases</strong> index high-dimensional embeddings for fast semantic similarity search — the backbone of RAG.' }] },
    { theory: '<strong>Chunking strategy</strong> decides how documents are split before embedding. Size, overlap and method affect retrieval quality.', deeper: 'Typical sizes: 256–512 tokens for precision, 512–1024 for context. Overlap (50–100 tokens) prevents losing info at boundaries. Advanced: semantic chunking, parent-child chunks.', desc: 'Documents are chunked with overlap to prevent:', tpl: ['splitter = RecursiveCharacterTextSplitter(\n  chunk_size=512,\n  chunk_overlap=', { b: 0 }, '\n)'], blanks: [{ ans: '50', opts: ['50', '0', '1000', '512'], exp: '<strong>Overlap</strong> of 50–100 tokens prevents information loss at chunk boundaries — a sentence split across chunks could be missed.' }] }
  ]},
  { id: 9, track: 'cv', icon: '👁️', name: 'Computer Vision', sub: 'CNNs, detection & ViT', c: 4, qs: [
    { theory: '<strong>CNNs</strong> apply learnable filters across spatial dimensions, building from edges → textures → parts → objects hierarchically.', deeper: 'A 3×3 conv with 64 channels on a 224×224 RGB image has only 1,728 parameters — far fewer than a dense layer. This weight sharing gives CNNs efficiency and translation invariance.', desc: 'CNNs use which operation to extract spatial features?', tpl: ['layer = nn.', { b: 0 }, '2d(\n  in_channels=3, out_channels=64, kernel_size=3\n)'], blanks: [{ ans: 'Conv', opts: ['Conv', 'Linear', 'Pool', 'Flatten'], exp: '<strong>Conv2d</strong> slides a learnable filter computing dot products. Early layers detect edges; deeper ones detect complex patterns.' }] },
    { theory: '<strong>Vision Transformers (ViT)</strong> split images into patches (e.g. 16×16) and treat each as a token, then apply standard Transformer attention.', deeper: 'ViT beats CNNs at scale but needs more data. Swin Transformer and DeiT add hierarchy and data-efficient training. CLIP and DALL-E use ViT-style encoders to align images with text.', desc: 'ViT converts images into fixed-size:', tpl: ['image = torch.randn(1, 3, 224, 224)\n# Split into 16x16 ', { b: 0 }, 's -> tokens'], blanks: [{ ans: 'patch', opts: ['patch', 'pixel', 'channel', 'embedding'], exp: 'ViT divides images into <strong>patches</strong> (196 for 224×224 with 16×16 patches). Each is projected to an embedding; attention runs across all visual tokens.' }] }
  ]},
  { id: 10, track: 'ops', icon: '⚙️', name: 'MLOps', sub: 'Pipelines, serving & monitoring', c: 0, qs: [
    { theory: '<strong>MLOps</strong> applies DevOps to ML: version control for data and models, automated training, CI/CD for experiments, and production monitoring.', deeper: 'Model drift is a major problem: data distributions shift over time, silently degrading performance. Teams monitor prediction distribution, feature stats and KPIs to catch drift early.', desc: 'Which platform is standard for experiment tracking?', tpl: ['import mlflow\nwith mlflow.start_run():\n  mlflow.', { b: 0 }, '("accuracy", 0.94)'], blanks: [{ ans: 'log_metric', opts: ['log_metric', 'save', 'track', 'record'], exp: '<strong>MLflow</strong>\'s <code>log_metric()</code> records metrics per run for comparison and reproducibility. Alternatives: W&B, Neptune, Comet.' }] },
    { theory: '<strong>Model serving</strong> exposes models as APIs. Key concerns: latency (p99), throughput, batching, hardware and autoscaling.', deeper: 'ONNX exports models from PyTorch/TensorFlow to optimised runtimes (TensorRT, OpenVINO). Quantisation (FP32→INT8) cuts size 4× and speeds inference 2–4× with minimal accuracy loss.', desc: 'Which format enables cross-framework deployment?', tpl: ['torch.onnx.export(model, dummy_input,\n  "model.', { b: 0 }, '",\n  opset_version=17)'], blanks: [{ ans: 'onnx', opts: ['onnx', 'pt', 'pb', 'pkl'], exp: '<strong>ONNX</strong> is an open model format. Export once from PyTorch; run on TensorRT, Core ML, OpenVINO or ONNX Runtime.' }] }
  ]},
  { id: 11, track: 'dl', icon: '🔄', name: 'Transformers', sub: 'Architecture deep dive', c: 1, qs: [
    { theory: 'The <strong>Transformer</strong> replaced RNNs for sequence tasks. Core innovation: self-attention computes relationships between all token pairs simultaneously — parallelisable on GPUs.', deeper: 'RNNs process tokens serially (O(n) steps). Transformers process all in parallel (O(1) steps, O(n²) memory). This is why Transformers scaled to billions of parameters and RNNs didn\'t.', desc: 'Transformers replaced RNNs because self-attention is:', tpl: ['# RNN: sequential, O(n) steps\n# Transformer: ', { b: 0 }, ', O(1) steps'], blanks: [{ ans: 'parallel', opts: ['parallel', 'faster', 'smaller', 'deeper'], exp: '<strong>Parallelism</strong> is why Transformers scaled — every token attends to every other simultaneously, and GPUs excel at parallel matmuls.' }] },
    { theory: '<strong>Positional encodings</strong> inject token position since self-attention is order-invariant. Sinusoidal (original) or learned (GPT/BERT) are common.', deeper: 'RoPE (used by LLaMA) encodes relative positions via rotation matrices, giving better length generalisation. ALiBi adds linear position biases, enabling extrapolation beyond training length.', desc: 'Positional encodings solve which limitation?', tpl: ['# "dog bites man" == "man bites dog"\n# We must encode ', { b: 0 }, ' in the input'], blanks: [{ ans: 'order', opts: ['order', 'meaning', 'length', 'context'], exp: 'Self-attention is <strong>permutation-invariant</strong> — without positional encodings, shuffling tokens gives the same output.' }] }
  ]},
  { id: 12, track: 'nlp', icon: '🔍', name: 'Embeddings & Search', sub: 'Dense retrieval & vector search', c: 2, qs: [
    { theory: '<strong>Sentence embeddings</strong> map text to fixed-size dense vectors capturing meaning. SBERT, OpenAI embeddings and Cohere Embed are popular.', deeper: 'Contrastive learning trains embedding models: positive pairs are pulled together, negatives pushed apart. SimCSE uses the same sentence twice with different dropout as a positive pair — elegant and effective.', desc: 'Semantic search ranks documents by which metric?', tpl: ['query_vec = embed(query)\nresults = vector_db.search(\n  query=query_vec, metric="', { b: 0 }, '"\n)'], blanks: [{ ans: 'cosine', opts: ['cosine', 'euclidean', 'bm25', 'jaccard'], exp: '<strong>Cosine similarity</strong> measures angle between vectors, ignoring magnitude — the standard for semantic search.' }] }
  ]},
  { id: 13, track: 'rag', icon: '🤝', name: 'AI Agents', sub: 'Tool use, memory & multi-agent', c: 3, qs: [
    { theory: '<strong>AI Agents</strong> extend LLMs with tools (search, code, APIs) and memory. The loop: observe → think → act → observe.', deeper: 'ReAct interleaves reasoning with tool calls. LangGraph and AutoGen enable multi-agent systems where specialised agents collaborate. Anthropic\'s tool use API lets Claude call functions natively.', desc: 'The agent loop pattern is observe → think → ___:', tpl: ['while not done:\n  thought = llm.think(observation)\n  action = llm.', { b: 0 }, '(thought)\n  observation = env.step(action)'], blanks: [{ ans: 'act', opts: ['act', 'predict', 'embed', 'train'], exp: 'The <strong>observe-think-act</strong> loop is the core of agentic AI — observe, reason (CoT), execute a tool call, update observation.' }] }
  ]},
  { id: 14, track: 'ml', icon: '🌲', name: 'Classical ML', sub: 'Trees, SVMs & ensembles', c: 4, qs: [
    { theory: '<strong>Random Forests</strong> aggregate many decorrelated decision trees. Bagging reduces variance; random feature selection decorrelates trees.', deeper: 'Gradient Boosting (XGBoost, LightGBM) sequentially adds trees correcting previous errors. XGBoost dominates Kaggle tabular competitions for speed, regularisation and missing-value handling.', desc: 'Random Forests reduce overfitting through:', tpl: ['model = RandomForestClassifier(\n  n_estimators=100,\n  max_features="', { b: 0 }, '"\n)'], blanks: [{ ans: 'sqrt', opts: ['sqrt', 'all', 'log2', 'none'], exp: '<strong>max_features="sqrt"</strong> means each tree considers √(n_features) at each split — decorrelating trees and reducing variance.' }] }
  ]},
  { id: 15, track: 'rl', icon: '🏆', name: 'Deep RL & RLHF', sub: 'DQN, PPO & alignment', c: 0, qs: [
    { theory: '<strong>DQN</strong> uses a neural net to approximate Q(s,a). Two key tricks: experience replay (breaks correlations) and a target network (stabilises training).', deeper: 'Experience replay stores (s,a,r,s\') tuples and samples random mini-batches — breaking the deadly triad: bootstrapping + off-policy + function approximation. Without it, DQN diverges.', desc: 'DQN stabilises training using a:', tpl: ['target = r + gamma * ', { b: 0 }, '_net(s_next).max()\n# this net updates slowly'], blanks: [{ ans: 'target', opts: ['target', 'online', 'policy', 'value'], exp: 'The <strong>target network</strong> is a delayed copy used for TD targets. Without it you chase a moving target, causing oscillations.' }] }
  ]}
];

/* ════════════════════════════════════════════════
   STATE + PERSISTENCE (localStorage)
════════════════════════════════════════════════ */
const SKEY = 'flutterquest_ai_state_v1';
let state = {
  user: null, xp: 0, hearts: 5, maxH: 5, streak: 1, lvl: 1,
  done: [], earnedT: [], lastEarn: null
};
let curL = null, curQ = 0, selA = null, hintShown = false, hintLoading = false, activeTrack = 'all';

function saveState() { try { localStorage.setItem(SKEY, JSON.stringify(state)); } catch (e) {} }
function loadState() {
  try { const s = localStorage.getItem(SKEY); if (s) { state = Object.assign(state, JSON.parse(s)); return true; } } catch (e) {}
  return false;
}
function doneSet() { return new Set(state.done); }
function earnSet() {
  // reset earned tasks each new calendar day
  const today = new Date().toDateString();
  if (state.lastEarn !== today) { state.earnedT = []; state.lastEarn = today; }
  return new Set(state.earnedT);
}

/* ════════════════════════════════════════════════
   UTILS
════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
  window.scrollTo(0, 0);
  if (id === 'main') renderHome();
  if (id === 'profile') renderProf();
}
function toast(msg, dur = 2600) { const t = $('toast'); t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), dur); }
function xpPop(n) { const p = $('xpp'); p.textContent = '+' + n + ' XP'; p.classList.add('show'); setTimeout(() => p.classList.remove('show'), 1600); }
function tp(id, btn) { const el = $(id); el.type = el.type === 'password' ? 'text' : 'password'; btn.textContent = el.type === 'password' ? '👁' : '🙈'; }
function strg(pw) {
  const ss = ['sg1', 'sg2', 'sg3', 'sg4'].map(id => $(id));
  ss.forEach(s => s.className = 'sg'); if (!pw) return;
  let sc = 0; if (pw.length >= 8) sc++; if (pw.length >= 12) sc++; if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) sc++; if (/[^A-Za-z0-9]/.test(pw)) sc++;
  const cl = sc <= 1 ? 'w' : sc === 2 ? 'm' : 's';
  for (let i = 0; i < sc; i++) ss[i].classList.add(cl);
}
function clrErr() { document.querySelectorAll('.fe').forEach(e => e.classList.remove('show')); document.querySelectorAll('.fi-in').forEach(e => e.classList.remove('err')); }
function shErr(id, inp) { $(id).classList.add('show'); if (inp) $(inp).classList.add('err'); }

/* ════════════════════════════════════════════════
   AUTH
════════════════════════════════════════════════ */
function doReg() {
  clrErr();
  const fn = $('r-fn').value.trim(), un = $('r-un').value.trim(), em = $('r-em').value.trim(), pw = $('r-pw').value;
  let ok = true;
  if (!fn) { shErr('e-fn', 'r-fn'); ok = false; }
  if (!un) { shErr('e-un', 'r-un'); ok = false; }
  if (!em || !em.includes('@')) { shErr('e-em', 'r-em'); ok = false; }
  if (pw.length < 8) { shErr('e-pw', 'r-pw'); ok = false; }
  if (!ok) return;
  const btn = $('rbtn'); btn.innerHTML = '<span class="sp dk"></span>'; btn.disabled = true;
  setTimeout(() => {
    state.user = { name: fn, un, em, init: fn[0].toUpperCase() };
    state.xp = 0; state.hearts = 5; state.streak = 1; state.lvl = 1; state.done = [];
    saveState();
    btn.innerHTML = 'CREATE ACCOUNT'; btn.disabled = false;
    toast('⚡ Welcome, ' + fn + '! Your quest begins!'); show('main');
  }, 900);
}
function doLog() {
  clrErr();
  const em = $('l-em').value.trim(), pw = $('l-pw').value;
  let ok = true;
  if (!em || !em.includes('@')) { shErr('e-lem', 'l-em'); ok = false; }
  if (!pw) { shErr('e-lpw', 'l-pw'); ok = false; }
  if (!ok) return;
  const btn = $('lbtn'); btn.innerHTML = '<span class="sp dk"></span>'; btn.disabled = true;
  setTimeout(() => {
    const nm = em.split('@')[0];
    if (!state.user) { state.user = { name: nm, un: nm, em, init: nm[0].toUpperCase() }; }
    saveState();
    btn.innerHTML = 'SIGN IN'; btn.disabled = false;
    toast('🔥 Welcome back, ' + state.user.name + '!'); show('main');
  }, 800);
}
function soc(p) {
  toast('🔗 Connecting to ' + p + '…');
  setTimeout(() => {
    const n = state.user ? state.user.name : (p === 'Google' ? 'Alex' : 'Sam');
    if (!state.user) state.user = { name: n, un: n.toLowerCase(), em: n.toLowerCase() + '@' + p.toLowerCase() + '.com', init: n[0] };
    saveState();
    toast('✅ Signed in with ' + p + '!'); show('main');
  }, 800);
}
function logout() { saveState(); toast('👋 See you next time!'); show('splash'); }
function resetProgress() {
  state = { user: state.user, xp: 0, hearts: 5, maxH: 5, streak: 1, lvl: 1, done: [], earnedT: [], lastEarn: null };
  saveState(); toast('↻ Progress reset'); renderProf(); updHUD();
}

/* ════════════════════════════════════════════════
   HUD + HEARTS
════════════════════════════════════════════════ */
function updHUD() {
  const needed = state.lvl * 100;
  const pct = Math.min(100, Math.round((state.xp / needed) * 100));
  $('xf').style.width = pct + '%'; $('xpr').textContent = state.xp + '/' + needed + ' XP';
  $('plvl').textContent = state.lvl; $('hx').textContent = state.xp + ' XP';
  if (state.user) $('hav').textContent = state.user.init;
  const hc = $('hh'); hc.innerHTML = '';
  for (let i = 0; i < state.maxH; i++) { const h = document.createElement('span'); h.className = 'hh-i' + (i < state.hearts ? '' : ' lost'); h.textContent = '❤️'; hc.appendChild(h); }
  $('strd').innerHTML = state.streak + '<small>STREAK</small>';
}
const EARN_KEYS = { watch: 1, drill: 1, share: 2, streak: 3 };
function earn(key) {
  const es = earnSet();
  if (es.has(key)) { toast('⏰ Already claimed today!'); return; }
  if (key === 'share' && navigator.share) {
    navigator.share({ title: 'FlutterQuest AI', text: 'Learn Flutter and AI through gamified challenges!', url: location.href }).catch(() => {});
  }
  state.earnedT.push(key);
  const n = EARN_KEYS[key] || 1;
  state.hearts = Math.min(state.maxH, state.hearts + n);
  saveState(); updHUD(); renderProf();
  toast('❤️ +' + n + ' heart' + (n > 1 ? 's' : '') + ' earned!');
}

/* ════════════════════════════════════════════════
   HOME
════════════════════════════════════════════════ */
function renderHome() {
  updHUD();
  const tabs = $('ttabs'); tabs.innerHTML = '';
  const allB = document.createElement('button');
  allB.className = 'tb' + (activeTrack === 'all' ? ' active' : ''); allB.textContent = 'ALL';
  allB.onclick = () => { activeTrack = 'all'; renderHome(); }; tabs.appendChild(allB);
  TRACKS.forEach(t => { const b = document.createElement('button'); b.className = 'tb' + (activeTrack === t.id ? ' active' : ''); b.textContent = t.label.toUpperCase(); b.onclick = () => { activeTrack = t.id; renderHome(); }; tabs.appendChild(b); });
  const grid = $('lgrid'); grid.innerHTML = '';
  const ds = doneSet();
  const filtered = activeTrack === 'all' ? LESSONS : LESSONS.filter(l => l.track === activeTrack);
  filtered.forEach(ls => {
    const isDone = ds.has(ls.id);
    const isLocked = activeTrack === 'all' && ls.id > 1 && !ds.has(ls.id - 1) && !isDone;
    const card = document.createElement('div');
    card.className = 'lc c' + ls.c + (isDone ? ' done' : '') + (isLocked ? ' locked' : '');
    const chipCls = isDone ? 'cd' : isLocked ? 'cl' : 'cn';
    const chipTxt = isDone ? '✓ DONE' : isLocked ? '🔒' : (TRACKS.find(t => t.id === ls.track)?.label || 'LESSON');
    const prog = isDone ? 100 : 0;
    card.innerHTML = `<div class="lct"><span class="lci">${ls.icon}</span><span class="lch ${chipCls}">${chipTxt}</span></div><div class="lcn">${ls.name}</div><div class="lcs">${ls.sub} · ${ls.qs.length}Q</div><div class="lcb"><div class="lcp" style="width:${prog}%;background:${isDone ? 'var(--neon)' : 'var(--border)'}"></div></div>`;
    if (!isLocked) card.addEventListener('click', () => startLesson(ls));
    grid.appendChild(card);
  });
}

/* ════════════════════════════════════════════════
   CHALLENGE
════════════════════════════════════════════════ */
function startLesson(ls) { curL = ls; curQ = 0; selA = null; hintShown = false; renderQ(); }
function renderQ() {
  show('challenge');
  const q = curL.qs[curQ]; const total = curL.qs.length;
  $('cttl').textContent = curL.name.toUpperCase();
  $('cpf').style.width = (curQ / total * 100) + '%';
  $('cnum').textContent = (curQ + 1) + '/' + total;
  selA = null; hintShown = false;
  let tpl = '';
  q.tpl.forEach(p => { if (typeof p === 'object') tpl += `<span class="bl" id="bl0">　　　　　</span>`; else tpl += escapeHtml(p); });
  const opts = q.blanks[0].opts.map(o => `<span class="oc" data-opt="${escapeAttr(o)}">${escapeHtml(o)}</span>`).join('');
  $('chin').innerHTML = `
    <div class="th">${q.theory}</div>
    ${q.deeper ? `<div class="dp"><div class="dh">⚡ DEEP DIVE</div>${q.deeper}</div>` : ''}
    <p class="cd-desc">${q.desc}</p>
    <div class="cb">${tpl}</div>
    <p class="ol">— Pick the correct answer —</p>
    <div class="og" id="og">${opts}</div>
    <button class="hb" onclick="showHint()">✨ <span id="hsp">Show AI explanation</span></button>
    <div class="aib" id="aib"></div>
    <button class="subb" id="subbtn" onclick="submitAns()" disabled>CHECK ANSWER</button>`;
  document.querySelectorAll('#og .oc').forEach(el => el.addEventListener('click', () => selOpt(el.dataset.opt, el)));
}
function selOpt(val, el) {
  document.querySelectorAll('.oc').forEach(o => o.classList.remove('sel'));
  el.classList.add('sel'); selA = val;
  const b = $('bl0'); b.textContent = val; b.classList.add('fl');
  $('subbtn').disabled = false;
}
function showHint() {
  if (hintShown) return;
  const q = curL.qs[curQ];
  const bub = $('aib');
  bub.innerHTML = '<strong>🤖 AI tutor:</strong> ' + q.blanks[0].exp;
  bub.classList.add('show'); $('hsp').textContent = 'Explanation shown ✓'; hintShown = true;
}
function submitAns() {
  const q = curL.qs[curQ]; const correct = selA === q.blanks[0].ans;
  if (correct) { state.xp += 35; xpPop(35); if (state.xp >= state.lvl * 100) { state.lvl++; toast('🎉 LEVEL UP! Now Level ' + state.lvl + '!'); } }
  else { state.hearts = Math.max(0, state.hearts - 1); }
  saveState(); updHUD();
  const isLast = curQ === curL.qs.length - 1;
  $('chin').innerHTML = `
    <div class="rc ${correct ? 'rok' : 'rng'}">
      <h3>${correct ? '⚡ CORRECT!' : '💥 NOT QUITE'}</h3>
      <p>${correct ? 'Excellent work!' : 'The answer is <strong>' + escapeHtml(q.blanks[0].ans) + '</strong>.'}</p>
      <div class="dex"><strong>📖 Deeper explanation:</strong> ${q.blanks[0].exp}</div>
    </div>
    <button class="cbn" onclick="${isLast ? 'lessonDone()' : 'nextQ()'}">${isLast ? 'FINISH LESSON ⚡' : 'NEXT CHALLENGE →'}</button>
    ${state.hearts === 0 ? '<p style="text-align:center;color:var(--neon3);font-size:11px;margin-top:10px;font-family:var(--display)">💔 No hearts left — earn more in profile!</p>' : ''}`;
}
function nextQ() { if (state.hearts <= 0) { toast('💔 Earn hearts to continue!'); show('main'); return; } curQ++; renderQ(); }
function lessonDone() {
  const ds = doneSet();
  if (!ds.has(curL.id)) state.done.push(curL.id);
  state.streak = Math.min(state.streak + 1, 9999);
  const earned = curL.qs.length * 35; state.xp += earned;
  if (state.xp >= state.lvl * 100) { state.lvl++; toast('🎉 LEVEL UP!'); }
  if (state.hearts < state.maxH) { state.hearts++; toast('❤️ Bonus heart for completing a lesson!'); }
  saveState(); updHUD(); show('complete');
  const facts = curL.qs.map(q => q.deeper).filter(Boolean);
  const factsHTML = facts.length ? `<div class="cf"><h4>🧠 KEY INSIGHTS FROM THIS LESSON</h4>${facts.map(f => `<div class="cfi">${stripTags(f).substring(0, 130)}…</div>`).join('')}</div>` : '';
  $('cmpin').innerHTML = `
    <div class="ctr">🏆</div>
    <div class="ctt">${curL.name.toUpperCase()}</div>
    <div class="csb">Lesson complete! You're mastering AI concepts.</div>
    ${factsHTML}
    <div class="str">
      <div class="stb"><div class="sv">+${earned}</div><div class="sl">XP EARNED</div></div>
      <div class="stb"><div class="sv">${curL.qs.length}</div><div class="sl">CHALLENGES</div></div>
      <div class="stb"><div class="sv">${state.streak}🔥</div><div class="sl">STREAK</div></div>
    </div>
    <button class="cbn" onclick="show('main')">BACK TO MAP ⚡</button>`;
}

/* ════════════════════════════════════════════════
   PROFILE
════════════════════════════════════════════════ */
function renderProf() {
  if (!state.user) return;
  $('pav').textContent = state.user.init;
  $('pname').textContent = state.user.name + ' @' + state.user.un;
  $('pem').textContent = state.user.em;
  $('pxp').textContent = state.xp; $('pdn').textContent = state.done.length;
  $('pst').textContent = state.streak + '🔥'; $('pht').textContent = state.hearts + '❤️';
}

/* ════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════ */
function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function escapeAttr(s) { return String(s).replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function stripTags(s) { return String(s).replace(/<[^>]+>/g, ''); }

/* ════════════════════════════════════════════════
   INSTALL PROMPT (PWA)
════════════════════════════════════════════════ */
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); deferredPrompt = e;
  if (!localStorage.getItem('fq_install_dismissed')) {
    setTimeout(() => $('installbar').classList.add('show'), 3000);
  }
});
$('installbtn').addEventListener('click', async () => {
  $('installbar').classList.remove('show');
  if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; }
});
function dismissInstall() { $('installbar').classList.remove('show'); localStorage.setItem('fq_install_dismissed', '1'); }
window.addEventListener('appinstalled', () => { $('installbar').classList.remove('show'); toast('✅ App installed!'); });

/* ════════════════════════════════════════════════
   SERVICE WORKER
════════════════════════════════════════════════ */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(() => {});
  });
}

/* ════════════════════════════════════════════════
   BOOT
════════════════════════════════════════════════ */
(function boot() {
  const had = loadState();
  updHUD();
  // deep-link via ?screen=
  const params = new URLSearchParams(location.search);
  const scr = params.get('screen');
  if (had && state.user) {
    if (scr === 'profile') show('profile');
    else show('main');
  } else {
    show('splash');
  }
})();
