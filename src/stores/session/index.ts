import { create } from "zustand";

export type Session = {
    id: string;
    host: string;
    port: number;
    username: string;
    password: string;

    title: string;
}

type SessionStore = {
    sessions: Session[],
    addSession: (newSession: Session) => void;
    deleteSession: (sessionId: string) => void;
    editSession: (sessionId: string, newSession: Session) => void;
}

const sessionStore = create<SessionStore>()((set) => ({
    sessions: [],
    addSession(newSession) {
        set((state) => {
            state.sessions.push(newSession);

            return { sessions: state.sessions };
        })
    },
    deleteSession(sessionId) {
        set((state) => {
            const newSessions = state.sessions.filter((session) => session.id !== sessionId)

            return { sessions: newSessions }
        })
    },
    editSession(sessionId, newSession) {
        set((state) => {
            const newSessions = state.sessions.map((session) => {
                if (session.id === sessionId) return newSession;
                return session;
            });

            return { sessions: newSessions }

        });
    },
}));

export { sessionStore };
