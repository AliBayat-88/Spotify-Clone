import { useState } from 'react';
import DashboardTable from './DashboardTable.jsx';
import ActionBtn from '../ActionBtn.jsx';
import TableActions from '../TableActions.jsx';
import CustomSelect from '../CustomSelect.jsx';
import { useArtists } from '../../features/useArtists.js';
import { useForm } from 'react-hook-form';
import { getAudioDuration, formatDuration } from '../../utils/helpers.js';
import { useToaster } from '../../context/ToastContext.jsx'
import { useInsertSong } from '../../features/useInsertSong.js'
import { useSongs } from '../../features/useSongs.js'
import Modal from '../Modal.jsx'
import { useDeleteSong } from '../../features/useDeleteSong.js'
import EditSongModal from '../EditSongModal.jsx'

function DashboardSongs() {
  const [songToEdit, setSongToEdit] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);
  const { deleteSong, isDeleting } = useDeleteSong(() => {
    setSongToDelete(null);
  });

  const {showToast} = useToaster()
  const [coverFile, setCoverFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [isReadingAudio, setIsReadingAudio] = useState(false);
  const {songs , isLoading} = useSongs();


  function handleDeleteSong() {
    if (!songToDelete?.id) return;
    deleteSong(songToDelete.id);
  }

  const { insertSong, isPending: isInserting } = useInsertSong(() => {
    reset();
    setCoverFile(null);
    setAudioFile(null);
  });

  function onSubmit(data) {
    insertSong({
      name: data.name,
      artistId: data.artistId,
      duration: data.duration,
      lyrics: data.lyrics,
      cover: data.cover,
      audio: data.audio,
    });
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { artists = [] } = useArtists();
  const selectedArtistId = watch('artistId', '');
  const autoDuration = watch('duration', 0);

  async function handleAudioChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsReadingAudio(true);
      setAudioFile(file);
      setValue('audio', file, { shouldValidate: true });

      const durationInSeconds = await getAudioDuration(file);

      setValue('duration', durationInSeconds, { shouldValidate: true });
    } catch (err) {
        showToast("error" , "could not upload the file ")
    } finally {
      setIsReadingAudio(false);
    }
  }

  function handleCoverChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setValue('cover', file, { shouldValidate: true });
    }
  }

  const tableColumns = [
    'Song',
    'Artist',
    'Duration',
    { label: 'Actions', align: 'right' }
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-y-2 select-none ">
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Songs</h1>
        <p className="text-sm text-gray-400 mt-1">Add and manage songs in your music library</p>
      </div>

      {/* فرم افزودن آهنگ */}
      <div className="w-full bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#1ed760]/10 blur-[80px] rounded-full pointer-events-none" />

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5 relative">

          {/* Song Name */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">Song Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Song name is required",
                validate: (val) => val.trim().length >= 2 || "Song name must be at least 2 characters",
              })}
              placeholder="Enter song name"
              className={`w-full bg-black text-white px-4 py-3.5 rounded-xl border outline-none placeholder:text-gray-600 transition-all text-sm font-medium ${
                errors.name
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-[#262626] focus:border-white focus:ring-1 focus:ring-white"
              }`}
            />
            {errors.name && (
              <span className="text-xs text-red-400 font-semibold px-1">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Artist Select */}
            <div className="flex flex-col gap-y-1">
              <CustomSelect
                label="Artist"
                placeholder="Select an artist"
                options={artists}
                value={selectedArtistId}
                onChange={(val) => setValue('artistId', val, { shouldValidate: true })}
              />
              <input
                type="hidden"
                {...register("artistId", { required: "Please select an artist" })}
              />
              {errors.artistId && (
                <span className="text-xs text-red-400 font-semibold px-1 mt-1">
                  {errors.artistId.message}
                </span>
              )}
            </div>

            {/* 🟢 Duration خودکار و غیرقابل دستکاری دستی */}
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between items-center px-0.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Duration (Auto-detected)
                </label>
                {autoDuration > 0 && (
                  <span className="text-xs text-[#1ed760] font-bold">
                    {formatDuration(autoDuration)} ({autoDuration}s)
                  </span>
                )}
              </div>

              <input
                type="text"
                readOnly
                disabled
                value={
                  isReadingAudio
                    ? "Detecting audio length..."
                    : autoDuration > 0
                      ? `${formatDuration(autoDuration)} (${autoDuration} seconds)`
                      : "Upload an audio file to auto-detect"
                }
                className="w-full bg-black/60 text-gray-300 px-4 py-3.5 rounded-xl border border-[#262626] outline-none text-sm font-medium cursor-not-allowed"
              />

              {/* اینپوت مخفی برای ولیدیشن مدت زمان در React Hook Form */}
              <input
                type="hidden"
                {...register("duration", {
                  required: "Audio duration is missing. Please upload a valid audio file.",
                  min: { value: 5, message: "Song duration must be at least 5 seconds" },
                })}
              />

              {errors.duration && (
                <span className="text-xs text-red-400 font-semibold px-1">
                  {errors.duration.message}
                </span>
              )}
            </div>
          </div>

          {/* Cover & Audio Uploaders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Cover Uploader */}
            <div>
              <label className={`group cursor-pointer flex flex-col items-center justify-center min-h-36 rounded-xl border border-dashed transition-all p-4 ${
                errors.cover ? 'border-red-500 bg-red-500/5' : 'border-[#383838] bg-black hover:border-[#1ed760] hover:bg-[#1ed760]/5'
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverChange}
                />
                <input
                  type="hidden"
                  {...register("cover", { required: "Cover image is required" })}
                />
                <div className="w-10 h-10 rounded-full bg-[#222] group-hover:bg-[#1ed760] group-hover:text-black text-gray-400 flex items-center justify-center transition-all mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V7.75A2.75 2.75 0 015.75 5h12.5A2.75 2.75 0 0121 7.75v8.5A2.75 2.75 0 0118.25 19H5.75A2.75 2.75 0 013 16.5Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3 15 4.5-4.5 3.5 3.5 2.5-2.5L21 18" />
                  </svg>
                </div>
                <span className="text-sm text-white font-semibold truncate max-w-[200px]">
                  {coverFile ? coverFile.name : 'Upload Cover'}
                </span>
                <span className="text-xs text-gray-500 mt-0.5">JPG, PNG or WEBP</span>
              </label>
              {errors.cover && (
                <span className="text-xs text-red-400 font-semibold px-1 mt-1 block">
                  {errors.cover.message}
                </span>
              )}
            </div>

            {/* Audio Uploader */}
            <div>
              <label className={`group cursor-pointer flex flex-col items-center justify-center min-h-36 rounded-xl border border-dashed transition-all p-4 ${
                errors.audio ? 'border-red-500 bg-red-500/5' : 'border-[#383838] bg-black hover:border-[#1ed760] hover:bg-[#1ed760]/5'
              }`}>
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={handleAudioChange}
                />
                <input
                  type="hidden"
                  {...register("audio", { required: "Audio file is required" })}
                />
                <div className="w-10 h-10 rounded-full bg-[#222] group-hover:bg-[#1ed760] group-hover:text-black text-gray-400 flex items-center justify-center transition-all mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18V5l10-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="16" cy="16" r="3" />
                  </svg>
                </div>
                <span className="text-sm text-white font-semibold truncate max-w-[200px]">
                  {audioFile ? audioFile.name : 'Upload Audio'}
                </span>
                <span className="text-xs text-gray-500 mt-0.5">MP3, WAV or FLAC</span>
              </label>
              {errors.audio && (
                <span className="text-xs text-red-400 font-semibold px-1 mt-1 block">
                  {errors.audio.message}
                </span>
              )}
            </div>
          </div>

          {/* Lyrics */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">Lyrics (Optional)</label>
            <textarea
              {...register("lyrics")}
              placeholder="Enter song lyrics..."
              rows={4}
              className="w-full bg-black text-white px-4 py-3 rounded-xl border border-[#262626] outline-none resize-none placeholder:text-gray-600 focus:border-white focus:ring-1 focus:ring-white transition-all text-sm leading-relaxed"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => {
                reset();
                setCoverFile(null);
                setAudioFile(null);
              }}
              className="px-6 py-2.5 rounded-full text-gray-400 hover:text-white font-bold text-sm transition-all cursor-pointer"
            >
              Reset
            </button>
            <ActionBtn
              type="submit"
              disabled={isSubmitting || isReadingAudio || isInserting}
              title={isInserting ? "Adding..." : "Add Song"}
              className="bg-[#1ed760] text-black font-bold px-7 py-2.5 text-sm cursor-pointer disabled:opacity-50"
            />
          </div>
        </form>
      </div>

      {/* Table */}
      <DashboardTable
        title="Songs"
        isLoading={isLoading}
        columns={tableColumns}
        data={songs}
        renderRow={(song) => (
          <tr key={song.id} className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors">
            <td className="px-5 py-4">
              <div className="flex items-center gap-3">
                <img loading="lazy" src={song.cover_url} alt={song.name} className="w-11 h-11 rounded-lg object-cover bg-black shrink-0 shadow-md" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate max-w-[200px]">{song.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">ID: {song.id}</p>
                </div>
              </div>
            </td>
            <td className="px-5 py-4 text-sm text-gray-300 font-medium">{song.artists?.name}</td>
            <td className="px-5 py-4 text-sm text-gray-400 font-medium">{formatDuration(song.duration)}</td>
            <td className="px-5 py-4">
              <TableActions
                onEdit={() => setSongToEdit(song)}
                onDelete={() => setSongToDelete(song)}
              />
            </td>
          </tr>
        )}

      />

      {songToEdit && (
        <EditSongModal
          isOpen={Boolean(songToEdit)}
          song={songToEdit}
          onClose={() => setSongToEdit(null)}
        />
      )}

      {songToDelete && (
        <Modal
          isLoading={isDeleting}
          type="delete"
          btnColor="bg-red-500/90"
          explanation={`Are you sure you want to delete "${songToDelete.name}" song? This action cannot be undone.`}
          isOpen={Boolean(songToDelete)}
          btnText="Delete song"
          onConfirm={handleDeleteSong}
          onClose={() => setSongToDelete(null)}
        />
      )}
    </div>
  );
}

export default DashboardSongs;