import { serve } from "https://deno.land/std@0.141.0/http/mod.ts";
import { serveDir } from "https://deno.land/std@0.141.0/http/file_server.ts";
import { isIn } from "./isIn.js"

serve((request) => {

    console.log("req:" + request.url)

    if (isIn(request.url, "api")) {

        // OC 情報
        if (isIn(request.url, "openchat-info")) {
            return fetch("https://openchat-stats.line-apps.com/api/v1/stats/openchat-info", request).then(d => d.json())
        }

        // member
        if (isIn(request.url, "members/info")) {
            return fetch("https://openchat-stats.line-apps.com/api/v1/stats/members/info", request).then(d => d.json())
        }

        return new Response("bad!")
    } // api

    return serveDir(request);
});