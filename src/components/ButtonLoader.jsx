function ButtonLoader({ className = "" }) {
  return (
    <div
      className={`
        w-4 h-4 
        border-2 
        border-current 
        border-t-transparent 
        rounded-full 
        animate-spin 
        flex-shrink-0
        ${className}
      `}
    />
  );
}

export default ButtonLoader;