'use client';
import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';
import { useShop } from '../context/shopcontext';

export const SizeGuideModal: React.FC = () => {
  const { sizeGuideOpen, setSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [categoryTab, setCategoryTab] = useState<'men' | 'women' | 'kids'>('women');

  if (!sizeGuideOpen) return null;

  const sizeCharts = {
    women: [
      { size: 'XS', bustIn: '31-33', waistIn: '24-26', hipsIn: '34-36', bustCm: '78-84', waistCm: '61-66', hipsCm: '86-91' },
      { size: 'S', bustIn: '34-35', waistIn: '27-28', hipsIn: '37-38', bustCm: '86-89', waistCm: '68-71', hipsCm: '94-97' },
      { size: 'M', bustIn: '36-38', waistIn: '29-31', hipsIn: '39-41', bustCm: '91-97', waistCm: '74-79', hipsCm: '99-104' },
      { size: 'L', bustIn: '39-41', waistIn: '32-34', hipsIn: '42-44', bustCm: '99-104', waistCm: '81-86', hipsCm: '107-112' },
      { size: 'XL', bustIn: '42-44', waistIn: '35-37', hipsIn: '45-47', bustCm: '107-112', waistCm: '89-94', hipsCm: '114-119' },
      { size: 'XXL', bustIn: '45-47', waistIn: '38-40', hipsIn: '48-50', bustCm: '114-119', waistCm: '96-102', hipsCm: '122-127' },
    ],
    men: [
      { size: 'XS', chestIn: '34-36', waistIn: '28-30', hipsIn: '34-36', chestCm: '86-91', waistCm: '71-76', hipsCm: '86-91' },
      { size: 'S', chestIn: '36-38', waistIn: '30-32', hipsIn: '36-38', chestCm: '91-97', waistCm: '76-81', hipsCm: '91-97' },
      { size: 'M', chestIn: '38-40', waistIn: '32-34', hipsIn: '38-40', chestCm: '97-102', waistCm: '81-86', hipsCm: '97-102' },
      { size: 'L', chestIn: '40-42', waistIn: '34-36', hipsIn: '40-42', chestCm: '102-107', waistCm: '86-91', hipsCm: '102-107' },
      { size: 'XL', chestIn: '42-44', waistIn: '36-38', hipsIn: '42-44', chestCm: '107-112', waistCm: '91-97', hipsCm: '107-112' },
      { size: 'XXL', chestIn: '44-46', waistIn: '38-40', hipsIn: '44-46', chestCm: '112-117', waistCm: '97-102', hipsCm: '112-117' },
    ],
    kids: [
      { size: 'XS (3-4Y)', heightIn: '39-41', chestIn: '21-22', waistIn: '20-21', heightCm: '98-104', chestCm: '54-56', waistCm: '51-53' },
      { size: 'S (5-6Y)', heightIn: '43-46', chestIn: '23-24', waistIn: '22-23', heightCm: '110-116', chestCm: '58-61', waistCm: '55-58' },
      { size: 'M (7-8Y)', heightIn: '48-50', chestIn: '25-26', waistIn: '23-24', heightCm: '122-128', chestCm: '63-66', waistCm: '58-61' },
      { size: 'L (9-10Y)', heightIn: '53-55', chestIn: '27-28', waistIn: '24-25', heightCm: '134-140', chestCm: '69-72', waistCm: '61-64' },
      { size: 'XL (11-12Y)', heightIn: '57-60', chestIn: '29-31', waistIn: '26-27', heightCm: '146-152', chestCm: '74-78', waistCm: '66-69' },
    ]
  };

  return (
    <div 
      id="size-guide-modal-overlay"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={() => setSizeGuideOpen(false)}
    >
      <div 
        id="size-guide-modal-panel"
        className="w-full max-w-2xl bg-[#FAF9F6] rounded-2xl shadow-2xl overflow-hidden border border-[#E0DDD5] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8E6DF] flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2">
            <Ruler className="w-5 h-5 text-[#1A1A1A]" />
            <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A]">
              Atelier Sizing Guide
            </h3>
          </div>
          <button
            id="size-guide-close-btn"
            onClick={() => setSizeGuideOpen(false)}
            aria-label="Close size guide"
            className="p-1.5 text-[#8C8880] hover:text-[#1A1A1A] hover:bg-[#EFECE6] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Controls: Department Tabs & Unit Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex bg-[#EFECE6] p-1 rounded-xl">
              {(['women', 'men', 'kids'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setCategoryTab(tab)}
                  className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                    categoryTab === tab
                      ? 'bg-white text-[#1A1A1A] shadow-xs'
                      : 'text-[#8C8880] hover:text-[#1A1A1A]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-[#8C8880] font-medium">Unit:</span>
              <div className="flex bg-[#EFECE6] p-1 rounded-xl">
                <button
                  onClick={() => setUnit('inches')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    unit === 'inches' ? 'bg-white text-[#1A1A1A] shadow-xs' : 'text-[#8C8880]'
                  }`}
                >
                  Inches
                </button>
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    unit === 'cm' ? 'bg-white text-[#1A1A1A] shadow-xs' : 'text-[#8C8880]'
                  }`}
                >
                  CM
                </button>
              </div>
            </div>
          </div>

          {/* Sizing Table */}
          <div className="border border-[#E0DDD5] rounded-xl overflow-hidden bg-white shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F1EA] text-[#1A1A1A] uppercase tracking-wider font-semibold border-b border-[#E0DDD5]">
                <tr>
                  <th className="py-3 px-4">Size</th>
                  {categoryTab === 'kids' ? (
                    <>
                      <th className="py-3 px-4">Height</th>
                      <th className="py-3 px-4">Chest</th>
                      <th className="py-3 px-4">Waist</th>
                    </>
                  ) : (
                    <>
                      <th className="py-3 px-4">{categoryTab === 'men' ? 'Chest' : 'Bust'}</th>
                      <th className="py-3 px-4">Waist</th>
                      <th className="py-3 px-4">Hips</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E6DF]">
                {categoryTab === 'women' &&
                  sizeCharts.women.map((row) => (
                    <tr key={row.size} className="hover:bg-[#FAF9F6]">
                      <td className="py-3 px-4 font-bold text-[#1A1A1A]">{row.size}</td>
                      <td className="py-3 px-4 text-[#5A5854]">{unit === 'inches' ? row.bustIn : row.bustCm}</td>
                      <td className="py-3 px-4 text-[#5A5854]">{unit === 'inches' ? row.waistIn : row.waistCm}</td>
                      <td className="py-3 px-4 text-[#5A5854]">{unit === 'inches' ? row.hipsIn : row.hipsCm}</td>
                    </tr>
                  ))}

                {categoryTab === 'men' &&
                  sizeCharts.men.map((row) => (
                    <tr key={row.size} className="hover:bg-[#FAF9F6]">
                      <td className="py-3 px-4 font-bold text-[#1A1A1A]">{row.size}</td>
                      <td className="py-3 px-4 text-[#5A5854]">{unit === 'inches' ? row.chestIn : row.chestCm}</td>
                      <td className="py-3 px-4 text-[#5A5854]">{unit === 'inches' ? row.waistIn : row.waistCm}</td>
                      <td className="py-3 px-4 text-[#5A5854]">{unit === 'inches' ? row.hipsIn : row.hipsCm}</td>
                    </tr>
                  ))}

                {categoryTab === 'kids' &&
                  sizeCharts.kids.map((row) => (
                    <tr key={row.size} className="hover:bg-[#FAF9F6]">
                      <td className="py-3 px-4 font-bold text-[#1A1A1A]">{row.size}</td>
                      <td className="py-3 px-4 text-[#5A5854]">{unit === 'inches' ? row.heightIn : row.heightCm}</td>
                      <td className="py-3 px-4 text-[#5A5854]">{unit === 'inches' ? row.chestIn : row.chestCm}</td>
                      <td className="py-3 px-4 text-[#5A5854]">{unit === 'inches' ? row.waistIn : row.waistCm}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Measurement Tips */}
          <div className="p-4 bg-[#F0ECE1] rounded-xl text-xs text-[#5A5854] space-y-1.5 leading-relaxed">
            <h4 className="font-semibold text-[#1A1A1A]">How to measure yourself:</h4>
            <p>• <strong>Bust / Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</p>
            <p>• <strong>Waist:</strong> Measure around the narrowest part (typically right above your navel).</p>
            <p>• <strong>Hips:</strong> Measure around the fullest part of your hips and seat.</p>
          </div>
        </div>

        <div className="p-4 bg-[#EFECE6] border-t border-[#E8E6DF] text-center">
          <button
            id="size-guide-got-it-btn"
            onClick={() => setSizeGuideOpen(false)}
            className="px-6 py-2 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-black transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
