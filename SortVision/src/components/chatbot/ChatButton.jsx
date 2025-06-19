import React from 'react';
import { Button } from "@/components/ui/button";
import { X, Bot } from "lucide-react";

const ChatButton = ({ isOpen, onClick }) => {
    return (
        <div className="fixed bottom-6 left-6 z-50 group">
            <div className="relative">
                <div className="absolute inset-0 rounded-full bg-red-400/30 animate-ping [animation-duration:2s] scale-110" />
                <div className="absolute inset-0 rounded-full bg-red-400/20 animate-ping [animation-duration:3s] scale-125" />
                <Button
                    onClick={onClick}
                    className="relative h-16 w-16 rounded-full shadow-2xl transition-all duration-500 bg-gradient-to-br from-red-400 via-red-500 to-red-600 hover:from-red-300 hover:via-red-400 hover:to-red-500 border-2 border-red-300/60 hover:border-red-200/80 overflow-hidden group-hover:scale-110 group-hover:rotate-3 active:scale-95"
                    aria-label="Toggle Chat"
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-300/40 via-transparent to-red-300/30 animate-pulse" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent transition-opacity duration-300 opacity-100" />
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
                        <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-red-200 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
                        <div className="absolute top-1/2 left-2 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{ animationDelay: "1.5s" }} />
                    </div>
                    <span className="text-slate-900 text-xl z-10 transition-all duration-500">
                        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default ChatButton;