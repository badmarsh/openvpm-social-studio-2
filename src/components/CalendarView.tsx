import React, { useState } from 'react';
import { Post, BrandKit } from '../types';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Eye,
  Filter
} from 'lucide-react';

interface CalendarViewProps {
  posts: Post[];
  brandKit: BrandKit;
  onViewPost: (post: Post) => void;
  onStartWizard: () => void;
  onReschedulePost: (postId: string, newDate: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  posts,
  brandKit,
  onViewPost,
  onStartWizard,
  onReschedulePost
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Month Math
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Group posts by YYYY-MM-DD
  const postsByDate: Record<string, Post[]> = {};
  posts.forEach(post => {
    if (filterStatus !== 'all' && post.status !== filterStatus) return;
    const key = post.scheduledDate; // YYYY-MM-DD
    if (!postsByDate[key]) postsByDate[key] = [];
    postsByDate[key].push(post);
  });

  // Calendar Day Cell Renderer
  const renderCalendarDays = () => {
    const days = [];
    // Padding for prev month days
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`pad-${i}`} className="bg-[#F5F1EB]/50 border border-[#F5F1EB] min-h-[110px] p-2 opacity-40" />
      );
    }

    // Days of current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const dayPosts = postsByDate[dateStr] || [];
      const isToday =
        new Date().getFullYear() === year &&
        new Date().getMonth() === month &&
        new Date().getDate() === d;

      days.push(
        <div
          key={dateStr}
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            e.preventDefault();
            const draggedPostId = e.dataTransfer.getData('text/plain');
            if (draggedPostId) {
              onReschedulePost(draggedPostId, dateStr);
            }
          }}
          className={`bg-white border border-[#E8E1D5] min-h-[120px] p-2 flex flex-col justify-between transition-all hover:bg-stone-50/80 ${
            isToday ? 'ring-2 ring-[#3D8D95] bg-[#F0F7F7]/30' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isToday ? 'bg-[#3D8D95] text-white' : 'text-[#2D3748]'
              }`}
            >
              {d}
            </span>

            {dayPosts.length > 0 && (
              <span className="text-[10px] font-bold text-gray-400">
                {dayPosts.length} {dayPosts.length === 1 ? 'post' : 'posts'}
              </span>
            )}
          </div>

          {/* Posts for this day */}
          <div className="space-y-1.5 my-1 flex-1 overflow-y-auto max-h-[100px]">
            {dayPosts.map(post => {
              const primaryVariant = post.variants.IG || post.variants.FB || Object.values(post.variants)[0];
              return (
                <div
                  key={post.id}
                  draggable
                  onDragStart={e => {
                    e.dataTransfer.setData('text/plain', post.id);
                  }}
                  onClick={() => onViewPost(post)}
                  className={`p-1.5 rounded-lg border text-[11px] cursor-pointer shadow-sm hover:scale-[1.02] transition-all flex items-center justify-between gap-1 ${
                    post.status === 'draft'
                      ? 'bg-amber-50 text-amber-900 border-amber-200'
                      : post.status === 'in_review'
                      ? 'bg-blue-50 text-blue-900 border-blue-200'
                      : post.status === 'scheduled' || post.status === 'approved'
                      ? 'bg-purple-50 text-purple-900 border-purple-200'
                      : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  }`}
                  title={`${post.status.toUpperCase()}: ${primaryVariant?.caption || 'Post'}`}
                >
                  <span className="font-semibold truncate max-w-[120px]">
                    {primaryVariant?.caption || 'Untitled Post'}
                  </span>
                  <Eye className="w-3 h-3 shrink-0 opacity-70" />
                </div>
              );
            })}
          </div>

          <button
            onClick={onStartWizard}
            className="text-[10px] text-gray-400 hover:text-teal-700 font-bold flex items-center gap-0.5 pt-1 border-t border-[#F5F1EB] cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Add Post
          </button>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Calendar Header Controls */}
      <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#F0F7F7] text-[#3D8D95] rounded-xl">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#2D3748]">
              {monthNames[month]} {year}
            </h2>
            <p className="text-xs text-gray-500">
              Computed schedule view over Firestore posts collection. Drag posts to reschedule.
            </p>
          </div>
        </div>

        {/* Month Nav & View Toggles */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center bg-[#FAF8F5] p-1 rounded-xl border border-[#E8E1D5]">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-white rounded-lg transition-all cursor-pointer text-[#2D3748]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleToday}
              className="px-3 py-1 text-xs font-bold text-[#2D3748] hover:bg-white rounded-lg transition-all cursor-pointer"
            >
              Today
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-white rounded-lg transition-all cursor-pointer text-[#2D3748]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Status */}
          <div className="flex items-center gap-1.5 bg-[#F5F1EB] px-3 py-1.5 rounded-xl border border-[#E8E1D5]">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-transparent text-xs font-semibold text-[#2D3748] focus:outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Koncepty</option>
              <option value="in_review">Na Schválenie</option>
              <option value="scheduled">Naplánované</option>
              <option value="published">Publikované</option>
            </select>
          </div>

          <button
            onClick={onStartWizard}
            className="bg-[#3D8D95] hover:bg-[#347A81] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Schedule Post
          </button>
        </div>
      </div>

      {/* Status Color Legend */}
      <div className="flex items-center gap-4 bg-[#F5F1EB] px-4 py-2.5 rounded-xl border border-[#E8E1D5] text-xs font-semibold overflow-x-auto">
        <span className="text-gray-400 uppercase tracking-wide text-[10px]">Legend:</span>
        <span className="flex items-center gap-1.5 text-amber-800">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Draft
        </span>
        <span className="flex items-center gap-1.5 text-blue-800">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Na Schválenie
        </span>
        <span className="flex items-center gap-1.5 text-purple-800">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Naplánované
        </span>
        <span className="flex items-center gap-1.5 text-emerald-800">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Publikované
        </span>
      </div>

      {/* Calendar Grid */}
      <div className="bg-[#E8E1D5] p-0.5 rounded-2xl shadow-sm overflow-hidden">
        {/* Day Header Names */}
        <div className="grid grid-cols-7 bg-[#FAF8F5] text-center text-xs font-bold text-gray-500 py-2 border-b border-[#E8E1D5]">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-[1px] bg-[#E8E1D5]">
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
};
