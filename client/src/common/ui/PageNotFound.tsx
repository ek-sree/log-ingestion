import { Home, Search, ArrowLeft, Frown, Star } from "lucide-react";

export default function PageNotFound() {
  const handleGoHome = () => {
    console.log("Navigate to home");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-4 overflow-hidden">
      <div className="max-w-xl mx-auto text-center w-full">
        <div className="relative mb-6">
          <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 mb-3">
            404
          </div>

          <div className="absolute top-0 left-1/4 animate-float">
            <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
          <div className="absolute top-6 right-1/4 animate-float delay-300">
            <Search className="w-5 h-5 text-purple-400 animate-bounce" />
          </div>
          <div className="absolute bottom-0 left-1/3 animate-float delay-500">
            <Frown className="w-4 h-4 text-pink-400" />
          </div>
          
          <div className="absolute -top-2 -left-2 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-pink-200 rounded-full opacity-30 animate-pulse delay-300"></div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Oops! Page Not Found
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-sm mx-auto">
              The page you're looking for seems to have wandered off into the digital void.
            </p>
            <p className="text-gray-500 text-xs md:text-sm">
              Don't worry, even the best explorers sometimes take a wrong turn!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
            <button
              onClick={handleGoHome}
              className="group flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm min-w-[140px]"
            >
              <Home className="w-4 h-4 group-hover:animate-bounce" />
              <span>Go Home</span>
            </button>
            
            <button
              onClick={handleGoBack}
              className="group flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-full font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm min-w-[140px]"
            >
              <ArrowLeft className="w-4 h-4 group-hover:animate-pulse" />
              <span>Go Back</span>
            </button>
          </div>

          <div className="mt-6 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              What can you do?
            </h3>
            <div className="text-xs md:text-sm text-gray-600 space-y-1">
              <p>• Check the URL for typos</p>
              <p>• Return to the homepage</p>
              <p>• Use the search function</p>
              <p>• Contact support if you think this is an error</p>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}