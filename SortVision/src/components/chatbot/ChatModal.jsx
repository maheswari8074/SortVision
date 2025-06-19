import React from 'react';
import { X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

const ChatModal = ({ isOpen, onClose, messages, input, onInputChange, onSend, messagesEndRef }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 left-4 w-[360px] max-w-[90vw] z-50">
            <Card className="bg-slate-900 border-slate-700 shadow-2xl shadow-red-500/20 rounded-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-10 p-1 rounded-full hover:bg-slate-800 transition-colors border border-slate-600 hover:border-red-500/50"
                    aria-label="Close Chat"
                >
                    <X className="h-4 w-4 text-slate-400 hover:text-red-400 transition-colors" />
                </button>

                <CardHeader className="text-center pr-10">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <Bot className="h-7 w-7 text-emerald-400 animate-pulse" />
                        <CardTitle className="text-2xl font-bold font-mono text-white">
                            <span className="text-emerald-400">Sort</span>
                            <span className="text-purple-400">Bot</span>
                        </CardTitle>
                    </div>
                    <CardDescription className="text-slate-400 font-mono">
                        <span className="text-amber-400">//</span> Ask me anything about sorting algorithms.
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-4 pb-4 pt-0">
                    <div className="flex flex-col gap-1 max-h-60 overflow-y-auto text-sm bg-slate-800 p-2 rounded border border-slate-700 text-slate-100">
                        {messages.length === 0 && (
                            <p className="text-slate-400 italic">
                                // Start typing to begin...
                            </p>
                        )}
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`p-2 rounded whitespace-pre-wrap ${msg.role === "user"
                                    ? "bg-blue-600/20 text-left"
                                    : msg.role === "error"
                                        ? "bg-red-500/20 text-left"
                                        : "bg-emerald-500/20 text-left"
                                    }`}
                            >
                                <strong className="mr-1 text-foreground font-medium">
                                    {msg.role === "user"
                                        ? "You"
                                        : msg.role === "error"
                                            ? "Error"
                                            : "AI"}:
                                </strong>
                                {msg.content}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="flex gap-2 mt-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => onInputChange(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && onSend()}
                            placeholder="Type your question..."
                            className="flex-1 px-3 py-2 border border-slate-700 rounded-md bg-slate-800 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <Button
                            onClick={onSend}
                            className="bg-red-500 hover:bg-red-600 text-white px-4"
                        >
                            Send
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChatModal;