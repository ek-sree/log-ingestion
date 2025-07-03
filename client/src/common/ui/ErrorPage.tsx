import { AlertTriangle, RefreshCw, Home, WifiOff, Zap, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {

    const navigate = useNavigate();

  const handleTryAgain = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/")
  };
  
  return (
    <div className="h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4 py-4 overflow-hidden">
      <div className="max-w-xl mx-auto text-center w-full">
        <div className="relative mb-4">
          <div className="relative mx-auto w-20 h-20 md:w-24 md:h-24 mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 rounded-full animate-pulse opacity-20"></div>
            <div className="relative w-full h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
              <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-white animate-bounce" />
            </div>
          </div>
          
          <div className="absolute top-0 left-1/4 animate-float">
            <X className="w-4 h-4 text-red-400 animate-spin" />
          </div>
          <div className="absolute top-4 right-1/4 animate-float delay-300">
            <WifiOff className="w-4 h-4 text-orange-400 animate-pulse" />
          </div>
          <div className="absolute bottom-0 left-1/3 animate-float delay-500">
            <Zap className="w-4 h-4 text-yellow-500 animate-bounce" />
          </div>
          
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-200 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-orange-200 rounded-full opacity-15 animate-pulse delay-700"></div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
              Sorry!
            </h1>
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              Something Went Wrong
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
              We encountered an unexpected error. Don't worry, our team has been notified and we're working to fix it.
            </p>
            <p className="text-gray-500 text-xs md:text-sm">
              Please try again in a few moments.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
            <button
              onClick={handleTryAgain}
              className="group flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[160px] text-sm"
            >
              <RefreshCw className="w-4 h-4 group-hover:animate-spin" />
              <span>Try Again</span>
            </button>
            
            <button
              onClick={handleGoHome}
              className="group flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-full font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg min-w-[160px] text-sm"
            >
              <Home className="w-4 h-4 group-hover:animate-bounce" />
              <span>Go Home</span>
            </button>
          </div>

          <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl">
            <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2 justify-center">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              What happened?
            </h3>
            <div className="text-xs md:text-sm text-gray-600 space-y-1 text-left max-w-md mx-auto">
              <p>• A temporary server issue occurred</p>
              <p>• Your internet connection might be unstable</p>
              <p>• The service might be under maintenance</p>
              <p>• If the problem persists, please contact support</p>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
              <span>Monitoring system status...</span>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}