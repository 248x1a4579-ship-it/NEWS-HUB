import React, { useState } from 'react';
import { 
  BookOpen, 
  Terminal, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Smartphone, 
  FolderTree, 
  HelpCircle,
  Package,
  Layers,
  Bug
} from 'lucide-react';

export const TutorialGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyText = (text: string, index: number) => {
    navigator.clipboard?.writeText?.(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      id: 1,
      title: 'Step 1: Install Flutter SDK & Android Studio',
      subtitle: 'Setting up your development machine for college project work',
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <p>
            Welcome to the <strong>NEWS HUB</strong> project! As a beginner, here is everything you need before writing code:
          </p>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>Prerequisites Checklist:</span>
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong>Flutter SDK (3.0.0+)</strong>: Download from <a href="https://flutter.dev" target="_blank" rel="noreferrer" className="text-blue-400 underline">flutter.dev</a> and add to system PATH.</li>
              <li><strong>Android Studio</strong>: Install Android SDK, Android SDK Command-line Tools, and Android Emulator.</li>
              <li><strong>VS Code</strong> or <strong>Android Studio</strong>: Install the official <strong>Flutter</strong> and <strong>Dart</strong> plugins.</li>
            </ul>
          </div>
          <p>Verify your environment in terminal by running:</p>
          <div className="relative bg-black/60 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] flex items-center justify-between">
            <span className="text-emerald-400">flutter doctor</span>
            <button
              onClick={() => copyText('flutter doctor', 101)}
              className="text-slate-400 hover:text-white p-1"
            >
              {copiedIndex === 101 ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Step 2: Create Project & Folder Architecture',
      subtitle: 'Initializing the clean Flutter project structure',
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <p>
            Run this exact terminal command inside your workspace folder to create the project:
          </p>
          <div className="relative bg-black/60 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] flex items-center justify-between">
            <span className="text-emerald-400">flutter create --org com.newshub news_hub</span>
            <button
              onClick={() => copyText('flutter create --org com.newshub news_hub', 102)}
              className="text-slate-400 hover:text-white p-1"
            >
              {copiedIndex === 102 ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <p>Next, move into the new directory and create the architectural folders:</p>
          <div className="relative bg-black/60 p-3 rounded-lg border border-slate-800 font-mono text-[11px] flex items-center justify-between">
            <div className="space-y-1 text-emerald-400">
              <p>cd news_hub</p>
              <p>mkdir -p lib/models lib/services lib/providers lib/screens lib/widgets</p>
            </div>
            <button
              onClick={() => copyText('cd news_hub\nmkdir -p lib/models lib/services lib/providers lib/screens lib/widgets', 103)}
              className="text-slate-400 hover:text-white p-1"
            >
              {copiedIndex === 103 ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <div className="p-3 bg-blue-950/40 border border-blue-900/60 rounded-xl space-y-1">
            <p className="font-bold text-blue-200">Why this folder architecture?</p>
            <p className="text-slate-400 text-[11px]">
              This is the industry-standard <strong>Feature/Layer separation</strong>. It guarantees that models, network logic, UI screens, and state managers never mix, making code easy to explain to your college professor.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Step 3: Install Required Dependencies',
      subtitle: 'Adding Provider, HTTP, SharedPreferences, CachedNetworkImage, and Intl',
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <p>
            In your terminal inside <code className="text-cyan-300 font-mono">news_hub</code>, run this single command to install all 7 packages:
          </p>
          <div className="relative bg-black/60 p-3 rounded-lg border border-slate-800 font-mono text-[11px] flex items-center justify-between">
            <span className="text-emerald-400 break-all">
              flutter pub add provider http shared_preferences cached_network_image intl share_plus url_launcher cupertino_icons
            </span>
            <button
              onClick={() => copyText('flutter pub add provider http shared_preferences cached_network_image intl share_plus url_launcher cupertino_icons', 104)}
              className="text-slate-400 hover:text-white p-1 shrink-0 ml-2"
            >
              {copiedIndex === 104 ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <span className="font-bold text-blue-400">provider</span>
              <p className="text-slate-400 mt-0.5">State management without rebuilding the entire widget tree.</p>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <span className="font-bold text-blue-400">shared_preferences</span>
              <p className="text-slate-400 mt-0.5">Saves bookmarked articles as JSON on Android device storage.</p>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <span className="font-bold text-blue-400">http</span>
              <p className="text-slate-400 mt-0.5">Makes asynchronous GET requests to REST News endpoints.</p>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <span className="font-bold text-blue-400">cached_network_image</span>
              <p className="text-slate-400 mt-0.5">Caches article pictures in memory and disk to avoid slow reloads.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Step 4: Connecting the Free GNews REST API',
      subtitle: 'Configuring your API key and understanding the fallback dataset',
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <p>
            NEWS HUB uses the <strong>GNews v4 REST API</strong> (<a href="https://gnews.io" target="_blank" rel="noreferrer" className="text-blue-400 underline">https://gnews.io</a>).
          </p>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-100">How to get your free key:</h4>
            <ol className="list-decimal pl-5 space-y-1 text-slate-400">
              <li>Visit <a href="https://gnews.io" target="_blank" rel="noreferrer" className="text-blue-400 underline">gnews.io</a> and register a free account.</li>
              <li>Copy your API key from the dashboard (Free tier gives 100 requests per day).</li>
              <li>Open <code className="text-cyan-300 font-mono">lib/services/news_api_service.dart</code>.</li>
              <li>Replace <code className="text-amber-300 font-mono">YOUR_GNEWS_API_KEY_HERE</code> with your copied key.</li>
            </ol>
          </div>
          <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-xl space-y-1">
            <p className="font-bold text-emerald-300">🛡️ Built-in Fail-Safe for College Grading:</p>
            <p className="text-slate-300 text-[11px]">
              If your API quota runs out or the college Wi-Fi blocks the request, <code>news_api_service.dart</code> automatically falls back to an offline curated dataset. Your app will <strong>NEVER crash</strong> during your evaluation!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Step 5: Understanding Provider State Management',
      subtitle: 'How MultiProvider, ChangeNotifier, and notifyListeners work together',
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <p>
            Provider is the recommended state management approach for college evaluations because it follows clean OOP and reactive principles:
          </p>
          <div className="space-y-2">
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <span className="font-bold text-amber-300">1. ChangeNotifier</span>
              <p className="text-slate-400 mt-0.5">
                Classes like <code>NewsProvider</code> and <code>BookmarkProvider</code> extend <code>ChangeNotifier</code>. When data changes (e.g. user taps Bookmark), we call <code>notifyListeners()</code>.
              </p>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <span className="font-bold text-blue-300">2. MultiProvider (in main.dart)</span>
              <p className="text-slate-400 mt-0.5">
                Placed at the very top of the widget tree so any screen (Home, Categories, Details, Saved) can access the data.
              </p>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <span className="font-bold text-emerald-300">3. Provider.of&lt;T&gt;(context)</span>
              <p className="text-slate-400 mt-0.5">
                Widgets listen for updates. When an article is bookmarked on the Details screen, the Bookmarks tab automatically updates without refreshing.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: 'Step 6: Running on Android Emulator & Physical Phone',
      subtitle: 'How to debug and view your app in real-time',
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
              <Smartphone size={16} className="text-blue-400" />
              <span>Option A: Physical Android Phone via USB (Best & Fastest)</span>
            </h4>
            <ol className="list-decimal pl-5 space-y-1 text-slate-400">
              <li>On your phone, go to <strong>Settings → About Phone</strong> and tap <strong>Build Number</strong> 7 times until Developer Options are enabled.</li>
              <li>Go to <strong>Settings → Developer Options</strong> and toggle ON <strong>USB Debugging</strong>.</li>
              <li>Connect your phone with a USB cable and tap <strong>Allow USB Debugging</strong> on your phone screen.</li>
              <li>Run <code className="text-emerald-400 font-mono">flutter devices</code> in terminal to verify your device name appears.</li>
              <li>Run <code className="text-emerald-400 font-mono">flutter run</code>.</li>
            </ol>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
              <Smartphone size={16} className="text-purple-400" />
              <span>Option B: Android Studio Emulator</span>
            </h4>
            <ol className="list-decimal pl-5 space-y-1 text-slate-400">
              <li>Open Android Studio → Device Manager.</li>
              <li>Click <strong>Create Device</strong> → Select <strong>Pixel 8</strong> → Choose <strong>Android 14 (API 34)</strong>.</li>
              <li>Click the Play button to start the emulator.</li>
              <li>Run <code className="text-emerald-400 font-mono">flutter run</code>.</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      title: 'Step 7: Building Release APK for Submission',
      subtitle: 'Generating the final installable APK file for professors and evaluators',
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <p>
            To submit your project to your college portal or install directly onto your professor's Android phone without developer mode:
          </p>
          <div className="relative bg-black/60 p-3 rounded-lg border border-slate-800 font-mono text-[11px] flex items-center justify-between">
            <span className="text-emerald-400 font-bold">flutter build apk --release</span>
            <button
              onClick={() => copyText('flutter build apk --release', 107)}
              className="text-slate-400 hover:text-white p-1"
            >
              {copiedIndex === 107 ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <p>Once compilation finishes, your APK file is created at:</p>
          <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-cyan-300 text-[11px] break-all">
            build/app/outputs/flutter-apk/app-release.apk
          </div>
          <p className="text-slate-400 text-[11px]">
            You can email this APK or upload it to Google Drive so your evaluators can install it with 1 tap.
          </p>
        </div>
      ),
    },
    {
      id: 8,
      title: 'Step 8: Viva Voce & College Defense Q&A',
      subtitle: 'Answers to the most common questions professors ask during project evaluation',
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
            <p className="font-bold text-amber-300">Q1: Why did you choose Provider over setState?</p>
            <p className="text-slate-300 text-[11px]">
              <strong>A:</strong> <code>setState()</code> only rebuilds the local widget state. If an article is bookmarked on the Details screen, <code>setState</code> cannot inform the Bookmarks screen without complex callback passing. Provider implements the Observer pattern, updating any listening screen instantly.
            </p>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
            <p className="font-bold text-blue-300">Q2: How are bookmarks persisted across device reboots?</p>
            <p className="text-slate-300 text-[11px]">
              <strong>A:</strong> In <code>BookmarkProvider</code>, the <code>Article</code> model is serialized to JSON via <code>article.toJson()</code>. Then <code>SharedPreferences.setStringList()</code> writes the list of JSON strings to the Android device's local private storage.
            </p>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
            <p className="font-bold text-emerald-300">Q3: How does your search form satisfy form validation?</p>
            <p className="text-slate-300 text-[11px]">
              <strong>A:</strong> <code>SearchScreen</code> uses a <code>Form</code> widget with a <code>GlobalKey&lt;FormState&gt;</code>. Its <code>validator</code> enforces that the query is not empty and has at least 2 characters before invoking the API service.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const current = steps.find((s) => s.id === activeStep) || steps[0];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen size={18} className="text-red-500" />
          <h3 className="font-bold text-xs text-white">Student Step-by-Step Learning Guide</h3>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          Step {activeStep} of {steps.length}
        </span>
      </div>

      {/* Step Navigation Tabs */}
      <div className="px-3 py-2 bg-slate-900/60 border-b border-slate-800 overflow-x-auto no-scrollbar flex gap-1.5 shrink-0">
        {steps.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStep(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              activeStep === s.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            {s.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Active Step Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div>
          <h2 className="text-base font-extrabold text-white">{current.title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{current.subtitle}</p>
        </div>

        {current.content}

        {/* Previous / Next Buttons */}
        <div className="pt-6 flex items-center justify-between border-t border-slate-800/80">
          <button
            disabled={activeStep === 1}
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeStep === 1
                ? 'opacity-30 cursor-not-allowed bg-slate-800 text-slate-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            ← Previous Step
          </button>

          <button
            disabled={activeStep === steps.length}
            onClick={() => setActiveStep((prev) => Math.min(steps.length, prev + 1))}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeStep === steps.length
                ? 'opacity-30 cursor-not-allowed bg-slate-800 text-slate-500'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow'
            }`}
          >
            Next Step →
          </button>
        </div>
      </div>
    </div>
  );
};
