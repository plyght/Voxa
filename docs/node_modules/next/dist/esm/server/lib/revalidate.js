import { CACHE_ONE_YEAR } from "../../lib/constants";
export function formatRevalidate(revalidate) {
    if (revalidate === 0) {
        return "private, no-cache, no-store, max-age=0, must-revalidate";
    } else if (typeof revalidate === "number") {
        return `s-maxage=${revalidate}, stale-while-revalidate`;
    }
    return `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate`;
}

//# sourceMappingURL=revalidate.js.map