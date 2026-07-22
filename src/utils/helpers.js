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

// utils/helpers.js

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