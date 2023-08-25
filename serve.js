import { serve } from "https://deno.land/std@0.141.0/http/mod.ts";
import { serveDir } from "https://deno.land/std@0.141.0/http/file_server.ts";
import { isIn } from "./isIn.js"

serve(async (request) => {

    console.log("req:" + request.url)

    if (isIn(request.url, "info")) {

        // 2000505788-ZAXeNBgK
        let request_copy = {
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
                "user-agent": "Android LINE 13.3 LIFF",
                "x-liff-token": request.headers.get("x-liff-token"),
                "x-requested-with": "jp.naver.line.android",
                "x-square-chat-id": request.headers.get("x-square-chat-id"),
                "x-square-id": request.headers.get("x-square-id")
            },
            method: "GET",
            redirect: "follow",
            url: request.url.replace("https://oc-graph.deno.dev", "https://openchatstats.landpress.line.me/")
        }

        console.log(request)
        console.log("copy: " + JSON.stringify({ ...request_copy }));

        // OC 情報
        if (isIn(request.url, "openchat-info")) {
            let res = await fetch("https://openchat-stats.line-apps.com/api/v1/stats/openchat-info", request_copy).then(d => d.json());
            console.log(res);
            return res;
        }

        // member
        if (isIn(request.url, "members/info")) {
            let res = await fetch("https://openchat-stats.line-apps.com/api/v1/stats/members/info", request_copy).then(d => d.json());
            console.log(res);
            return res;
        }

        return new Response("bad!")
    } // api

    if (isIn(request.url, "oauth2/v2.1")) {
        // verifyの時は
        if (isIn(request.url, "verify")) {
            let res = await fetch("https://api.line.me/oauth2/v2.1/verify?" + request.url.split("?")[1], request).then(d => d.json());
            console.log("token-oauth:" + JSON.stringfy(res));
            return res;
        }else {  // 他はそのまま
            let res = await fetch(request.url.replace("oc-graph.deno.dev", "api.line.me") , request).then(d => d.json());
            console.log("other-oauth:" + JSON.stringfy(res));
            return res;
        }

       
    }

    return serveDir(request);
});