import { useEffect, useState } from "react";
import { api } from "../services/api";

// state ikut path, jadi ganti path tidak menampilkan data lama
export function useFetch(path) {
    const [state, setState] = useState({ path });

    useEffect(() => {
        let stale = false;
        api(path)
            .then((data) => !stale && setState({ path, data }))
            .catch((err) => !stale && setState({ path, error: err.message }));
        return () => {
            stale = true;
        };
    }, [path]);

    const current = state.path === path ? state : undefined;
    return {
        data: current?.data,
        error: current?.error,
        setData: (data) => setState({ path, data }),
    };
}
