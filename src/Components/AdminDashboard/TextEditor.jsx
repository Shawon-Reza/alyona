"use client"
import { useState, useRef, useEffect } from "react"
import { Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, RotateCcw, RotateCw } from 'lucide-react'

export default function TextEditor({ onChange, initialContent: initialContentProp }) {
    const editorRef = useRef(null)
    // image upload features removed
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
    })

    const defaultInitialContent = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque, lorem. Pretium condimentum pellentesque gravida ut etiam sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus tincidunt aliquam.</p>`

    const initializedRef = useRef(false)
    const changeTimeoutRef = useRef(null)

    useEffect(() => {
        // Initialize editor content only once (or when explicitly provided and editor empty)
        const content = typeof initialContentProp === 'string' ? initialContentProp : defaultInitialContent;
        if (editorRef.current && !initializedRef.current) {
            editorRef.current.innerHTML = content
            initializedRef.current = true
            try { if (typeof onChange === 'function') onChange(editorRef.current.innerHTML); } catch (e) { }
        }
        // cleanup on unmount
        return () => {
            if (changeTimeoutRef.current) {
                clearTimeout(changeTimeoutRef.current)
                changeTimeoutRef.current = null
            }
        }
    }, [])

    // Table tools state and helpers
    const [showTableTools, setShowTableTools] = useState(false)

    const insertTable = (rows = 2, cols = 2) => {
        if (!editorRef.current) return
        const table = document.createElement('table')
        table.style.width = '100%'
        table.style.borderCollapse = 'collapse'
        table.style.margin = '12px 0'
        table.style.border = '1px solid #e5e7eb'

        // If rows >= 1 create a header (thead) for the first row
        const thead = document.createElement('thead')
        const tbody = document.createElement('tbody')

        for (let r = 0; r < rows; r++) {
            const tr = document.createElement('tr')
            for (let c = 0; c < cols; c++) {
                if (r === 0) {
                    const th = document.createElement('th')
                    th.style.padding = '10px'
                    th.style.border = '1px solid #e5e7eb'
                    th.style.fontWeight = '700'
                    th.style.background = '#f9fafb'
                    th.innerHTML = '<strong>Header</strong>'
                    tr.appendChild(th)
                } else {
                    const td = document.createElement('td')
                    td.style.padding = '8px'
                    td.style.border = '1px solid #e5e7eb'
                    td.innerHTML = '<br>'
                    tr.appendChild(td)
                }
            }
            if (r === 0) thead.appendChild(tr)
            else tbody.appendChild(tr)
        }

        if (thead.children.length) table.appendChild(thead)
        table.appendChild(tbody)

        const sel = window.getSelection()
        if (sel && sel.rangeCount > 0) {
            const range = sel.getRangeAt(0)
            range.deleteContents()
            range.insertNode(table)
        } else {
            editorRef.current.appendChild(table)
        }
        // place cursor in first cell
        const firstCell = table.querySelector('td,th')
        if (firstCell) {
            const r = document.createRange()
            r.setStart(firstCell, 0)
            r.setEnd(firstCell, 0)
            sel.removeAllRanges()
            sel.addRange(r)
        }
        editorRef.current?.focus()
        try { if (typeof onChange === 'function') onChange(editorRef.current.innerHTML); } catch (e) { }
    }

    const hasHeader = (table) => {
        return !!table.querySelector('thead')
    }

    const makeFirstRowHeader = () => {
        const cell = getCurrentCell();
        if (!cell) { alert('Place the cursor inside the table cell to set header'); return; }
        const info = getTableAndIndexes(cell);
        if (!info) return;
        const { table } = info;
        if (hasHeader(table)) return; // already has header
        const firstTr = table.querySelector('tr')
        if (!firstTr) return;
        const thead = document.createElement('thead')
        const newTr = document.createElement('tr')
        Array.from(firstTr.children).forEach((c) => {
            const th = document.createElement(c.tagName === 'TH' ? 'th' : 'th')
            th.style.padding = '10px'
            th.style.border = '1px solid #e5e7eb'
            th.style.fontWeight = '700'
            th.style.background = '#f9fafb'
            // copy text content
            th.innerHTML = c.innerHTML || '<strong>Header</strong>'
            newTr.appendChild(th)
        })
        thead.appendChild(newTr)
        const firstTrParent = firstTr.parentNode
        firstTrParent.insertBefore(thead, firstTr)
        firstTrParent.removeChild(firstTr)
        try { if (typeof onChange === 'function') onChange(editorRef.current.innerHTML); } catch (e) { }
    }

    const removeHeader = () => {
        const cell = getCurrentCell();
        if (!cell) { alert('Place the cursor inside the table header to remove it'); return; }
        const info = getTableAndIndexes(cell);
        if (!info) return;
        const { table } = info;
        const thead = table.querySelector('thead')
        if (!thead) return;
        const firstTr = thead.querySelector('tr')
        const tbody = table.querySelector('tbody') || document.createElement('tbody')
        const newTr = document.createElement('tr')
        Array.from(firstTr.children).forEach((c) => {
            const td = document.createElement('td')
            td.style.padding = '8px'
            td.style.border = '1px solid #e5e7eb'
            td.innerHTML = c.innerHTML || '<br>'
            newTr.appendChild(td)
        })
        // remove thead and insert the converted row at top of tbody
        thead.parentNode.removeChild(thead)
        if (tbody.children.length) tbody.insertBefore(newTr, tbody.firstChild)
        else tbody.appendChild(newTr)
        if (!table.querySelector('tbody')) table.appendChild(tbody)
        try { if (typeof onChange === 'function') onChange(editorRef.current.innerHTML); } catch (e) { }
    }

    const insertTableFromPrompt = () => {
        const r = prompt('Rows (1-10)', '2');
        if (r === null) return;
        const c = prompt('Columns (1-10)', '2');
        if (c === null) return;
        insertTable(Number(r), Number(c));
    }

    const getCurrentCell = () => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return null;
        let node = sel.anchorNode;
        while (node && node !== editorRef.current) {
            if (node.nodeType === 1 && (node.tagName === 'TD' || node.tagName === 'TH')) return node;
            node = node.parentNode;
        }
        return null;
    }

    const getTableAndIndexes = (cell) => {
        if (!cell) return null;
        const tr = cell.parentNode;
        const table = tr && tr.parentNode ? tr.parentNode.parentNode : null; // tbody -> table
        if (!table) return null;
        const rows = Array.from(table.querySelectorAll('tr'));
        const rowIndex = rows.indexOf(tr);
        const cells = Array.from(tr.children).filter(n => n.tagName === 'TD' || n.tagName === 'TH');
        const cellIndex = cells.indexOf(cell);
        return { table, tr, rowIndex, cellIndex, rows };
    }

    const addRow = (place = 'below') => {
        const cell = getCurrentCell();
        if (!cell) { alert('Place the cursor inside the table cell to add a row'); return; }
        const info = getTableAndIndexes(cell);
        if (!info) return;
        const { rowIndex, rows } = info;
        const refTr = rows[rowIndex];
        const cols = Array.from(refTr.children).filter(n => n.tagName === 'TD' || n.tagName === 'TH').length || 1;
        const newTr = document.createElement('tr');
        for (let i = 0; i < cols; i++) {
            const td = document.createElement('td');
            td.style.padding = '8px';
            td.style.border = '1px solid #e5e7eb';
            td.innerHTML = '<br>';
            newTr.appendChild(td);
        }
        if (place === 'above') refTr.parentNode.insertBefore(newTr, refTr);
        else refTr.parentNode.insertBefore(newTr, refTr.nextSibling);
        editorRef.current?.focus();
        try { if (typeof onChange === 'function') onChange(editorRef.current.innerHTML); } catch (e) { }
    }

    const deleteRow = () => {
        const cell = getCurrentCell();
        if (!cell) { alert('Place the cursor inside the table cell to delete its row'); return; }
        const info = getTableAndIndexes(cell);
        if (!info) return;
        const { tr, table } = info;
        tr.parentNode.removeChild(tr);
        if (!table.querySelector('tr')) table.parentNode.removeChild(table);
        editorRef.current?.focus();
        try { if (typeof onChange === 'function') onChange(editorRef.current.innerHTML); } catch (e) { }
    }

    const addCol = (place = 'right') => {
        const cell = getCurrentCell();
        if (!cell) { alert('Place the cursor inside the table cell to add a column'); return; }
        const info = getTableAndIndexes(cell);
        if (!info) return;
        const { cellIndex, rows } = info;
        rows.forEach((r) => {
            const cells = Array.from(r.children).filter(n => n.tagName === 'TD' || n.tagName === 'TH');
            const ref = cells[cellIndex];
            const newCell = document.createElement('td');
            newCell.style.padding = '8px';
            newCell.style.border = '1px solid #e5e7eb';
            newCell.innerHTML = '<br>';
            if (place === 'left' && ref) ref.parentNode.insertBefore(newCell, ref);
            else if (ref && ref.nextSibling) ref.parentNode.insertBefore(newCell, ref.nextSibling);
            else r.appendChild(newCell);
        });
        editorRef.current?.focus();
        try { if (typeof onChange === 'function') onChange(editorRef.current.innerHTML); } catch (e) { }
    }

    const deleteCol = () => {
        const cell = getCurrentCell();
        if (!cell) { alert('Place the cursor inside the table cell to delete its column'); return; }
        const info = getTableAndIndexes(cell);
        if (!info) return;
        const { table, cellIndex, rows } = info;
        rows.forEach((r) => {
            const cells = Array.from(r.children).filter(n => n.tagName === 'TD' || n.tagName === 'TH');
            const c = cells[cellIndex];
            if (c) c.parentNode.removeChild(c);
        });
        if (!table.querySelector('tr') || !table.querySelector('td,th')) table.parentNode.removeChild(table);
        editorRef.current?.focus();
        try { if (typeof onChange === 'function') onChange(editorRef.current.innerHTML); } catch (e) { }
    }

    const deleteTable = () => {
        const cell = getCurrentCell();
        if (!cell) { alert('Place the cursor inside the table to delete it'); return; }
        const info = getTableAndIndexes(cell);
        if (!info) return;
        const { table } = info;
        table.parentNode.removeChild(table);
        editorRef.current?.focus();
        try { if (typeof onChange === 'function') onChange(editorRef.current.innerHTML); } catch (e) { }
    }

    const handleSave = () => {
        if (editorRef.current) {
            console.log("Save answer:", editorRef.current.innerHTML)
        }
    }

    const handleGetBack = () => {
        console.log("Get back clicked")
    }

    const execCommand = (command, value = null) => {
        // Ensure editor is focused before executing commands (improves reliability for headings/lists)
        if (editorRef.current) editorRef.current.focus()
        try { document.execCommand(command, false, value) } catch (e) { }
        updateActiveFormats()
        scheduleOnChange()
        editorRef.current?.focus()
    }

    const updateActiveFormats = () => {
        setActiveFormats({
            bold: document.queryCommandState("bold"),
            italic: document.queryCommandState("italic"),
            underline: document.queryCommandState("underline"),
            strikethrough: document.queryCommandState("strikeThrough"),
        })
    }

    // Debounced onChange caller
    const scheduleOnChange = () => {
        if (changeTimeoutRef.current) clearTimeout(changeTimeoutRef.current)
        changeTimeoutRef.current = setTimeout(() => {
            try { if (typeof onChange === 'function' && editorRef.current) onChange(editorRef.current.innerHTML); } catch (e) { }
            changeTimeoutRef.current = null
        }, 400)
    }

    const handleSelectionChange = () => {
        updateActiveFormats()
    }

    const handleKeyUp = () => {
        updateActiveFormats()
    }

    const handleMouseUp = () => {
        updateActiveFormats()
    }

    const insertHeading = (level) => {
        // Use uppercase tag in formatBlock for broader browser compatibility
        execCommand("formatBlock", `<H${level}>`)
    }

    const insertParagraph = () => {
        execCommand("formatBlock", "<P>")
    }

    // image and URL upload helpers removed

    return (
        <div className="">
            {/* image upload input removed */}

            {/* Editor */}
            <div className="card bg-base-100 shadow-md border border-gray-200 ">
                <div
                    className="card-body p-0 bg-white/50 ">
                    {/* Toolbar */}
                    <div className="sticky top-0 flex items-center gap-1 p-3 border-b border-gray-200 flex-wrap bg-white">
                        <button className="btn btn-ghost btn-sm btn-square" onClick={() => execCommand("undo")}>
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button className="btn btn-ghost btn-sm btn-square" onClick={() => execCommand("redo")}>
                            <RotateCw className="w-4 h-4" />
                        </button>
                        <div className="divider divider-horizontal mx-1"></div>
                        <select
                            className="select select-bordered select-sm w-32"
                            onChange={(e) => {
                                const value = e.target.value
                                if (value === "normal") insertParagraph()
                                else if (value === "h1") insertHeading(1)
                                else if (value === "h2") insertHeading(2)
                                else if (value === "h3") insertHeading(3)
                            }}
                        >
                            <option value="normal">Normal text</option>
                            <option value="h1">Heading 1</option>
                            <option value="h2">Heading 2</option>
                            <option value="h3">Heading 3</option>
                        </select>
                        <select
                            className="select select-bordered select-sm w-16"
                            onChange={(e) => execCommand("fontSize", e.target.value)}
                        >
                            <option value="1">10</option>
                            <option value="2">12</option>
                            <option value="3" defaultValue>
                                14
                            </option>
                            <option value="4">16</option>
                            <option value="5">18</option>
                            <option value="6">24</option>
                            <option value="7">36</option>
                        </select>
                        <div className="divider divider-horizontal mx-1"></div>
                        <button className={`btn btn-sm btn-square ${activeFormats.bold ? 'btn-active bg-gray-200' : 'btn-ghost'}`} onClick={() => execCommand('bold')}>
                            <Bold className="w-4 h-4" />
                        </button>
                        <button className={`btn btn-sm btn-square ${activeFormats.italic ? 'btn-active bg-gray-200' : 'btn-ghost'}`} onClick={() => execCommand('italic')}>
                            <Italic className="w-4 h-4" />
                        </button>
                        <button className={`btn btn-sm btn-square ${activeFormats.underline ? 'btn-active bg-gray-200' : 'btn-ghost'}`} onClick={() => execCommand('underline')}>
                            <Underline className="w-4 h-4" />
                        </button>
                        <button className={`btn btn-sm btn-square ${activeFormats.strikethrough ? 'btn-active bg-gray-200' : 'btn-ghost'}`} onClick={() => execCommand('strikeThrough')}>
                            <Strikethrough className="w-4 h-4" />
                        </button>
                        <div className="divider divider-horizontal mx-1"></div>
                        <button className="btn btn-ghost btn-sm btn-square" onClick={() => execCommand("justifyLeft")}>
                            <AlignLeft className="w-4 h-4" />
                        </button>
                        <button className="btn btn-ghost btn-sm btn-square" onClick={() => execCommand("justifyCenter")}>
                            <AlignCenter className="w-4 h-4" />
                        </button>
                        <button className="btn btn-ghost btn-sm btn-square" onClick={() => execCommand("justifyRight")}>
                            <AlignRight className="w-4 h-4" />
                        </button>
                        <div className="divider divider-horizontal mx-1"></div>
                        <button className="btn btn-ghost btn-sm btn-square" onClick={() => execCommand("insertUnorderedList")}>
                            <List className="w-4 h-4" />
                        </button>
                        <button className="btn btn-ghost btn-sm btn-square" onClick={() => execCommand("insertOrderedList")}>
                            <ListOrdered className="w-4 h-4" />
                        </button>
                        <div className="divider divider-horizontal mx-1"></div>
                        {/* URL and image upload removed */}

                        {/* code and more menu removed */}
                        {/* Table tools dropdown */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                                Table
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-56">
                                <li><a onClick={() => insertTable(2, 2)}>Insert 2x2 table</a></li>
                                <li><a onClick={() => insertTable(3, 3)}>Insert 3x3 table</a></li>
                                <li><a onClick={insertTableFromPrompt}>Insert custom table...</a></li>
                                <li className="menu-title"><span>Table Tools</span></li>
                                <li><a onClick={makeFirstRowHeader}>Make first row header</a></li>
                                <li><a onClick={removeHeader}>Remove header row</a></li>
                                <li><a onClick={() => addRow('above')}>Add row above</a></li>
                                <li><a onClick={() => addRow('below')}>Add row below</a></li>
                                <li><a onClick={deleteRow}>Delete row</a></li>
                                <li><a onClick={() => addCol('left')}>Add column left</a></li>
                                <li><a onClick={() => addCol('right')}>Add column right</a></li>
                                <li><a onClick={deleteCol}>Delete column</a></li>
                                <li><a onClick={deleteTable} className="text-red-600">Delete table</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* Editor Content */}
                    <div
                        className=""
                    >
                        <div
                            ref={editorRef}
                            contentEditable
                            className=" outline-none prose prose-sm max-w-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded p-4"
                            onKeyUp={() => { handleKeyUp(); scheduleOnChange(); }}
                            onInput={() => scheduleOnChange()}
                            onBlur={() => {
                                if (changeTimeoutRef.current) { clearTimeout(changeTimeoutRef.current); changeTimeoutRef.current = null }
                                try { if (typeof onChange === 'function' && editorRef.current) onChange(editorRef.current.innerHTML); } catch (e) { }
                            }}
                            onMouseUp={handleMouseUp}
                            onSelectionChange={handleSelectionChange}
                            style={{
                                lineHeight: "1.6",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}