import { useSession } from "@/hooks/session";
import { CreateSessionDialog } from "./components/modals/create-session";
import { DeleteSessionDialog } from "./components/modals/delete-session";
import { EditSessionDialog } from "./components/modals/edit-session";
import { ConnectSessionButton } from "./components/buttons/connect-session";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Session } from "@/stores/session";


export default function SessionsPage() {
    // Hooks
    const { addSession, sessions } = useSession();
    const {
        isPending: listSessionsIsPeding,
        data: listSessionsData,
        error: listSessionsError,
        isFetched: listSessionsIsFetched
    } = useQuery({
        queryKey: ['list-sessions'],
        queryFn: () => fetch('http://localhost:3000/sessions/list').then(res => res.json()),
    });

    // if (listSessionsIsPeding) {
    //     return <p>Carregando...</p>
    // }

    // if (listSessionsError) {
    //     return <pre>{JSON.stringify(listSessionsError, null, 2)}</pre>
    // }

    useEffect(() => {
        if (listSessionsData) {
            for (const session of listSessionsData) {
                const _session: Session = {
                    ...session,
                    title: "abc"
                }
                addSession(_session);
            }
        }
    }, [listSessionsData]);

    useEffect(() => console.log(sessions), [sessions]);

    return <div className="container">
        <div className="px-4 sm:px-0 flex justify-between">
            <div>
                <h3 className="text-base font-semibold leading-7 text-gray-900">Lista de sessões SSH.</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Abaixo segue todas as sessões registradas e seus detalhes.</p>
            </div>

            <div className="pr-4 flex items-center">
                <CreateSessionDialog />
            </div>
        </div>
        <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Nome da sessão</dt>
                    <dt className="text-sm font-medium leading-6 text-gray-900">Host da sessão</dt>
                    <dt className="text-sm font-medium leading-6 text-gray-900">Usuário da sessão</dt>
                </div>

                {sessions.map((session, i) => (
                    <div key={i} className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">{session.title}</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{session.host}</dd>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{session.username}</dd>
                        <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0 flex justify-end gap-2 pr-4">
                            <ConnectSessionButton sessionId={session.id} />
                            <EditSessionDialog sessionId={i} />
                            <DeleteSessionDialog sessionId={i} />
                        </div>
                    </div>
                ))}
            </dl>
        </div>
    </div>
}
