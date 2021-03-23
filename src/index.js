import perspective from "@finos/perspective";

import "@finos/perspective-workspace";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer-d3fc";

import "@finos/perspective-workspace/dist/umd/material.css";

import "./index.css";

import layouts from "./layout.json";

const worker = perspective.worker();

window.addEventListener("load", async () => {
    document.body.innerHTML = `
        <style>
            #buttons {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 36px;
                background-color: #eee;
            }
            #workspace {
                height: auto;
                position: absolute;
                top: 36px;
                right: 0;
                bottom: 0;
                left: 0;
            }
        </style>
        <div id='buttons'>
            <select id="layouts"></select>
            <button id="copy">Copy to Clipboard</button>
            <button id="save">Save</button>
            <input id="name_input"></input>
        </div>
        <perspective-workspace id='workspace'>
        </perspective-workspace>
    `.trim();

    window.workspace.addTable(
        "github-incidents",
        (async () => {
            const resp = await fetch("./github-incidents.arrow");
            const buffer = await resp.arrayBuffer();
            const table = worker.table(buffer);
            return table;
        })()
    );

    const layout_names = Object.keys(layouts);
    let selected_layout = layouts[layout_names[0]];
    await window.workspace.restore(selected_layout);

    function set_layout_options() {
        const layout_names = Object.keys(layouts);
        window.layouts.innerHTML = "";
        console.log(layout_names);
        for (const layout of layout_names) {
            window.layouts.innerHTML += `<option${layout === selected_layout ? " selected='true'" : ""}>${layout}</option>`;
        }
    }

    set_layout_options();
    window.name_input.value = layout_names[0];

    window.layouts.addEventListener("change", async () => {
        window.workspace.innerHTML = "";
        await window.workspace.restore(layouts[window.layouts.value]);
        window.name_input.value = window.layouts.value;
    });

    window.save.addEventListener("click", async () => {
        const token = window.workspace.save();
        const new_name = window.name_input.value;
        layouts[new_name] = token;
        set_layout_options();
        window.layouts.value = new_name;
        window.save.innerText = "Saved!";
        setTimeout(() => {
            window.save.innerText = "Save";
        }, 1000);
    });

    window.copy.addEventListener("click", async () => {
        await navigator.clipboard.writeText(JSON.stringify(layouts));
        window.copy.innerText = "Copied!";
        setTimeout(() => {
            window.copy.innerText = "Copy";
        }, 1000);
    });
});
