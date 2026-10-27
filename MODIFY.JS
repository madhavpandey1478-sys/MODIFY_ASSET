
(function () {
    "use strict";

    /* =========================================================
       MODIFY ASSET - STANDALONE SAC CUSTOM WIDGET
       Component: com-madhav-modifyasset
       Asset ID: Read-only
       Other five properties: Editable
       ========================================================= */

    var FIELDS = [
        { key: "company", label: "Company", width: 210,
          aliases: ["COMPANY", "COMPANY_CODE", "COMPANYCODE"] },
        { key: "costCenter", label: "Cost Center", width: 220,
          aliases: ["COSTCENTER", "COST_CENTER", "COST CENTER"] },
        { key: "assetClass", label: "Asset Class", width: 220,
          aliases: ["ASSET_CLASS", "ASSETCLASS", "ASSET CLASS"] },
        { key: "capitalizedMonth", label: "Capitalized Month", width: 240,
          aliases: ["CAPITALIZED", "CAPITALIZED_MONTH", "CAPITALIZEDMONTH", "CWIP_T_MONTH"] },
        { key: "description", label: "Asset", width: 520,
          aliases: ["DESCRIPTION", "ASSET_DESCRIPTION", "ASSET DESCRIPTION", "TEXT", "ASSET"] }
    ];

    /* =========================================================
       CSS - MATCH HR MODIFY POSITION DESIGN
       ========================================================= */

    var CSS = `
      :host {
        display:block;
        width:100%;
        height:100%;
        min-height:220px;
        font-family:"72","72full",Arial,Helvetica,sans-serif;
        color:#263746;
        box-sizing:border-box;
      }

      * { box-sizing:border-box; }

      .root {
        display:flex;
        flex-direction:column;
        width:100%;
        height:100%;
        min-height:220px;
        background:#fff;
        overflow:hidden;
        border:1px solid #d9dfe5;
        border-radius:10px;
      }

      /* TOP TOOLBAR */
      .toolbar {
        min-height:73px;
        flex:0 0 auto;
        display:flex;
        align-items:center;
        flex-wrap:nowrap;
        gap:8px;
        padding:8px 14px;
        background:#f7faff;
        border-bottom:1px solid #e0e7ee;
      }

      .search {
        width:322px;
        min-width:180px;
        max-width:32%;
        height:42px;
        flex:0 1 322px;
        padding:0 14px;
        border:1px solid #c8d9ec;
        border-radius:10px;
        outline:none;
        background:#fff;
        color:#263746;
        font:13px "72",Arial,sans-serif;
      }

      .search::placeholder { color:#667b90; }

      .search:focus {
        border-color:#0a6ed1;
        box-shadow:0 0 0 2px #0a6ed11a;
      }

      .visible {
        color:#607487;
        font-size:12px;
        white-space:nowrap;
        margin-right:10px;
      }

      .spacer { flex:1 1 auto; }

      /* BUTTONS - NO ICONS */
      button {
        height:36px;
        padding:0 16px;
        border:1px solid #c5d9f3;
        border-radius:12px;
        background:#fff;
        color:#0064d9;
        font:600 13px "72",Arial,sans-serif;
        cursor:pointer;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:0;
        white-space:nowrap;
        box-shadow:none;
        flex:0 0 auto;
      }

      button:hover {
        background:#f4f8ff;
        border-color:#9fc2f2;
      }

      button:active { background:#eaf3ff; }

      button.primary {
        background:#0a6ed1;
        border-color:#0a6ed1;
        color:#fff;
      }

      button.primary:hover {
        background:#085caf;
        border-color:#085caf;
      }

      button.delete {
        color:#bb0000;
        border-color:#e6b5b5;
        background:#fff;
        display:none;
      }

      button.delete:hover {
        background:#fff4f4;
        border-color:#d98c8c;
      }

      button:disabled {
        opacity:.45;
        cursor:default;
      }

      /* PAGINATION - ABOVE THE TABLE */
      .paging {
        min-height:51px;
        flex:0 0 auto;
        display:flex;
        align-items:center;
        justify-content:flex-end;
        gap:9px;
        padding:7px 14px;
        background:#fff;
        border-bottom:1px solid #e3e8ed;
        color:#607487;
        font-size:12px;
      }

      .paging button {
        height:36px;
        padding:0 15px;
      }

      /* TABLE */
      .table-wrap {
        flex:1 1 auto;
        min-height:80px;
        overflow:auto;
        background:#fff;
        scrollbar-width:thin;
        scrollbar-color:#aebdca #f2f5f7;
      }

      .table-wrap::-webkit-scrollbar {
        width:10px;
        height:10px;
      }

      .table-wrap::-webkit-scrollbar-thumb {
        background:#b5c2cd;
        border-radius:8px;
        border:2px solid #f3f6f8;
      }

      table {
        border-collapse:separate;
        border-spacing:0;
        table-layout:fixed;
        min-width:1500px;
        width:100%;
      }

      th {
        position:sticky;
        top:0;
        z-index:3;
        height:44px;
        padding:0 10px;
        background:#eef4fa;
        color:#24445f;
        border-bottom:1px solid #cbd8e3;
        font-size:12px;
        font-weight:700;
        text-align:left;
        white-space:nowrap;
      }

      td {
        height:48px;
        padding:6px 8px;
        border-bottom:1px solid #e6ebef;
        background:#fff;
        vertical-align:middle;
        position:relative;
      }

      tr:hover td { background:#f9fbfd; }

      tr.selected td { background:#fff9e7; }

      tr.selected:hover td { background:#fff3cf; }

      .check-cell {
        width:48px;
        min-width:48px;
        max-width:48px;
        padding:0;
        text-align:center;
      }

      input[type=checkbox] {
        width:18px;
        height:18px;
        margin:0;
        cursor:pointer;
        accent-color:#0a6ed1;
        vertical-align:middle;
      }

      .asset-id {
        padding:0 4px;
        font-size:12px;
        color:#5b6268;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }

      .cell {
        width:100%;
        min-width:0;
        height:36px;
        padding:0 9px;
        border:1px solid #c7d7e6;
        border-radius:6px;
        background:#fff;
        color:#253746;
        font:12px "72",Arial,sans-serif;
        outline:none;
      }

      .cell:hover { border-color:#9fb5c8; }

      .cell:focus {
        border-color:#0a6ed1;
        box-shadow:0 0 0 2px #0a6ed11a;
      }

      .empty {
        height:70px;
        padding:25px;
        text-align:center;
        color:#748596;
        font-size:13px;
      }

      /* BOTTOM STATUS BAR */
      .status {
        flex:0 0 auto;
        min-height:36px;
        display:flex;
        align-items:center;
        gap:18px;
        flex-wrap:wrap;
        padding:7px 12px;
        background:#f7f9fb;
        border-top:1px solid #d9e1e8;
        color:#607487;
        font-size:11px;
      }

      .strong {
        color:#30495e;
        font-weight:700;
      }

      .message {
        margin-left:auto;
        white-space:normal;
      }

      @media(max-width:1100px) {
        .toolbar { flex-wrap:wrap; }
        .search { max-width:100%; }
        .spacer { flex:1 1 auto; }
      }

      @media(max-width:700px) {
        .toolbar { gap:6px; }
        .search { width:210px; }
        button { padding:0 10px; }
        .paging { justify-content:flex-start; flex-wrap:wrap; }
        .message { margin-left:0; }
      }
    `;

    /* =========================================================
       TEMPLATE
       ========================================================= */

    var template = document.createElement("template");

    template.innerHTML =
      '<style>' + CSS + '</style>' +

      '<div class="root">' +

        '<div class="toolbar">' +
          '<input id="search" class="search" type="search" ' +
            'placeholder="Search Asset ID..." ' +
            'aria-label="Search Asset ID">' +

          '<span class="visible" id="visibleCount">Visible: 0</span>' +
          '<span class="spacer"></span>' +

          '<button id="loadBtn">Load Data</button>' +
          '<button id="deleteBtn" class="delete">Delete Selected</button>' +
          '<button id="saveBtn" class="primary">Save Changes</button>' +
          '<button id="clearBtn">Clear</button>' +
        '</div>' +

        '<div class="paging">' +
          '<span id="showing">Showing 0 to 0 of 0</span>' +
          '<button id="prevBtn">Previous</button>' +
          '<span id="pageLabel">Page 1 of 1</span>' +
          '<button id="nextBtn">Next</button>' +
        '</div>' +

        '<div class="table-wrap">' +
          '<table>' +
            '<thead><tr id="headRow"></tr></thead>' +
            '<tbody id="bodyRows"></tbody>' +
          '</table>' +
        '</div>' +

        '<div class="status">' +
          '<span>Total Rows: <span class="strong" id="total">0</span></span>' +
          '<span>Selected Rows: <span class="strong" id="selected">0</span></span>' +
          '<span>Modified Rows: <span class="strong" id="modified">0</span></span>' +
          '<span class="message" id="message">Load data to begin.</span>' +
        '</div>' +

      '</div>';

    /* =========================================================
       COMPONENT
       ========================================================= */

    class ModifyAsset extends HTMLElement {

      constructor() {
        super();

        this.attachShadow({ mode:"open" })
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

      /* =======================================================
         EVENT HANDLERS
         ======================================================= */

      _bind() {
        var self = this;

        this.shadowRoot.getElementById("loadBtn").onclick = function () {
          self._message("Loading existing assets...");
          self._fire("onDataChange", "loadData");
        };

        this.shadowRoot.getElementById("saveBtn").onclick = function () {
          var modified = self._rows.filter(function (row) {
            return row.isModified;
          });

          if (!modified.length) {
            self._message("No changes to save.");
            self._fire("onDataChange", "saveChanges|0");
            return;
          }

          self._fire(
            "onDataChange",
            "saveChanges|" + modified.length
          );
        };

        this.shadowRoot.getElementById("deleteBtn").onclick = function () {
          var selected = self._selectedRows();

          if (selected.length) {
            self._fire(
              "onDataChange",
              "deleteSelected|" + selected.length
            );
          }
        };

        this.shadowRoot.getElementById("clearBtn").onclick = function () {
          self.clearData();
          self._fire("onDataChange", "clear");
        };

        this.shadowRoot.getElementById("search").oninput = function (e) {
          self._query = e.target.value || "";
          self._page = 0;
          self._render();
        };

        this.shadowRoot.getElementById("prevBtn").onclick = function () {
          if (self._page > 0) {
            self._page--;
            self._render();
          }
        };

        this.shadowRoot.getElementById("nextBtn").onclick = function () {
          if (self._page < self._pageCount() - 1) {
            self._page++;
            self._render();
          }
        };
      }

      /* =======================================================
         HELPERS
         ======================================================= */

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
          selected: false,
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
            return { row:row, index:index };
          })
          .filter((entry) => this._matches(entry.row));
      }

      _pageCount() {
        return Math.max(
          1,
          Math.ceil(this._visibleRows().length / this._pageSize)
        );
      }

      /* =======================================================
         RENDER
         ======================================================= */

      _render() {
        var self = this;

        var head = this.shadowRoot.getElementById("headRow");
        var body = this.shadowRoot.getElementById("bodyRows");

        head.innerHTML =
          '<th class="check-cell">' +
            '<input id="selectAll" type="checkbox" aria-label="Select all rows">' +
          '</th>' +
          '<th style="width:210px">Asset ID</th>' +

          FIELDS.map(function (field) {
            return '<th style="width:' + field.width + 'px">' +
              field.label + '</th>';
          }).join("");

        body.innerHTML = "";

        var visible = this._visibleRows();
        var start = this._page * this._pageSize;

        var pageRows = visible.slice(
          start,
          start + this._pageSize
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

        var first = visible.length ? start + 1 : 0;
        var last = Math.min(start + this._pageSize, visible.length);

        this.shadowRoot.getElementById("visibleCount").textContent =
          "Visible: " + visible.length;

        this.shadowRoot.getElementById("showing").textContent =
          "Showing " + first + " to " + last + " of " + visible.length;

        this.shadowRoot.getElementById("pageLabel").textContent =
          "Page " + (this._page + 1) + " of " + this._pageCount();

        this.shadowRoot.getElementById("prevBtn").disabled =
          this._page <= 0;

        this.shadowRoot.getElementById("nextBtn").disabled =
          this._page >= this._pageCount() - 1;

        this.shadowRoot.getElementById("total").textContent =
          this._rows.length;

        this.shadowRoot.getElementById("selected").textContent =
          this._selectedRows().length;

        this.shadowRoot.getElementById("modified").textContent =
          this._rows.filter(function (row) {
            return row.isModified;
          }).length;

        this.shadowRoot.getElementById("deleteBtn").style.display =
          this._selectedRows().length ? "inline-flex" : "none";
      }

      _buildRow(row, index) {
        var self = this;
        var tr = document.createElement("tr");

        if (row.selected) {
          tr.classList.add("selected");
        }

        /* CHECKBOX */
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

        /* READ-ONLY ASSET ID */
        var idTd = document.createElement("td");

        idTd.className = "asset-id";
        idTd.title = row.assetId;
        idTd.textContent = row.assetId;

        tr.appendChild(idTd);

        /* EDITABLE PROPERTIES */
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
              "fieldChange|" + index + "|" +
              field.key + "|" + input.value
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

      /* =======================================================
         PUBLIC METHODS FOR SAC STORY SCRIPTING
         ======================================================= */

      getLastEvent() {
        return this._lastEvent;
      }

      getData() {
        return JSON.stringify(
          this._rows.map(function (row) {
            return {
              assetId:row.assetId,
              company:row.company,
              costCenter:row.costCenter,
              assetClass:row.assetClass,
              capitalizedMonth:row.capitalizedMonth,
              description:row.description,
              selected:row.selected,
              isModified:row.isModified
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
          this._message("Unable to parse asset data.");
          return;
        }

        if (!Array.isArray(parsed)) {
          this._message("Expected a JSON array of assets.");
          return;
        }

        this._rows = parsed.map((item) =>
          this._normaliseRow(item)
        );

        this._loaded = true;
        this._page = 0;

        this._message("Loaded " + this._rows.length + " row(s).");
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
              assetId:row.assetId,
              company:row.company,
              costCenter:row.costCenter,
              assetClass:row.assetClass,
              capitalizedMonth:row.capitalizedMonth,
              description:row.description,
              isModified:row.isModified
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
              assetId:row.assetId,
              company:row.company,
              costCenter:row.costCenter,
              assetClass:row.assetClass,
              capitalizedMonth:row.capitalizedMonth,
              description:row.description
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

        this._message("Changes saved.");
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

        var idSet = new Set(ids.map(String));

        this._rows = this._rows.filter(function (row) {
          return !idSet.has(String(row.assetId));
        });

        this._page = Math.min(
          this._page,
          this._pageCount() - 1
        );

        this._message(
          "Rows removed from widget view. Model deletion must be confirmed separately."
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

        this._message("Widget cleared. No model data was changed.");
        this._render();
      }

      setStatus(message) {
        this._message(message);
      }
    }

    /* =========================================================
       UNIQUE COMPONENT REGISTRATION
       Does not replace any existing widget.
       ========================================================= */

    if (!customElements.get("com-madhav-modifyasset")) {
      customElements.define(
        "com-madhav-modifyasset",
        ModifyAsset
      );
    }

})();
