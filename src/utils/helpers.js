export const formatNumber =  function (num) {
  return num.toLocaleString();

}
export const formatDuration = function (seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export const hasMinLength = (password) => password.length >= 8;

export const hasUpperCase = (password) => /[A-Z]/.test(password);

export const hasSpecialChar = (password) => /[^A-Za-z0-9]/.test(password);

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export function getAudioDuration(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(0);
      return;
    }

    const audio = new Audio();
    const objectUrl = URL.createObjectURL(file);
    audio.src = objectUrl;

    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl); // آزادسازی رم مرورگر
      resolve(Math.round(audio.duration)); // زمان به ثانیه گرد شده
    };

    audio.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load audio metadata"));
    };
  });
}


export function getMonthlyListeners(artistId) {
  if (!artistId) return "1,250,000";

  const num = typeof artistId === 'number'
    ? artistId
    : String(artistId).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const listeners = ((num * 2654435761) % 4500000) + 500000;

  return new Intl.NumberFormat('en-US').format(listeners);
}


export function formatDaysAgo(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  // کمتر از یک روز
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    if (hours < 1) return 'Just now';
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  // روزها
  const days = Math.floor(diffInSeconds / 86400);
  if (days < 30) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  // ماه‌ها یا فرمت تاریخ ثابت برای تاریخ‌های قدیمی‌تر
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }

  // اگر بیشتر از یک سال بود، فرمت تاریخ نمایش داده شود
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// src/utils/helpers.js

export function calculateTotalDuration(songs = []) {
  if (!Array.isArray(songs) || songs.length === 0) return '0 min';

  const totalSeconds = songs.reduce((acc, song) => {
    let sec = 0;
    if (typeof song?.duration === 'number') {
      sec = song.duration;
    } else if (typeof song?.duration === 'string') {
      const parts = song.duration.split(':').map(Number);
      if (parts.length === 2) sec = parts[0] * 60 + parts[1];
      if (parts.length === 3) sec = parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return acc + (isNaN(sec) ? 0 : sec);
  }, 0);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
}