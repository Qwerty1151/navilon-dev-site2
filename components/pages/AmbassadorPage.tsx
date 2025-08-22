
import React, { useState } from 'react';
import { Heart, Users, ArrowRight, Trophy, Calendar, CheckCircle, Share2 } from '../ui/icons';
import { useTranslation } from '../../hooks/useTranslation';

export function AmbassadorPage() {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(37);
  const [amount, setAmount] = useState(50);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    // имитация успешного платежа
    setProgress(Math.min(100, progress + Math.round((amount/1000)*100)));
    alert(t.ambassador.thanks);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 pb-20">
      <section className="relative py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                {t.ambassador.title}
              </h1>
              <p className="text-lg text-slate-600 mb-6">{t.ambassador.subtitle}</p>

              <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{t.ambassador.raised}</span>
                  <span className="text-slate-600">{progress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-emerald-500" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex items-center text-sm text-slate-600 gap-4">
                  <span><Trophy className="inline w-4 h-4 mr-1" /> {t.ambassador.goal}</span>
                  <span><Users className="inline w-4 h-4 mr-1" /> {t.ambassador.supporters}</span>
                  <span><Calendar className="inline w-4 h-4 mr-1" /> {t.ambassador.deadline}</span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h3>{t.ambassador.storyTitle}</h3>
                <p>{t.ambassador.story1}</p>
                <p>{t.ambassador.story2}</p>
                <ul>
                  <li>{t.ambassador.point1}</li>
                  <li>{t.ambassador.point2}</li>
                  <li>{t.ambassador.point3}</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-rose-600" />
                <h2 className="text-2xl font-bold">{t.ambassador.ctaTitle}</h2>
              </div>
              <form onSubmit={handleDonate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t.ambassador.amount}</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value || '0'))}
                    min={5}
                    step={5}
                    className="w-full rounded-xl border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[25,50,100].map(v => (
                    <button key={v} type="button"
                      onClick={() => setAmount(v)}
                      className="border rounded-xl py-2 font-medium hover:bg-slate-50">{v}</button>
                  ))}
                </div>
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl py-3">
                  <Heart className="w-5 h-5" /> {t.ambassador.donate} <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-slate-500">{t.ambassador.secure}</p>
              </form>

              <div className="mt-6 border-t pt-4">
                <h3 className="font-semibold mb-2">{t.ambassador.donorWall}</h3>
                <ul className="space-y-2 text-sm">
                  <li><CheckCircle className="inline w-4 h-4 text-emerald-600 mr-1" /> A*** — 100</li>
                  <li><CheckCircle className="inline w-4 h-4 text-emerald-600 mr-1" /> M*** — 50</li>
                  <li><CheckCircle className="inline w-4 h-4 text-emerald-600 mr-1" /> S*** — 25</li>
                </ul>
                <button className="mt-3 inline-flex items-center gap-2 text-slate-700 hover:text-slate-900">
                  <Share2 className="w-4 h-4" /> {t.ambassador.share}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-6xl">
        <h3 className="text-xl font-bold mb-3">{t.ambassador.faqTitle}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="font-semibold mb-1">{t.ambassador.q1}</p>
            <p className="text-slate-600">{t.ambassador.a1}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="font-semibold mb-1">{t.ambassador.q2}</p>
            <p className="text-slate-600">{t.ambassador.a2}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
