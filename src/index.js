import perspective from "@finos/perspective/dist/esm/perspective.parallel.js";

import "@finos/perspective-workspace";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer-d3fc";

import "@finos/perspective-workspace/dist/umd/material.css";

import "./index.css";

import layouts from "./layout.json";

let LAYOUTS = localStorage.getItem("layouts") ? JSON.parse(localStorage.getItem("layouts")) : layouts;

const worker = perspective.worker();

async function fetch_progress(url) {
    const response = await fetch(url);
    const reader = response.body.getReader();
    const contentLength = +response.headers.get("Content-Length");
    let receivedLength = 0;
    let chunks = [];
    while (true) {
        const {done, value} = await reader.read();
        if (done) {
            break;
        }

        chunks.push(value);
        receivedLength += value.length;
        //console.log(`Received ${receivedLength} of ${contentLength}`);
        window.message.textContent = `Downloading (${((100 * receivedLength) / contentLength).toFixed(1)}%)`;
    }

    let chunksAll = new Uint8Array(receivedLength);
    let position = 0;
    for (let chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
    }
    window.message.style.display = "none";
    return chunksAll.buffer;
}

window.addEventListener("load", async () => {
    document.body.innerHTML = `
        <style>

        </style>
        <div id='buttons'>
            <span id="message"></span>
            <select id="layouts"></select>
            <button id="save_as">Save As</button>
            <input id="name_input" style="display: none"></input>
            <button id="save" style="display: none">Save</button>
            <button id="cancel" style="display: none">Cancel</button>
            <button id="copy" style="float: right">Debug to Clipboard</button>
            <button id="reset" style="float: right">Reset LocalStorage</button>
            <a href="https://github.com/texodus/nypd-ccrb">NYCLU/CCRB Data</a>
            <a href="https://github.com/finos/perspective">Built With Perspective</a>
        </div>
        <perspective-workspace id='workspace'>
        </perspective-workspace>
    `.trim();

    window.workspace.addTable(
        "github-incidents",
        (async () => {
            const buffer = await fetch_progress("./github-incidents.arrow");
            const table = worker.table(buffer);
            return table;
        })()
    );

    const layout_names = Object.keys(LAYOUTS);
    let selected_layout = LAYOUTS[layout_names[0]];
    await window.workspace.restore(selected_layout);

    function set_layout_options() {
        const layout_names = Object.keys(LAYOUTS);
        window.layouts.innerHTML = "";
        console.log(layout_names);
        for (const layout of layout_names) {
            window.layouts.innerHTML += `<option${layout === selected_layout ? " selected='true'" : ""}>${layout}</option>`;
        }
    }

    set_layout_options();
    window.name_input.value = layout_names[0];
    window.layouts.addEventListener("change", async () => {
        if (window.layouts.value.trim().length === 0) {
            return;
        }
        window.workspace.innerHTML = "";
        await window.workspace.restore(layouts[window.layouts.value]);
        window.name_input.value = window.layouts.value;
    });

    window.save_as.addEventListener("click", async () => {
        window.save_as.style.display = "none";
        window.save.style.display = "inline-block";
        window.cancel.style.display = "inline-block";
        window.name_input.style.display = "inline-block";
        window.copy.style.display = "none";
        window.layouts.style.display = "none";
    });

    function cancel() {
        window.save_as.style.display = "inline-block";
        window.save.style.display = "none";
        window.cancel.style.display = "none";
        window.name_input.style.display = "none";
        window.copy.style.display = "inline-block";
        window.layouts.style.display = "inline-block";
    }

    window.cancel.addEventListener("click", cancel);

    window.reset.addEventListener("click", () => {
        localStorage.clear();
        window.reset.innerText = "Reset!";
        setTimeout(() => {
            window.reset.innerText = "Reset LocalStorage";
        }, 1000);
    });

    window.save.addEventListener("click", async () => {
        const token = window.workspace.save();
        const new_name = window.name_input.value;
        LAYOUTS[new_name] = token;
        set_layout_options();
        window.layouts.value = new_name;
        window.save_as.innerText = "Saved!";
        setTimeout(() => {
            window.save_as.innerText = "Save As";
        }, 1000);
        localStorage.setItem("layouts", JSON.stringify(LAYOUTS));
        cancel();
    });

    window.copy.addEventListener("click", async () => {
        await navigator.clipboard.writeText(JSON.stringify(LAYOUTS));
        window.copy.innerText = "Copied!";
        setTimeout(() => {
            window.copy.innerText = "Debug to Clipboard";
        }, 1000);
    });
});
