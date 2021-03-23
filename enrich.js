const URL = `https://wabi-us-gov-virginia-api.analysis.usgovcloudapi.net/public/reports/querydata?synchronous=true`;

const REQUEST3 = (uniqueid) => ({
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
                                    {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Rn"}, Name: "Sum(Query1.Rn)"},
                                    {Column: {Expression: {SourceRef: {Source: "q1"}}, Property: "Complaint ID"}, Name: "CountNonNull(Query1.Complaint Id)1"},
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
            },
            QueryId: "",
            ApplicationContext: {DatasetId: "523ab509-8e2d-43ed-bfad-11fcd05180d7", Sources: [{ReportId: "f508555a-b39d-4c10-8d46-a14bc282e079"}]},
        },
    ],
    cancelQueries: [],
    modelId: 404287,
});

const HEADERS = {
    Accept: "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    ActivityId: "2d86b065-93ec-36f0-d25d-0a366c54ae94",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Length": "1218",
    "Content-Type": "application/json;charset=UTF-8",
    Host: "wabi-us-gov-virginia-api.analysis.usgovcloudapi.net",
    Origin: "https://app.powerbigov.us",
    Pragma: "no-cache",
    Referer: "https://app.powerbigov.us/",
    RequestId: "be50942f-e288-af72-ab83-f410e74301a0",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36",
    "X-PowerBI-ResourceKey": "b2c8d2f2-3ad1-48dc-883c-d4163a6e2d8f",
};

const fetch = require("node-fetch");
const fs = require("fs");

function* iter_rows(json) {
    const rows = json.results[0].result.data.dsr.DS[0].PH[0].DM0;
    const dicts = json.results[0].result.data.dsr.DS[0].ValueDicts;
    const names = json.results[0].result.data.descriptor.Select.map((x) => x.Name.replace("Query1.", ""));
    if (rows.length === 0) {
        return {};
    }

    // console.log(rows);
    let dict_schema = rows[0].S;

    let row = {};
    for (let datarow of rows) {
        const C = datarow.C;
        let R = ((typeof datarow.R === "number" ? datarow.R : datarow.Ø) >>> 0).toString(2).split("").reverse().join("");
        // console.log(R);
        // console.log(C);
        for (let i = 0; i < 9; i++) {
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

async function fetch_page(id) {
    let args = REQUEST3(id);
    const resp = await fetch(URL, {
        method: "post",
        body: JSON.stringify(args),
        headers: HEADERS,
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

    if (!json.results[0].result.data) {
        console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.error(json);
        return [];
    }

    // Process
    let data = [];
    for (let datarow of iter_rows(json)) {
        data.push(datarow);
    }

    return data;
}

// const PAGE_500_ITERS = 70;

async function main() {
    let count = 0,
        data = [];
    const orig = JSON.parse(fs.readFileSync("./orig.json"));
    try {
        for (let row of orig) {
            // console.log(cont);
            const recs = await fetch_page(row["Unique Id"]);
            if (recs.length === 0) {
                data.push(row);
            } else {
                for (const rec of recs) {
                    data.push(Object.assign(rec, row));
                }
            }
            // Object.assign(data, row);
            // cont = Object.values(data[data.length - 1]);
            // let temp = cont[0];
            // cont[0] = cont[1];
            // cont[1] = temp;
            // cont = cont.map((x) => `'${x}'`);
            if (count++ % 100 === 0) {
                console.log(`${count} (${data.length})`);
            }
            // break;
            // await new Promise((x) => setTimeout(x, 5000));
            if (data.length > 2000000) {
                break;
            }
        }
    } catch (e) {
        console.error(e);
    } finally {
        // console.log(cont);
        fs.writeFileSync("./dist/results.json", JSON.stringify(data));
    }
}

main();
