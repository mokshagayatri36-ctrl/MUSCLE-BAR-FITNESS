'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { api } from '../../lib/api';
import { Trash2, Plus, X, Grid, Camera, Users, Award, ShieldAlert } from 'lucide-react';

export default function Gallery() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Form states for Admin Upload
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('Gym Interior');
  const [uploadError, setUploadError] = useState('');
  const [uploading, setUploading] = useState(false);

  const categories = ['All', 'Gym Interior', 'Equipment', 'Workout Sessions', 'Transformations'];

  const fallbackItems = [
    { id: '1', imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop', category: 'Gym Interior' },
    { id: '2', imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop', category: 'Gym Interior' },
    { id: '3', imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop', category: 'Equipment' },
    { id: '4', imageUrl: 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?q=80&w=800&auto=format&fit=crop', category: 'Equipment' },
    { id: '5', imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop', category: 'Workout Sessions' },
    { id: '6', imageUrl: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=800&auto=format&fit=crop', category: 'Transformations' },
  ];

  const loadGallery = async () => {
    try {
      const data = await api.gallery.getAll();
      if (data && data.length > 0) {
        setItems(data);
      } else {
        setItems(fallbackItems);
      }
    } catch (err) {
      console.error('Error loading gallery, using fallback', err);
      setItems(fallbackItems);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();

    // Check if user is Admin
    const userJson = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userJson && token) {
      try {
        const parsed = JSON.parse(userJson);
        setIsAdmin(parsed.role === 'ADMIN');
      } catch (e) {
        setIsAdmin(false);
      }
    }
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    setUploading(true);
    setUploadError('');
    try {
      await api.gallery.upload({
        imageUrl: newUrl,
        category: newCategory,
      });
      setNewUrl('');
      loadGallery();
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload gallery item');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      await api.gallery.delete(id);
      loadGallery();
    } catch (err) {
      alert('Error deleting gallery item');
    }
  };

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="bg-[#0a0a0c] text-white min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Header Banner */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-[#0f0f12] to-[#0a0a0c] text-center border-b border-zinc-900/60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Gym Gallery</h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Take a look inside Muscle Bar Fitness Centre, browse training sessions, and view client physical transformations.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow space-y-12">
        {/* Admin Upload Control */}
        {isAdmin && (
          <div className="p-6 sm:p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl max-w-2xl mx-auto space-y-6">
            <div className="flex items-center space-x-2 text-red-500">
              <Plus className="w-5 h-5" />
              <h3 className="font-extrabold text-base uppercase tracking-wider text-white">Add New Image (Admin Tool)</h3>
            </div>
            
            <form onSubmit={handleUpload} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-4 py-3 rounded-xl focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 focus:border-red-500 text-zinc-200 text-xs px-3 py-3 rounded-xl focus:outline-none"
                >
                  <option value="Gym Interior">Gym Interior</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Workout Sessions">Workout Sessions</option>
                  <option value="Transformations">Transformations</option>
                </select>
              </div>
              <div className="sm:col-span-3 pt-2">
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-red-600 text-white font-bold text-xs py-3.5 rounded-xl hover:bg-red-700 disabled:opacity-50 transition-all"
                >
                  {uploading ? 'Adding...' : 'Add Image to Gallery'}
                </button>
              </div>
            </form>
            {uploadError && (
              <p className="text-xs text-red-500 flex items-center space-x-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>{uploadError}</span>
              </p>
            )}
          </div>
        )}

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                activeCategory === cat
                  ? 'bg-red-600 border-red-500 text-white shadow-md'
                  : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 text-sm">
            No images uploaded under this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item: any) => {
              const hasEnlargedView = item.category !== 'Equipment' && item.category !== 'Workout Sessions';
              return (
                <div
                  key={item.id}
                  className={`relative group rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-900 aspect-4/3 shadow-md hover:border-red-500/20 transition-all duration-300 ${
                    hasEnlargedView ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.category}
                    onClick={() => {
                      if (hasEnlargedView) {
                        setLightboxImage(item.imageUrl);
                      }
                    }}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      hasEnlargedView ? 'group-hover:scale-105' : ''
                    }`}
                  />
                
                {/* Admin delete overlays */}
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="absolute top-4 right-4 p-2.5 bg-black/80 hover:bg-red-600 text-zinc-400 hover:text-white rounded-full border border-zinc-800 transition-all"
                    title="Delete Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                {/* Category badge */}
                <div className="absolute bottom-4 left-4 bg-black/75 px-3 py-1 rounded-full text-[9px] uppercase tracking-wider text-amber-400 font-bold border border-zinc-900">
                  {item.category}
                </div>
              </div>
            );
          })}
          </div>
        )}
      </section>

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-55 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm cursor-zoom-out animate-fadeIn"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full transition-all border border-zinc-800"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Enlarged view"
            className="max-w-full max-h-[85vh] rounded-2xl object-contain border border-zinc-800 shadow-2xl"
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
