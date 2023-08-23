import { serve } from "https://deno.land/std@0.141.0/http/mod.ts";
import { serveDir } from "https://deno.land/std@0.141.0/http/file_server.ts";
import { isIn } from "./isIn.js"

serve(async (request) => {

    console.log("req:" + request.url)

    if (isIn(request.url, "info")) {

        // OC 情報
        if (isIn(request.url, "openchat-info")) {
            let res = await fetch("https://openchat-stats.line-apps.com/api/v1/stats/openchat-info", request).then(d => d.json()));
            c
            return res;
        }

        // member
        if (isIn(request.url, "members/info")) {
            let res = await fetch("https://openchat-stats.line-apps.com/api/v1/stats/openchat-info", request).then(d => d.json()));
            console.log(res)
            return res;
        }

        return new Response("bad!")
    } // api

    return serveDir(request);
});