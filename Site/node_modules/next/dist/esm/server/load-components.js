import { BUILD_MANIFEST, REACT_LOADABLE_MANIFEST, CLIENT_REFERENCE_MANIFEST, SERVER_REFERENCE_MANIFEST } from "../shared/lib/constants";
import { join } from "path";
import { requirePage } from "./require";
import { interopDefault } from "../lib/interop-default";
import { getTracer } from "./lib/trace/tracer";
import { LoadComponentsSpan } from "./lib/trace/constants";
import { loadManifest } from "./load-manifest";
import { wait } from "../lib/wait";
/**
 * Load manifest file with retries, defaults to 3 attempts.
 */ export async function loadManifestWithRetries(manifestPath, attempts = 3) {
    while(true){
        try {
            return loadManifest(manifestPath);
        } catch (err) {
            attempts--;
            if (attempts <= 0) throw err;
            await wait(100);
        }
    }
}
async function loadClientReferenceManifest(manifestPath, entryName) {
    process.env.NEXT_MINIMAL ? __non_webpack_require__(manifestPath) : require(manifestPath);
    try {
        return globalThis.__RSC_MANIFEST[entryName];
    } catch (err) {
        return undefined;
    }
}
async function loadComponentsImpl({ distDir, page, isAppPath }) {
    let DocumentMod = {};
    let AppMod = {};
    if (!isAppPath) {
        [DocumentMod, AppMod] = await Promise.all([
            Promise.resolve().then(()=>requirePage("/_document", distDir, false)),
            Promise.resolve().then(()=>requirePage("/_app", distDir, false))
        ]);
    }
    const ComponentMod = await Promise.resolve().then(()=>requirePage(page, distDir, isAppPath));
    // Make sure to avoid loading the manifest for Route Handlers
    const hasClientManifest = isAppPath && (page.endsWith("/page") || page === "/not-found" || page === "/_not-found");
    const [buildManifest, reactLoadableManifest, clientReferenceManifest, serverActionsManifest] = await Promise.all([
        loadManifestWithRetries(join(distDir, BUILD_MANIFEST)),
        loadManifestWithRetries(join(distDir, REACT_LOADABLE_MANIFEST)),
        hasClientManifest ? loadClientReferenceManifest(join(distDir, "server", "app", page.replace(/%5F/g, "_") + "_" + CLIENT_REFERENCE_MANIFEST + ".js"), page.replace(/%5F/g, "_")) : undefined,
        isAppPath ? loadManifestWithRetries(join(distDir, "server", SERVER_REFERENCE_MANIFEST + ".json")).catch(()=>null) : null
    ]);
    const Component = interopDefault(ComponentMod);
    const Document = interopDefault(DocumentMod);
    const App = interopDefault(AppMod);
    const { getServerSideProps, getStaticProps, getStaticPaths, routeModule } = ComponentMod;
    return {
        App,
        Document,
        Component,
        buildManifest,
        reactLoadableManifest,
        pageConfig: ComponentMod.config || {},
        ComponentMod,
        getServerSideProps,
        getStaticProps,
        getStaticPaths,
        clientReferenceManifest,
        serverActionsManifest,
        isAppPath,
        page,
        routeModule
    };
}
export const loadComponents = getTracer().wrap(LoadComponentsSpan.loadComponents, loadComponentsImpl);

//# sourceMappingURL=load-components.js.map