import React, { useState, useEffect, useRef } from "react";
import { useAlgorithmState } from "@/context/AlgorithmState";
import { useAudio } from "@/hooks/useAudio";
import { useMobileOverlay } from "@/components/MobileOverlay";
import { AssistantEngine } from "./assistantEngine";
import ChatButton from "./ChatButton";
import ChatModal from "./ChatModal";

export default function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const { getContextObject, addToHistory } = useAlgorithmState();
    const { playTypingSound, isAudioEnabled } = useAudio();
    const { isMobileOverlayVisible } = useMobileOverlay();

    const messagesEndRef = useRef(null);
    const assistantRef = useRef(null);

    // 🧠 Set up assistant on mount
    useEffect(() => {
        console.log("✅ ChatAssistant mounted");
        assistantRef.current = new AssistantEngine(() => getContextObject());
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Handle chat open/close
    const toggleChat = () => {
        setIsOpen(prev => !prev);
        if (!isOpen) {
            // Trigger a user interaction to enable audio
            const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(event);
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        setMessages((prev) => [...prev, { role: "user", content: input }]);
        const userInput = input;
        setInput("");

        const context = getContextObject();
        console.log("🧠 Context passed to assistant (ChatAssistant):", context);

        const result = await assistantRef.current.process(input, context);

        if (result.type === "response") {
            let displayed = "";
            const full = result.content;
            let i = 0;
            let lastTypingSound = 0;
            let typingInterval;

            setMessages((prev) => [...prev, { role: "model", content: "" }]);

            typingInterval = setInterval(() => {
                const now = Date.now();
                
                if (i < full.length && now - lastTypingSound >= 200 && isAudioEnabled) {
                    console.log('ChatAssistant: Playing typing sound');
                    playTypingSound();
                    lastTypingSound = now;
                }

                if (i < full.length) {
                    displayed += full[i];
                    i++;

                    setMessages((prev) => {
                        const last = prev[prev.length - 1];
                        if (last.role === "model") {
                            return [
                                ...prev.slice(0, -1),
                                { ...last, content: displayed },
                            ];
                        }
                        return prev;
                    });
                }

                if (i >= full.length) {
                    clearInterval(typingInterval);
                    addToHistory({ question: userInput, answer: full });
                }
            }, 30);

            return () => {
                if (typingInterval) {
                    clearInterval(typingInterval);
                }
            };
        } else {
            setMessages((prev) => [
                ...prev,
                { role: "error", content: result.content },
            ]);
        }
    };

    if (isMobileOverlayVisible) return null;

    return (
        <>
            <ChatButton isOpen={isOpen} onClick={toggleChat} />
            <ChatModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                messages={messages}
                input={input}
                onInputChange={setInput}
                onSend={handleSend}
                messagesEndRef={messagesEndRef}
            />
        </>
    );
}