import React, { useState } from 'react';
import { BrandKit, TeamMember, FontStyle } from '../types';
import {
  Settings,
  Save,
  Check,
  Plus,
  Trash2,
  Palette,
  Stethoscope,
  Users,
  MapPin,
  Phone,
  Globe,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

interface BrandKitViewProps {
  brandKit: BrandKit;
  onSaveBrandKit: (updated: BrandKit) => void;
}

export const BrandKitView: React.FC<BrandKitViewProps> = ({
  brandKit,
  onSaveBrandKit
}) => {
  const [form, setForm] = useState<BrandKit>({ ...brandKit });
  const [newService, setNewService] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Quick Preset Colors for Vet Clinics
  const colorPresets = [
    { name: 'Warm Teal', primary: '#0d9488', secondary: '#f5f5f4' },
    { name: 'Sage & Sand', primary: '#059669', secondary: '#f4f4f5' },
    { name: 'Warm Ocean', primary: '#0284c7', secondary: '#fafaf9' },
    { name: 'Deep Spruce', primary: '#0f766e', secondary: '#f5f5f4' }
  ];

  const handleAddService = () => {
    if (!newService.trim()) return;
    setForm({
      ...form,
      services: [...(form.services || []), newService.trim()]
    });
    setNewService('');
  };

  const handleRemoveService = (index: number) => {
    setForm({
      ...form,
      services: form.services.filter((_, i) => i !== index)
    });
  };

  const handleAddTeamMember = () => {
    const newMember: TeamMember = {
      id: `tm_${Date.now()}`,
      name: 'New Staff Member',
      role: 'Veterinary Tech / Coordinator',
      photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'
    };
    setForm({
      ...form,
      teamMembers: [...(form.teamMembers || []), newMember]
    });
  };

  const handleRemoveTeamMember = (id: string) => {
    setForm({
      ...form,
      teamMembers: form.teamMembers.filter(m => m.id !== id)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBrandKit(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E8E1D5] shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-[#2D3748] flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#3D8D95]" />
            Clinic Brand Kit & Compliance Settings
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Configure clinic identity, tone of voice, medical disclaimers, and staff spotlights.
          </p>
        </div>

        <button
          type="submit"
          className="bg-[#3D8D95] hover:bg-[#347A81] text-white font-bold px-6 py-2.5 rounded-xl shadow-sm text-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-[#FDFBF7]" /> : <Save className="w-4 h-4 text-[#E6BA8D]" />}
          {savedSuccess ? 'Brand Kit Saved!' : 'Save Brand Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Inputs (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Practice Identity */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8E1D5] space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-[#2D3748] flex items-center gap-2 border-b border-[#F5F1EB] pb-2">
              <Stethoscope className="w-4 h-4 text-[#3D8D95]" />
              Clinic Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-[#2D3748]">Clinic Practice Name</label>
                <input
                  type="text"
                  value={form.clinicName}
                  onChange={e => setForm({ ...form, clinicName: e.target.value })}
                  className="w-full p-2.5 bg-[#F5F1EB] border border-[#E8E1D5] rounded-xl text-xs font-medium"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-[#2D3748]">Logo Image URL</label>
                <input
                  type="text"
                  value={form.logoUrl}
                  onChange={e => setForm({ ...form, logoUrl: e.target.value })}
                  className="w-full p-2.5 bg-[#F5F1EB] border border-[#E8E1D5] rounded-xl text-xs font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2D3748] flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-gray-400" /> Phone
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full p-2.5 bg-[#F5F1EB] border border-[#E8E1D5] rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2D3748] flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-gray-400" /> Website
                </label>
                <input
                  type="text"
                  value={form.website}
                  onChange={e => setForm({ ...form, website: e.target.value })}
                  className="w-full p-2.5 bg-[#F5F1EB] border border-[#E8E1D5] rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-[#2D3748] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> Address
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  className="w-full p-2.5 bg-[#F5F1EB] border border-[#E8E1D5] rounded-xl text-xs"
                />
              </div>
            </div>
          </div>

          {/* Visual Palette & Font Style */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8E1D5] space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-[#2D3748] flex items-center gap-2 border-b border-[#F5F1EB] pb-2">
              <Palette className="w-4 h-4 text-[#3D8D95]" />
              Visual Style & Color Palette
            </h3>

            <div className="space-y-3">
              <label className="text-xs font-bold text-[#2D3748]">Quick Clinic Presets</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {colorPresets.map(cp => (
                  <button
                    key={cp.name}
                    type="button"
                    onClick={() => setForm({ ...form, primaryColor: cp.primary, secondaryColor: cp.secondary })}
                    className="p-3 bg-[#F5F1EB] rounded-xl border border-[#E8E1D5] hover:border-[#3D8D95] text-left cursor-pointer transition-all space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: cp.primary }} />
                      <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: cp.secondary }} />
                    </div>
                    <p className="text-[11px] font-bold text-[#2D3748]">{cp.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2D3748]">Primary Brand Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.primaryColor}
                    onChange={e => setForm({ ...form, primaryColor: e.target.value })}
                    className="w-10 h-10 rounded-xl border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={form.primaryColor}
                    onChange={e => setForm({ ...form, primaryColor: e.target.value })}
                    className="flex-1 p-2.5 bg-[#F5F1EB] border border-[#E8E1D5] rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2D3748]">Font Aesthetic</label>
                <select
                  value={form.fontStyle}
                  onChange={e => setForm({ ...form, fontStyle: e.target.value as FontStyle })}
                  className="w-full p-2.5 bg-[#F5F1EB] border border-[#E8E1D5] rounded-xl text-xs font-semibold"
                >
                  <option value="warm">Warm & Welcoming (Rounded, Friendly)</option>
                  <option value="professional">Professional Clinical (Clean, Crisp)</option>
                  <option value="playful">Playful & Upbeat (Expressive, Bouncy)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tón komunikácie & Compliance Disclaimer */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8E1D5] space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-[#2D3748] flex items-center gap-2 border-b border-[#F5F1EB] pb-2">
              <ShieldAlert className="w-4 h-4 text-[#3D8D95]" />
              AI Tón komunikácie & Clinical Disclaimer
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#2D3748]">Brand Tón komunikácie (Guides Gemini)</label>
              <textarea
                rows={3}
                value={form.toneOfVoice}
                onChange={e => setForm({ ...form, toneOfVoice: e.target.value })}
                className="w-full p-3 bg-[#F5F1EB] border border-[#E8E1D5] rounded-xl text-xs font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#2D3748]">
                Mandatory Health Disclaimer (Appended on Educational Posts)
              </label>
              <textarea
                rows={2}
                value={form.disclaimerText}
                onChange={e => setForm({ ...form, disclaimerText: e.target.value })}
                className="w-full p-3 bg-[#F5F1EB] border border-[#E8E1D5] rounded-xl text-xs font-medium"
              />
            </div>
          </div>

          {/* Services & Team Members */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8E1D5] space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-[#2D3748] flex items-center gap-2 border-b border-[#F5F1EB] pb-2">
              <Users className="w-4 h-4 text-[#3D8D95]" />
              Services Offered & Team Members
            </h3>

            {/* Services Tags */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#2D3748]">Services List</label>
              <div className="flex flex-wrap gap-2">
                {form.services?.map((service, idx) => (
                  <span
                    key={idx}
                    className="bg-[#F5F1EB] text-[#2D3748] text-xs font-semibold px-3 py-1 rounded-lg border border-[#E8E1D5] flex items-center gap-1.5"
                  >
                    {service}
                    <button
                      type="button"
                      onClick={() => handleRemoveService(idx)}
                      className="text-gray-400 hover:text-red-600 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  placeholder="e.g. Laser Therapy, Exotic Pet Care"
                  value={newService}
                  onChange={e => setNewService(e.target.value)}
                  className="flex-1 p-2 bg-[#F5F1EB] border border-[#E8E1D5] rounded-xl text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddService}
                  className="bg-[#3D8D95] hover:bg-[#347A81] text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Service
                </button>
              </div>
            </div>

            {/* Team Members */}
            <div className="space-y-3 pt-4 border-t border-[#F5F1EB]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#2D3748]">Team Member Spotlights</label>
                <button
                  type="button"
                  onClick={handleAddTeamMember}
                  className="text-xs font-bold text-[#3D8D95] hover:text-[#347A81] flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Staff Member
                </button>
              </div>

              <div className="space-y-3">
                {form.teamMembers?.map((member, idx) => (
                  <div
                    key={member.id}
                    className="p-3 bg-[#F5F1EB] rounded-xl border border-[#E8E1D5] flex items-center justify-between gap-3"
                  >
                    <img
                      src={member.photoUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80'}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#E8E1D5] shrink-0"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                      <input
                        type="text"
                        value={member.name}
                        onChange={e => {
                          const updated = [...form.teamMembers];
                          updated[idx].name = e.target.value;
                          setForm({ ...form, teamMembers: updated });
                        }}
                        className="p-1.5 bg-white border border-[#E8E1D5] rounded-lg text-xs font-semibold"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={member.role}
                        onChange={e => {
                          const updated = [...form.teamMembers];
                          updated[idx].role = e.target.value;
                          setForm({ ...form, teamMembers: updated });
                        }}
                        className="p-1.5 bg-white border border-[#E8E1D5] rounded-lg text-xs"
                        placeholder="Role"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveTeamMember(member.id)}
                      className="text-gray-400 hover:text-red-600 cursor-pointer p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Brand Preview Card (1 Col) */}
        <div className="space-y-4">
          <div className="bg-[#2D3748] text-white p-4 rounded-2xl shadow-md sticky top-24 space-y-4">
            <div className="flex items-center justify-between border-b border-[#4A5568] pb-2">
              <span className="text-xs font-bold text-[#E6BA8D] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Live Brand Card Preview
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wide font-mono">
                {form.fontStyle}
              </span>
            </div>

            {/* Mock Social Post Preview */}
            <div className="bg-white text-[#2D3748] rounded-xl overflow-hidden shadow-sm space-y-3 p-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: form.primaryColor }}
                >
                  🐾
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-none">{form.clinicName}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">{form.website}</p>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80"
                  alt="Mock post"
                  className="w-full h-40 object-cover"
                />
                <div
                  className="absolute bottom-2 right-2 text-[10px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm"
                  style={{ backgroundColor: form.primaryColor }}
                >
                  {form.clinicName.split(' ')[0]} Care
                </div>
              </div>

              <p className="text-[11px] text-[#2D3748] leading-snug">
                Keeping your furry family members happy and healthy! Ask our veterinary team about seasonal wellness.
              </p>

              <div className="p-2 bg-[#F5F1EB] rounded-lg text-[9px] text-gray-500 italic border border-[#E8E1D5]">
                "{form.disclaimerText}"
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
