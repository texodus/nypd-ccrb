const perspective = require("@finos/perspective");

const URL = `https://wabi-us-gov-virginia-api.analysis.usgovcloudapi.net/public/reports/querydata?synchronous=true`;

const REQUEST = (active) => {
    const commands = {
        Commands: [
            {
                SemanticQueryDataShapeCommand: {
                    Query: {
                        Version: 2,
                        From: [{Name: "q1", Entity: "CCRB Active - Oracle", Type: 0}],
                        Select: [
                            {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Unique Id"}, Name: "Query1.Unique Id"},
                            {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Command"}, Name: "Query1.Command1"},
                            {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Last Name"}, Name: "Query1.Last Name1"},
                            {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "First Name"}, Name: "Query1.First Name1"},
                            {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Rank"}, Name: "Query1.Rank1"},
                            {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Shield No"}, Name: "Query1.ShieldNo"},
                        ],
                        OrderBy: [{Direction: 1, Expression: {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Command"}}}],
                    },
                    Binding: {Primary: {Groupings: [{Projections: [0, 1, 2, 3, 4, 5]}]}, DataReduction: {DataVolume: 3, Primary: {Window: {Count: 500}}}, Version: 1},
                },
            },
        ],
    };

    return {
        version: "1.0.0",
        queries: [
            {
                Query: commands,
                CacheKey: JSON.stringify(commands),
                CacheOptions: 7,
                QueryId: "",
                ApplicationContext: active
                    ? {DatasetId: "523ab509-8e2d-43ed-bfad-11fcd05180d7", Sources: [{ReportId: "f508555a-b39d-4c10-8d46-a14bc282e079"}]}
                    : {DatasetId: "e9651248-cbdf-498c-8b19-c7bdfbe87cc3", Sources: [{ReportId: "737c2470-a2eb-4f5b-a133-bb9e089c3a65"}]},
            },
        ],
        cancelQueries: [],
        modelId: active ? 404287 : 404284,
    };
};

const REQUEST3 = (active, uniqueid) => {
    const commands = {
        Commands: [
            {
                SemanticQueryDataShapeCommand: {
                    Query: {
                        Version: 2,
                        From: [{Name: "q1", Entity: "CCRB Active - Oracle", Type: 0}],
                        Select: [
                            {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Rn"}, Name: "Sum(Query1.Rn)"},
                            // {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Complaint ID"}, Name: "CountNonNull(Query1.Complaint Id)1"},
                            {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Complaint ID"}, Name: "Query1.Complaint Id"},
                            {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Incident Date"}, Name: "Query1.Incident Date"},
                            {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "FADO Type"}, Name: "Query1.FADO Type1"},
                            {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Allegation"}, Name: "Query1.Allegation1"},
                            {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Board Disposition"}, Name: "Query1.Board Disposition1"},
                            {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "NYPD Disposition"}, Name: "Query1.NYPD Disposition"},
                            {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Penalty"}, Name: "Query1.PenaltyDesc1"},
                            {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Unique Id"}, Name: "CountNonNull(Query1.Unique Id)"},
                        ],
                        Where: [
                            {
                                Condition: {
                                    Not: {
                                        Expression: {
                                            Comparison: {ComparisonKind: 0, Left: {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Rn"}}, Right: {Literal: {Value: "0L"}}},
                                        },
                                    },
                                },
                            },
                            // {Condition: {In: {Expressions: [{Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Shield No"}}], Values: [[{Literal: {Value: "'4557'"}}]]}}},
                            // {Condition: {In: {Expressions: [{Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Last Name"}}], Values: [[{Literal: {Value: "'Bascom'"}}]]}}},
                            // {Condition: {In: {Expressions: [{Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "First Name"}}], Values: [[{Literal: {Value: "'Alistair'"}}]]}}},
                            {Condition: {In: {Expressions: [{Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Unique Id"}}], Values: [[{Literal: {Value: `'${uniqueid}'`}}]]}}},
                            // {Condition: {In: {Expressions: [{Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Command"}}], Values: [[{Literal: {Value: "'001 DET'"}}]]}}},
                            // {Condition: {In: {Expressions: [{Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Rank"}}], Values: [[{Literal: {Value: "'Detective'"}}]]}}},
                        ],
                        OrderBy: [{Direction: 1, Expression: {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Rn"}}}],
                    },
                    Binding: {Primary: {Groupings: [{Projections: [0, 1, 2, 3, 4, 5, 6, 7, 8]}]}, DataReduction: {DataVolume: 3, Primary: {Window: {Count: 500}}}, Version: 1},
                },
            },
        ],
    };

    return {
        version: "1.0.0",
        queries: [
            {
                Query: commands,
                QueryId: "",
                ApplicationContext: active
                    ? {DatasetId: "523ab509-8e2d-43ed-bfad-11fcd05180d7", Sources: [{ReportId: "f508555a-b39d-4c10-8d46-a14bc282e079"}]}
                    : {DatasetId: "e9651248-cbdf-498c-8b19-c7bdfbe87cc3", Sources: [{ReportId: "737c2470-a2eb-4f5b-a133-bb9e089c3a65"}]},
            },
        ],
        cancelQueries: [],
        modelId: active ? 404287 : 404284,
    };
};

const CONT_REQUEST = (cont, active) => ({
    version: "1.0.0",
    queries: [
        {
            Query: {
                Commands: [
                    {
                        SemanticQueryDataShapeCommand: {
                            Query: {
                                Version: 2,
                                From: [{Name: "q1", Entity: "CCRB Active - Oracle", Type: 0}],
                                Select: [
                                    {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Unique Id"}, Name: "Query1.Unique Id"},
                                    {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Command"}, Name: "Query1.Command1"},
                                    {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Last Name"}, Name: "Query1.Last Name1"},
                                    {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "First Name"}, Name: "Query1.First Name1"},
                                    {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Rank"}, Name: "Query1.Rank1"},
                                    {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Shield No"}, Name: "Query1.ShieldNo"},
                                ],
                                OrderBy: [{Direction: 1, Expression: {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Command"}}}],
                            },
                            Binding: {
                                Primary: {Groupings: [{Projections: [0, 1, 2, 3, 4, 5]}]},
                                DataReduction: {DataVolume: 3, Primary: {Window: {Count: 500, RestartTokens: [cont]}}},
                                Version: 1,
                            },
                        },
                    },
                ],
            },
            QueryId: "",
        },
    ],
    cancelQueries: [],
    modelId: active ? 404287 : 404284,
});

const HEADERS = (active) => ({
    Accept: "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    ActivityId: active ? "93da7c40-1d53-5406-7f8b-aa11787addd5" : "a9a7df5f-eb4f-41be-bf93-5bb5cd6ce5b5",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Length": "1218",
    "Content-Type": "application/json;charset=UTF-8",
    Host: "wabi-us-gov-virginia-api.analysis.usgovcloudapi.net",
    Origin: "https://app.powerbigov.us",
    Pragma: "no-cache",
    Referer: "https://app.powerbigov.us/",
    RequestId: active ? "c3cca3ff-b3aa-99e6-345c-e51d783816f9" : "7094b440-18bb-60c9-990d-7d383deac78c",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36",
    "X-PowerBI-ResourceKey": active ? "b2c8d2f2-3ad1-48dc-883c-d4163a6e2d8f" : "87914378-578f-4f43-b75e-8ddaeafbdda2",
});

// ActivityId: 93da7c40-1d53-5406-7f8b-aa11787addd5
// RequestId: c3cca3ff-b3aa-99e6-345c-e51d783816f9
// X-PowerBI-ResourceKey: b2c8d2f2-3ad1-48dc-883c-d4163a6e2d8f

// ActivityId: a9a7df5f-eb4f-41be-bf93-5bb5cd6ce5b5
// RequestId: 7094b440-18bb-60c9-990d-7d383deac78c
// X-PowerBI-ResourceKey: 87914378-578f-4f43-b75e-8ddaeafbdda2

const fetch = require("node-fetch");
const fs = require("fs");

function* iter_rows(json) {
    const rows = json.results[0].result.data.dsr.DS[0].PH[0].DM0;
    const dicts = json.results[0].result.data.dsr.DS[0].ValueDicts;
    const names = json.results[0].result.data.descriptor.Select.map((x) => x.Name.replace("Query1.", ""));
    if (rows.length === 0) {
        return;
    }

    let dict_schema = rows[0].S;

    let row = {};
    for (let datarow of rows) {
        const C = datarow.C;
        let R = ((typeof datarow.R === "number" ? datarow.R : datarow.Ø) >>> 0).toString(2).split("").reverse().join("");
        // console.log(R);
        // console.log(C);
        for (let i = 0; i < 6; i++) {
            if (R[i] !== "1" || typeof row[names[i]] === "undefined") {
                // Non sparse
                let val = C.shift();
                if (typeof val === "string") {
                    // string
                } else if (dict_schema[i].DN) {
                    // dictionary
                    val = dicts[dict_schema[i].DN][val];
                } else if (dict_schema[i].T === 7) {
                    // datetime
                    val = new Date(val);
                }
                row[names[i]] = val;
            } else {
                // Sparse, row is unchanged;
            }
        }

        yield Object.assign({}, row);
    }
}

async function fetch_page(cont, active, incident_id) {
    let args;
    if (cont) {
        args = CONT_REQUEST(cont, active);
    } else if (incident_id) {
        // console.log("wip");
        args = REQUEST3(active, incident_id);
    } else {
        args = REQUEST(active);
    }
    const resp = await fetch(URL, {
        method: "post",
        body: JSON.stringify(args),
        headers: HEADERS(active),
    });

    const text = await resp.text();

    let json;
    try {
        json = JSON.parse(text);
    } catch (e) {
        console.error(cont);
        console.log(resp.status);
        throw "Error";
    }

    // Process
    let data = [];
    for (let datarow of iter_rows(json)) {
        data.push(datarow);
    }

    return data;
}

async function fetch_officers(active) {
    let cont,
        //  data = [],
        running = true;
    const table = perspective.table(OFFICER_SCHEMA);
    const view = table.view();
    try {
        while (running) {
            let page = await fetch_page(cont, active);
            if (page.length < 500) {
                running = false;
            }
            // data = data.concat(page);
            table.update(page);
            cont = Object.values(page[page.length - 1]);
            let temp = cont[0];
            cont[0] = cont[1];
            cont[1] = temp;
            cont = cont.map((x) => `'${x}'`);
            process.stdout.write(`\rDownloaded ${await table.size()} from ${active ? "active" : "inactive"}`);
            const arrow = await view.to_arrow();
            fs.writeFileSync(`./dist/${active ? "active" : "inactive"}.arrow`, Buffer.from(arrow), "binary");
            // await new Promise((x) => setTimeout(x, 100));
        }
    } catch (e) {
        console.error(e);
    } finally {
        console.log(" ... done");
        view.delete();
        table.delete();
    }
}

const ENRICHED_OFFICER_SCHEMA = {
    "Unique Id": "string",
    Command1: "string",
    "Last Name1": "string",
    "First Name1": "string",
    Rank1: "string",
    ShieldNo: "float",
    "FADO Type": "string",
    Allegation: "string",
    // "Board Disposition": "string",
    // NYPDDisposition: "string",
    // PenaltyDesc: "string",
};

async function arrow_to_columns(arrow) {
    const table = perspective.table(arrow);
    const view = table.view();
    const size = await table.size();
    const columns = await view.to_columns();
    view.delete();
    table.delete();
    return [size, columns];
}

async function join_officers() {
    const [isize, inactive] = await arrow_to_columns(fs.readFileSync("./dist/inactive.arrow"));
    const [asize, active] = await arrow_to_columns(fs.readFileSync("./dist/active.arrow"));
    inactive.Active = new Array(isize).fill(false);
    active.Active = new Array(asize).fill(true);
    console.log(isize);
    console.log(asize);
    const table = perspective.table(active);
    await table.update(inactive);
    const view = table.view();
    const arrow = await view.to_arrow();
    console.log(await table.size());
    fs.writeFileSync("./dist/officers.arrow", Buffer.from(arrow), "binary");
    view.delete();
    table.delete();
}

async function join_incidents() {
    const [isize, inactive] = await arrow_to_columns(fs.readFileSync("./dist/inactive-incidents.arrow"));
    const [asize, active] = await arrow_to_columns(fs.readFileSync("./dist/active-incidents.arrow"));
    inactive.Active = new Array(isize).fill(false);
    active.Active = new Array(asize).fill(true);
    console.log(isize);
    console.log(asize);
    const table = perspective.table(Object.assign({Active: "boolean"}, INCIDENT_SCHEMA));
    await table.update(active);
    await table.update(inactive);
    const view = table.view();
    const arrow = await view.to_arrow();
    console.log(await table.size());
    fs.writeFileSync("./dist/incidents.arrow", Buffer.from(arrow), "binary");
    view.delete();
    table.delete();
}

const OFFICER_SCHEMA = {
    "Unique Id": "string",
    Command1: "string",
    "Last Name1": "string",
    "First Name1": "string",
    Rank1: "string",
    ShieldNo: "integer",
};

const INCIDENT_SCHEMA = {
    // "Sum(Rn)": "integer",
    "Complaint Id": "integer",
    "Incident Date": "date",
    "FADO Type1": "string",
    Allegation1: "string",
    "Board Disposition1": "string",
    "Unique Id": "string",
};

const GITHUB_INCIDENT_SCHEMA = {
    // AsOfDate: "datetime",
    "Unique Id": "integer",
    "First Name": "string",
    "Last Name": "string",
    Rank: "string",
    Command: "string",
    ShieldNo: "integer",
    "Complaint Id": "integer",
    "Incident Date": "date",
    "FADO Type": "string",
    Allegation: "string",
    "Board Disposition": "string",
    NYPDDisposition: "string",
    PenaltyDesc: "string",
    Active: "string",
};

async function fetch_incidents(active) {
    let count = 0;
    const orig = JSON.parse(fs.readFileSync(`./dist/${active ? "active" : "inactive"}.json`).toString());
    const table = perspective.table(INCIDENT_SCHEMA);
    const view = table.view();

    try {
        for (let row of orig) {
            const recs = await fetch_page(false, active, row["Unique Id"]);
            for (const rec of recs) {
                rec["Unique Id"] = row["Unique Id"];
                table.update([rec]);
            }
            if (++count % 100 === 0) {
                process.stdout.write(
                    `\rDownloaded ${count} / ${orig.length} (${((100 * count) / orig.length).toFixed(2)}%) ${active ? "active" : "inactive"} officers (${await table.size()} incidents)`
                );
                const arrow = await view.to_arrow();
                fs.writeFileSync(`./dist/${active ? "active" : "inactive"}-incidents.arrow`, Buffer.from(arrow), "binary");
            }
        }
    } catch (e) {
        console.error(e);
    } finally {
        console.log(" ... done");
        const arrow = await view.to_arrow();
        fs.writeFileSync(`./dist/${active ? "active" : "inactive"}-incidents.arrow`, Buffer.from(arrow), "binary");
        view.delete();
        table.delete();
    }
}

function _clean_null_column(column) {
    for (let i = 0; i < column.length; i++) {
        if (column[i] === "NULL" || column[i] === "") {
            column[i] = null;
        }
    }
}

function _set_active_column(column, column2, is_active) {
    for (let i = 0; i < column2.length; i++) {
        column[i] = is_active.has(column2[i]) ? "active" : "inactive";
    }
}

function _clean_date_column(column) {
    for (let i = 0; i < column.length; i++) {
        if (new Date(column[i]).getFullYear() < 1985) {
            column[i] = null;
        }
    }
}

async function fetch_incidents_github() {
    const csv_url = "https://raw.githubusercontent.com/new-york-civil-liberties-union/NYPD-Misconduct-Complaint-Database/master/CCRB_database_raw.csv";
    const resp = await fetch(csv_url);
    const csv = await resp.text();
    let table = perspective.table(csv);
    let view = table.view();
    const columns = await view.to_columns();
    view.delete();
    table.delete();
    _clean_null_column(columns["Incident Date"]);
    _clean_date_column(columns["Incident Date"]);
    _clean_null_column(columns["Allegation"]);
    _clean_null_column(columns["FADO Type"]);
    _clean_null_column(columns["Board Disposition"]);
    _clean_null_column(columns["NYPDDisposition"]);
    _clean_null_column(columns["PenaltyDesc"]);
    _clean_null_column(columns["Complaint Id"]);

    const [size, columns2] = await arrow_to_columns(fs.readFileSync("./dist/officers.arrow"));
    const is_active = new Set();
    for (let i = 0; i < size; i++) {
        if (columns2["Active"][i]) {
            is_active.add(columns2["ShieldNo"][i]);
        }
    }

    columns["Active"] = [];
    _set_active_column(columns["Active"], columns["ShieldNo"], is_active);
    table = perspective.table(GITHUB_INCIDENT_SCHEMA);
    table.update(columns);
    view = table.view();
    const arrow = await view.to_arrow();
    fs.writeFileSync(`./dist/github-incidents.arrow`, Buffer.from(arrow), "binary");
    view.delete();
    table.delete();
}

async function main() {
    await fetch_officers(false);
    await fetch_officers(true);
    await join_officers();
    await fetch_incidents_github();
    await fetch_incidents(true);
    await fetch_incidents(false);
    await join_incidents();
}

main();
