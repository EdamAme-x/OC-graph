import { serve } from "https://deno.land/std@0.141.0/http/mod.ts";
import { serveDir } from "https://deno.land/std@0.141.0/http/file_server.ts";
import { isIn } from "./isIn.js"

serve(async (request) => {

    console.log("req:" + request.url)

    if (isIn(request.url, "info")) {

        // 2000505788-ZAXeNBgK
        let request = {
            bodyUsed: false,
            headers: {
                accept: "application/json, text/plain, */*",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "ja",
                cookie: "LIFF_STORE:expires:1657909707-gNvoQEQN=1657909707",
                host: "oc-graph.deno.dev",
                referer: "https://openchatstats.landpress.line.me",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent": "Android LINE 13.3 LIFF"
            },
            method: "GET",
            redirect: "follow",
            url: request.url.replace("https://oc-graph.deno.dev", "https://openchatstats.landpress.line.me/")
        }

        // OC 情報
        if (isIn(request.url, "openchat-info")) {
            console.log(request)
            console.log("copy: " + JSON.stringify({ ...request }));
            let res = await fetch("https://openchat-stats.line-apps.com/api/v1/stats/openchat-info", request).then(d => d.json());
            console.log(res);
            return res;
        }

        // member
        if (isIn(request.url, "members/info")) {
            console.log(request)
            let res = await fetch("https://openchat-stats.line-apps.com/api/v1/stats/openchat-info", request).then(d => d.json());
            console.log(res);
            return res;
        }

        return new Response("bad!")
    } // api

    return serveDir(request);
});