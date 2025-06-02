export default function HeroImage() {
  return (
    <div className="relative w-full max-w-[500px] aspect-square">
      <div className="absolute inset-0 bg-gradient-to-br from-lavender/30 to-cream rounded-lg shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-lavender/20 rounded-full filter blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-cream-dark/30 rounded-full filter blur-lg animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-6 flex flex-col">
            <div className="w-full h-2 bg-lavender/30 rounded-full mb-4"></div>
            <div className="w-3/4 h-2 bg-lavender/20 rounded-full mb-8"></div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-cream/50 rounded-md"></div>
              <div className="bg-lavender/10 rounded-md"></div>
              <div className="bg-lavender/20 rounded-md"></div>
              <div className="bg-cream-dark/20 rounded-md"></div>
            </div>
            <div className="mt-6 h-20 bg-gradient-to-r from-lavender/20 to-cream/30 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
