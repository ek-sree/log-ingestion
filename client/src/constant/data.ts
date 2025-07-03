import { AlertCircle, AlertTriangle, Bug, Info } from "lucide-react";

export const levelConfig = {
  error: { 
    color: 'border-red-500 bg-gradient-to-r from-red-50 to-red-100 text-red-900',
    badge: 'bg-red-500 text-white',
    icon: AlertCircle
  },
  warn: { 
    color: 'border-amber-500 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-900',
    badge: 'bg-amber-500 text-white',
    icon: AlertTriangle
  },
  info: { 
    color: 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900',
    badge: 'bg-blue-500 text-white',
    icon: Info
  },
  debug: { 
    color: 'border-gray-500 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900',
    badge: 'bg-gray-500 text-white',
    icon: Bug
  },
};
