function BorderAnimatedContainer({ children }) {
  return (
    <div className="w-full h-full animated-border-box rounded-2xl border border-transparent animate-border flex overflow-hidden shadow-2xl">   
      {children}
    </div>
  );
}
export default BorderAnimatedContainer;
