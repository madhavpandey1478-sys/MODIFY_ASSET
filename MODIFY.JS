
(function () {
    "use strict";

    /* =========================================================
       ICONS
       ========================================================= */
    var ICON_LOAD = '<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 3v9m0 0l-3.5-3.5M10 12l3.5-3.5M4 15h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var ICON_SAVE = '<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M4 4h9l3 3v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1.6"/><path d="M7 4v4h6V4M6 11h8v5H6z" stroke="currentColor" stroke-width="1.4"/></svg>';

    var ICON_DELETE = '<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M4 6h12M8 6V4.5A1 1 0 0 1 9 3.5h2a1 1 0 0 1 1 1V6M6 6l.6 9.4a1 1 0 0 0 1 .9h4.8a1 1 0 0 0 1-.9L14 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var ICON_CLEAR = '<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

    /* =========================================================
       FIELD DEFINITIONS
       Asset ID is read-only. All other fields are editable.
       ========================================================= */
    var FIELDS = [
        {
            key: "company",
            label: "Company",
            width: 150,
            aliases: ["COMPANY", "COMPANY_CODE", "COMPANYCODE"]
        },
        {
            key: "costCenter",
            label: "Cost Center",
            width: 180,
            aliases: ["COSTCENTER", "COST_CENTER", "COST CENTER"]
        },
        {
            key: "assetClass",
            label: "Asset Class",
            width: 160,
            aliases: ["ASSET_CLASS", "ASSETCLASS", "ASSET CLASS"]
        },
        {
            key: "capitalizedMonth",
            label: "Capitalized Month",
            width: 190,
            aliases: [
                "CAPITALIZED",
                "CAPITALIZED_MONTH",
                "CAPITALIZEDMONTH",
                "CWIP_T_MONTH"
            ]
        },
        {
            key: "description",
            label: "Asset Description",
            width: 360,
            aliases: [
                "DESCRIPTION",
                "ASSET_DESCRIPTION",
                "ASSET DESCRIPTION",
                "TEXT"
            ]
        }
    ];

    /* =========================================================
       STYLES
       ========================================================= */
    var STYLE = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 180px;
        font-family: "72", "72full", Arial, sans-serif;
        color: #263746;
        --blue: #0070f2;
        --line: #d7dce1;
        --header: #eef4fa;
        box-sizing: border-box;
      }

      * {
        box-sizing: border-box;
      }

      .shell {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        min-height: 180px;
        background: #fff;
        border: 1px solid var(--line);
        overflow: hidden;
      }

      .toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        padding: 10px 12px;
        border-bottom: 1px solid var(--line);
        background: #f8fbff;
      }

      .spacer {
        flex: 1;
      }

      button {
        height: 36px;
        padding: 0 14px;
        border: 1px solid #b8cce0;
        border-radius: 7px;
        background: #fff;
        color: #0064d9;
        font: 600 12px "72", Arial, sans-serif;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        white-space: nowrap;
      }

      button:hover {
        background: #eaf3ff;
      }

      button.primary {
        background: #0070f2;
        color: #fff;
        border-color: #0070f2;
      }

      button.primary:hover {
        background: #0057c2;
      }

      button.danger {
        color: #bb0000;
        border-color: #e4b2b2;
        background: #fffafa;
        display: none;
      }

      button.danger:hover {
        background: #fdeaea;
      }

      button svg {
        flex: none;
      }

      .search {
        height: 36px;
        width: min(250px, 100%);
        padding: 0 10px;
        border: 1px solid #c6d4e0;
        border-radius: 7px;
        font: 12px "72", Arial, sans-serif;
        outline: none;
      }

      .search:focus {
        border-color: var(--blue);
        box-shadow: 0 0 0 2px #0070f21a;
      }

      .count {
        font-size: 12px;
        color: #607487;
        white-space: nowrap;
      }

      .table-wrap {
        flex: 1;
        min-height: 100px;
        overflow: auto;
      }

      table {
        border-collapse: separate;
        border-spacing: 0;
        table-layout: fixed;
        min-width: 1350px;
        width: 100%;
      }

      th {
        position: sticky;
        top: 0;
        z-index: 2;
        height: 42px;
        padding: 0 10px;
        text-align: left;
        white-space: nowrap;
        background: var(--header);
        color: #24445f;
        border-bottom: 1px solid #cbd8e3;
        font-size: 12px;
        font-weight: 700;
      }

      td {
        padding: 7px 8px;
        border-bottom: 1px solid #e6ebef;
        background: #fff;
        vertical-align: middle;
      }

      tr:hover td {
        background: #f8fbff;
      }

      tr.selected td {
        background: #e7f2ff;
      }

      tr.selected:hover td {
        background: #d9eaff;
      }

      .check-cell {
        width: 44px;
        text-align: center;
        padding: 0;
      }

      input[type=checkbox] {
        width: 17px;
        height: 17px;
        accent-color: #0070f2;
        cursor: pointer;
      }

      .asset-id {
        font-size: 12px;
        color: #435466;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .cell {
        width: 100%;
        min-width: 0;
        height: 34px;
        padding: 0 9px;
        border: 1px solid #bfd0df;
        border-radius: 5px;
        background: #fff;
        color: #253746;
        font: 12px "72", Arial, sans-serif;
        outline: none;
      }

      .cell:focus {
        border-color: #0070f2;
        box-shadow: 0 0 0 2px #0070f21a;
      }

      .footer {
        display: flex;
        align-items: center;
        gap: 18px;
        flex-wrap: wrap;
        padding: 9px 12px;
        background: #f7f9fb;
        border-top: 1px solid var(--line);
        font-size: 11px;
        color: #607487;
      }

      .strong {
        font-weight: 700;
        color: #30495e;
      }

      .message {
        margin-left: auto;
        white-space: normal;
      }

      .empty {
        padding: 28px;
        text-align: center;
        color: #748596;
        font-size: 13px;
      }

      .page {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: #607487;
      }

      .page button {
        height: 30px;
        padding: 0 10px;
      }

      @media(max-width: 700px) {
        .toolbar {
          gap: 6px;
        }

        button {
          padding: 0 9px;
        }

        .message {
          margin-left: 0;
        }
      }
    `;

    /* =========================================================
       HTML TEMPLATE
       ========================================================= */
    var template = document.createElement("template");

    template.innerHTML =
        '<style>' + STYLE + '</style>' +
        '<div class="shell">' +

          '<div class="toolbar">' +
            '<input id="search" class="search" type="search" ' +
              'placeholder="Search Asset ID or description..." ' +
              'aria-label="Search assets">' +

            '<span class="count" id="loadedCount">0 assets</span>' +
            '<span class="spacer"></span>' +

            '<button id="loadBtn">' +
              ICON_LOAD + ' Load Data' +
            '</button>' +

            '<button id="deleteBtn" class="danger">' +
              ICON_DELETE + ' Delete Selected' +
            '</button>' +

            '<button id="saveBtn" class="primary">' +
              ICON_SAVE + ' Save Changes' +
            '</button>' +

            '<button id="clearBtn">' +
              ICON_CLEAR + ' Clear' +
            '</button>' +
          '</div>' +

          '<div class="table-wrap">' +
            '<table>' +
              '<thead><tr id="headRow"></tr></thead>' +
              '<tbody id="bodyRows"></tbody>' +
            '</table>' +
          '</div>' +

          '<div class="footer">' +
            '<span>Total assets: ' +
              '<span class="strong" id="total">0</span>' +
            '</span>' +

            '<span>Selected: ' +
              '<span class="strong" id="selected">0</span>' +
            '</span>' +

            '<span>Modified: ' +
              '<span class="strong" id="modified">0</span>' +
            '</span>' +

            '<div class="page">' +
              '<span id="pageLabel">Page 1 of 1</span>' +
              '<button id="prevBtn">Previous</button>' +
              '<button id="nextBtn">Next</button>' +
            '</div>' +

            '<span class="message" id="message">' +
              'Load data to begin.' +
            '</span>' +
          '</div>' +

        '</div>';

    /* =========================================================
       COMPONENT
       ========================================================= */
    class ModifyAsset extends HTMLElement {

        constructor() {
            super();

            this.attachShadow({ mode: "open" })
                .appendChild(template.content.cloneNode(true));

            this._rows = [];
            this._lastEvent = "";
            this._page = 0;
            this._pageSize = 50;
            this._query = "";
            this._loaded = false;

            this._bind();
            this._render();
        }

        connectedCallback() {
            this._fire("onReady", "ready");
        }

        /* =====================================================
           EVENT BINDING
           ===================================================== */
        _bind() {
            var self = this;

            this.shadowRoot.getElementById("loadBtn").onclick =
                function () {
                    self._message("Requesting asset data from SAC...");
                    self._fire("onDataChange", "loadData");
                };

            this.shadowRoot.getElementById("saveBtn").onclick =
                function () {
                    var rows = self._rows.filter(function (r) {
                        return r.isModified;
                    });

                    if (!rows.length) {
                        self._message("No changes to save.");
                        self._fire("onDataChange", "saveChanges|0");
                        return;
                    }

                    self._fire(
                        "onDataChange",
                        "saveChanges|" + rows.length
                    );
                };

            this.shadowRoot.getElementById("deleteBtn").onclick =
                function () {
                    var selected = self._selectedRows();

                    if (selected.length) {
                        self._fire(
                            "onDataChange",
                            "deleteSelected|" + selected.length
                        );
                    }
                };

            this.shadowRoot.getElementById("clearBtn").onclick =
                function () {
                    self.clearData();
                    self._fire("onDataChange", "clear");
                };

            this.shadowRoot.getElementById("search").oninput =
                function (e) {
                    self._query = e.target.value || "";
                    self._page = 0;
                    self._render();
                };

            this.shadowRoot.getElementById("prevBtn").onclick =
                function () {
                    if (self._page > 0) {
                        self._page--;
                        self._render();
                    }
                };

            this.shadowRoot.getElementById("nextBtn").onclick =
                function () {
                    if (self._page < self._pageCount() - 1) {
                        self._page++;
                        self._render();
                    }
                };
        }

        /* =====================================================
           GENERAL HELPERS
           ===================================================== */
        _fire(name, value) {
            this._lastEvent = String(value == null ? "" : value);
            this.dispatchEvent(new Event(name));
        }

        _message(text) {
            var el = this.shadowRoot.getElementById("message");

            if (el) {
                el.textContent = text || "";
            }
        }

        _readField(source, key) {
            var field = FIELDS.find(function (f) {
                return f.key === key;
            });

            if (source[key] !== undefined && source[key] !== null) {
                return String(source[key]);
            }

            var aliases = (field ? field.aliases : []).map(function (x) {
                return x.toLowerCase().replace(/[^a-z0-9]/g, "");
            });

            var keys = Object.keys(source);

            for (var i = 0; i < keys.length; i++) {
                var normalised = keys[i]
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "");

                if (aliases.indexOf(normalised) !== -1) {
                    return source[keys[i]] == null
                        ? ""
                        : String(source[keys[i]]);
                }
            }

            return "";
        }

        _normaliseRow(source) {
            source = source || {};

            var id = source.assetId;

            if (id === undefined) id = source.id;
            if (id === undefined) id = source.AHC_ASSET;
            if (id === undefined) id = source.ID;
            if (id === undefined) id = source.memberId;

            var row = {
                assetId: id == null ? "" : String(id),
                selected: !!source.selected,
                isModified: false,
                _original: {}
            };

            FIELDS.forEach((field) => {
                row[field.key] = this._readField(source, field.key);
                row._original[field.key] = row[field.key];
            });

            return row;
        }

        _matches(row) {
            if (!this._query) {
                return true;
            }

            var q = this._query.toLowerCase();

            return [
                row.assetId,
                row.company,
                row.costCenter,
                row.assetClass,
                row.capitalizedMonth,
                row.description
            ].some(function (value) {
                return String(value == null ? "" : value)
                    .toLowerCase()
                    .indexOf(q) !== -1;
            });
        }

        _visibleRows() {
            return this._rows
                .map(function (row, index) {
                    return { row: row, index: index };
                })
                .filter((entry) => this._matches(entry.row));
        }

        _pageCount() {
            return Math.max(
                1,
                Math.ceil(this._visibleRows().length / this._pageSize)
            );
        }

        /* =====================================================
           RENDER TABLE
           ===================================================== */
        _render() {
            var self = this;

            var head = this.shadowRoot.getElementById("headRow");
            var body = this.shadowRoot.getElementById("bodyRows");

            head.innerHTML =
                '<th class="check-cell">' +
                  '<input id="selectAll" type="checkbox" ' +
                  'aria-label="Select all visible assets">' +
                '</th>' +
                '<th style="width:210px">Asset ID</th>' +

                FIELDS.map(function (field) {
                    return '<th style="width:' + field.width + 'px">' +
                        field.label + '</th>';
                }).join("");

            body.innerHTML = "";

            var visible = this._visibleRows();

            var pageRows = visible.slice(
                this._page * this._pageSize,
                (this._page + 1) * this._pageSize
            );

            if (!pageRows.length) {
                var tr = document.createElement("tr");
                var td = document.createElement("td");

                td.colSpan = FIELDS.length + 2;
                td.className = "empty";

                td.textContent = this._loaded
                    ? "No assets match the current search."
                    : "Click Load Data to retrieve existing assets.";

                tr.appendChild(td);
                body.appendChild(tr);

            } else {
                pageRows.forEach(function (entry) {
                    body.appendChild(
                        self._buildRow(entry.row, entry.index)
                    );
                });
            }

            var selectAll =
                this.shadowRoot.getElementById("selectAll");

            var selectedVisible = pageRows.filter(function (entry) {
                return entry.row.selected;
            }).length;

            selectAll.checked =
                pageRows.length > 0 &&
                selectedVisible === pageRows.length;

            selectAll.indeterminate =
                selectedVisible > 0 &&
                selectedVisible < pageRows.length;

            selectAll.onchange = function () {
                pageRows.forEach(function (entry) {
                    entry.row.selected = selectAll.checked;
                });

                self._render();

                self._fire(
                    "onDataChange",
                    "selectionChanged|" + self._selectedRows().length
                );
            };

            this.shadowRoot.getElementById("loadedCount").textContent =
                visible.length + " assets";

            this.shadowRoot.getElementById("total").textContent =
                this._rows.length;

            this.shadowRoot.getElementById("selected").textContent =
                this._selectedRows().length;

            this.shadowRoot.getElementById("modified").textContent =
                this._rows.filter(function (row) {
                    return row.isModified;
                }).length;

            this.shadowRoot.getElementById("pageLabel").textContent =
                "Page " + (this._page + 1) + " of " + this._pageCount();

            this.shadowRoot.getElementById("prevBtn").disabled =
                this._page <= 0;

            this.shadowRoot.getElementById("nextBtn").disabled =
                this._page >= this._pageCount() - 1;

            this.shadowRoot.getElementById("deleteBtn").style.display =
                this._selectedRows().length ? "inline-flex" : "none";
        }

        _buildRow(row, index) {
            var self = this;

            var tr = document.createElement("tr");

            if (row.selected) {
                tr.classList.add("selected");
            }

            /* Selection checkbox */
            var tdCheck = document.createElement("td");
            tdCheck.className = "check-cell";

            var check = document.createElement("input");
            check.type = "checkbox";
            check.checked = !!row.selected;

            check.setAttribute(
                "aria-label",
                "Select asset " + row.assetId
            );

            check.onchange = function () {
                row.selected = check.checked;

                self._render();

                self._fire(
                    "onDataChange",
                    "selectRow|" + index + "|" + row.selected
                );
            };

            tdCheck.appendChild(check);
            tr.appendChild(tdCheck);

            /* Read-only Asset ID */
            var idTd = document.createElement("td");

            idTd.className = "asset-id";
            idTd.title = row.assetId;
            idTd.textContent = row.assetId;

            tr.appendChild(idTd);

            /* Editable properties */
            FIELDS.forEach(function (field) {
                var td = document.createElement("td");
                var input = document.createElement("input");

                input.className = "cell";
                input.type = "text";
                input.value = row[field.key] == null
                    ? ""
                    : row[field.key];

                input.setAttribute(
                    "aria-label",
                    field.label + " for " + row.assetId
                );

                input.onchange = function () {
                    row[field.key] = input.value;

                    row.isModified = FIELDS.some(function (f) {
                        return String(row[f.key] == null ? "" : row[f.key]) !==
                            String(row._original[f.key] == null ? "" : row._original[f.key]);
                    });

                    self._render();

                    self._fire(
                        "onDataChange",
                        "fieldChange|" +
                        index + "|" +
                        field.key + "|" +
                        input.value
                    );
                };

                td.appendChild(input);
                tr.appendChild(td);
            });

            return tr;
        }

        _selectedRows() {
            return this._rows.filter(function (row) {
                return row.selected;
            });
        }

        /* =====================================================
           PUBLIC API FOR SAC SCRIPTING
           ===================================================== */

        getLastEvent() {
            return this._lastEvent;
        }

        getData() {
            return JSON.stringify(
                this._rows.map(function (row) {
                    return {
                        assetId: row.assetId,
                        company: row.company,
                        costCenter: row.costCenter,
                        assetClass: row.assetClass,
                        capitalizedMonth: row.capitalizedMonth,
                        description: row.description,
                        selected: row.selected,
                        isModified: row.isModified
                    };
                })
            );
        }

        setData(raw) {
            var parsed;

            try {
                parsed = typeof raw === "string"
                    ? JSON.parse(raw)
                    : raw;

            } catch (e) {
                this._message(
                    "Unable to parse asset data. Expected a JSON array."
                );
                return;
            }

            if (!Array.isArray(parsed)) {
                this._message(
                    "Unable to load data: expected a JSON array of assets."
                );
                return;
            }

            this._rows = parsed.map((item) =>
                this._normaliseRow(item)
            );

            this._loaded = true;
            this._page = 0;

            this._message(
                "Loaded " + this._rows.length + " asset(s)."
            );

            this._render();
        }

        setCellValue(rowIndex, fieldName, value) {
            if (!this._rows[rowIndex]) {
                return;
            }

            if (!FIELDS.some(function (field) {
                return field.key === fieldName;
            })) {
                return;
            }

            var row = this._rows[rowIndex];

            row[fieldName] = value == null ? "" : String(value);

            row.isModified = FIELDS.some(function (field) {
                return String(row[field.key] == null ? "" : row[field.key]) !==
                    String(row._original[field.key] == null ? "" : row._original[field.key]);
            });

            this._render();
        }

        getSelectedData() {
            return JSON.stringify(
                this._selectedRows().map(function (row) {
                    return {
                        assetId: row.assetId,
                        company: row.company,
                        costCenter: row.costCenter,
                        assetClass: row.assetClass,
                        capitalizedMonth: row.capitalizedMonth,
                        description: row.description,
                        isModified: row.isModified
                    };
                })
            );
        }

        getModifiedData() {
            return JSON.stringify(
                this._rows.filter(function (row) {
                    return row.isModified;
                }).map(function (row) {
                    return {
                        assetId: row.assetId,
                        company: row.company,
                        costCenter: row.costCenter,
                        assetClass: row.assetClass,
                        capitalizedMonth: row.capitalizedMonth,
                        description: row.description
                    };
                })
            );
        }

        markSaved() {
            this._rows.forEach(function (row) {
                FIELDS.forEach(function (field) {
                    row._original[field.key] = row[field.key];
                });

                row.isModified = false;
            });

            this._message("Changes marked as saved.");
            this._render();
        }

        removeRowsById(rawIds) {
            var ids;

            try {
                ids = Array.isArray(rawIds)
                    ? rawIds
                    : JSON.parse(rawIds);

            } catch (e) {
                return;
            }

            if (!Array.isArray(ids)) {
                return;
            }

            var set = new Set(ids.map(String));

            this._rows = this._rows.filter(function (row) {
                return !set.has(String(row.assetId));
            });

            this._page = Math.min(
                this._page,
                this._pageCount() - 1
            );

            this._message(
                "Rows removed from widget view only; model deletion must be completed by SAC scripting."
            );

            this._render();
        }

        clearData() {
            this._rows = [];
            this._page = 0;
            this._query = "";
            this._loaded = false;

            var search = this.shadowRoot.getElementById("search");

            if (search) {
                search.value = "";
            }

            this._message(
                "Widget cleared. No model data was changed."
            );

            this._render();
        }

        setStatus(message) {
            this._message(message);
        }
    }

    /* =========================================================
       REGISTER UNIQUE COMPONENT
       ========================================================= */
    if (!customElements.get("com-madhav-modifyasset")) {
        customElements.define(
            "com-madhav-modifyasset",
            ModifyAsset
        );
    }

})();
