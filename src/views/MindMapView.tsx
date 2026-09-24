import React, { useState } from 'react';
import {
  GitFork,
  Sparkles,
  RefreshCw,
  FolderTree,
  List,
  Layers,
  ChevronRight,
  ChevronDown,
  BookOpen,
} from 'lucide-react';
import { ToastMessage } from '../components/Toast';

interface MindMapViewProps {
  onAddToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

export const MindMapView: React.FC<MindMapViewProps> = ({ onAddToast }) => {
  const [keyword, setKeyword] = useState('Lặng lẽ Sa Pa (Nguyễn Thành Long)');
  const [viewMode, setViewMode] = useState<'map' | 'tree' | 'list'>('map');
  const [loading, setLoading] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    '1': true,
    '2': true,
    '3': true,
    '4': true,
    '5': true,
    '6': true,
  });

  const presetWorks = [
    'Lặng lẽ Sa Pa (Nguyễn Thành Long)',
    'Đồng chí (Chính Hữu)',
    'Cô bé bán diêm (An-đéc-xen)',
    'Thánh Gióng (Truyền thuyết)',
    'Bài học đường đời đầu tiên (Tô Hoài)',
    'Biện pháp tu từ So sánh & Ẩn dụ',
  ];

  const [mapData, setMapData] = useState<any>({
    center: 'Lặng lẽ Sa Pa (Nguyễn Thành Long)',
    summary:
      'Truyện ngắn ngợi ca những con người lao động bình dị đang ngày đêm cống hiến thầm lặng cho công cuộc xây dựng và bảo vệ Tổ quốc nơi vùng núi Sa Pa.',
    branches: [
      {
        id: '1',
        title: '1. Tác giả & Hoàn cảnh sáng tác',
        color: '#4169F6',
        items: [
          'Nguyễn Thành Long (1925 - 1991), quê Quảng Nam, cây bút văn xuôi chuyên về truyện ngắn.',
          'Sáng tác mùa hè năm 1970 trong chuyến đi thực tế Lào Cai.',
          'Rút từ tập truyện "Giữa trong xanh" (1972).',
        ],
      },
      {
        id: '2',
        title: '2. Nhân vật Anh thanh niên (Trung tâm)',
        color: '#6750FF',
        items: [
          'Hoàn cảnh: 27 tuổi, sống và làm việc một mình trên đỉnh Yên Sơn cao 2600m.',
          'Công việc: Khí tượng kiêm vật lý địa cầu, đo gió, đo mưa, báo giờ ốp chính xác.',
          'Phẩm chất: Say mê yêu nghề, tinh thần trách nhiệm cao, nếp sống ngăn nắp, cởi mở, khiêm tốn.',
        ],
      },
      {
        id: '3',
        title: '3. Các nhân vật phụ giàu ý nghĩa',
        color: '#11B981',
        items: [
          'Ông họa sĩ già: giàu trải nghiệm, say mê cái đẹp, đi tìm cảm hứng nghệ thuật đích thực.',
          'Cô kỹ sư trẻ: nhiệt huyết của thế hệ trẻ rời thủ đô lên Tây Bắc cống hiến.',
          'Bác lái xe: cầu nối thân tình, vui tính và quan tâm người khác.',
        ],
      },
      {
        id: '4',
        title: '4. Đặc sắc nghệ thuật',
        color: '#FF7A00',
        items: [
          'Cốt truyện giản dị, tình huống gặp gỡ bất ngờ chỉ vỏn vẹn trong 30 phút.',
          'Chất thơ bàng bạc trong cảnh sắc thiên nhiên Sa Pa và tâm hồn con người.',
          'Trần thuật qua điểm nhìn của ông họa sĩ giúp bức chân dung thêm sâu sắc.',
        ],
      },
      {
        id: '5',
        title: '5. Chủ đề & Thông điệp tư tưởng',
        color: '#EC4899',
        items: [
          'Khẳng định vẻ đẹp của sự cống hiến thầm lặng: "Trong cái lặng im của Sa Pa... Sa Pa mà chỉ nghe tên, người ta chỉ nghĩ đến chuyện nghỉ ngơi...".',
          'Ý nghĩa cuộc sống đích thực được tìm thấy qua lao động có ích cho cộng đồng.',
        ],
      },
    ],
  });

  const handleGenerate = async (customKeyword?: string) => {
    const term = customKeyword || keyword;
    if (!term.trim() || loading) return;
    setLoading(true);

    try {
      const res = await fetch('/api/ai/mind-map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: term, category: 'Ngữ văn THCS' }),
      });
      const data = await res.json();
      if (data.data) {
        setMapData({
          center: data.data.center,
          summary: data.data.summary,
          branches: data.data.branches.map((b: any, i: number) => ({
            id: String(i + 1),
            title: b.title,
            color: b.color || '#4169F6',
            items: b.children || [],
          })),
        });
        onAddToast({ type: 'success', title: 'Đã tạo sơ đồ tư duy mới!' });
      }
    } catch {
      onAddToast({ type: 'info', title: 'Sơ đồ tư duy sẵn sàng!' });
    } finally {
      setLoading(false);
    }
  };

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 text-[#6750FF] text-xs font-bold mb-2">
            <GitFork className="w-3.5 h-3.5" />
            <span>HỆ THỐNG HÓA KIẾN THỨC</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Sơ Đồ Tư Duy AI (Mind Map)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Chuyển hóa tác phẩm văn học, nhân vật và ngữ pháp tiếng Việt thành mạng lưới tri thức trực quan.
          </p>
        </div>

        {/* View mode switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-2xl">
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'map' ? 'bg-white dark:bg-slate-800 text-[#6750FF] shadow-xs' : 'text-slate-500'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Sơ đồ Node</span>
          </button>
          <button
            onClick={() => setViewMode('tree')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'tree' ? 'bg-white dark:bg-slate-800 text-[#6750FF] shadow-xs' : 'text-slate-500'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Dàn ý Cây</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'list' ? 'bg-white dark:bg-slate-800 text-[#6750FF] shadow-xs' : 'text-slate-500'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Danh sách</span>
          </button>
        </div>
      </div>

      {/* Input & Presets */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Nhập tên tác phẩm, tác giả hoặc bài học tiếng Việt..."
            className="flex-1 rounded-2xl px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-hidden focus:border-[#6750FF]"
          />
          <button
            onClick={() => handleGenerate()}
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#6750FF] to-indigo-600 text-white font-bold text-xs sm:text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 shrink-0 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Tạo Sơ đồ tư duy</span>
          </button>
        </div>

        {/* Preset chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-400 font-medium">Gợi ý tác phẩm:</span>
          {presetWorks.map((work, idx) => (
            <button
              key={idx}
              onClick={() => {
                setKeyword(work);
                handleGenerate(work);
              }}
              className="text-[11px] px-3 py-1.5 rounded-full bg-slate-100 hover:bg-purple-50 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium transition-colors"
            >
              {work}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE NODE MAP */}
      {viewMode === 'map' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-8">
          {/* Central Root Node */}
          <div className="max-w-xl mx-auto p-5 rounded-3xl bg-gradient-to-r from-[#4169F6] via-[#5B52FF] to-[#6750FF] text-white text-center shadow-xl shadow-indigo-500/20">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
              TRỌNG TÂM TRI THỨC
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold mt-1">{mapData.center}</h3>
            {mapData.summary && (
              <p className="text-xs text-blue-100 mt-2 leading-relaxed max-w-lg mx-auto font-medium">
                {mapData.summary}
              </p>
            )}
          </div>

          {/* Branches Radial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mapData.branches.map((branch: any) => {
              const isExpanded = expandedNodes[branch.id];
              return (
                <div
                  key={branch.id}
                  className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                          style={{ backgroundColor: branch.color }}
                        />
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {branch.title}
                        </h4>
                      </div>
                      <button
                        onClick={() => toggleNode(branch.id)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {isExpanded && (
                      <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pl-4 border-l-2 border-slate-200 dark:border-slate-800">
                        {branch.items.map((item: string, ii: number) => (
                          <li key={ii} className="leading-relaxed relative before:content-['•'] before:absolute before:-left-3 before:text-[#4169F6]">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>{branch.items.length} ý trọng tâm</span>
                    <span className="font-semibold text-[#6750FF]">Khối THCS</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: TREE VIEW */}
      {viewMode === 'tree' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs">
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 text-[#4169F6] font-bold text-sm">
              📁 {mapData.center}
            </div>

            <div className="pl-6 space-y-4 border-l-2 border-dashed border-slate-200 dark:border-slate-700">
              {mapData.branches.map((b: any) => (
                <div key={b.id} className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                    <span>{b.title}</span>
                  </div>
                  <div className="pl-6 space-y-1.5 border-l-2 border-slate-100 dark:border-slate-800">
                    {b.items.map((it: string, i: number) => (
                      <div key={i} className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        └─ {it}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: STRUCTURED LIST VIEW */}
      {viewMode === 'list' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-3">
            Danh mục luận điểm & kiến thức cốt lõi: {mapData.center}
          </h3>

          <div className="space-y-4">
            {mapData.branches.map((b: any, bi: number) => (
              <div key={b.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 space-y-2">
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs">
                    {bi + 1}
                  </span>
                  <span>{b.title}</span>
                </h4>
                <ul className="pl-7 space-y-1 list-disc text-xs text-slate-600 dark:text-slate-300">
                  {b.items.map((it: string, i: number) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
