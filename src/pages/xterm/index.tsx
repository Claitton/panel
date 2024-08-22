

import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

export default function XTermPage() {
    // Hooks
    const { sessionId } = useParams();

    // States
    const [_, setWs] = useState<Socket | null>();

    // Refs
    const xtermRef = useRef(null)

    useEffect(() => {
        const ws = io("ws://172.18.101.148:3000");
        setWs(ws);

        const terminal = new Terminal();

        terminal.onData(e => ws.emit("xterm-input", e));

        terminal.open(xtermRef.current! as HTMLElement);

        // switch (e) {
        //     case '\r': // Enter key
        //         terminal.write('\r\n$ ');
        //         // console.log(line)
        //         ws.emit("xterm-input", { command: line, sessionId: "dc56b361-0f0d-4b3c-97a4-4aff117c3650"});

        //         break;
        //     case '\u007F': // Backspace (DEL)
        //         // Do not delete the prompt
        //         if (terminal._core.buffer.x > 2) {
        //             terminal.write('\b \b');
        //         }
        //         break;
        //     default: // Print all other characters
        //         terminal.write(e);
        //         setLine(curr => curr + e);

        ws.emit("xterm-input-start", { command: "uptime", sessionId });

        ws.on("xterm-output", (output: string) => {
            terminal.write(output);
        });

        return () => {
            ws.close();
            terminal.dispose();
        };
    }, [])

    return <div ref={xtermRef}></div>
}